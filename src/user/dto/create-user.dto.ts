import { User } from '../entity/user.entity';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(User, [
  'id',
  'creationDate',
  'updateDate',
] as const) {
  @IsString()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @Length(1, 100)
  userName: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d|.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and ' +
      'include at least two of the following: letters, numbers, or symbols',
  })
  password: string;
}
