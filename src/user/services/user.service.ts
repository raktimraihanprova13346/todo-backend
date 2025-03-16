import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../dto/signin-user.dto';
import { PaginatedTagReqDto } from '../dto/paginated-tag-req.dto';
import { Tag } from '../../tag/entity/tag.entity';
import { ToDo } from '../../todo/entity/todo.entity';
import { PaginatedTagResponseDto } from '../dto/paginated-tag-response.dto';
import { PaginatedTodoReqDto } from '../dto/paginated-todo.req.dto';
import { PaginatedTodoRespDto } from '../dto/paginated-todo-resp.dto';
import { UserEmailDto } from '../dto/user-email.dto';

@Injectable()
export class UserService {
  logger = new Logger('UserService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
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
      await this.userRepository.save(user);
      return Promise.resolve('User Created Successfully');
    } catch (error) {
      this.logger.error(error);
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

  async findUserByEmail(userEmail: UserEmailDto): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { emailAddress: userEmail.email },
    });
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }
    return user;
  }

  async findPaginatedTagsByUser(
    paginatedTagDto: PaginatedTagReqDto,
  ): Promise<PaginatedTagResponseDto> {
    const result: User | null = await this.userRepository.findOne({
      where: { emailAddress: paginatedTagDto.emailAddress },
      relations: ['tags'],
    });
    const skip: number =
      (paginatedTagDto.pageNumber - 1) * paginatedTagDto.itemsPerPage;
    const tags: Tag[] =
      result?.tags.slice(skip, skip + paginatedTagDto.itemsPerPage) || [];
    const hasNextPage: boolean =
      (result?.tags?.length || 0) > skip + paginatedTagDto.itemsPerPage;
    const totalPages: number = Math.ceil(
      (result?.tags?.length || 0) / paginatedTagDto.itemsPerPage || 0,
    );

    const paginatedTagResponseDto: PaginatedTagResponseDto = {
      tags: tags,
      hasNextPage: hasNextPage,
      page: paginatedTagDto.pageNumber,
      totalPages: totalPages,
    };
    return paginatedTagResponseDto;
  }

  async findTagsOfUser(userEmail: UserEmailDto): Promise<Tag[]> {
    const user: User | null = await this.userRepository.findOne({
      where: { emailAddress: userEmail.email },
      relations: ['tags'],
    });
    return user?.tags || [];
  }

  async findTodoByUser(userEmail: UserEmailDto): Promise<ToDo[]> {
    const user: User | null = await this.userRepository.findOne({
      where: { emailAddress: userEmail.email },
      relations: ['todos'],
    });
    return user?.todos || [];
  }

  async findPaginatedTodoByUser(
    paginatedTodoReq: PaginatedTodoReqDto,
  ): Promise<PaginatedTodoRespDto> {
    const user: User | null = await this.userRepository.findOne({
      where: { emailAddress: paginatedTodoReq.emailAddress },
      relations: ['todos', 'todos.tags'],
    });

    if (!user) {
      throw new NotFoundException('Data not found.');
    }

    let filteredTodo: ToDo[] = user.todos || [];

    if (paginatedTodoReq.status) {
      filteredTodo = filteredTodo.filter(
        (todo) => todo.status === paginatedTodoReq.status,
      );
    }

    if (paginatedTodoReq.tagID) {
      filteredTodo = filteredTodo.filter((todo: ToDo) =>
        todo.tags.some((tag: Tag) => paginatedTodoReq.tagID.includes(tag.id)),
      );
    }

    this.logger.log(filteredTodo);

    const skip: number =
      (paginatedTodoReq.pageNumber - 1) * paginatedTodoReq.itemsPerPage;
    const todos: ToDo[] =
      filteredTodo.slice(skip, skip + paginatedTodoReq.itemsPerPage) || [];
    const hasNextPage: boolean =
      (filteredTodo?.length || 0) > skip + paginatedTodoReq.itemsPerPage;
    const totalPages: number = Math.ceil(
      (filteredTodo?.length || 0) / paginatedTodoReq.itemsPerPage || 0,
    );

    const paginatedTodoResp: PaginatedTodoRespDto = {
      todos: todos,
      hasNextPage: hasNextPage,
      totalPage: totalPages,
      page: paginatedTodoReq.pageNumber,
      total: Number(todos.length),
    };

    return paginatedTodoResp;
  }

  async getTagsOfUserById(userEmail: UserEmailDto, ids: number[]) {
    const user: User | null = await this.findUserByEmail({
      email: userEmail.email.toLowerCase(),
    });

    if (!user) {
      throw new NotFoundException('User does not exist. Please sign up first.');
    }

    const tags: Tag[] = await this.findTagsOfUser(userEmail);
    const tagList: Tag[] = [];
    for (const id of ids) {
      const tag: Tag | undefined = tags.find((tag) => tag.id === id);
      if (tag) {
        tagList.push(tag);
      }
    }
    return tagList;
  }

  async getPaginatedTags(paginatedTagReqDto: PaginatedTagReqDto) {
    const user: User | null = await this.findUserByEmail({
      email: paginatedTagReqDto.emailAddress.toLowerCase(),
    });

    if (!user) {
      throw new NotFoundException('User does not exist. Please sign up first.');
    }

    const { tags, hasNextPage, totalPages } =
      await this.findPaginatedTagsByUser(paginatedTagReqDto);

    if (totalPages < paginatedTagReqDto.pageNumber) {
      throw new NotFoundException('Page does not exist.');
    }

    const response: PaginatedTagResponseDto = {
      tags: tags,
      hasNextPage: hasNextPage,
      page: paginatedTagReqDto.pageNumber,
      totalPages: totalPages,
    };

    return response;
  }
}
