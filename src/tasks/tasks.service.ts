import { Injectable } from '@nestjs/common';
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
  private readonly tasks: Task[] = [];

  async findAll() {
    return this.taskModel.findAll();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await Task.create({
      title: createTaskDto.title,
      isCompleted: createTaskDto.isCompleted,
    });

    return newTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findOne({
      where: {
        id: id,
      },
    });

    const updatedTask = Object.assign(task, updateTaskDto);
    return updatedTask.save();
  }

  findOne(id: string): Promise<Task> {
    return this.taskModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await task.destroy();
  }
}
