import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../dto/signin-user.dto';

@Injectable()
export class UserService {
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
    } catch (Error) {
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
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { emailAddress: email },
    });
  }
}
