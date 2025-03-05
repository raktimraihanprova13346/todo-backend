import { BadRequestException, Injectable } from '@nestjs/common';
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
    user.password = await bcrypt.hash(createUserDto.password, 10);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('User Already Exists or Invalid Data');
    }
  }

  async findUserByEmail(signInUserDto: SignInUserDto): Promise<User | null> {
    return this.userRepository.findOne({
      where: { emailAddress: signInUserDto.email },
    });
  }
}
