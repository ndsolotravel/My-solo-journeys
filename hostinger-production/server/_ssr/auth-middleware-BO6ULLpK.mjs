import { a as createMiddleware, g as getRequest } from "./server-7Z2Wk8DL.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { W as WebSocket } from "../_libs/ws.mjs";
const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5";
const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
    const request = getRequest();
    if (!request?.headers) {
      throw new Error("Unauthorized: No request headers available");
    }
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Unauthorized: No authorization header provided");
    }
    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Only Bearer tokens are supported");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        auth: {
          storage: void 0,
          persistSession: false,
          autoRefreshToken: false
        },
        realtime: {
          transport: WebSocket
        }
      }
    );
    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) {
      throw new Error("Unauthorized: Invalid token");
    }
    if (!data.claims.sub) {
      throw new Error("Unauthorized: No user ID found in token");
    }
    return next({
      context: {
        supabase,
        userId: data.claims.sub,
        claims: data.claims
      }
    });
  }
);
export {
  requireSupabaseAuth as r
};
