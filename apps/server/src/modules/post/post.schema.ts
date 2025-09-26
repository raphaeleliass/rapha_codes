import z from "zod";

export const postSchema = z.object({
	id: z
		.string("Field id must be a string")
		.nonempty("field id cannot be empty"),
	author: z
		.string("Field author must be a string")
		.nonempty("field author cannot be empty"),
	title: z
		.string("Field title must be a string")
		.nonempty("field title cannot be empty"),
	content: z
		.string("Field content must be a string")
		.nonempty("field content cannot be empty"),
	draft: z
		.boolean("Field draft must be a boolean")
		.nonoptional("field draft cannot be null"),
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
