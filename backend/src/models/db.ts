import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";
import { neon } from "@neondatabase/serverless";

console.log("Attempting to load DATABASE_URL:", process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
