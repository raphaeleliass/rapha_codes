import type z from "zod";
import type {
	createPostSchema,
	deletePostSchema,
	getPostSchema,
	postSchema,
	updatePostSchema,
} from "./post.schema";

export type TypePost = z.infer<typeof postSchema>;
export type TypeCreatePost = z.infer<typeof createPostSchema>;
export type TypeDeletePost = z.infer<typeof deletePostSchema>;
export type TypeUpdatePost = z.infer<typeof updatePostSchema>;
export type TypeGetPost = z.infer<typeof getPostSchema>;
