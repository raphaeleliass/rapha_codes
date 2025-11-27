import { createRoute } from "@hono/zod-openapi";
import {
	conversationSchema,
	createConversationSchema,
	deleteConversationSchema,
	getConversationSchema,
} from "@/modules/aiConversation/ai.schema";

export const createConversationRoute = createRoute({
	method: "post",
	path: "/create",
	tags: ["AI"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: createConversationSchema.omit({
						response: true,
						userId: true,
					}),
				},
			},
			description: "AI conversation body",
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: conversationSchema.omit({ userId: true }),
				},
			},
			description: "Retrieve ai conversation",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
	},
});

export const deleteConversationRoute = createRoute({
	method: "delete",
	path: "/delete",
	tags: ["AI"],
	request: {
		query: deleteConversationSchema.omit({ userId: true }),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: conversationSchema.omit({ userId: true }),
				},
			},
			description: "Delete ai conversation",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
		404: {
			description: "Conversation not found",
		},
	},
});

export const getConversationRoute = createRoute({
	method: "get",
	path: "/conversation",
	tags: ["AI"],
	request: {
		query: getConversationSchema.omit({ userId: true }),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: conversationSchema.omit({ userId: true }),
				},
			},
			description: "Delete ai conversation",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
		404: {
			description: "Conversation not found",
		},
	},
});

export const getAllConversationRoute = createRoute({
	method: "get",
	path: "/conversations",
	tags: ["AI"],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: conversationSchema.omit({ userId: true }),
				},
			},
			description: "Delete ai conversation",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
		404: {
			description: "Conversation not found",
		},
	},
});
