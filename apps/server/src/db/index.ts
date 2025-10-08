import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL)
	throw new Error("Missing DATABASE_URL variable!");

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

export type DrizzleDB = typeof db;
