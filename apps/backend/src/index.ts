import { Elysia } from "elysia";
import { env } from "./core/config/env";
import { app as router } from "./routes/index";
import cors from "@elysiajs/cors";
import { folderController } from "./modules/folder/controller/folder.controller";


export const server = new Elysia()
    .use(cors())
    .use(folderController)
    .get("/health", () => ({ status: "ok" }));

server.use(router).get("/", () => ({ message: "Welcome to the API" }));

server.listen(env.port, ({ hostname, port }) => {
  console.log(`Application is running at http://${hostname}:${port}`);
});

server.onError((error) => {
  console.error(error);
});