import type { Context } from "hono";
import type { HonoVariables } from "@/types/HonoVariables";
import type { AiConversationService } from "./ai.service";

type TypeHonoContext = Context<HonoVariables>;

export class AiConversationController {
	aiConversationService: AiConversationService;

	constructor(aiConversationService: AiConversationService) {
		this.aiConversationService = aiConversationService;
	}

	getConversation = async (c: TypeHonoContext) => {
		const userId = c.get("userId");
		const id = c.req.query("id");

		if (!userId) {
			return c.json({ error: "Missing userId" }, 401);
		}

		if (!id) {
			return c.json({ message: "Missing id query" }, 400);
		}

		const conversation = await this.aiConversationService.getConversation({
			id,
			userId,
		});

		return c.json(conversation, 200);
	};

	getAllConversations = async (c: TypeHonoContext) => {
		const userId = c.get("userId");

		if (!userId) return c.json({ error: "Missing userId" }, 401);

		const conversation = await this.aiConversationService.getAllConversations({
			userId,
		});

		if (!conversation)
			return c.json({ error: "Unable to get all conversations" }, 404);

		return c.json(conversation, 200);
	};

	createConversation = async (c: TypeHonoContext) => {
		const userId = c.get("userId");
		const { instruction, prompt } = await c.req.json();

		if (!userId) return c.json({ error: "Missing userId" }, 401);

		if (!instruction || !prompt)
			return c.json({ message: "Missing body elements" });

		const conversation = await this.aiConversationService.createConversation({
			instruction,
			prompt,
			userId,
		});

		if (!conversation)
			return c.json({ error: "Unable to create conversation" }, 500);

		return c.json(conversation, 200);
	};

	deleteConversation = async (c: TypeHonoContext) => {
		const userId = c.get("userId");
		const id = c.req.query("id");

		if (!userId) return c.json({ error: "Missing userId" }, 401);
		if (!id) return c.json({ message: "Missing id query" }, 400);

		const conversation = await this.aiConversationService.deleteConversation({
			id,
			userId,
		});

		if (!conversation) return c.json({ error: "conversation not found" }, 404);

		return c.json(conversation, 200);
	};
}
