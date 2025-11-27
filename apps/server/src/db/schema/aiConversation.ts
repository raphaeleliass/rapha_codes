import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const aiConversation = pgTable("ai_conversation", {
	id: uuid().defaultRandom().primaryKey(),
	instruction: text().notNull(),
	prompt: text().notNull(),
	response: text().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});
