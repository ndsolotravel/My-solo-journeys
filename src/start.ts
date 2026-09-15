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
          hostname === "www.ndsolotravel.com.cdn.hstgr.net";
        const isApex = hostname === "ndsolotravel.com";

        const rawProto = (
          request.headers?.get("x-forwarded-proto") ||
          request.headers?.get("x-forwarded-protocol") ||
          url.protocol.replace(":", "") ||
          "https"
        ).toLowerCase().trim();
        const isHttp = rawProto === "http";

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

        if (isApex && isHttp) {
          const targetUrl = `https://ndsolotravel.com${url.pathname}${url.search}`;
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
  } catch (err) {
    console.error("[canonicalRedirectMiddleware error]", err);
  }

  return await next();
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [canonicalRedirectMiddleware, errorMiddleware],
}));

