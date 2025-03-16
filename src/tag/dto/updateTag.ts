import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  content: string;
}
