import { Controller, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../../user/services/auth.guard';

@UseGuards(JWTAuthGuard)
@Controller('todo')
export class TodoController {}
