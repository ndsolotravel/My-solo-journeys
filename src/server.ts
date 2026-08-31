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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
