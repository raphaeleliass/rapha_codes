import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { rateLimiter } from "hono-rate-limiter";
import { auth } from "./lib/auth";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { appRouter } from "./routers";
import type { HonoVariables } from "./types/HonoVariables";

const app = new Hono<HonoVariables>();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowMethods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
		allowHeaders: ["Content-Type", "Authorization", "X-Internal-API-Key"],
		credentials: true,
	}),
);

app.use(
	"/*",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 100,
		standardHeaders: "draft-6",
		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.use(
	"/api/auth/sign-in/email",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 5,
		standardHeaders: "draft-6",
		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.use("/api/auth/sign-up/email", authMiddleware);

app.use(
	"/api/auth/*",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 20,
		standardHeaders: "draft-6",
		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		c.set("userId", null);
		return next();
	}

	c.set("user", session.user);
	c.set("session", session.session);
	c.set("userId", session.user.id);
	return next();
});

app.use("/posts/*", authMiddleware);

app.use(
	"/public/*",
	rateLimiter({
		windowMs: 1 * 60 * 1000,
		limit: 60,
		standardHeaders: "draft-6",
		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.use(
	"/posts/*",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 60,
		standardHeaders: "draft-6",

		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.route("/posts", appRouter.postRoutes);
app.route("/public", appRouter.publicRoutes);

app.onError(errorMiddleware);

export default app;
