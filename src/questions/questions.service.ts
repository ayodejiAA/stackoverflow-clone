import { QuestionCreationAttributes, Question } from './question.model';

export class QuestionsService {
  static async create(data: QuestionCreationAttributes): Promise<Question> {
    const question = await Question.create(data);
    return question;
  }

  static async findById(id: string): Promise<Question> {
    const question = await Question.findOne({ where: { id } });
    return question;
  }

  static async getOneWithAssociatedElements(id: string): Promise<Question> {
    const question = await Question.findOne({
      where: { id },
      include: [
        {
          association: Question.associations.author,
          attributes: ['id', 'displayName', 'email', 'createdAt'],
        },
        {
          association: Question.associations.answers,
        },
      ],
    });
    return question;
  }
}
