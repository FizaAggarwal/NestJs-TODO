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

  async findAll() {
    return this.taskModel.findAll();
  }

  async create(createTaskDto: CreateTaskDto, id) {
    const newTask = await Task.create({
      title: createTaskDto.title,
      isCompleted: createTaskDto.isCompleted,
      userId: id,
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

  async remove(id: string): Promise<void> {
    const task = await this.taskModel.findOne({
      where: {
        id: id,
      },
    });
    await task.destroy();
  }
}
