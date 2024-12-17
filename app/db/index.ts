import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { createClient } from "@libsql/client";

config({ path: ".env" }); // or .env.local
const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_CONNECTION_URL is not set");
}
if (!authToken) {
  throw new Error("TURSO_AUTH_TOKEN is not set");
}

export const db = drizzle({
  connection: {
    url,
    authToken
  },
  schema
});
