/**
 * Client-side localStorage cache for dynamic translations fetched via gtx.
 */

const STORAGE_PREFIX = "ndsolo_tr_";

export function getLangCache(lang: string): Map<string, string> {
  const map = new Map<string, string>();
  if (typeof window === "undefined") return map;
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
    // Ignore storage errors
  }
  return map;
}

export function getCached(lang: string, text: string): string | null {
  if (typeof window === "undefined" || !lang || !text) return null;
  const map = getLangCache(lang);
  return map.get(text) ?? null;
}

export function setCached(lang: string, text: string, value: string): void {
  if (typeof window === "undefined" || !lang || !text || !value) return;
  try {
    const map = getLangCache(lang);
    map.set(text, value);
    const obj: Record<string, string> = {};
    map.forEach((v, k) => {
      obj[k] = v;
    });
    window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, JSON.stringify(obj));
  } catch {
    // Ignore quota or private browsing storage errors
  }
}
