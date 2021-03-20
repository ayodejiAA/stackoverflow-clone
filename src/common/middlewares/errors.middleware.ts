import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { errorResponse } from '../../helpers';

export const serverErrorHandler = (
  _err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Response => errorResponse(res, 500, 'Internal server error');

export const notFoundErrorHandler = (_req: Request, res: Response): Response =>
  errorResponse(res, 404, 'Requested url not found on this server');
