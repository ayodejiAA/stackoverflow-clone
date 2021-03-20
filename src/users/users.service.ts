import { User, UserCreationAttributes } from './user.model';

export class UsersService {
  static async create(data: UserCreationAttributes): Promise<User> {
    const newUser = await User.create(data);
    return newUser;
  }

  static async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }

  static async findByDisplayName(displayName: string): Promise<User> {
    const user = await User.findOne({
      where: { displayName },
      attributes: { exclude: ['password'] },
    });

    return user;
  }
}
