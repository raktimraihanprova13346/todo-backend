import {
  Column,
  CreateDateColumn,
  Entity, ManyToMany, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { User } from '../../user/entity/user.entity';
import { Length } from 'class-validator';

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ length: 255 })
  title: string;
  
  @Column({ type: 'text', nullable: true })
  content: string;
  
  @Column({ 
    type: 'enum',
    enum: ['Incomplete', 'Complete'],
    default: 'Incomplete'
  })
  status: 'Incomplete' | 'Complete';
  
  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  deadline: Date;

  @Column({ default: null })
  completedDate: Date;

  @Column({ default: false })
  overDue: boolean;

  @ManyToMany(() => Tag, (tag) => tag.todos)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
