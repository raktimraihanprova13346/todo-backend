import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from '../dto/signin-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInUserDto): Promise<any> {
    const user = await this.userService.findUserByEmail(signInDto);
    if (user && user.password === signInDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(signInDto: SignInUserDto) {
    const user = await this.validateUser(signInDto);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    } else {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

}
