import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/type";
import createHttpError from "http-errors";
import { verifyToken } from "../utils/jwt";
import { errorResponseHandler } from "../utils";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(createHttpError(401, "Unauthorized"));
    }

    // Verify token
    const { id } = verifyToken(authorization.split(" ")[1]);

    // Attach user id to the request object
    (req as AuthRequest).user = { id };
    next();
  } catch (error) {
    errorResponseHandler(error, next);
  }
};
