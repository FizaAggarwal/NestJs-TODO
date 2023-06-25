import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Task extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ defaultValue: false })
  isCompleted: boolean;
}
