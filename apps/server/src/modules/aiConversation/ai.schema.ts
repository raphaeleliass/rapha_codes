import { z } from "@hono/zod-openapi";

export const conversationSchema = z
	.object({
		id: z.uuid().nonoptional(),
		instruction: z.string().nonempty(),
		prompt: z.string().nonempty(),
		response: z.string().nonempty(),
		userId: z.string().nonempty(),
	})
	.openapi("AI conversation schema");

export const createConversationSchema = conversationSchema
	.omit({
		id: true,
	})
	.strict()
	.openapi("Create Ai conversation schema");

export const deleteConversationSchema = conversationSchema
	.pick({
		id: true,
		userId: true,
	})
	.openapi("Delete Ai conversation schema");

export const getConversationSchema = conversationSchema
	.pick({ id: true, userId: true })
	.openapi("Get conversation schema");
