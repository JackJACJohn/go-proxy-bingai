import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { bingapiChat, bingapiImage, bingapiModel, bingapiModels } from "./cloudflare/src/bingapi.js";

interface CustomOptions {
  BYPASS_SERVER?: string;
  APIKEY?: string;
  Go_Proxy_BingAI_BLANK_API_KEY?: string;
  KievRPSSecAuth?: string;
  _RwBf?: string;
  MUID?: string;
  _U?: string;
  cookie?: string;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomString(length = 32): string {
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678_-+";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(getRandomInt(0, chars.length));
  }
  return result;
}

function buildCustomOptions(request: Request): CustomOptions {
  const env = (name: string) => Deno.env.get(name) ?? "";

  const CUSTOM_OPTIONS: CustomOptions = {
    BYPASS_SERVER: env("BYPASS_SERVER") || "https://bypass.zklcdc.xyz",
    APIKEY: env("APIKEY") || "",
    Go_Proxy_BingAI_BLANK_API_KEY: env("Go_Proxy_BingAI_BLANK_API_KEY") || "",
    KievRPSSecAuth: env("USER_KievRPSSecAuth") || "",
    _RwBf: env("USER_RwBf") || "",
    MUID: env("USER_MUID") || "",
    _U: env("Go_Proxy_BingAI_USER_TOKEN") || env("Go_Proxy_BingAI_USER_TOKEN_1") || "",
  };

  let cookies = request.headers.get("Cookie") ?? "";
  if (!cookies.includes("KievRPSSecAuth=")) {
    if (CUSTOM_OPTIONS.KievRPSSecAuth) {
      cookies += `; KievRPSSecAuth=${CUSTOM_OPTIONS.KievRPSSecAuth}`;
    } else {
      cookies += `; KievRPSSecAuth=${randomString(512)}`;
    }
  }
  if (!cookies.includes("_RwBf=") && CUSTOM_OPTIONS._RwBf) {
    cookies += `; _RwBf=${CUSTOM_OPTIONS._RwBf}`;
  }
  if (!cookies.includes("MUID=") && CUSTOM_OPTIONS.MUID) {
    cookies += `; MUID=${CUSTOM_OPTIONS.MUID}`;
  }
  if (!cookies.includes("_U=") && CUSTOM_OPTIONS._U) {
    const tokens = CUSTOM_OPTIONS._U.split(",").map((token) => token.trim()).filter(Boolean);
    if (tokens.length > 0) {
      cookies += `; _U=${tokens[getRandomInt(0, tokens.length)]}`;
    }
  }

  CUSTOM_OPTIONS.cookie = cookies;

  if (!CUSTOM_OPTIONS.Go_Proxy_BingAI_BLANK_API_KEY && !CUSTOM_OPTIONS.APIKEY) {
    CUSTOM_OPTIONS.APIKEY = `sk-${crypto.randomUUID().replace(/-/g, "")}`;
  }

  return CUSTOM_OPTIONS;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
  };
}

function withCors(response: Response, headers: Record<string, string> = {}): Response {
  const cors = corsHeaders();
  Object.entries({ ...cors, ...headers }).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers ?? {});
  headers.set("Content-Type", "application/json; charset=utf-8");
  return withCors(new Response(JSON.stringify(body), { ...init, headers }));
}

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const CUSTOM_OPTIONS = buildCustomOptions(request);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (url.pathname.startsWith("/v1/models/") || url.pathname.startsWith("/api/v1/models/")) {
    const res = await bingapiModel(request, CUSTOM_OPTIONS);
    return withCors(res);
  }
  if (url.pathname === "/v1/models" || url.pathname === "/api/v1/models") {
    const res = await bingapiModels(request, CUSTOM_OPTIONS);
    return withCors(res);
  }
  if (url.pathname === "/v1/chat/completions" || url.pathname === "/api/v1/chat/completions") {
    if (request.method !== "POST") {
      return jsonResponse({ code: 405, message: "Method Not Allowed", data: null }, { status: 405 });
    }
    const res = await bingapiChat(request, CUSTOM_OPTIONS);
    return withCors(res);
  }
  if (url.pathname.startsWith("/v1/images/generations") || url.pathname.startsWith("/api/v1/images/generations")) {
    if (request.method !== "POST") {
      return jsonResponse({ code: 405, message: "Method Not Allowed", data: null }, { status: 405 });
    }
    const res = await bingapiImage(request, { ...CUSTOM_OPTIONS, cookie: request.headers.get("Cookie") ?? CUSTOM_OPTIONS.cookie ?? "" });
    return withCors(res);
  }

  return jsonResponse({ code: 404, message: "API Not Found", data: null }, { status: 404 });
}

const port = Number(Deno.env.get("PORT") ?? "8080");

console.log(`Go Proxy BingAI (Deno) listening on http://localhost:${port}`);

serve(handler, { port });
