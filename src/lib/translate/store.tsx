import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { requestTranslations } from "./gtx";
import { getCached, getLangCache, setCached } from "./cache";
import { getDictionaryTranslation, UI_DICTIONARY } from "./dictionary";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "es", label: "Spanish" },
  { code: "it", label: "Italian" },
  { code: "de", label: "German" },
  { code: "fr", label: "French" },
  { code: "pt", label: "Portuguese" },
  { code: "no", label: "Norwegian" },
  { code: "sv", label: "Swedish" },
  { code: "ur", label: "Urdu" },
] as const;

const LANG_STORAGE_KEY = "ndsolo:lang";
const AUTO_RETRY_DELAY_MS = 4000;

export type TranslationStore = {
  lang: string;
  error: string | null;
  activeRequests: number;
  version: number;
  subscribe: (fn: () => void) => () => void;
  get: (lang: string, text: string) => string | null;
  register: (lang: string, texts: string[]) => void;
  setLang: (lang: string) => void;
  retryFailed: () => void;
};

function readStoredLang(): string {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (v && LANGUAGES.some((l) => l.code === v)) return v;
  } catch {
    // storage unavailable
  }
  return "en";
}

function applyDirection(value: string) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (value === "ur") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ur");
    html.classList.add("rtl");
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", value || "en");
    html.classList.remove("rtl");
  }
}

function createStore(): TranslationStore {
  let lang = readStoredLang();
  let error: string | null = null;
  let activeRequests = 0;
  let version = 0;
  let flushScheduled = false;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;

  const listeners = new Set<() => void>();

  const resolved = new Map<string, string>(); // `${lang}\u0001${text}` -> translated
  const pending = new Map<string, Set<string>>(); // lang -> texts awaiting a batch
  const inFlight = new Set<string>();
  const failed = new Set<string>();

  const ctxKey = (l: string, t: string) => `${l}\u0001${t}`;

  const preloadLang = (targetLang: string) => {
    if (targetLang === "en") return;
    const dict = UI_DICTIONARY[targetLang];
    if (dict) {
      for (const [text, value] of Object.entries(dict)) {
        resolved.set(ctxKey(targetLang, text), value);
      }
    }
    const map = getLangCache(targetLang);
    map.forEach((value, text) => {
      resolved.set(ctxKey(targetLang, text), value);
    });
  };

  preloadLang(lang);

  const bump = () => {
    version++;
    listeners.forEach((fn) => fn());
  };

  const scheduleFlush = () => {
    if (flushScheduled) return;
    flushScheduled = true;
    queueMicrotask(() => {
      flushScheduled = false;
      runFlush();
    });
  };

  const runFlush = async () => {
    for (const [targetLang, texts] of [...pending.entries()]) {
      if (!texts.size) continue;
      const batch = [...texts];
      texts.clear();
      const keys = batch.map((t) => ctxKey(targetLang, t));
      const remaining = keys.filter((k) => !inFlight.has(k) && !failed.has(k));
      const batchForFetch = batch.filter((_, i) => remaining.includes(keys[i]));
      if (!batchForFetch.length) continue;

      keys.forEach((k) => inFlight.add(k));
      activeRequests++;
      bump();

      try {
        const result = await requestTranslations(batchForFetch, targetLang);
        keys.forEach((k) => {
          const idx = k.indexOf("\u0001");
          const text = k.slice(idx + 1);
          const value = result.get(text);
          if (value) {
            resolved.set(k, value);
            setCached(targetLang, text, value);
          }
        });
        if (failed.size === 0) {
          error = null;
        }
      } catch (e) {
        const failedTexts =
          e instanceof Error && "failedTexts" in e
            ? (e as { failedTexts: string[] }).failedTexts
            : batchForFetch;
        failedTexts.forEach((t) => failed.add(ctxKey(targetLang, t)));
        error = "Some translations failed. Showing English until retried.";
        bump();
        if (!retryTimer) {
          retryTimer = setTimeout(() => {
            retryTimer = null;
            retryFailedTexts();
          }, AUTO_RETRY_DELAY_MS);
        }
      } finally {
        keys.forEach((k) => inFlight.delete(k));
        activeRequests--;
      }
    }
    bump();
  };

  const retryFailedTexts = () => {
    if (!failed.size) {
      error = null;
      bump();
      return;
    }
    const texts: string[] = [];
    for (const k of failed) {
      const idx = k.indexOf("\u0001");
      if (k.slice(0, idx) === lang) texts.push(k.slice(idx + 1));
    }
    failed.clear();
    error = null;
    if (texts.length) {
      let set = pending.get(lang);
      if (!set) {
        set = new Set<string>();
        pending.set(lang, set);
      }
      texts.forEach((t) => set.add(t));
      scheduleFlush();
    }
    bump();
  };

  const register = (targetLang: string, texts: string[]) => {
    if (targetLang === "en" || !texts.length) return;
    let added = false;
    for (const text of texts) {
      if (!text) continue;
      const k = ctxKey(targetLang, text);
      if (resolved.has(k) || inFlight.has(k) || failed.has(k)) continue;

      const dictValue = getDictionaryTranslation(targetLang, text);
      if (dictValue) {
        resolved.set(k, dictValue);
        continue;
      }

      const cached = getCached(targetLang, text);
      if (cached) {
        resolved.set(k, cached);
        continue;
      }
      let set = pending.get(targetLang);
      if (!set) {
        set = new Set<string>();
        pending.set(targetLang, set);
      }
      if (!set.has(text)) {
        set.add(text);
        added = true;
      }
    }
    if (added) scheduleFlush();
  };

  const get = (targetLang: string, text: string): string | null => {
    if (targetLang === "en" || !text) return null;
    const k = ctxKey(targetLang, text);
    const v = resolved.get(k);
    if (v) return v;
    const dictValue = getDictionaryTranslation(targetLang, text);
    if (dictValue) {
      resolved.set(k, dictValue);
      return dictValue;
    }
    const cached = getCached(targetLang, text);
    if (cached) {
      resolved.set(k, cached);
      return cached;
    }
    return null;
  };

  const setLang = (next: string) => {
    if (next === lang) {
      if (next !== "en") retryFailedTexts();
      return;
    }
    lang = next;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // storage unavailable
    }
    applyDirection(next);
    pending.clear();
    inFlight.clear();
    failed.clear();
    error = null;
    preloadLang(next);
    bump();
    if (next !== "en") scheduleFlush();
  };

  const subscribe = (fn: () => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  applyDirection(lang);

  return {
    lang,
    error,
    activeRequests,
    version,
    subscribe,
    get,
    register,
    setLang,
    retryFailed: retryFailedTexts,
  };
}

