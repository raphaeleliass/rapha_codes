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

const postRepository = new PostRepository(db);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRoutes.post(
	"/post/create",
	zValidator("json", createPostSchema),
	postController.createPost,
);

postRoutes.post(
	"/post/update",
	zValidator("json", updatePostSchema),
	postController.updatePost,
);

postRoutes.delete(
	"/post/delete/:id",
	zValidator("param", deletePostSchema),
	postController.deletePost,
);

postRoutes.get("/post/:id", postController.getPost);

postRoutes.get("/all", postController.getAllPosts);
