import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
