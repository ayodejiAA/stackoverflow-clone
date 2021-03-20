import { NextFunction, Response } from 'express';
import { AuthRequest } from '../common/types';
import { successResponse } from '../helpers';
import { AnswersService } from './answers.service';

export class AnswersController {
  static async create(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body, params } = req;
      body.authorId = req.user.id;
      body.questionId = params.questionId;
      const newAnswer = await AnswersService.create(body);
      return successResponse(res, 201, 'Answer successully addeed', newAnswer);
    } catch (error) {
      next(error);
    }
  }
}
