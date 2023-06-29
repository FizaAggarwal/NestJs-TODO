import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(email: string) {
    try {
      const user = await this.userModel.findOne({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
