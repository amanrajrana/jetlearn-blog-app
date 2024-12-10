import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { errorResponseHandler } from "../utils";
import createHttpError from "http-errors";
import { AuthRequest } from "../types/type";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.findAll();

    res.status(200).json(users);
  } catch (error) {
    errorResponseHandler(error, next);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      next(createHttpError(400, "Invalid ID"));
    }
    const user = await UserModel.findById(id);

    if (!user) {
      next(createHttpError(404, "User not found"));
      return;
    }

    res.json({
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
    });
  } catch (error) {
    errorResponseHandler(error, next);
  }
};

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = (req as AuthRequest).user.id;
    if (isNaN(id)) {
      next(createHttpError(400, "Invalid ID"));
    }
    const user = await UserModel.findById(id);

    if (!user) {
      next(createHttpError(404, "User not found"));
      return;
    }

    res.json({
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
    });

    res.json(user);
  } catch (error) {
    errorResponseHandler(error, next);
  }
};
