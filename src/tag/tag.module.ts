import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), UserModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagModule {}
