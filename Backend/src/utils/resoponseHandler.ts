import { Response,NextFunction } from "express";

export const sendSuccessResponse = <T>(res: Response, data: T, statusCode: number = 200) => {
    res.status(statusCode).json({
      success: true,
      data
    });
  };
  

 export  const sendErrorResponse = (res: Response, message: string, statusCode: number = 500) => {
    res.status(statusCode).json({
      success: false,
      error: {
        message
      }
    });
  };

