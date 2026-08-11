import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { W as WebSocket } from "../_libs/ws.mjs";
function createSupabaseClient() {
  const SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5";
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    },
    realtime: {
      transport: typeof window !== "undefined" ? void 0 : WebSocket,
      WebSocket: typeof window !== "undefined" ? void 0 : WebSocket
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
  supabase as s
};
