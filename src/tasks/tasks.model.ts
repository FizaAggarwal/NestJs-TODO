import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column
  id: number;

  @Column
  title: string;

  @Column({ defaultValue: false })
  isCompleted: boolean;
}
