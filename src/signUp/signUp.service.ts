import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User with this email already exists', {
        cause: new Error(),
        description: 'Bad request',
      });
    }
    const newUser = await User.create({
      name: createUserDto.name,
      description: createUserDto.description,
      hashedPassword: await hash(createUserDto.password, 10),
      email: createUserDto.email,
    });

    return newUser;
  }
}
