import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
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
const __vite_import_meta_env__ = {};
const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5";
function createSupabaseAdminClient() {
  const SUPABASE_URL = (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL : void 0) || (typeof import.meta !== "undefined" && __vite_import_meta_env__ ? "https://mqoybarqgzzvillignbr.supabase.co" : void 0) || DEFAULT_SUPABASE_URL;
  const SUPABASE_KEY = (typeof process !== "undefined" ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY : void 0) || (typeof import.meta !== "undefined" && __vite_import_meta_env__ ? "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5" : void 0) || DEFAULT_SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    },
    realtime: {
      transport: WebSocket,
      WebSocket
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
export {
  supabaseAdmin
};
