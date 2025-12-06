// src/core/db/prisma.ts
import "dotenv/config"; // <-- ensure .env is loaded when using Node/tsx
import { PrismaClient } from "../../../prisma/generated/client"; // adjust path if needed
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.trim() === "") {
  throw new Error(
    "DATABASE_URL is not set or empty. Please check your .env file."
  );
}

const adapter = new PrismaPg({
  connectionString,
});

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});
