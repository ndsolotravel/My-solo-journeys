const STORAGE_KEY = "ndsolo:tr:v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MAX_ENTRIES = 4000;

type Entry = { v: string; t: number };

let memory: Map<string, Entry> | null = null;
let loaded = false;

function key(lang: string, text: string) {
  return `${lang}\u0001${text}`;
}

function load() {
  if (loaded) return;
  loaded = true;
  memory = new Map();
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, Entry>;
    for (const [k, e] of Object.entries(parsed)) {
      if (e && typeof e.v === "string" && typeof e.t === "number") memory.set(k, e);
    }
  } catch {
    // Corrupted or unavailable storage — start fresh.
  }
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePersist() {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    persist();
  }, 250);
}

function persist() {
  if (typeof window === "undefined" || !memory) return;
  try {
    const obj: Record<string, Entry> = {};
    memory.forEach((e, k) => {
      obj[k] = e;
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // Storage full or blocked — memory cache still works for this session.
  }
}

export function getLangCache(lang: string): Map<string, string> {
  const out = new Map<string, string>();
  if (!lang || lang === "en") return out;
  load();
  const prefix = `${lang}\u0001`;
  const now = Date.now();
  memory!.forEach((e, k) => {
    if (k.startsWith(prefix)) {
      if (now - e.t <= TTL_MS) {
        out.set(k.slice(prefix.length), e.v);
      }
    }
  });
  return out;
}

export function getCached(lang: string, text: string): string | null {
  if (!text) return null;
  load();
  const e = memory!.get(key(lang, text));
  if (!e) return null;
  if (Date.now() - e.t > TTL_MS) {
    memory!.delete(key(lang, text));
    return null;
  }
  return e.v;
}

export function setCached(lang: string, text: string, value: string) {
  if (!text || !value) return;
  load();
  memory!.set(key(lang, text), { v: value, t: Date.now() });
  if (memory!.size > MAX_ENTRIES) {
    // Drop oldest entries (Map preserves insertion order).
    const overflow = memory!.size - MAX_ENTRIES;
    const keys = memory!.keys();
    for (let i = 0; i < overflow; i++) {
      const k = keys.next().value as string | undefined;
      if (k == null) break;
      memory!.delete(k);
    }
  }
  schedulePersist();
}
