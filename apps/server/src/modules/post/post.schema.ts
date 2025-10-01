import z from "zod";

export const postSchema = z.object({
	id: z
		.string("Field id must be a string")
		.nonempty("Field id cannot be empty"),
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
});

export const createPostSchema = postSchema.omit({ id: true }).strict();
export const updatePostSchema = postSchema
	.partial()
	.extend({
		id: postSchema.shape.id,
	})
	.strict();
export const deletePostSchema = postSchema.pick({ id: true });
export const getPostSchema = postSchema.pick({ id: true });
