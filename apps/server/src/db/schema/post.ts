import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const post = pgTable("post", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	authorImg: text("author_img").notNull(),
	author: text().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	draft: boolean().default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	userId: text("user_id")
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
});
