import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignUpService } from './signUp.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserValidatorPipe } from './signUpValidation.pipe';

@Controller('signUp')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @UsePipes(UserValidatorPipe)
  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.signUpService.create(createUserDto);
  }
}
