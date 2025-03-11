import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { CreateTagDto } from '../dto/create-tag.dto';

@Controller('tag')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post('add')
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.createTag(createTagDto);
  }
}
