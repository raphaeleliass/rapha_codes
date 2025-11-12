import { Hono } from "hono";

import { postController } from "./post.routes";

export const publicRoutes = new Hono();

publicRoutes.get("/post/:id", postController.getPublicPost);

publicRoutes.get("/all-posts", postController.getAllPosts);
