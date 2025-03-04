import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TodoModule, UserModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
