import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { folderController } from "@modules/folder/controller/folder.controller";

export const app = new Elysia()
  .use(cors())
  .use(folderController)
  .get("/health", () => ({ status: "ok" }));
