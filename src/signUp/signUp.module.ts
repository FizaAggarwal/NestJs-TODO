import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { SignUpController } from './signUp.controller';
import { SignUpService } from './signUp.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
