import type { MiddlewareHandler } from "hono";
import type { HonoVariables } from "@/types/HonoVariables";

export const authMiddleware: MiddlewareHandler<HonoVariables> = async (
	c,
	next,
) => {
	const user = c.get("user");
	const session = c.get("session");

	if (!user && !session) return c.json({ error: "Unauthorized" }, 401);

	await next();
};
