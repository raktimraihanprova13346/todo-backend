import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from '../entity/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { TagsService } from '../../tag/services/tags.service';
import { Tag } from '../../tag/entity/tag.entity';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class TodoService {
  logger = new Logger('Todo Service');

  constructor(
    @InjectRepository(ToDo) private readonly todoRepository: Repository<ToDo>,
    private readonly userService: UserService,
    private readonly tagService: TagsService,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    const tagList: Tag[] = await this.tagService.getTagsById(
      createTodoDto.tagID,
    );
    const user: User = await this.userService.findUserByEmail(
      createTodoDto.emailAddress,
    );

    const todo: ToDo = this.todoRepository.create(createTodoDto);
    todo.user = user;
    todo.tags = tagList;
    todo.content = createTodoDto.content;
    todo.title = createTodoDto.title;

    try {
      await this.todoRepository.save(todo);
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException('Invalid Data. Please try again.');
    }
  }
}
