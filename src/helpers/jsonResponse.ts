import { Response } from 'express';

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
): Response =>
  res.status(statusCode).json({ message, status: 'error', data: null });

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: Record<string, any>,
): Response =>
  res.status(statusCode).json({ message, status: 'success', data });
