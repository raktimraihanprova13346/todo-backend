import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTAuthGuard } from '../../user/services/auth.guard';
import { JwtPayload } from '../../user/services/jwt.strategy';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { TodoService } from '../services/todo.service';

@UseGuards(JWTAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoServices: TodoService) {}

  @Post('add')
  async createToDo(
    @Request() request: { user?: JwtPayload },
    @Body() createTodoDto: CreateTodoDto,
  ) {
    const email: string | undefined = request.user?.email;
    if (!email || email !== createTodoDto.emailAddress) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.todoServices.createTodo(createTodoDto);
  }
}
