import sequelize from '../config/database/models';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  displayName: string;
  email: string;
  password: string;
}

// User Attributes in `User.build` and `User.create` calls
export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public displayName!: string;
  public email!: string;
  public password!: string;

  // timestamps;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
    sequelize, // passing the `sequelize` instance is required
  },
);
