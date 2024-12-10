import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";
import { postSchema } from "../schema/post.schema";
import { AuthRequest } from "../types/type";
import { errorResponseHandler } from "../utils";
import createHttpError from "http-errors";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _req = req as AuthRequest;
    const userId = _req.user.id;

    const post = postSchema.parse(req.body);

    const newPost = await Post.create(post.title, post.content, userId);

    res.status(201).json(newPost);
  } catch (error) {
    errorResponseHandler(error, next);
  }
};

// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    errorResponseHandler(error, next);
  }
};

// Get a post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      next(createHttpError(400, `Invalid ID: ${req.params.id}`));
      return;
    }

    const post = await Post.findById(id);
    if (!post) {
      next(createHttpError(404, `Post not found! id: ${id}`));
      return;
    }

    res.status(200).send(post).end();
  } catch (error) {
    errorResponseHandler(error, next);
  }
};

// Update a post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Step - 1: Get Id and verify it number or not
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(createHttpError(400, `Invalid ID: ${req.params.id}`));
    }

    // Step - 2: Sensitize the request body
    const newPost = postSchema.partial().parse(req.body);

    // Step - 3: Check any field is present in post object or not
    if (Object.keys(newPost).length === 0) {
      return next(createHttpError(400, `Empty request body!`));
    }

    // Step - 4: Get old post
    const post = await Post.findById(id);

    if (!post) {
      return next(createHttpError(404, `Post not found! id: ${id}`));
    }

    // Step - 5: Check if the user is authorized to update the post
    if (post.user?.id !== (req as AuthRequest).user.id) {
      return next(
        createHttpError(403, `You are not authorized to update this post!`)
      );
    }

    // Step - 6 check which filed we have to update
    const title = newPost.title ?? post.title;
    const content = newPost.content ?? post.content;

    await post.update(title, content);

    res.status(200).json(post);
  } catch (error) {
    errorResponseHandler(error, next);
  }
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(createHttpError(400, `Invalid ID: ${req.params.id}`));
    }

    const post = await Post.findById(id);

    if (!post) {
      return next(createHttpError(404, `Post not found! id: ${id}`));
    }

    if (post.user?.id !== (req as AuthRequest).user.id) {
      return next(
        createHttpError(403, `You are not authorized to delete this post!`)
      );
    }

    await Post.delete(id);
    res.status(204).end();
  } catch (error) {
    errorResponseHandler(error, next);
  }
};
