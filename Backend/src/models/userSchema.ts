// src/models/userModel.ts
export interface IUser {
  id: number;
  profileImage?: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  googleId?: string;
  refreshToken?: string;
}
