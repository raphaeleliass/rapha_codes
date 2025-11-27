import { aiConversationRoutes } from "./aiConversation.routes";
import { postRoutes } from "./post.routes";
import { publicRoutes } from "./public.routes";

export const appRouter = {
	postRoutes,
	publicRoutes,
	aiConversationRoutes,
};
export type AppRouter = typeof appRouter;
