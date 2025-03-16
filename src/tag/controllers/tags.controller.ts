import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { CreateTagDto } from '../dto/createTag.dto';
import { JWTAuthGuard } from '../../user/services/auth.guard';
import { JwtPayload } from '../../user/services/jwt.strategy';
import { DeleteTagDto } from '../dto/deleteTag.dto';
import { UpdateTagDto } from '../dto/updateTag';

@UseGuards(JWTAuthGuard)
@Controller('tag')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post('add')
  async createTag(
    @Request() request: { user?: JwtPayload },
    @Body() createTagDto: CreateTagDto,
  ) {
    const email: string | undefined = request.user?.email;
    if (!email || email !== createTagDto.emailAddress) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.tagService.createTag(createTagDto);
  }

  @Post('delete')
  async deleteTag(
    @Request() request: { user?: JwtPayload },
    @Body() deleteTagDto: DeleteTagDto,
  ) {
    const email: string | undefined = request.user?.email;
    console.log(email);
    console.log(deleteTagDto);
    if (!email || email !== deleteTagDto.email) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.tagService.deleteTag(deleteTagDto.id);
  }

  @Post('update')
  async updateTag(
    @Request() request: { user?: JwtPayload },
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const email: string | undefined = request.user?.email;
    if (!email || email !== updateTagDto.email) {
      throw new UnauthorizedException('User Unauthorized.');
    }
    return await this.tagService.updateTag(updateTagDto);
  }
}
