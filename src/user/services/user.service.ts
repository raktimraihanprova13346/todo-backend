import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../dto/signin-user.dto';

@Injectable()
export class UserService {

  private users = [
    { id: 1, email: 'test@example.com', password: 'password123' },
    { id: 2, email: 'user@example.com', password: 'pass456' },
  ];

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    //save user password as hash
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }

  async findUserByEmail(signInUserDto: SignInUserDto) {
    return this.users.find((user) => user.email === signInUserDto.email);
  }
}
