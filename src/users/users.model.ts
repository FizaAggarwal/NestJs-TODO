import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.model';

@Table({ timestamps: false })
export class User extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  hashedPassword: string;

  @Column
  description: string;

  // Define association with Task model
  @HasMany(() => Task, { foreignKey: 'userId' })
  tasks: Task[];
}
