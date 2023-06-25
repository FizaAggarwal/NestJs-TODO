import { Sequelize } from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.model';

const taskProvider = new Sequelize({
  database: 'nest_todo',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  models: [Task],
});

export default taskProvider;
