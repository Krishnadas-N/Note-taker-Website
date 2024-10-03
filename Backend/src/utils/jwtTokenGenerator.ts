import jwt from 'jsonwebtoken';
import { JWT_REFRESH_TOKEN, JWT_SECRET_KEY } from '../config/secrets';



export const verifyToken = (token:string) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};


export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '1h' })
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_TOKEN, { expiresIn: '7d' });
};
