/**
 * In-memory TTL cache with stampede protection for public server functions.
 * Eliminates redundant Supabase network roundtrips for high-traffic public pages.
 * Delivers sub-millisecond data access for repeated visits.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const memoryStore = new Map<string, CacheEntry<unknown>>();
const inflightPromises = new Map<string, Promise<unknown>>();

/**
 * Retrieve cached data or fetch and cache it with a TTL.
 * Uses promise-deduplication to prevent multiple concurrent requests
 * from triggering simultaneous backend database queries.
 */
export async function fetchWithCache<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (entry && entry.expiresAt > now) {
    return entry.data as T;
  }

  // Deduplicate concurrent inflight requests for the same key
  const inflight = inflightPromises.get(key);
  if (inflight) {
    return inflight as Promise<T>;
  }

  const promise = (async () => {
    try {
      const fresh = await fetcher();
      memoryStore.set(key, { data: fresh, expiresAt: Date.now() + ttlMs });
      return fresh;
    } finally {
      inflightPromises.delete(key);
    }
  })();

  inflightPromises.set(key, promise);
  return promise;
}

/**
 * Invalidate cached items by key or prefix.
 * Called immediately when content is saved/published in the CMS.
 */
export function invalidateServerCache(keyPrefix?: string): void {
  if (!keyPrefix) {
    memoryStore.clear();
    return;
  }
  for (const k of memoryStore.keys()) {
    if (k.startsWith(keyPrefix)) {
      memoryStore.delete(k);
    }
  }
}
