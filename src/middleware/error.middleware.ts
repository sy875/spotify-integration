import mongoose from "mongoose";
import { ApiError } from "../utils/api-error";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      (error as any)?.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || "Something went wrong";

    error = new ApiError(
      statusCode,
      message,
      (error as any)?.errors || [],
      err.stack
    );
  }
  
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV == "production" ? {} : { stack: error.stack }),
  };

  const apiError = error as ApiError;

  return res.status(Number(apiError.statusCode) || 500).json(response);
};

export { errorHandler };
