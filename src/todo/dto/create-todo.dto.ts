import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @Length(255)
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  deadLine: Date;

  completedDate: Date;

  @IsNotEmpty()
  tagID: number[] = [];

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;
}
