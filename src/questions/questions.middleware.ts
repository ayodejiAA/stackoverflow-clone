import { NextFunction, Response } from 'express';
import { AuthRequest } from '../common/types';
import { errorResponse } from '../helpers';

import { QuestionsService } from './questions.service';

export class QuestionsMiddleware {
  static async validQuestionId(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { questionId },
      } = req;
      const found = await QuestionsService.findById(questionId);
      if (!found) return errorResponse(res, 404, 'Question not found');
      next();
    } catch (error) {
      next(error);
    }
  }
}
