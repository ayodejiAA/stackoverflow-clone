/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

interface IValidationErrors {
  [key: string]: string;
}

export const validate = (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> => {
  const options = {
    abortEarly: false,
  };

  const { error, value } = schema.validate(req.body, options);

  if (!error) {
    req.body = value;
    next();
    return;
  }

  const validationErrors: IValidationErrors = {};

  error.details.forEach((errorDetails) => {
    const errorClone = { ...errorDetails };
    const {
      context: { key },
    } = errorClone;
    if (key in validationErrors) return;
    validationErrors[key] = errorClone.message.replace(/"/g, '');
  });

  res.status(422).json({
    message: 'User input error',
    status: 'error',
    data: { fields: validationErrors },
  });
};
