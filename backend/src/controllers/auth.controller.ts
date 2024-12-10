import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { userSchema } from "../schema/user.schema";
import createHttpError from "http-errors";
import { generateToken } from "../utils/jwt";
import { errorResponseHandler } from "../utils";
import bcrypt from "bcrypt";

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

    // Step 3 - Hash Password and save
    const hashPassword = await bcrypt.hash(user.password, 10);
    const userId = await UserModel.create(user.username, hashPassword);

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
      next(createHttpError(401, "Account Not found"));
      return;
    }

    // Step 3 - compare hashedPassword
    const isMatched = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isMatched) {
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
