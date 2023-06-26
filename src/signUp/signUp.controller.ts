import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from './signUp.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('signUp')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.signUpService.create(createUserDto);
  }
}
