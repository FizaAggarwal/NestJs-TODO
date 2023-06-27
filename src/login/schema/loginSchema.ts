import * as Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(5).max(10).required(),
});
