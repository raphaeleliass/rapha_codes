import type z from "zod";
import type {
	createPostSchema,
	deletePostSchema,
	getPostSchema,
	postSchema,
	updatePostSchema,
} from "./post.schema";

export type PostType = z.infer<typeof postSchema>;
export type CreatePostType = z.infer<typeof createPostSchema>;
export type DeletePostType = z.infer<typeof deletePostSchema>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
export type GetPostType = z.infer<typeof getPostSchema>;
