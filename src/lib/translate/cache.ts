/**
 * High-performance client-side cache for dynamic translations.
 * Uses an in-memory tier for 0ms synchronous lookups and debounced
 * localStorage persistence to prevent I/O blocking during batch renders.
 */

const STORAGE_PREFIX = "ndsolo_tr_";
const memoryCache = new Map<string, Map<string, string>>();
const pendingStorageSaves = new Map<string, number>();

export function getLangCache(lang: string): Map<string, string> {
  if (memoryCache.has(lang)) {
    return memoryCache.get(lang)!;
  }

  const map = new Map<string, string>();
  memoryCache.set(lang, map);

  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${lang}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) {
          for (const [k, v] of Object.entries(parsed)) {
            if (typeof v === "string") map.set(k, v);
          }
        }
      }
    } catch {
      // Ignore storage errors (private browsing or quota)
    }
  }

  return map;
}

export function getCached(lang: string, text: string): string | null {
  if (!lang || !text) return null;
  const map = getLangCache(lang);
  return map.get(text) ?? null;
}

function scheduleStorageSave(lang: string) {
  if (typeof window === "undefined") return;
  if (pendingStorageSaves.has(lang)) return;

  const timer = window.setTimeout(() => {
    pendingStorageSaves.delete(lang);
    try {
      const map = memoryCache.get(lang);
      if (!map) return;
      const obj: Record<string, string> = {};
      map.forEach((v, k) => {
        obj[k] = v;
      });
      window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, JSON.stringify(obj));
    } catch {
      // Ignore quota errors
    }
  }, 100);

  pendingStorageSaves.set(lang, timer);
}

export function setCached(lang: string, text: string, value: string): void {
  if (!lang || !text || !value) return;
  const map = getLangCache(lang);
  map.set(text, value);
  scheduleStorageSave(lang);
}

export function setCachedBatch(lang: string, entries: Record<string, string>): void {
  if (!lang || !entries) return;
  const map = getLangCache(lang);
  let changed = false;
  for (const [text, value] of Object.entries(entries)) {
    if (text && value) {
      map.set(text, value);
      changed = true;
    }
  }
  if (changed) {
    scheduleStorageSave(lang);
  }
}
