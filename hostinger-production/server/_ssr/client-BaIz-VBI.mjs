import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { W as WebSocket } from "../_libs/ws.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "crypto";
import "stream";
import "../_libs/react.mjs";
import "util";
const __vite_import_meta_env__ = { "NEXT_PUBLIC_SUPABASE_ANON_KEY": "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5", "NEXT_PUBLIC_SUPABASE_URL": "https://mqoybarqgzzvillignbr.supabase.co", "VITE_SUPABASE_ANON_KEY": "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5", "VITE_SUPABASE_URL": "https://mqoybarqgzzvillignbr.supabase.co" };
const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5";
function createSupabaseClient() {
  const metaEnv = typeof import.meta !== "undefined" && __vite_import_meta_env__ ? __vite_import_meta_env__ : void 0;
  const SUPABASE_URL = metaEnv?.NEXT_PUBLIC_SUPABASE_URL || metaEnv?.VITE_SUPABASE_URL || metaEnv?.SUPABASE_URL || (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL : void 0) || DEFAULT_SUPABASE_URL;
  const SUPABASE_ANON_KEY = metaEnv?.NEXT_PUBLIC_SUPABASE_ANON_KEY || metaEnv?.VITE_SUPABASE_ANON_KEY || metaEnv?.SUPABASE_ANON_KEY || metaEnv?.VITE_SUPABASE_PUBLISHABLE_KEY || metaEnv?.SUPABASE_PUBLISHABLE_KEY || (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY : void 0) || DEFAULT_SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    },
    realtime: {
      transport: typeof window !== "undefined" ? void 0 : WebSocket
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase
};
