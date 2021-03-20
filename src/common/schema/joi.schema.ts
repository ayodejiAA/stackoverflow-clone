import Joi from 'joi';

export const displayName = Joi.string().required().min(3).max(10).alphanum();

export const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
  .lowercase()
  .trim()
  .required()
  .min(3)
  .max(254)
  .required();

export const password = Joi.string()
  .min(8)
  .max(24)
  .required()
  .pattern(new RegExp('^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]+$'))
  .rule({
    message:
      'password should include digits, ' + 'lowercase and uppercase characters',
  });

export const title = Joi.string().required().min(3).max(200);

export const body = Joi.string().min(3).required();

export const commentText = Joi.string().required().min(3).max(5000);
