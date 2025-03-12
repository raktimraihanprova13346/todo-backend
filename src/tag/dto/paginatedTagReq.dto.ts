import { IsEmail, IsNotEmpty } from 'class-validator';

export class PaginatedTagReqDto {
  @IsNotEmpty()
  pageNumber: number;

  @IsNotEmpty()
  itemsPerPage: number;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;
}
