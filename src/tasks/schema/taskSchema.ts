import * as Joi from 'joi';

export const TaskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  isCompleted: Joi.boolean(),
});
