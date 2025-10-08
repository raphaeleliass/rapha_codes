import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { db } from "@/db";
import { PostController } from "@/modules/post/post.controller";
import { PostRepository } from "@/modules/post/post.repository";
import {
	createPostSchema,
	deletePostSchema,
	updatePostSchema,
} from "@/modules/post/post.schema";
import { PostService } from "@/modules/post/post.service";

export const postRoutes = new Hono();

export const postRepository = new PostRepository(db);
export const postService = new PostService(postRepository);
export const postController = new PostController(postService);

postRoutes.post(
	"/post/create",
	zValidator("json", createPostSchema),
	postController.createPost,
);

postRoutes.patch(
	"/post/update",
	zValidator("json", updatePostSchema),
	postController.updatePost,
);

postRoutes.delete(
	"/post/delete/:id",
	zValidator("param", deletePostSchema),
	postController.deletePost,
);
