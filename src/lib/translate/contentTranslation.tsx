import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { getCached, getLangCache, setCached, setCachedBatch } from "./cache";
import { getDictionaryTranslation } from "./dictionary";
import { translateTexts } from "./translate.functions";
import { useLanguage } from "./store";

const SUPPORTED_LANGS = ["en", "id", "ms"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];

type ContentType = "post" | "destination" | "gallery" | "legal" | "category" | "contact";

interface DBTranslation {
  title: string;
  content?: string;
  excerpt?: string;
  description?: string;
  country?: string;
  region?: string;
  seo_title?: string;
  seo_description?: string;
  story?: string;
  caption?: string;
  category?: string;
  location?: string;
  name?: string;
}

interface CachedTranslation {
  [key: string]: string;
}

function createContentTranslationStore() {
  let lang = "en";
  let version = 0;
  let error: string | null = null;
  let activeRequests = 0;

  const listeners = new Set<() => void>();
  const resolved = new Map<string, string | DBTranslation>();
  const pending = new Map<string, Map<ContentType, Set<string>>>();
  const inFlight = new Set<string>();
  const failed = new Set<string>();

  const ctxKey = (type: ContentType, text: string, l: string) => `${type}\u0001${text}\u0001${l}`;
  const dbKey = (type: ContentType, id: string, l: string) => `db:${type}\u0001${id}\u0001${l}`;

  const bump = () => {
    version++;
    listeners.forEach((fn) => fn());
  };

  let firstFlushPending = true;
  let flushScheduled = false;

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
    for (const [targetLang, typeMap] of [...pending.entries()]) {
      for (const [type, textSet] of [...typeMap.entries()]) {
        if (!textSet.size) continue;
        const batch = [...textSet];
        textSet.clear();
        const keys = batch.map((t) => ctxKey(type, t, targetLang));
        const remaining = keys.filter((k) => !inFlight.has(k) && !failed.has(k));
        const batchForFetch = batch.filter((_, i) => remaining.includes(keys[i]));
        if (!batchForFetch.length) continue;

        keys.forEach((k) => inFlight.add(k));
        activeRequests++;
        bump();

        try {
          const result = await translateTexts({ data: { lang: targetLang, texts: batchForFetch } });
          const batchCache: Record<string, string> = {};
          keys.forEach((k, i) => {
            const text = batch[i];
            const trimmed = text.trim();
            const value = result[text] || result[trimmed];
            if (value) {
              resolved.set(k, value);
              resolved.set(ctxKey(type, trimmed, targetLang), value);
              batchCache[text] = value;
              batchCache[trimmed] = value;
            }
          });
          setCachedBatch(targetLang, batchCache);
          if (failed.size === 0) {
            error = null;
          }
        } catch (e) {
          const failedTexts = batchForFetch;
          failedTexts.forEach((t) => failed.add(ctxKey(type, t, targetLang)));
          error = "Some translations failed. Showing English until retried.";
          bump();
        } finally {
          keys.forEach((k) => inFlight.delete(k));
          activeRequests--;
        }
      }
    }
    bump();
  };

  const register = (targetLang: string, type: ContentType, texts: string[]) => {
    if (targetLang === "en" || !texts.length) return;
    let added = false;
    for (const rawText of texts) {
      if (!rawText) continue;
      const text = rawText.trim();
      if (!text) continue;
      const k = ctxKey(type, text, targetLang);
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
      let typeMap = pending.get(targetLang);
      if (!typeMap) {
        typeMap = new Map();
        pending.set(targetLang, typeMap);
      }
      let set = typeMap.get(type);
      if (!set) {
        set = new Set<string>();
        typeMap.set(type, set);
      }
      if (!set.has(text)) {
        set.add(text);
        added = true;
      }
    }
    if (added) scheduleFlush();
  };

  const get = (targetLang: string, type: ContentType, text: string): string | null => {
    if (targetLang === "en" || !text) return null;
    const trimmed = text.trim();
    const k = ctxKey(type, text, targetLang);
    const kTrimmed = ctxKey(type, trimmed, targetLang);

    const v = resolved.get(k) ?? resolved.get(kTrimmed);
    if (v && typeof v === "string") return v;

    const dictValue =
      getDictionaryTranslation(targetLang, text) ?? getDictionaryTranslation(targetLang, trimmed);
    if (dictValue) {
      resolved.set(k, dictValue);
      resolved.set(kTrimmed, dictValue);
      return dictValue;
    }

    const cached = getCached(targetLang, text) ?? getCached(targetLang, trimmed);
    if (cached) {
      resolved.set(k, cached);
      resolved.set(kTrimmed, cached);
      return cached;
    }
    return null;
  };

  const getDBTranslation = (
    type: ContentType,
    id: string,
    targetLang: string,
  ): DBTranslation | null => {
    const k = dbKey(type, id, targetLang);
    const val = resolved.get(k);
    if (val && typeof val === "object") return val as DBTranslation;
    return null;
  };

  const setDBTranslation = (
    type: ContentType,
    id: string,
    targetLang: string,
    data: DBTranslation,
  ) => {
    const k = dbKey(type, id, targetLang);
    resolved.set(k, data);
  };

  const setLang = (next: string) => {
    if (!SUPPORTED_LANGS.includes(next as SupportedLang)) return;
    lang = next;
    pending.clear();
    inFlight.clear();
    failed.clear();
    error = null;
    bump();
    if (next !== "en") scheduleFlush();
  };

  const subscribe = (fn: () => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  return {
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
    getDBTranslation,
    setDBTranslation,
    register,
    setLang,
  };
}

