import { and, eq } from "drizzle-orm";
import type { DrizzleDB } from "@/db";
import { aiConversation } from "@/db/schema/aiConversation";
import type {
	TypeCreateConversation,
	TypeDeleteConversation,
	TypeGetConversation,
} from "./ai.types";

const conversationBody = {
	id: aiConversation.id,
	instruction: aiConversation.instruction,
	prompt: aiConversation.prompt,
	response: aiConversation.response,
	createdAt: aiConversation.createdAt,
	userId: aiConversation.userId,
};

export class AiConversationRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;
	}

	getConversation = async ({ id, userId }: TypeGetConversation) => {
		const [conversation] = await this.db
			.select()
			.from(aiConversation)
			.where(and(eq(aiConversation.id, id), eq(aiConversation.userId, userId)));

		return conversation;
	};

	getAllConversations = async ({ userId }: { userId: string }) => {
		const conversations = await this.db
			.select()
			.from(aiConversation)
			.where(eq(aiConversation.userId, userId));

		return conversations;
	};

	createConversation = async ({
		instruction,
		prompt,
		response,
		userId,
	}: TypeCreateConversation) => {
		const [createdConversation] = await this.db
			.insert(aiConversation)
			.values({
				prompt,
				instruction,
				response,
				userId,
			})
			.returning(conversationBody);

		return createdConversation;
	};

	deleteConversation = async ({ id, userId }: TypeDeleteConversation) => {
		const [deletedConversation] = await this.db
			.delete(aiConversation)
			.where(and(eq(aiConversation.id, id), eq(aiConversation.userId, userId)))
			.returning(conversationBody);

		return deletedConversation;
	};
}
