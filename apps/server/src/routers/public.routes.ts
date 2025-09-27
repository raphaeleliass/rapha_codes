import { Hono } from "hono";
import { postController, postRoutes } from "./post.routes";

export const publicRoutes = new Hono();

postRoutes.get("/post/:id", postController.getPost);

postRoutes.get("/all", postController.getAllPosts);
