import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import type { Database } from './types';

const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5";

function createSupabaseAdminClient() {
  const SUPABASE_URL =
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL : undefined) ||
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL : undefined) ||
    DEFAULT_SUPABASE_URL;

  const SUPABASE_KEY =
    (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY : undefined) ||
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY : undefined) ||
    DEFAULT_SUPABASE_ANON_KEY;

  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: ws,
      WebSocket: ws,
    },
  });
}

let _supabaseAdmin: ReturnType<typeof createSupabaseAdminClient> | undefined;

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  },
});
