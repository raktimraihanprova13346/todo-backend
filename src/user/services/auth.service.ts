import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from '../dto/signin-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInUserDto): Promise<User | null> {
    const user = await this.userService.findUserByEmail(signInDto);

    if (user && (await bcrypt.compare(user.password, signInDto.password))) {
      return user;
    }
    return null;
  }

  async login(signInDto: SignInUserDto) {
    const userData: User | null = await this.validateUser(signInDto);

    if (!userData) {
      throw new BadRequestException('Invalid credentials');
    } else {
      const payload = { email: userData.emailAddress, sub: userData.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
