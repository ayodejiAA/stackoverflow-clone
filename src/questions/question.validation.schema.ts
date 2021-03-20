import Joi from 'joi';

import { title, body } from '../common';

export const askQuestionSchema = Joi.object({
  title,
  body,
});
