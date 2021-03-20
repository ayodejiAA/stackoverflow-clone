import { User } from '../users/user.model';

export const getUserData = (user: User): Partial<User> => {
  const { id, email, displayName, createdAt } = user;

  return {
    id,
    email,
    displayName,
    createdAt,
  };
};
