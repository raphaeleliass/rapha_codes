import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export const errorMiddleware = (error: Error, c: Context) => {
	if (error instanceof HTTPException) {
		return c.json({ error: error.message }, error.status);
	}

	if (error instanceof ZodError) {
		return c.json({ error: error.message });
	}

	console.error("Server Error:", error);
	return c.json({ error: "Erro interno do servidor." }, 500);
};
