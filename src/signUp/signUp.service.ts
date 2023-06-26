import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await User.create({
      name: createUserDto.name,
      description: createUserDto.description,
    });

    return newUser;
  }
}
