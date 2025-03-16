import { ToDo } from '../../todo/entity/todo.entity';

export class PaginatedTodoRespDto {
  todos: ToDo[];
  hasNextPage: boolean;
  totalPage: number;
  page: number;
  total: number;
}
