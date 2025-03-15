import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from '../entity/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { TagsService } from '../../tag/services/tags.service';
import { Tag } from '../../tag/entity/tag.entity';
import { User } from '../../user/entity/user.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { isAfter } from 'date-fns';
import { DeleteTodoDto } from '../dto/delete-todo.dto';
import { UserEmailDto } from '../../user/dto/user-email.dto';
import { RespMessageDto } from '../../common/resp-message.dto';

@Injectable()
export class TodoService {
  logger = new Logger('Todo Service');

  constructor(
    @InjectRepository(ToDo) private readonly todoRepository: Repository<ToDo>,
    private readonly userService: UserService,
    private readonly tagService: TagsService,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<RespMessageDto> {
    const tagList: Tag[] = await this.tagService.getTagsById(
      createTodoDto.tagID,
    );
    const emailDto: UserEmailDto = {
      email: createTodoDto.emailAddress.toLowerCase(),
    };
    const user: User = await this.userService.findUserByEmail(emailDto);

    const todo: ToDo = this.todoRepository.create(createTodoDto);
    todo.user = user;
    todo.tags = tagList;
    todo.content = createTodoDto.content;
    todo.title = createTodoDto.title;

    try {
      await this.todoRepository.save(todo);
      return {
        message: 'Data Saved Successfully',
      };
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException('Invalid Data. Please try again.');
    }
  }

  async updateTodo(updateTodoDto: UpdateTodoDto) {
    const userEmailDto: UserEmailDto = {
      email: updateTodoDto.emailAddress,
    };
    const tagList: Tag[] = await this.userService.getTagsOfUserById(
      userEmailDto,
      updateTodoDto.tagID,
    );
    if (isAfter(updateTodoDto.completedDate, updateTodoDto.deadline)) {
      updateTodoDto.overdue = true;
    }
    const todo = await this.todoRepository.findOne({
      where: { id: updateTodoDto.id },
    });

    if (!todo) {
      throw new NotFoundException('ToDo item not found.');
    }
    todo.title = updateTodoDto.title;
    todo.content = updateTodoDto.content;
    todo.status = updateTodoDto.status;
    todo.deadline = updateTodoDto.deadline;
    todo.completedDate = updateTodoDto.completedDate;
    todo.overDue = updateTodoDto.overdue;
    todo.tags = tagList;

    try {
      await this.todoRepository.save(todo);
      const message: RespMessageDto = {
        message: 'Data Updated Successfully',
      };
      return message;
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException('Invalid Data. Please try again.');
    }
  }

  async deleteTodo(deleteTodo: DeleteTodoDto) {
    try {
      await this.todoRepository.delete({ id: deleteTodo.id });
      return 'Data Deleted Successfully';
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException(
        'Delete operation is not succeeded. Please try again.',
      );
    }
  }
}
