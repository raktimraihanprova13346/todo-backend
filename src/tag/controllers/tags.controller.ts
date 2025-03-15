import { Body, Controller, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { CreateTagDto } from '../dto/createTag.dto';
import { JWTAuthGuard } from '../../user/services/auth.guard';
import { JwtPayload } from '../../user/services/jwt.strategy';

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
}
