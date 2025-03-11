import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Length(255)
  @IsNotEmpty()
  tagName: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;
}
