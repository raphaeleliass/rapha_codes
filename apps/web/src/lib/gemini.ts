import { GoogleGenAI } from "@google/genai";
import { geminiApiKey } from "@/constants";

type GeminiModels =
	| "gemini-2.0-flash-lite"
	| "gemini-2.0-flash"
	| "gemini-2.5-flash-lite"
	| "gemini-2.5-flash"
	| "gemini-2.5-pro";

interface GeminiProps {
	model: GeminiModels;
	contents: string;
	instruction: string;
}

export async function geminiGenerateContent({
	model,
	contents,
	instruction,
}: GeminiProps) {
	const genai = new GoogleGenAI({ apiKey: geminiApiKey });
	const response = await genai.models.generateContent({
		model,
		contents,
		config: {
			systemInstruction: instruction,
			maxOutputTokens: 1000,
			thinkingConfig: {
				thinkingBudget: 0,
			},
		},
	});

	return response;
}
