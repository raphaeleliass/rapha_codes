import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const post = pgTable("post", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	author: text().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	draft: boolean().default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),
});
