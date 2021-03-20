import { NextFunction, Request, Response } from 'express';

import { UsersService } from '../users/users.service';
import { compareHash, generateToken, hashPassword } from '../utils';
import { getUserData } from '../helpers/getUserData';
import { errorResponse, successResponse } from '../helpers';

export class AuthController {
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { body } = req;

      /* Check if supplied email is already taken. Multiple users can
      share same displayName since user ids are different */
      if (await UsersService.findByEmail(body.email))
        return errorResponse(res, 409, 'Email address has already been taken');

      // Hash password before saving to database
      body.password = await hashPassword(body.password);
      const user = await UsersService.create(body);

      //Generate token for subsequent access to the appliication
      const jwtToken = generateToken(user, 'accessToken');
      const data = getUserData(user);

      // Set token on the response object
      res.set('Authorization', jwtToken);

      return successResponse(
        res,
        201,
        'User account successfully created',
        data,
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      let isPasswordValid;
      const { body } = req;

      const user = await UsersService.findByEmail(body.email);
      if (user) isPasswordValid = compareHash(body.password, user.password);
      if (!user || !isPasswordValid) {
        return errorResponse(res, 401, 'Email or password incorrect');
      }

      const jwtToken = generateToken(user, 'accessToken');
      res.set('Authorization', jwtToken);
      return successResponse(res, 200, 'User login successful', {
        ...getUserData(user),
      });
    } catch (error) {
      next(error);
    }
  }
}
