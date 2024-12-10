import { Router } from "express";
import {
  getUsers,
  getUserById,
  currentUser,
} from "../controllers/user.controller";
import { checkAuth } from "../middlewares/checkAuth";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", checkAuth, currentUser);
userRouter.get("/:id", getUserById);

export default userRouter;
