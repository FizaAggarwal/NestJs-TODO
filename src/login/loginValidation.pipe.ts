import { PipeTransform, BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginSchema } from './schema/loginSchema';

export class LoginValidatorPipe implements PipeTransform<LoginUserDto> {
  public transform(value: LoginUserDto): LoginUserDto {
    const result = LoginSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
