import { GoogleGenAI } from "@google/genai";
import { HTTPException } from "hono/http-exception";
import type { AiConversationRepository } from "./ai.repository";
import type { TypeDeleteConversation, TypeGetConversation } from "./ai.types";

export class AiConversationService {
	aiConversationRepository: AiConversationRepository;

	constructor(aiConversationRepository: AiConversationRepository) {
		this.aiConversationRepository = aiConversationRepository;
	}

	getConversation = async ({ id, userId }: TypeGetConversation) => {
		const conversation = this.aiConversationRepository.getConversation({
			id,
			userId,
		});

		return conversation;
	};

	getAllConversations = async ({ userId }: { userId: string }) => {
		if (!userId) throw new HTTPException(400, { message: "Missing userId" });

		if (!userId) throw new HTTPException(400, { message: "Missing userId" });

		const conversation = this.aiConversationRepository.getAllConversations({
			userId,
		});

		return conversation;
	};

	createConversation = async ({
		prompt,
		userId,
		instruction,
	}: {
		prompt: string;
		userId: string;
		instruction: string;
	}) => {
		const apiKey = process.env.GEMINI_API_KEY;

		if (!apiKey) {
			throw new HTTPException(500, { message: "Missing Gemini api key" });
		}

		const genai = new GoogleGenAI({ apiKey });
		const aiResponse = await genai.models.generateContent({
			model: "gemini-2.5-flash-lite",
			contents: prompt,
			config: {
				systemInstruction: instruction,
				thinkingConfig: {
					thinkingBudget: 0,
				},
			},
		});

		if (!aiResponse.text) {
			throw new HTTPException(500, {
				message: "Error while obtain Gemini response",
			});
		}

		const conversation = this.aiConversationRepository.createConversation({
			prompt,
			response: aiResponse.text,
			instruction,
			userId,
		});

		return conversation;
	};

	deleteConversation = async ({ id, userId }: TypeDeleteConversation) => {
		if (!id)
			throw new HTTPException(400, { message: "Missing id conversation" });

		if (!userId) throw new HTTPException(400, { message: "Missing userId" });

		const conversation = this.aiConversationRepository.deleteConversation({
			id,
			userId,
		});

		return conversation;
	};
}