const ContentTranslationContext = createContext<ReturnType<
  typeof createContentTranslationStore
> | null>(null);

export function ContentTranslationProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => createContentTranslationStore(), []);
  const { lang } = useLanguage();

  useEffect(() => {
    store.setLang(lang);
  }, [lang, store]);

  return (
    <ContentTranslationContext.Provider value={store}>
      {children}
    </ContentTranslationContext.Provider>
  );
}

function useContentStore() {
  const store = useContext(ContentTranslationContext);
  if (!store) {
    throw new Error("useContentTranslation must be used inside <ContentTranslationProvider>");
  }
  useSyncExternalStore(
    store.subscribe,
    () => store.version,
    () => store.version,
  );
  return store;
}

interface UseContentTranslationOptions {
  contentType: ContentType;
  contentId: string;
  englishFields: Record<string, string>;
  targetLang?: string;
}

export function useContentTranslation({
  contentType,
  contentId,
  englishFields,
  targetLang,
}: UseContentTranslationOptions): Record<string, string> {
  const store = useContentStore();
  const { lang } = useLanguage();
  const effectiveLang = targetLang ?? lang;

  const fields = useMemo(() => englishFields, [englishFields]);

  for (const [key, value] of Object.entries(fields)) {
    if (value && effectiveLang !== "en") {
      store.register(effectiveLang, contentType, [value]);
    }
  }

  useEffect(() => {
    if (effectiveLang !== "en") {
      const texts = Object.values(fields).filter(Boolean);
      if (texts.length) store.register(effectiveLang, contentType, texts);
    }
  }, [store, effectiveLang, contentType, fields]);

  const result = useMemo(() => {
    if (effectiveLang === "en") return fields;

    const dbTrans = store.getDBTranslation(contentType, contentId, effectiveLang);
    if (dbTrans) {
      const merged = { ...fields };
      for (const [key, value] of Object.entries(dbTrans)) {
        if (key in merged && value) {
          merged[key] = value;
        }
      }
      return merged;
    }

    const translated: Record<string, string> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        translated[key] = "";
        continue;
      }
      const t = store.get(effectiveLang, contentType, value);
      translated[key] = t ?? value;
    }
    return translated;
  }, [store, contentType, contentId, effectiveLang, fields]);

  return result;
}

export function useContentTranslator(
  contentType: ContentType,
  contentId: string,
  targetLang?: string,
) {
  const store = useContentStore();
  const { lang } = useLanguage();
  const effectiveLang = targetLang ?? lang;

  const registerFields = (texts: string[]) => {
    if (effectiveLang !== "en" && texts.length) {
      store.register(effectiveLang, contentType, texts);
    }
  };

  useEffect(() => {
    registerFields([]);
  }, [store, effectiveLang, contentType]);

  return (key: string, englishValue: string): string => {
    if (!englishValue || effectiveLang === "en") return englishValue;
    const t = store.get(effectiveLang, contentType, englishValue);
    return t ?? englishValue;
  };
}

export function useSetContentDBTranslation(
  contentType: ContentType,
  contentId: string,
  targetLang?: string,
) {
  const store = useContentStore();
  const { lang } = useLanguage();
  const effectiveLang = targetLang ?? lang;

  return (fields: Partial<DBTranslation>) => {
    store.setDBTranslation(contentType, contentId, effectiveLang, fields as DBTranslation);
  };
}

export function usePrefetchContentTranslations(
  contentType: ContentType,
  contentId: string,
  targetLang?: string,
) {
  const store = useContentStore();
  const { lang } = useLanguage();
  const effectiveLang = targetLang ?? lang;

  useEffect(() => {
    if (effectiveLang === "en") return;
    const dbTrans = store.getDBTranslation(contentType, contentId, effectiveLang);
    if (dbTrans) return;
  }, [store, contentType, contentId, effectiveLang]);
}
