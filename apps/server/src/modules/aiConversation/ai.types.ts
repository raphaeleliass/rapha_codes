import type { z } from "@hono/zod-openapi";
import type {
	conversationSchema,
	createConversationSchema,
	deleteConversationSchema,
	getConversationSchema,
} from "./ai.schema";

export type TypeConversation = z.infer<typeof conversationSchema>;

export type TypeCreateConversation = z.infer<typeof createConversationSchema>;

export type TypeDeleteConversation = z.infer<typeof deleteConversationSchema>;

export type TypeGetConversation = z.infer<typeof getConversationSchema>;
