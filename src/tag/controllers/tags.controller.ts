import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { CreateTagDto } from '../dto/createTag.dto';
import { PaginatedTagReqDto } from '../dto/paginatedTagReq.dto';

@Controller('tag')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post('add')
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.createTag(createTagDto);
  }

  @Post('tag-list')
  async getTags(@Body() paginatedTagDto: PaginatedTagReqDto) {
    return await this.tagService.getPaginatedTags(paginatedTagDto);
  }
}
