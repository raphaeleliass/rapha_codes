import { postRoutes } from "./post.routes";
import { publicRoutes } from "./public.routes";

export const appRouter = {
	postRoutes,
	publicRoutes,
};
export type AppRouter = typeof appRouter;
