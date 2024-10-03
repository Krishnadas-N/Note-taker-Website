import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { query } from "../config/database";
import { sendErrorResponse } from "../utils/resoponseHandler";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token
  console.log(req.headers["authorization"]);

  if (!token) {
    return sendErrorResponse(res, "Authentication token missing", 401);
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const userQuery = "SELECT * FROM users WHERE id = $1";
    const { rows } = await query(userQuery, [decoded.userId]);

    if (rows.length === 0) {
      return sendErrorResponse(res, "User not found or unauthorized", 401);
    }

    const user = rows[0];

    req.user = user.id;
    next();
  } catch (err: unknown) {
    if (err instanceof jwt.TokenExpiredError) {
      return sendErrorResponse(res, "Token expired", 401);
    } else if (err instanceof jwt.JsonWebTokenError) {
      return sendErrorResponse(res, "Invalid token", 401);
    } else {
      return sendErrorResponse(
        res,
        "Not authorized to access this resource",
        401
      );
    }
  }
};
