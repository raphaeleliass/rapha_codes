import { z } from "@hono/zod-openapi";

export const postSchema = z
	.object({
		id: z.uuid(),
		authorImg: z
			.string("Field author_img must be a string")
			.nonempty("Field author_img cannot be empty"),
		author: z
			.string("Field author must be a string")
			.nonempty("Field author cannot be empty"),
		title: z
			.string("Field title must be a string")
			.nonempty("Field title cannot be empty"),
		content: z
			.string("Field content must be a string")
			.nonempty("Field content cannot be empty"),
		draft: z
			.boolean("Field draFt must be a boolean")
			.nonoptional("Field draFt cannot be null"),
	})
	.openapi("Post schema");

export const createPostSchema = postSchema
	.omit({ id: true })
	.strict()
	.openapi("Create post schema");

export const updatePostSchema = postSchema
	.partial()
	.extend({
		id: postSchema.shape.id,
	})
	.strict()
	.openapi("Update post schema");

export const deletePostSchema = postSchema
	.pick({ id: true })
	.openapi("Delete post schema");

export const getPostSchema = postSchema
	.pick({ id: true })
	.openapi("Get post schema");
