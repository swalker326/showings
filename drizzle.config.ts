import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_CONNECTION_URL is not set");
}
if (!authToken) {
  throw new Error("TURSO_AUTH_TOKEN is not set");
}

export default defineConfig({
  out: "./app/drizzle",
  schema: "./app/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url,
    authToken
  }
});
