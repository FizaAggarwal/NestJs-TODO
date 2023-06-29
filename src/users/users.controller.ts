import {
  Controller,
  Get,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/authConstants';
import { UsersService } from './users.service';

@Controller('me')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async me(@Headers('authorization') authorization) {
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      
      return await this.userService.findOne(payload.id);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
