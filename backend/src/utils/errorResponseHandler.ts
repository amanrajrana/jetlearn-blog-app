import createHttpError from "http-errors";
import { NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

// Centralized error handler
export const errorResponseHandler = (error: unknown, next: NextFunction) => {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errorMessage = `Invalid data: ${error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ")}`;

    return next(createHttpError(400, { ...error, message: errorMessage }));
  }

  // Handle mysql2 errors
  if (error instanceof Error && "code" in error) {
    if (error["code"] === "ER_DUP_ENTRY") {
      return next(createHttpError(400, "Duplicate entry"));
    }
  }

  // Handle JSON parsing errors
  if (error instanceof SyntaxError && "body" in error) {
    return next(createHttpError(400, "Invalid JSON format"));
  }

  // Handle JWT errors
  if (error instanceof JsonWebTokenError) {
    return next(createHttpError(401, `Unauthorized: ${error.message}`));
  }

  // Handle other known errors
  if (error instanceof createHttpError.HttpError) {
    return next(createHttpError(error.status, error.message));
  }

  // Handle general unexpected errors
  if (error instanceof Error) {
    return next(createHttpError(500, `Unexpected Error: ${error.message}`));
  }

  // Fallback for unknown error types
  return next(createHttpError(500, "An unexpected error occurred"));
};
