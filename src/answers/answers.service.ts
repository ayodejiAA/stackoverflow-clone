import { Answer, AnswerCreationAttributes } from './answer.model';

export class AnswersService {
  static async create(data: AnswerCreationAttributes): Promise<Answer> {
    const question = await Answer.create(data);
    return question;
  }

  static async findById(id: string): Promise<Answer> {
    const answer = await Answer.findOne({ where: { id } });
    return answer;
  }
}
