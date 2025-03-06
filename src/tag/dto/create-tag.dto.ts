import { OmitType } from '@nestjs/mapped-types';
import { Tag } from '../entity/tag.entity';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from '../../user/entity/user.entity';
import { ToDo } from '../../todo/entity/todo.entity';

export class CreateTagDto extends OmitType(
  Tag,
  ['id', 'creationDate', 'updteDate'] as const,
){
  @IsString()
  @Length(255)
  @IsNotEmpty()
  tagName: string;

}
