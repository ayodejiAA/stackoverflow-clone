import { Application } from 'express';
import { AnswersRoutes } from './answers/answers.routes';
import { AuthRoutes } from './auth/auth.routes';
import { QuestionsRoutes } from './questions/questions.routes';
import { RatingsRoutes } from './ratings/ratings.routes';

const routes = [AuthRoutes, QuestionsRoutes, AnswersRoutes, RatingsRoutes];

export const appRoutes = (app: Application): void => {
  routes.forEach((route) => {
    new route(app);
  });
};
