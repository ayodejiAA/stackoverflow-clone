import { sign, verify } from 'jsonwebtoken';
import { IJWTPayload } from '../common/types';
import { JWT_SECRET } from '../config/environments';
import { User } from '../users/user.model';

type TokenType = 'accessToken';

const common = {
  accessToken: {
    privateKey: JWT_SECRET,
    signOptions: {
      expiresIn: '30d', // 15m
    },
  },
};

export const generateToken = (user: User, type: TokenType): string => {
  return sign(
    {
      id: user.id,
    },
    common[type].privateKey,
    {
      issuer: 'ayo-afo',
      subject: user.email,
      audience: 'http://ayodejiaa.now.sh',
      algorithm: 'HS256',
      expiresIn: common[type].signOptions.expiresIn, // 15m
    },
  );
};

export const verifyToken = async (
  token: string,
  type: TokenType,
): Promise<IJWTPayload> => {
  try {
    const decoded = verify(token, common[type].privateKey);
    return decoded as IJWTPayload;
  } catch (error) {
    throw new Error('Authentication token is invalid, please try again.');
  }
};
