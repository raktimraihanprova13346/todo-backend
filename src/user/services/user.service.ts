import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../dto/signin-user.dto';
import { PaginatedTagReqDto } from '../../tag/dto/paginatedTagReq.dto';
import { Tag } from '../../tag/entity/tag.entity';

@Injectable()
export class UserService {
  logger = new Logger('UserService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    //save user password as hash
    user.emailAddress = createUserDto.email.trim();
    user.userName = createUserDto.username.trim();
    user.password = await bcrypt.hash(createUserDto.password, 10);

    await this.userRepository
      .findOne({ where: { emailAddress: user.emailAddress } })
      .then((user) => {
        if (user) {
          throw new ConflictException('User Already Exists with this email.');
        }
      });

    await this.userRepository
      .findOne({ where: { userName: user.userName } })
      .then((user) => {
        if (user) {
          throw new ConflictException('This username is already taken.');
        }
      });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid Data. Please try again.');
    }
  }

  async findUserByEmailAndPass(
    signInUserDto: SignInUserDto,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { emailAddress: signInUserDto.email },
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { emailAddress: email },
    });
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }
    return user;
  }

  async findTagsByPagination(
    paginatedTagDto: PaginatedTagReqDto,
  ): Promise<{ tags: Tag[]; hasNextPage: boolean; totalPages: number }> {
    const result: User | null = await this.userRepository.findOne({
      where: { emailAddress: paginatedTagDto.emailAddress },
      relations: ['tags'],
    });
    const skip: number =
      (paginatedTagDto.pageNumber - 1) * paginatedTagDto.itemsPerPage;
    const tags: Tag[] =
      result?.tags.slice(skip, skip + paginatedTagDto.itemsPerPage) || [];
    const hasNextPage: boolean =
      (result?.tags?.length || 0) > skip + paginatedTagDto.itemsPerPage;
    const totalPages: number = Math.ceil(
      (result?.tags?.length || 0) / paginatedTagDto.itemsPerPage || 0,
    );

    return { tags, hasNextPage, totalPages };
  }
}
