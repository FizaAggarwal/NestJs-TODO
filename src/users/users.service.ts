import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }
}
