import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskValidatorPipe } from './taskValidation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(AuthGuard)
  @UsePipes(TaskValidatorPipe)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
