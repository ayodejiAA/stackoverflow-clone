import { NextFunction, Response } from 'express';
import { AuthRequest } from '../common/types';
import { errorResponse, successResponse } from '../helpers';
import { QuestionsService } from '../questions/questions.service';

export class RatingsController {
  static async rateQuestion(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { questionId },
      } = req;
      const userId = req.user.id;

      const downvote = req.url.includes('downvote');

      // Check if the question exists and send out 404 error if not
      const question = await QuestionsService.findById(questionId);
      if (!question) return errorResponse(res, 404, 'Question not found');

      // Check if the auth user has already placed a vote
      const userVoted = await question.getRatings({ where: { userId } });

      if (!userVoted.length) {
        if (downvote)
          return errorResponse(res, 409, 'You have not upvoted this question');

        const result = await question.createRating({
          userId,
        });

        return successResponse(res, 201, 'Question upvote successful', result);
      } else {
        await userVoted[0].destroy();
        return successResponse(res, 200, 'Question downvote succesful', {
          destroy: 1,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async rateAnswer(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { questionId, answerId },
      } = req;
      const userId = req.user.id;

      const downvote = req.url.includes('downvote');

      // Check if the question exists and send out 404 error if not
      const question = await QuestionsService.findById(questionId);
      if (!question) return errorResponse(res, 404, 'Question not found');

      const answer = await question.getAnswers({ where: { id: answerId } });

      //  Check if the auth user has already placed a vote
      if (!answer.length) return errorResponse(res, 404, 'Answer not found');

      const userVoted = await answer[0].getRatings({ where: { userId } });

      if (!userVoted.length) {
        if (downvote)
          return errorResponse(res, 409, 'You have not upvoted this answer');

        const result = await answer[0].createRating({
          userId,
        });

        return successResponse(res, 201, 'Answer upvote successful', result);
      } else {
        await userVoted[0].destroy();
        return successResponse(res, 200, 'Question downvote succesful', {
          destroy: 1,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
