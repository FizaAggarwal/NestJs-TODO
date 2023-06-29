import { PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskSchema } from './schema/taskSchema';

export class TaskValidatorPipe implements PipeTransform<CreateTaskDto> {
  public transform(value: CreateTaskDto): CreateTaskDto {
    const result = TaskSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    
    return value;
  }
}
