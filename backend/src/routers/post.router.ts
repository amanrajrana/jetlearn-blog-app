import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller";
import { checkAuth } from "../middlewares/checkAuth";

const postRouter = Router();

postRouter.get("/", getPosts).get("/:id", getPost);

postRouter
  .use(checkAuth)
  .post("/", createPost)
  .put("/:id", updatePost)
  .delete("/:id", deletePost);

export default postRouter;
