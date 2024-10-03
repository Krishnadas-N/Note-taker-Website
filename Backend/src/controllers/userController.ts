import { NextFunction, Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/resoponseHandler";
import CustomError from "../utils/customError";
import { query } from "../config/database";

// Get user profile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;
    const userProfileQuery =
      "SELECT id, profileImage, username, email, created_at, googleId FROM users WHERE id = $1";
    const { rows } = await query(userProfileQuery, [userId]);

    if (rows.length === 0) {
      throw new CustomError("User profile not found", 404);
    }

    return sendSuccessResponse(res, rows[0]);
  } catch (err) {
    next(err);
  }
};

export const addNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user;
    const { title, editorContent } = req.body;

    const insertNoteQuery =
      "INSERT INTO notes (title, content, user_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *";
    const { rows } = await query(insertNoteQuery, [
      title,
      editorContent,
      userId,
    ]);

    return sendSuccessResponse(res, "Note added successfully", 201);
  } catch (error) {
    next(error);
  }
};

// Get user's notes
export const getUserNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user;
    const getNotesQuery = "SELECT * FROM notes WHERE user_id = $1";
    const { rows } = await query(getNotesQuery, [userId]);

    return sendSuccessResponse(res, rows, 200);
  } catch (error) {
    next(error);
  }
};

// Get note details
export const getNoteDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user;

    const getNoteQuery = "SELECT * FROM notes WHERE id = $1 AND user_id = $2";
    const { rows } = await query(getNoteQuery, [noteId, userId]);

    if (rows.length === 0) {
      throw new CustomError("Note not found", 404);
    }

    return sendSuccessResponse(res, rows[0], 200);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const noteId = req.params.noteId;
    const deleteNoteQuery = "DELETE FROM notes WHERE id = $1 RETURNING *";
    const { rowCount } = await query(deleteNoteQuery, [noteId]);

    if (rowCount === 0) {
      throw new CustomError("Note not found or already deleted", 404);
    }

    return sendSuccessResponse(res, {}, 200);
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user;

    const getUserQuery =
      "SELECT id, profileImage, username, email, created_at, googleId FROM users WHERE id = $1";
    const { rows } = await query(getUserQuery, [userId]);

    if (rows.length === 0) {
      throw new CustomError("User not found", 404);
    }

    return sendSuccessResponse(res, rows[0], 200);
  } catch (error) {
    next(error);
  }
};
