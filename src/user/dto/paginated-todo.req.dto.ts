import { IsEmail, IsNotEmpty } from 'class-validator';

export class PaginatedTodoReqDto {
  @IsNotEmpty()
  pageNumber: number;
  @IsNotEmpty()
  itemsPerPage: number;

  @IsEmail()
  emailAddress: string;

  tagID: number[] = [];

  status: 'Incomplete' | 'Complete' | null = null;
}
