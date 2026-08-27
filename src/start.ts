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

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware],
}));
