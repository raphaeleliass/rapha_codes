import { type NextRequest, NextResponse } from "next/server";
import { apiKey as appApiKey } from "@/constants";
import { geminiGenerateContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
	const { apiKey, prompt, instruction } = await req.json();

	if (apiKey !== appApiKey) return new NextResponse(null, { status: 401 });

	if (!apiKey)
		return NextResponse.json({ message: "Missing apiKey" }, { status: 400 });
	if (!instruction)
		if (!prompt)
			return NextResponse.json({ message: "Missing prompt" }, { status: 400 });
	if (!instruction)
		return NextResponse.json(
			{ message: "Missing instruction" },
			{ status: 400 },
		);

	const { text } = await geminiGenerateContent({
		model: "gemini-2.0-flash-lite",
		contents: prompt,
		instruction,
	});

	if (!text)
		return NextResponse.json("Failed to obtain text from AI", { status: 404 });

	return NextResponse.json({ text });
}
