import express, { Router } from "express";
import {
  addNote,
  deleteNote,
  getNoteDetails,
  getUserNotes,
  getCurrentUser,
} from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const userRouter: Router = express.Router();

userRouter.post("/add-notes", authenticateJWT, addNote);

userRouter.get("/get-notes", authenticateJWT, getUserNotes);

userRouter.get("/get-note/:noteId", authenticateJWT, getNoteDetails);

userRouter.delete("/delete-note/:noteId", authenticateJWT, deleteNote);

userRouter.get("/get-user", authenticateJWT, getCurrentUser);

export default userRouter;
