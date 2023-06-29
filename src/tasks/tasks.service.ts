import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async findAll() {
    try {
      return this.taskModel.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async create(createTaskDto: CreateTaskDto, id: string) {
    try {
      const newTask = await Task.create({
        title: createTaskDto.title,
        isCompleted: createTaskDto.isCompleted,
        userId: id,
      });

      return newTask;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem creating new task.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.findOne({
        where: {
          id: id,
        },
      });

      const updatedTask = Object.assign(task, updateTaskDto);

      return updatedTask.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem updating the task.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const task = await this.taskModel.findOne({
        where: {
          id: id,
        },
      });
      await task.destroy();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem deleting the task.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
