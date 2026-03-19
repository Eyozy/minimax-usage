import type { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { handleRemainsRequest } from "../../src/lib/remains.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json; charset=utf-8",
};

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let apiKey = "";
  try {
    const body = JSON.parse(event.body ?? "{}");
    apiKey = body.apiKey ?? "";
  } catch {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const result = await handleRemainsRequest(apiKey);
  return {
    statusCode: result.statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(result.body),
  };
};

export { handler };
