import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/createTag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/services/user.service';
import { UserEmailDto } from '../../user/dto/user-email.dto';
import { RespMessageDto } from '../../common/resp-message.dto';
import { UpdateTagDto } from '../dto/updateTag';

@Injectable()
export class TagsService {
  logger = new Logger('TagsService');
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly userService: UserService,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<RespMessageDto> {
    const emailDto: UserEmailDto = {
      email: createTagDto.emailAddress.toLowerCase(),
    };
    const user: User | null = await this.userService.findUserByEmail(emailDto);

    if (!user) {
      throw new NotFoundException('User does not exist. Please sign up first.');
    }

    const tagData: Tag | null = await this.tagRepository.findOne({
      where: { tagName: createTagDto.tagName, user: { id: user.id } },
    });

    this.logger.log(tagData?.tagName);

    if (tagData) {
      throw new ConflictException('Tag Exist. Please select another tag.');
    }

    try {
      const tag: Tag = this.tagRepository.create();
      tag.user = user;
      tag.tagName = createTagDto.tagName;
      await this.tagRepository.save(tag);
      return {
        message: 'Tag Added successfully.',
      };
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException('Invalid Data. Please try again.');
    }
  }

  async getTagsById(ids: number[]): Promise<Tag[]> {
    const tagList: Tag[] = [];
    for (const id of ids) {
      const tag: Tag | null = await this.tagRepository.findOne({
        where: { id: id },
        relations: ['user', 'todos'],
      });
      if (tag) {
        tagList.push(tag);
      }
    }
    return tagList;
  }

  async deleteTag(id: number) {
    try {
      await this.tagRepository.delete({ id: id });
      return 'Tag Deleted Successfully';
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException(
        'Delete operation is not succeeded. Please try again.',
      );
    }
  }

  async updateTag(updateTagDto: UpdateTagDto) {
    try {
      await this.tagRepository.update(
        { id: updateTagDto.id },
        { tagName: updateTagDto.content },
      );
      return 'Tag Updated Successfully';
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : String(e));
      throw new BadRequestException(
        'Update operation is not succeeded. Please try again.',
      );
    }
  }
}
