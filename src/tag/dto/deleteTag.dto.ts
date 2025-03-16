import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteTagDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  id: number;
}
