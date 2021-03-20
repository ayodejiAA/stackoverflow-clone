import {
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
} from 'sequelize';
import sequelize from '../config/database/models';
import { Rating } from '../ratings/rating.model';

export interface AnswerAttributes {
  id: string;
  text: string;
  authorId: number;
  questionId: number;
}

//Attributes in `Answer.build` and`Answer.create` calls
export type AnswerCreationAttributes = Optional<AnswerAttributes, 'id'>;

export class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> {
  id!: string;
  text!: string;
  authorId!: number;
  questionId!: number;

  public createRating!: HasManyCreateAssociationMixin<Rating>;
  public getRatings!: HasManyGetAssociationsMixin<Rating>;
  public removeRating!: HasManyRemoveAssociationMixin<Rating, number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Answer',
  },
);

Answer.hasMany(Rating, {
  foreignKey: 'contentId',
  as: 'ratings',
  scope: {
    contentType: 'answer',
  },
});
