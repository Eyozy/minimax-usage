import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleRemainsRequest } from "../src/lib/remains.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = req.body?.apiKey ?? "";
  const response = await handleRemainsRequest(apiKey);
  return res.status(response.statusCode).json(response.body);
}
