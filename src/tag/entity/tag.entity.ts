import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { ToDo } from '../../todo/entity/todo.entity';

@Entity()
export class Tag {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ length: 255 })
  tagName: string;
  
  @CreateDateColumn()
  creationDate: Date;
  
  @UpdateDateColumn()
  updteDate: Date;
  
  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @ManyToMany(() => ToDo, (todo) => todo.tags)
  todos: ToDo[]
  
}
