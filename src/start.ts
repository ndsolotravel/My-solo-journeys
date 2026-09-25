import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next, request, handlerType }: any) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);

    const isServerFn =
      handlerType === "serverFn" ||
      (request?.url && new URL(request.url).pathname.startsWith("/_serverFn")) ||
      request?.headers?.get("x-tsr-serverFn") === "true";

    if (isServerFn) {
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Internal Server Error",
        }),
        {
          status: 500,
          headers: { "content-type": "application/json" },
        },
      );
    }

    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const canonicalRedirectMiddleware = createMiddleware().server(async ({ next, request }: any) => {
  try {
    if (request?.url) {
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
        return await next();
      }

      const rawHost = (
        request.headers?.get("x-forwarded-host") ||
        request.headers?.get("host") ||
        url.host ||
        ""
      ).toLowerCase().trim();

      const hostname = rawHost.split(":")[0];

      if (
        hostname &&
        hostname !== "localhost" &&
        hostname !== "127.0.0.1" &&
        !hostname.startsWith("192.168.") &&
        !hostname.startsWith("10.") &&
        !hostname.endsWith(".local")
      ) {
        const isWww =
          hostname === "www.ndsolotravel.com" ||
          hostname.startsWith("www.") ||
          hostname === "www.ndsolotravel.com.cdn.hstgr.net";
        const isApex = hostname === "ndsolotravel.com";

        const forwardedProtoHeader = (
          request.headers?.get("x-forwarded-proto") ||
          request.headers?.get("x-forwarded-protocol") ||
          request.headers?.get("x-url-scheme") ||
          ""
        ).toLowerCase();

        const clientProto = forwardedProtoHeader.split(",")[0].trim();
        const forwardedSsl = (request.headers?.get("x-forwarded-ssl") || "").toLowerCase().trim();
        const frontEndHttps = (request.headers?.get("front-end-https") || "").toLowerCase().trim();
        const forwardedPort = (request.headers?.get("x-forwarded-port") || "").trim();
        const cfVisitor = request.headers?.get("cf-visitor") || "";

        const isExplicitlyHttps =
          clientProto === "https" ||
          forwardedSsl === "on" ||
          frontEndHttps === "on" ||
          forwardedPort === "443" ||
          cfVisitor.includes('"scheme":"https"');

        const isExplicitlyHttp =
          !isExplicitlyHttps && clientProto === "http";

        if (isWww) {
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
      }
    }
  } catch (err) {
    console.error("[canonicalRedirectMiddleware error]", err);
  }

  return await next();
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [canonicalRedirectMiddleware, errorMiddleware],
}));

