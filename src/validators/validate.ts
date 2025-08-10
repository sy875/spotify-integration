import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import { ApiError } from "../utils/api-error";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: Array<{ [field: string]: string }> = [];
  errors.array().map((err: ValidationError) => {
    if (err.type == "field") {
      extractedErrors.push({ [err.path]: err.msg });
    }
  });

  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
