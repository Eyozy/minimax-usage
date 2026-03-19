import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import { handleRemainsRequest } from "./lib/remains.js";

type RemainsRequest = {
  apiKey?: string;
};

export function createApp() {
  const app = Fastify({ logger: false });
  app.register(fastifyCors, { origin: true });

  app.get("/health", async () => {
    return { ok: true };
  });

  app.post<{ Body: RemainsRequest }>("/api/remains", async (request, reply) => {
    const apiKey = request.body?.apiKey ?? "";
    const response = await handleRemainsRequest(apiKey);
    return reply.status(response.statusCode).send(response.body);
  });

  return app;
}
