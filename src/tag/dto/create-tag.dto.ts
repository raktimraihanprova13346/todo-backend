import { OmitType } from '@nestjs/mapped-types';
import { Tag } from '../entity/tag.entity';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from '../../user/entity/user.entity';
import { ToDo } from '../../todo/entity/todo.entity';

export class CreateTagDto {
  @IsString()
  @Length(255)
  @IsNotEmpty()
  tagName: string;
  
  @IsNotEmpty()
  @IsEmail()
  userEmailAddress: string;

  @IsNotEmpty()
  userId: string;

}
