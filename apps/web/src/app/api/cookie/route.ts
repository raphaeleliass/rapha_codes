import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookie = (await cookies()).get("better-auth.session_token");

	if (!cookie) return NextResponse.json(null, { status: 404 });

	return NextResponse.json({ cookie: cookie.value });
}
