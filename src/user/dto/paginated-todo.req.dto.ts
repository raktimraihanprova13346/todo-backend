import { IsEmail, IsNotEmpty } from 'class-validator';

export class PaginatedTodoReqDto {
  @IsNotEmpty()
  pageNumber: number;
  @IsNotEmpty()
  itemsPerPage: number;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  tagID: number[] = [];

  status: 'Incomplete' | 'Complete' | null = null;
}
