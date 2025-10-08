import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();

	const cookie = cookieStore.get("better-auth.session_token");

	if (!cookie) return new NextResponse(null, { status: 404 });

	return new NextResponse(null, { status: 204 });
}
