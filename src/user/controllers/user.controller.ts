import { Body, Controller, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { SignInUserDto } from '../dto/signin-user.dto';
import { AuthService } from '../services/auth.service';
import { JWTAuthGuard } from '../services/auth.guard';
import { PaginatedTodoReqDto } from '../dto/paginated-todo.req.dto';
import { JwtPayload } from '../services/jwt.strategy';
import { PaginatedTagReqDto } from '../dto/paginated-tag-req.dto';
import { UserEmailDto } from '../dto/user-email.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return await this.authService.login(signInUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('todo-list')
  async todoListByUser(
    @Request() request: { user?: JwtPayload },
    @Body() paginatedTodoDto: PaginatedTodoReqDto,
  ) {
    const email: string | undefined = request.user?.email;
    if (!email || email !== paginatedTodoDto.emailAddress) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.userService.findPaginatedTodoByUser(paginatedTodoDto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('tag-list-all')
  async tagListAll(
    @Request() request: { user?: JwtPayload },
    @Body() userEmail: UserEmailDto,
  ) {
    const emailJWT: string | undefined = request.user?.email;
    if (!emailJWT || emailJWT !== userEmail.email) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.userService.findTagsOfUser(userEmail);
  }

  @UseGuards(JWTAuthGuard)
  @Post('tag-list')
  async getTags(
    @Request() request: { user?: JwtPayload },
    @Body() paginatedTagDto: PaginatedTagReqDto,
  ) {
    const email: string | undefined = request.user?.email;
    if (!email || email !== paginatedTagDto.emailAddress) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.userService.getPaginatedTags(paginatedTagDto);
  }
}
