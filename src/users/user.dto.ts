import { UserAttributes } from './user.model';

export interface UserDto extends Readonly<Partial<UserAttributes>> {
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
