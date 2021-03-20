import {
  Association,
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
} from 'sequelize';
import slugify from 'slugify';
import { Answer } from '../answers/answer.model';
import sequelize from '../config/database/models';
import { Rating } from '../ratings/rating.model';
import { User } from '../users/user.model';

export interface QuestionAttributes {
  id: string;
  title: string;
  body: string;
  slug: string;
  authorId: number;
}

//Attributes in `Question.build` and`Question.create` calls
export type QuestionCreationAttributes = Optional<QuestionAttributes, 'id'>;

export class Question extends Model<
  QuestionAttributes,
  QuestionCreationAttributes
  > {
  id!: string;
  title!: string;
  body!: string;
  slug!: string;
  authorId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getAuthor!: BelongsToGetAssociationMixin<User>;

  public createRating!: HasManyCreateAssociationMixin<Rating>;
  public getRatings!: HasManyGetAssociationsMixin<Rating>;
  public removeRating!: HasManyRemoveAssociationMixin<Rating, number>;

  public getAnswers!: HasManyGetAssociationsMixin<Answer>;

  public readonly author?: User;
  public readonly answers?: Answer[];

  public static associations: {
    author: Association<Question, User>;
    answers: Association<Question, Answer>;
    ratings: Association<Question, Rating>;
  };
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
    authorId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Question',
  },
);

Question.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author',
  onDelete: 'CASCADE',
});

Question.hasMany(Answer, {
  foreignKey: 'questionId',
  as: 'answers',
  onDelete: 'CASCADE',
});

Question.hasMany(Rating, {
  foreignKey: 'contentId',
  as: 'ratings',
  scope: {
    contentType: 'question',
  },
});

// Sequelize hook to generate slug before create
Question.beforeCreate((question) => {
  const { title } = question;
  question.slug = slugify(title, {
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
  });
});
