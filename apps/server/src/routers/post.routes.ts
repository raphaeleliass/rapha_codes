import { OpenAPIHono } from "@hono/zod-openapi";
import { db } from "@/db";
import { PostController } from "@/modules/post/post.controller";
import { PostRepository } from "@/modules/post/post.repository";
import { PostService } from "@/modules/post/post.service";
import type { HonoVariables } from "@/types/HonoVariables";
import {
	createPostRoute,
	deletePostRoute,
	getAllPostsRoute,
	getPostRoute,
	updatePostRoute,
} from "./config/post.routes.config";

export const postRoutes = new OpenAPIHono<HonoVariables>();

export const postRepository = new PostRepository(db);
export const postService = new PostService(postRepository);
export const postController = new PostController(postService);

postRoutes.openapi(getAllPostsRoute, postController.getAllPosts);

postRoutes.openapi(getPostRoute, postController.getPost);

postRoutes.openapi(createPostRoute, postController.createPost);

postRoutes.openapi(updatePostRoute, postController.updatePost);

postRoutes.openapi(deletePostRoute, postController.deletePost);
