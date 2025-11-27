import { OpenAPIHono } from "@hono/zod-openapi";
import { db } from "@/db";
import { AiConversationController } from "@/modules/aiConversation/ai.controller";
import { AiConversationRepository } from "@/modules/aiConversation/ai.repository";
import { AiConversationService } from "@/modules/aiConversation/ai.service";
import type { HonoVariables } from "@/types/HonoVariables";
import {
	createConversationRoute,
	deleteConversationRoute,
	getAllConversationRoute,
	getConversationRoute,
} from "./config/aiConversation.routes.config";

const aiConversationRepository = new AiConversationRepository(db);
const aiConversationService = new AiConversationService(
	aiConversationRepository,
);
const aiConversationController = new AiConversationController(
	aiConversationService,
);

export const aiConversationRoutes = new OpenAPIHono<HonoVariables>();

aiConversationRoutes.openapi(
	getAllConversationRoute,
	aiConversationController.getAllConversations,
);

aiConversationRoutes.openapi(
	getConversationRoute,
	aiConversationController.getConversation,
);

aiConversationRoutes.openapi(
	createConversationRoute,
	aiConversationController.createConversation,
);

aiConversationRoutes.openapi(
	deleteConversationRoute,
	aiConversationController.deleteConversation,
);
