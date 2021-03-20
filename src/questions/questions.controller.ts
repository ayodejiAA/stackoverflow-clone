import { NextFunction, Response } from 'express';
import { AuthRequest } from '../common/types';
import { errorResponse, successResponse } from '../helpers';

import { QuestionsService } from './questions.service';

export class QuestionsController {
  static async create(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;
      body.authorId = req.user.id;
      const newQuestion = await QuestionsService.create(body);
      return successResponse(
        res,
        201,
        'Question successfully created',
        newQuestion,
      );
    } catch (error) {
      next(error);
    }
  }

  static async retrieveQuestion(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { questionId },
      } = req;
      const question = await QuestionsService.findById(questionId);
      if (!question) return errorResponse(res, 404, 'Question not found');

      return successResponse(res, 200, 'Question retieved', question);
    } catch (error) {
      next(error);
    }
  }

  static async viewQuestion(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { questionId },
      } = req;

      const questionWithAssociatedElements = await QuestionsService.getOneWithAssociatedElements(
        questionId,
      );

      if (!questionWithAssociatedElements)
        return errorResponse(res, 404, 'Question not found');

      return successResponse(
        res,
        200,
        'Complete question with comments retrieved',
        questionWithAssociatedElements,
      );
    } catch (error) {
      next(error);
    }
  }
}
