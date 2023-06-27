import * as Joi from 'joi';

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string(),
  password: Joi.string().min(5).max(10).required(),
});
