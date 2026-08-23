import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getCached, getLangCache, setCached, setCachedBatch } from "./cache";
import { getDictionaryTranslation, UI_DICTIONARY } from "./dictionary";
import { translateTexts } from "./translate.functions";

export interface LanguageOption {
  code: string;
  label: string;
  nativeName: string;
  rtl?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "es", label: "Spanish", nativeName: "Español" },
  { code: "fr", label: "French", nativeName: "Français" },
  { code: "pt", label: "Portuguese", nativeName: "Português" },
  { code: "no", label: "Norwegian", nativeName: "Norsk" },
  { code: "tr", label: "Turkish", nativeName: "Türkçe" },
  { code: "ko", label: "Korean", nativeName: "한국어" },
  { code: "zh", label: "Chinese", nativeName: "中文" },
  { code: "ja", label: "Japanese", nativeName: "日本語" },
  { code: "id", label: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "ms", label: "Malay", nativeName: "Bahasa Melayu" },
  { code: "fa", label: "Persian", nativeName: "فارسی", rtl: true },
  { code: "ar", label: "Arabic", nativeName: "العربية", rtl: true },
  { code: "ur", label: "Urdu", nativeName: "اردو", rtl: true },
];

export const LANG_STORAGE_KEY = "ndsolo_lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function isRtlLang(code: string): boolean {
  return LANGUAGES.some((l) => l.code === code && l.rtl);
}

export function applyDirection(code: string) {
  if (typeof document === "undefined") return;
  const isRtl = isRtlLang(code);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = code;
}

export interface TranslationStore {
  lang: string;
  error: string | null;
  activeRequests: number;
  version: number;
  subscribe: (fn: () => void) => () => void;
  get: (targetLang: string, text: string) => string | null;
  register: (targetLang: string, texts: string[]) => void;
  setLang: (next: string) => void;
  retryFailed: () => void;
}

function readCookie(header: string, name: string): string | null {
  const pattern = new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`);
  const match = header.match(pattern);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

const SERVER_EVENT_STORAGE_KEY = Symbol.for("tanstack-start:event-storage");

/**
 * Reads a request cookie during SSR without importing the node-only
 * `@tanstack/start-server-core` module into the client bundle. TanStack Start
 * stores the per-request H3 event in an AsyncLocalStorage reachable on
 * `globalThis[Symbol.for("tanstack-start:event-storage")]`.
 */
function readRequestCookie(name: string): string | null {
  try {
    const storage = (
      globalThis as Record<
        symbol,
        | { getStore?: () => { h3Event?: { headers?: Headers; req?: { headers?: Headers } } } | undefined }
        | undefined
      >
    )[SERVER_EVENT_STORAGE_KEY];
    const store = storage?.getStore?.();
    const headers = store?.h3Event?.headers ?? store?.h3Event?.req?.headers;
    const cookieHeader = headers?.get?.("cookie");
    if (!cookieHeader) return null;
    return readCookie(cookieHeader, name);
  } catch {
    return null;
  }
}

function getInitialLang(): string {
  // The selected language is stored in a cookie (set by setLang on the
  // client), so the server and the client agree during hydration and there is
  // no post-hydration language switch that could race React's hydration pass.
  if (typeof window !== "undefined") {
    return readCookie(document.cookie, LANG_STORAGE_KEY) ?? "en";
  }
  return readRequestCookie(LANG_STORAGE_KEY) ?? "en";
}

function createStore(): TranslationStore {
  let lang = getInitialLang();
  let version = 0;
  let error: string | null = null;
  let activeRequests = 0;
  let flushScheduled = false;

  const listeners = new Set<() => void>();
  const resolved = new Map<string, string>(); // "lang\u0001text" -> translated
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

  // The first flush is always triggered by `register()` calls made during the
  // initial hydration render. React 19 hydrates the tree concurrently, yielding
  // between render passes, so an immediate bump() there re-renders components
  // (e.g. LanguageSelector's activeRequests "translating" state) *while* the
  // hydration pass is still walking the DOM -> React #418 mismatch. Defer the
  // first flush by a fixed delay so hydration is guaranteed to have committed;
  // user-initiated flushes afterwards use the fast microtask path.
  let firstFlushPending = true;

  const scheduleFlush = () => {
    if (flushScheduled) return;
    flushScheduled = true;
    if (firstFlushPending) {
      firstFlushPending = false;
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          flushScheduled = false;
          runFlush();
        }, 50);
      } else {
        flushScheduled = false;
      }
    } else {
      queueMicrotask(() => {
        flushScheduled = false;
        runFlush();
      });
    }
  };

  const runFlush = async () => {
    if (typeof window === "undefined") return;
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
        const result = await translateTexts({ data: { lang: targetLang, texts: batchForFetch } });
        const batchCache: Record<string, string> = {};
        keys.forEach((k) => {
          const idx = k.indexOf("\u0001");
          const text = k.slice(idx + 1);
          const value = result[text];
          if (value) {
            resolved.set(k, value);
            batchCache[text] = value;
          }
        });
        setCachedBatch(targetLang, batchCache);
        if (failed.size === 0) {
          error = null;
        }
      } catch (e) {
        const failedTexts = batchForFetch;
        failedTexts.forEach((t) => failed.add(ctxKey(targetLang, t)));
        error = "Some translations failed. Showing English until retried.";
        bump();
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
    if (!LANGUAGES.some((l) => l.code === next)) return;
    lang = next;
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
        document.cookie = `${LANG_STORAGE_KEY}=${encodeURIComponent(next)}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
      }
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

  return {
    // Live getters (not captured values) so subscribers always observe the
    // current lang/version/error/activeRequests and React re-renders on bump().
    get lang() {
      return lang;
    },
    get error() {
      return error;
    },
    get activeRequests() {
      return activeRequests;
    },
    get version() {
      return version;
    },
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // The initial language already comes from the cookie, so no state change
      // is needed after hydration. Just sync the <html> dir/lang attributes.
      applyDirection(store.lang);
    }
  }, [store]);

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

export function useTranslationStore(): TranslationStore {
  return useStore();
}

export function useT(text: string): string {
  const store = useStore();
  const lang = store.lang;

  if (lang !== "en" && text) {
    store.register(lang, [text]);
  }

  const translated = store.get(lang, text);

  useEffect(() => {
    if (lang !== "en" && text) {
      store.register(lang, [text]);
    }
  }, [store, lang, text]);

  return translated ?? text;
}

export function useTranslations(): (text: string) => string {
  const store = useStore();
  const lang = store.lang;
  return (text: string) => {
    if (!text || lang === "en") return text;
    const v = store.get(lang, text);
    if (!v) {
      store.register(lang, [text]);
    }
    return v ?? text;
  };
}

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
