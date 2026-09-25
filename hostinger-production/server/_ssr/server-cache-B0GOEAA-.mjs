const memoryStore = /* @__PURE__ */ new Map();
const inflightPromises = /* @__PURE__ */ new Map();
async function fetchWithCache(key, ttlMs, fetcher) {
  const now = Date.now();
  const entry = memoryStore.get(key);
  if (entry && entry.expiresAt > now) {
    return entry.data;
  }
  const inflight = inflightPromises.get(key);
  if (inflight) {
    return inflight;
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
function invalidateServerCache(keyPrefix) {
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
export {
  fetchWithCache,
  invalidateServerCache
};
