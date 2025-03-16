import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { ToDo } from './entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo]), UserModule, TagModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
