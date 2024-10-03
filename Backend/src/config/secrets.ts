import dotenv from 'dotenv';

dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const JWT_SECRET_KEY =  process.env.JWT_SECRET as string;

export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_SECRET as string;