import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
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
    } catch (error) {
      throw new NotFoundException();
    }
    try {
      const newUser = await User.create({
        name: createUserDto.name,
        description: createUserDto.description,
        hashedPassword: await hash(createUserDto.password, 10),
        email: createUserDto.email,
      });

      return {
        id: newUser.id,
        name: newUser.name,
        description: newUser.description,
        email: newUser.email,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem creating user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
