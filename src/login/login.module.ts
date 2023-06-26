import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
