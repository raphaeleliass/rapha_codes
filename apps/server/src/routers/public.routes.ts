import { OpenAPIHono } from "@hono/zod-openapi";
import type { HonoVariables } from "@/types/HonoVariables";
import {
	getAllPublicPostRoute,
	getPublicPostRoute,
} from "./config/post.routes.config";
import { postController } from "./post.routes";

export const publicRoutes = new OpenAPIHono<HonoVariables>();

publicRoutes.openapi(getPublicPostRoute, postController.getPublicPost);

publicRoutes.openapi(getAllPublicPostRoute, postController.getAllPublicPosts);
