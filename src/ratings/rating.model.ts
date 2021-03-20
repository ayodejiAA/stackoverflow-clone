import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database/models';

enum ContentType {
  QUESTION = 'question',
  ANSWER = 'answer',
}

export interface RatingAttributes {
  userId: number;
  contentId: number;
  contentType: ContentType;
}

export class Rating extends Model<RatingAttributes> {
  public userId!: number;
  contentId!: number;
  public contentType!: ContentType;

  // timestamps;
  public readonly createdAt!: Date;
}

Rating.init(
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    contentId: { type: DataTypes.INTEGER, primaryKey: true },
    contentType: {
      type: DataTypes.ENUM('question', 'answer'),
      primaryKey: true,
    },
  },
  {
    updatedAt: false,
    tableName: 'Ratings',
    sequelize, // passing the `sequelize` instance is required
  },
);
