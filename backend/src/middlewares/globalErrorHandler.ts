import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import config from "../config/config";

type Payload = {
  status: number;
  message: string;
  stack?: string;
  error?: {
    name?: string;
    code?: string | number;
    [key: string]: any;
  };
};

/**
 * Global error handler middleware for Express applications.
 *
 * This middleware function captures any errors that occur during the request-response cycle
 * and sends a standardized JSON response to the client. It handles both custom `HttpError`
 * instances and generic `Error` instances.
 *
 * @param error - The error object that was thrown. This can be an instance of `HttpError`, `Error`, or any other type.
 * @param _req - The Express request object (unused in this middleware).
 * @param res - The Express response object used to send the error response.
 * @param _next - The next middleware function in the stack (unused in this middleware).
 *
 * The response payload includes:
 * - `status`: The HTTP status code (default is 500).
 * - `message`: A descriptive error message.
 * - `error`: An object containing error details (excluding the message property).
 * - `stack`: The stack trace (only included in development mode).
 */
export const globalErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Check if error is an instance of HttpError
  const isHttpError = error instanceof HttpError;
  const status = isHttpError ? error.status || 500 : 500;

  const message = isHttpError
    ? error.message
    : error instanceof Error
    ? error.message
    : "Internal Server Error";

  // Safely handle error properties
  const _error: Payload["error"] = isHttpError
    ? { ...error }
    : error instanceof Error
    ? { name: error.name }
    : undefined;

  // Remove message property if present
  if (_error) delete _error.message;

  const payload: Payload = {
    status,
    message,
    error: { ..._error },
    stack:
      config.get("nodeEnv") === "development"
        ? error instanceof Error
          ? error.stack
          : undefined
        : undefined,
  };

  res.status(status).json(payload);
};
