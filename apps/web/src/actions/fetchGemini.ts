import { apiKey } from "@/constants";

interface FetchProps {
	instruction: string;
	content: string;
}

export async function fetchGeminiResponse({
	content,
	instruction,
}: FetchProps) {
	const response = await fetch("/api/ai/generate-content", {
		method: "POST",
		body: JSON.stringify({
			apiKey,
			instruction,
			prompt: content,
		}),
	});

	const data = await response.json();

	return data;
}
