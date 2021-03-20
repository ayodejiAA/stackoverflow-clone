import Joi from 'joi';

import { commentText } from '../common';

export const answerSchema = Joi.object({
  text: commentText,
});
