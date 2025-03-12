import { Tag } from '../entity/tag.entity';

export class PaginatedTagResponseDto {
  tags: Tag[] = [];
  hasNextPage: boolean = false;
  page: number = 0;
  totalPages: number = 0;
}
