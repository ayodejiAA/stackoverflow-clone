import express from 'express';
import { AuthMiddleware } from '../auth/auth.middleware';

import { CommonRoutesConfig } from '../common';
import { RatingsController } from './ratings.controller';

export class RatingsRoutes extends CommonRoutesConfig {
  constructor(readonly app: express.Application) {
    super('ratings', app);
  }

  routes(): void {
    this.router.post(
      '/questions/:questionId/upvote',
      AuthMiddleware.validateJWT,
      RatingsController.rateQuestion,
    );
    this.router.post(
      '/questions/:questionId/downvote',
      AuthMiddleware.validateJWT,
      RatingsController.rateQuestion,
    );

    this.router.post(
      '/questions/:questionId/answers/:answerId/upvote',
      AuthMiddleware.validateJWT,
      RatingsController.rateAnswer,
    );
    this.router.post(
      '/questions/:questionId/answers/:answerId/downvote',
      AuthMiddleware.validateJWT,
      RatingsController.rateAnswer,
    );
  }
}
