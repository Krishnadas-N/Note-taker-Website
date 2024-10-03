import { sendSuccessResponse,sendErrorResponse } from './../utils/resoponseHandler';
import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { AuthResponseData, GoogleCredentials } from "../dtos/auth.model";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwtTokenGenerator";
import { query } from "../config/database"; 
import { IUser } from "../models/userSchema";

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: GoogleCredentials = req.body;
    const token = userData.stsTokenManager.accessToken;
    const ticket = await admin.auth().verifyIdToken(token);
    const { uid, email } = ticket;

    let user: IUser | null;

    const result = await query('SELECT * FROM users WHERE google_id = $1', [uid]);
    if (result.rows.length > 0) {
      user = result.rows[0];
    } else {
      const insertResult = await query(
        `INSERT INTO users (google_id, email, username, profileImage, created_at)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [uid, email, userData.displayName, userData.photoURL, new Date()]
      );
      user = insertResult.rows[0];

    }
    if(user && user.id){

      const authToken = generateAccessToken(user.id.toString());
      const refreshToken = generateRefreshToken(user.id.toString());
  
      // Save the refresh token in the database
      await query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
        refreshToken,
        user.id,
      ]);
  
      return sendSuccessResponse<AuthResponseData>(
        res,
        { token: authToken, refreshToken },
        201
      );
    }else{
      throw new Error('Unable to Fetch User details,Try again after sometimes')
    }
  
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendErrorResponse(res, 'Refresh token required', 401);
    }

    // Check if user exists with the provided refresh token
    const result = await query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken]);
    if (result.rows.length === 0) {
      return sendErrorResponse(res, 'Invalid refresh token', 401);
    }

    const userDetail = result.rows[0];
    const payload = verifyToken(refreshToken);

    if (!payload) {
      return sendErrorResponse(res, 'Invalid refresh token', 401);
    }

    // Generate a new access token
    const accessToken = generateAccessToken(userDetail.id.toString());

    return sendSuccessResponse<Omit<AuthResponseData, 'token'>>(
      res,
      { refreshToken: accessToken },
      201
    );
  } catch (err) {
    console.error('Error in refreshToken:', err);
    next(err);
  }
};
