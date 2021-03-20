import { Application } from 'express';

import { CommonRoutesConfig, validate } from '../common/';
import { AuthMiddleware } from '../auth/auth.middleware';
import { QuestionsController } from './questions.controller';
import { askQuestionSchema } from './question.validation.schema';

export class QuestionsRoutes extends CommonRoutesConfig {
  constructor(readonly app: Application) {
    super('questions', app);
  }

  routes(): void {
    this.router.post(
      '/questions/',
      validate(askQuestionSchema),
      AuthMiddleware.validateJWT,
      QuestionsController.create,
    );

    this.router.get(
      '/questions/:questionId',
      QuestionsController.retrieveQuestion,
    );

    this.router.get(
      '/questions/:questionId/view',
      QuestionsController.viewQuestion,
    );
  }
}
