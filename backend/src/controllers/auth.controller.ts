import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { userSchema } from "../schema/user.schema";
import createHttpError from "http-errors";
import { generateToken } from "../utils/jwt";
import { errorResponseHandler } from "../utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Step 1: Validate the request body
    const user = userSchema.parse(req.body);

    // Step 2 - Check if the user already exists
    const isAlreadyUser = await UserModel.findByUsername(user.username);

    if (isAlreadyUser) {
      next(createHttpError(400, "User already exists"));
      return;
    }

    // Step 3 - Create the user
    const userId = await UserModel.create(user.username, user.password);

    // Step 4 - generate session token
    const token = generateToken({ id: userId });

    res.status(201).json({ token });
  } catch (error) {
    return errorResponseHandler(error, next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Step 1: Validate the request body
    const user = userSchema.parse(req.body);

    // Step 2 - Check if the user exists
    const existingUser = await UserModel.findByUsername(user.username);

    if (!existingUser) {
      next(createHttpError(401, "Invalid credentials"));
      return;
    }

    // Step 3 - Check if the password is correct
    if (user.password !== existingUser.password) {
      next(createHttpError(401, "Invalid credentials"));
      return;
    }

    // Step 4 - generate session token
    const token = generateToken({ id: existingUser.id });

    res.status(200).json({ token });
  } catch (error) {
    return errorResponseHandler(error, next);
  }
};
