import express, { Router } from "express";
import { googleAuth, refreshToken } from "../controllers/authController";

const authRouter: Router = express.Router();

authRouter.post("/verify-token", googleAuth);

authRouter.post("/refresh-token", refreshToken);

export default authRouter;
