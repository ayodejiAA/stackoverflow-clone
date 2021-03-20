import { Application } from 'express';

import { CommonRoutesConfig, validate } from '../common/';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AnswersController } from './answers.controller';
import { answerSchema } from './answer.validation.schema';
import { QuestionsMiddleware } from '../questions/questions.middleware';

export class AnswersRoutes extends CommonRoutesConfig {
  constructor(readonly app: Application) {
    super('answers', app);
  }

  routes(): void {
    this.router.post(
      '/questions/:questionId/answers',
      validate(answerSchema),
      AuthMiddleware.validateJWT,
      QuestionsMiddleware.validQuestionId,
      AnswersController.create,
    );
  }
}
