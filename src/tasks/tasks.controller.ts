import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // @Post()
  // create(): string {
  //   return 'This action adds a new task';
  // }

  // @Post()
  // async create(@Body() createTaskDto: CreateTaskDto) {
  //   this.tasksService.create();
  //   return 'This action adds a new task';
  // }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} task`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    return `This action updates a #${id} task`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} task`;
  }
}
