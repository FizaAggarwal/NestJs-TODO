import { Injectable } from '@nestjs/common';
// import { Task } from './interfaces/task.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}
  private readonly tasks: Task[] = [];

  create(task: Task) {
    this.tasks.push(task);
  }

  //   findAll(): Task[] {
  //     return this.tasks;
  //   }
  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
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