const TranslationContext = createContext<TranslationStore | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => createStore(), []);
  return <TranslationContext.Provider value={store}>{children}</TranslationContext.Provider>;
}

function useStore(): TranslationStore {
  const store = useContext(TranslationContext);
  if (!store) {
    throw new Error("useT/useTranslations must be used inside <TranslationProvider>");
  }
  useSyncExternalStore(
    store.subscribe,
    () => store.version,
    () => store.version,
  );
  return store;
}

/**
 * Low-level access to the translation store (for data-layer hooks that need
 * both `register` and reactive reads). Prefer `useT`/`useTranslations`.
 */
export function useTranslationStore(): TranslationStore {
  return useStore();
}

/**
 * Translate a single static UI string. Returns the original English text
 * while a translation is pending (never blanks out), and re-renders when
 * the translation arrives. Cached strings resolve instantly.
 */
export function useT(text: string): string {
  const store = useStore();
  const lang = store.lang;

  if (lang !== "en" && text) {
    store.register(lang, [text]);
  }

  const translated = store.get(lang, text);

  useEffect(() => {
    store.register(lang, [text]);
  }, [store, lang, text]);

  return translated ?? text;
}

/**
 * Reactive resolver for dynamic content (blog posts, destinations, captions…).
 * `resolve(text)` returns the translation if available, otherwise the original.
 * Components re-render when new translations arrive, so data-layer hooks can
 * rebuild their objects without ever touching the DOM directly.
 */
export function useTranslations(): (text: string) => string {
  const store = useStore();
  const lang = store.lang;
  return (text: string) => store.get(lang, text) ?? text;
}

/**
 * Register a fixed set of static UI strings and get a reactive translator.
 * Strings are fetched in one batch (deduped + cached); the returned function
 * resolves them as they arrive and falls back to English meanwhile.
 * Registration is idempotent, so running after every render is safe.
 */
export function useTranslator(staticTexts: readonly string[]): (text: string) => string {
  const store = useStore();
  const lang = store.lang;

  if (lang !== "en" && staticTexts.length) {
    store.register(lang, staticTexts as string[]);
  }

  useEffect(() => {
    store.register(lang, [...staticTexts]);
  }, [store, lang, staticTexts]);

  return (text: string) => store.get(lang, text) ?? text;
}

export function useLanguage(): { lang: string; error: string | null; activeRequests: number } {
  const store = useStore();
  return { lang: store.lang, error: store.error, activeRequests: store.activeRequests };
}

export function useSetLanguage(): (lang: string) => void {
  const store = useStore();
  return store.setLang;
}
