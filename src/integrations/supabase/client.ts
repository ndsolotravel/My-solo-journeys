import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import type { Database } from './types';

const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5";

function createSupabaseClient() {
  const SUPABASE_URL =
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.SUPABASE_URL ||
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL : undefined) ||
    DEFAULT_SUPABASE_URL;

  const SUPABASE_ANON_KEY =
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.SUPABASE_PUBLISHABLE_KEY ||
    (typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY ||
        process.env.VITE_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_PUBLISHABLE_KEY ||
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY
      : undefined) ||
    DEFAULT_SUPABASE_ANON_KEY;

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {
      transport: typeof window !== 'undefined' ? undefined : ws,
      WebSocket: typeof window !== 'undefined' ? undefined : ws,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
