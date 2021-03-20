import express from 'express';

import { CommonRoutesConfig, validate } from '../common/';
import { AuthController } from './auth.controller';
import { loginSchema, signupSchema } from './auth.validation.schema';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(readonly app: express.Application) {
    super('auth', app);
  }

  routes(): void {
    this.router.post(
      '/auth/signup',
      validate(signupSchema),
      AuthController.signup,
    );

    this.router.post(
      '/auth/login',
      validate(loginSchema),
      AuthController.login,
    );
  }
}
