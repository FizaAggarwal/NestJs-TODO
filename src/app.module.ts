import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks/tasks.model';
import { User } from './users/users.model';
import { SignUpModule } from './signUp/signUp.module';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_todo',
      models: [Task, User],
    }),
    SequelizeModule.forFeature([User]),
    TasksModule,
    SignUpModule,
    LoginModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
