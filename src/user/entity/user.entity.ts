import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, Length, Matches } from 'class-validator';

@Entity()
export class User {
  //unique identifier for user
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  //db handles creation date
  @CreateDateColumn()
  creationDate: Date;

  //db handles update date
  @UpdateDateColumn()
  updateDate: Date;

  //username length is between 3 and 100 character
  @Column({ length: 100 })
  @Length(3, 100)
  userName: string;

  //email address should have to be unique
  //email address validation handled by class validator
  @Column({ length: 255, unique: true })
  @IsEmail()
  @Length(3, 255)
  emailAddress: string;

  //(?=.*[A-Za-z]) = matches at least one english character
  //(?=.*\d|.*[@$!%*?&]) = one digit or ascii character
  //[A-Za-z\d@$!%*?&]` = rest of the characters are either eng, digit or ascii
  //{8,255} = password length is between 8 character or 255 character
  @Column({ length: 255 })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d|.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8, 255}$/, {
    message:
      'Password must have minimum 8 characters and include at least two of the following: letters, numbers, or symbols.',
  })
  password: string;
}
