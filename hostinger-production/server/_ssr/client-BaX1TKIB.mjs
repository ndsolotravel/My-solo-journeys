import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function createSupabaseClient() {
  const SUPABASE_URL = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL : void 0;
  const SUPABASE_ANON_KEY = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY : void 0;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["NEXT_PUBLIC_SUPABASE_URL"] : [],
      ...!SUPABASE_ANON_KEY ? ["NEXT_PUBLIC_SUPABASE_ANON_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
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
