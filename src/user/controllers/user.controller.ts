import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { SignInUserDto } from '../dto/signin-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto);
  }
}
