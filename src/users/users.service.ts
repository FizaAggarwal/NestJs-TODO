import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({
        where: {
          id: id,
        },
      });

      return {
        id: user.id,
        name: user.name,
        desciption: user.description,
        email: user.email,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
