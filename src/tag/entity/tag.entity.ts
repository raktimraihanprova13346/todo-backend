import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { ToDo } from '../../todo/entity/todo.entity';

@Entity()
@Unique(['tagName', 'user'])
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  tagName: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => ToDo, (todo) => todo.tags)
  todos: ToDo[];
}
