// Load server-only environment variables (.env) into process.env before any
// server function runs. Mirrors the production bootstrap in server.cjs. Only
// runs on the server (Node) — never in the browser. Idempotent: existing
// process.env values take precedence and are never overwritten.
if (typeof process !== "undefined") {
  try {
    const { existsSync, readFileSync } = await import("node:fs");
    const { resolve, dirname } = await import("node:path");

    // Try multiple candidate paths — import.meta.url may not resolve to the
    // original source location when Nitro bundles the server entry.
    const candidates: string[] = [];
    try {
      const { fileURLToPath } = await import("node:url");
      candidates.push(resolve(dirname(fileURLToPath(import.meta.url)), "../.env"));
    } catch { /* import.meta.url unavailable in bundled context */ }
    candidates.push(resolve(process.cwd(), ".env"));

    for (const envPath of candidates) {
      if (!existsSync(envPath)) continue;
      const envContent = readFileSync(envPath, "utf8");
      envContent.split("\n").forEach((line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let val = match[2].trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1).trim();
          }
          if (!process.env[key]) process.env[key] = val;
        }
      });
      break;
    }
  } catch {
    // Non-blocking — env may already be provided by the host.
  }
}

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m: any) => {
        let entry = m?.default ?? m;
        while (entry && !entry.fetch && entry.default) {
          entry = entry.default;
        }
        return entry as ServerEntry;
      },
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function getCanonicalRedirect(request: Request): Response | null {
  try {
    const url = new URL(request.url);

    // Bypass API, server functions, static assets, and internal healthchecks
    if (
      url.pathname.startsWith("/_serverFn") ||
      url.pathname.startsWith("/api/") ||
      url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/_build/") ||
      url.pathname.startsWith("/fonts/") ||
      url.pathname.startsWith("/images/")
    ) {
      return null;
    }

    const rawHost = (
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      url.host ||
      ""
    ).toLowerCase().trim();

    // Isolate hostname without port
    const hostname = rawHost.split(":")[0];

    // Local / development / internal bypass - never redirect local dev or health checks
    if (
      !hostname ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.endsWith(".local")
    ) {
      return null;
    }

    const isWww =
      hostname === "www.ndsolotravel.com" ||
      hostname.startsWith("www.") ||
      hostname === "www.ndsolotravel.com.cdn.hstgr.net";
    const isApex = hostname === "ndsolotravel.com";

    // Detect if external connection is HTTPS
    // Check all standard proxy SSL headers
    const forwardedProtoHeader = (
      request.headers.get("x-forwarded-proto") ||
      request.headers.get("x-forwarded-protocol") ||
      request.headers.get("x-url-scheme") ||
      ""
    ).toLowerCase();

    // In case of multiple proxies (e.g. "https, http"), the first one is the client-facing protocol
    const clientProto = forwardedProtoHeader.split(",")[0].trim();
    const forwardedSsl = (request.headers.get("x-forwarded-ssl") || "").toLowerCase().trim();
    const frontEndHttps = (request.headers.get("front-end-https") || "").toLowerCase().trim();
    const forwardedPort = (request.headers.get("x-forwarded-port") || "").trim();
    const cfVisitor = request.headers.get("cf-visitor") || "";

    const isExplicitlyHttps =
      clientProto === "https" ||
      forwardedSsl === "on" ||
      frontEndHttps === "on" ||
      forwardedPort === "443" ||
      cfVisitor.includes('"scheme":"https"');

    const isExplicitlyHttp =
      !isExplicitlyHttps && clientProto === "http";

    if (isWww) {
      // Always redirect www to canonical apex with HTTPS in a single direct hop
      const targetUrl = `https://ndsolotravel.com${url.pathname}${url.search}`;
      return new Response(null, {
        status: 301,
        headers: {
          Location: targetUrl,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (isApex && isExplicitlyHttp) {
      // Force HTTPS on apex only when verified to originate from insecure HTTP
      const targetUrl = `https://ndsolotravel.com${url.pathname}${url.search}`;
      // Safety guard: NEVER redirect the canonical URL back to itself
      if (request.url !== targetUrl && url.href !== targetUrl) {
        return new Response(null, {
          status: 301,
          headers: {
            Location: targetUrl,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }
  } catch {
    // Non-blocking fallback
  }

  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // 1. Canonical domain & HTTPS redirection
    const redirectResponse = getCanonicalRedirect(request);
    if (redirectResponse) {
      return redirectResponse;
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error: any) {
      // Gracefully handle requests from cached/stale browser tabs targeting old server function IDs
      const errorMessage = typeof error?.message === "string" ? error.message : "";
      if (
        errorMessage.includes("Server function info not found") ||
        errorMessage.includes("Server function module not resolved")
      ) {
        console.warn(`[Stale ServerFn Call] ${errorMessage}`);
        return new Response(
          JSON.stringify({
            error: "Server function not found",
            message: "This client session may be running an outdated build. Please reload the page.",
            staleBuild: true,
          }),
          {
            status: 404,
            headers: {
              "content-type": "application/json",
              "cache-control": "no-store, no-cache, must-revalidate",
            },
          },
        );
      }

      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

