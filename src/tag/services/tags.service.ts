import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class TagsService {
  logger = new Logger('TagsService');
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly userService: UserService,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const user: User | null = await this.userService.findUserByEmail(
      createTagDto.emailAddress.toLowerCase(),
    );

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
      return await this.tagRepository.save(tag);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Invalid Data. Please try again.');
    }
  }

}
