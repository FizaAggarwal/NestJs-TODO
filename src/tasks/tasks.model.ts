import {
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({ timestamps: false })
export class Task extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ defaultValue: false })
  isCompleted: boolean;

  // Define association with User model
  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;
}
