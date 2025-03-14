import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  status: 'Incomplete' | 'Complete';

  deadline: Date;

  completedDate: Date;

  emailAddress: string;

  overdue: boolean = false;

  tagID: number[] = [];
}
