import Joi from 'joi';

import { email, displayName, password } from '../common/schema/joi.schema';

export const signupSchema = Joi.object({
  email,
  displayName,
  password,
});

export const loginSchema = Joi.object({
  email,
  password,
});
