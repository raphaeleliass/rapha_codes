import "dotenv/config";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { licenseText } from "data";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { rateLimiter } from "hono-rate-limiter";
import { auth } from "./lib/auth";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { appRouter } from "./routers/router";
import type { HonoVariables } from "./types/HonoVariables";

const app = new OpenAPIHono<HonoVariables>();

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

app.use("/api/auth/sign-up/email", authMiddleware);

app.use(
	"/api/auth/*",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 100,
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
app.use("/ai/*", authMiddleware);

app.use(
	"/public/*",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 1000,
		standardHeaders: "draft-6",
		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.use(
	"/posts/*",
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		limit: 500,
		standardHeaders: "draft-6",

		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	}),
);

app.get("/license", (c) => {
	return c.text(licenseText);
});

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		title: "API Rapha Codes - Documentação Oficial",
		version: "1.0.0",
		contact: {
			name: "Suporte Rapha Codes",
			email: "raphaeleliass@outloook.com",
			url: "https://raphaelelias.vercel.app/",
		},
		license: {
			name: "MIT",
			url: "/license",
		},
	},
	tags: [
		{
			name: "Posts",
			description: "Endpoints for managing posts protected by authentication.",
		},
		{
			name: "Public Posts",
			description: "Endpoints to show public posts.",
		},
		{
			name: "AI",
			description: "Endpoints to show AI conversations.",
		},
	],
});

app.get(
	"/docs",
	Scalar({
		pageTitle: "API Rapha Codes",
		url: "/doc",
		theme: "deepSpace",
		showToolbar: "never",
		hideClientButton: true,
	}),
);

app.route("/posts", appRouter.postRoutes);
app.route("/public", appRouter.publicRoutes);
app.route("/ai", appRouter.aiConversationRoutes);

app.onError(errorMiddleware);

export default app;
