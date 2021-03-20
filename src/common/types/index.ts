import { Request } from 'express';

export interface IJWTPayload {
  id: string;
  issuer: string;
  subject: string;
  audience: string;
  algorithm: string;
  expiresIn: string;
}

export interface AuthRequest extends Request {
  user: IJWTPayload;
}
