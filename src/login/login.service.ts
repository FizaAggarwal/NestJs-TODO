import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(name: string) {
    const user = await this.userModel.findOne({
      where: {
        name: name,
      },
    });
    return user;
  }
}
