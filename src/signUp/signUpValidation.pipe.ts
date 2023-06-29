import { PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSchema } from './schema/UserSchema';

export class UserValidatorPipe implements PipeTransform<CreateUserDto> {
  public transform(value: CreateUserDto): CreateUserDto {
    const result = UserSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    
    return value;
  }
}
