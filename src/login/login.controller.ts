import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/authConstants';

@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async login(@Body('name') name: string, @Body('password') password: string) {
    const user = await this.loginService.findOne(name);

    if (!(await compare(password, user.hashedPassword))) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.userId, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
