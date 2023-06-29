import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/authConstants';
import { LoginValidatorPipe } from './loginValidation.pipe';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  @UsePipes(LoginValidatorPipe)
  @Post()
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.loginService.findOne(loginUserDto.email);

    if (!(await compare(loginUserDto.password, user.hashedPassword))) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
