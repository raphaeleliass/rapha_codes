import { type NextRequest, NextResponse } from "next/server";
import { apiKey } from "./constants";

export function proxy(req: NextRequest) {
	const expectedApiKey = req.headers.get("x-api-key");
	const pathname = req.nextUrl.pathname;
	const allowedPathnames = ["/api/auth", "/api/cookie"];

	if (allowedPathnames.some((path) => pathname.startsWith(path))) {
		return NextResponse.next();
	}

	if (!expectedApiKey) {
		return NextResponse.json(null, { status: 401 });
	}

	if (expectedApiKey !== apiKey) {
		return NextResponse.json(null, { status: 401 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/:path"],
};
