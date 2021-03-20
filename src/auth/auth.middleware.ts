import { NextFunction, Response } from 'express';
import { AuthRequest } from '../common/types';
import { errorResponse } from '../helpers';
import { verifyToken } from '../utils';

export class AuthMiddleware {
  static async validateJWT(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    let token: string = req.headers.authorization;

    if (!token) {
      return errorResponse(res, 401, 'Access Denied. No Token Provided');
    }

    try {
      if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
      const decoded = await verifyToken(token, 'accessToken');
      req.user = decoded;
      next();
    } catch (err) {
      errorResponse(res, 401, 'Invalid Token');
    }
  }
}
