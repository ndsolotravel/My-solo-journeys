import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as ScriptOnce, d as Scripts, e as createFileRoute, l as lazyRouteComponent, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { y as redirect, z as notFound, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, d as getServerFnById } from "./server-7Z2Wk8DL.mjs";
import { s as supabase } from "./client-Bkj-llDP.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CKFEJwfb.mjs";
import { S as Search, U as User, L as LogOut, X, M as Menu, I as Instagram, Y as Youtube, T as Twitter, F as Facebook, a as Linkedin, b as Sun, c as Moon, G as Globe, d as LoaderCircle, C as CircleAlert, e as FileText, f as MapPin } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType, b as booleanType, a as arrayType, l as literalType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ws.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-Ct6pdyeU.css";
function ThemeToggle() {
  const [dark, setDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors",
      children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
    }
  );
}
const ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const TIMEOUT_MS = 12e3;
const MAX_LINES_PER_REQUEST = 35;
const MAX_CHARS_PER_REQUEST = 2500;
const MAX_CONCURRENT_REQUESTS = 3;
const MAX_RETRIES = 3;
const NL_MARKER = " __NL__ ";
class TranslationRequestError extends Error {
  failedTexts;
  constructor(message, failedTexts) {
    super(message);
    this.name = "TranslationRequestError";
    this.failedTexts = failedTexts;
  }
}
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}
async function fetchSingle(text, targetLang) {
  if (!text) return "";
  const sanitized = text.replace(/\n/g, NL_MARKER);
  const q = encodeURIComponent(sanitized);
  const url = `${ENDPOINT}?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${q}`;
  try {
    const res = await fetchWithTimeout(url, TIMEOUT_MS);
    if (!res.ok) return text;
    const json = await res.json();
    const segments = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : null;
    if (!segments) return text;
    const out = [];
    for (const seg of segments) {
      if (Array.isArray(seg) && typeof seg[0] === "string") out.push(seg[0]);
    }
    const translated = out.join("").replace(/\s*__NL__\s*/g, "\n").trim();
    return translated || text;
  } catch {
    return text;
  }
}
async function fetchChunk(lines, targetLang) {
  if (lines.length === 1) {
    const res2 = await fetchSingle(lines[0], targetLang);
    return [res2];
  }
  const sanitized = lines.map((l) => l.replace(/\n/g, NL_MARKER));
  const joined = sanitized.join("\n");
  const q = encodeURIComponent(joined);
  const url = `${ENDPOINT}?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${q}`;
  const res = await fetchWithTimeout(url, TIMEOUT_MS);
  if (res.status === 429 || res.status >= 500) {
    throw new TranslationRequestError(`Translation service busy (${res.status})`, lines);
  }
  if (!res.ok) {
    throw new TranslationRequestError(`Translation request failed (${res.status})`, lines);
  }
  const json = await res.json();
  const segments = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : null;
  if (!segments) {
    throw new TranslationRequestError("Unexpected translation response", lines);
  }
  const out = [];
  for (const seg of segments) {
    if (Array.isArray(seg) && typeof seg[0] === "string") out.push(seg[0]);
  }
  const body = out.join("");
  const parts = body.split("\n");
  if (parts.length === lines.length) {
    return parts.map((p) => p.replace(/\s*__NL__\s*/g, "\n").replace(/\n+$/, ""));
  }
  return Promise.all(lines.map((l) => fetchSingle(l, targetLang)));
}
function chunkLines(lines) {
  const chunks = [];
  let current = [];
  let chars = 0;
  for (const line of lines) {
    if (current.length >= MAX_LINES_PER_REQUEST || chars + line.length > MAX_CHARS_PER_REQUEST) {
      chunks.push(current);
      current = [];
      chars = 0;
    }
    current.push(line);
    chars += line.length;
  }
  if (current.length) chunks.push(current);
  return chunks;
}
async function workerPool(items, limit, fn) {
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx]);
    }
  });
  await Promise.all(workers);
}
async function requestTranslations(lines, targetLang, onProgress) {
  const chunks = chunkLines(lines);
  const result = /* @__PURE__ */ new Map();
  const failed = [];
  let done = 0;
  await workerPool(chunks, MAX_CONCURRENT_REQUESTS, async (chunk) => {
    let lastErr = null;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        const delay = Math.min(500 * Math.pow(2, attempt - 1), 3e3);
        await new Promise((r) => setTimeout(r, delay));
      }
      try {
        const translated = await fetchChunk(chunk, targetLang);
        chunk.forEach((line, i) => result.set(line, translated[i]));
        lastErr = null;
        break;
      } catch (e) {
        const err = e instanceof Error ? e : new Error("Translation failed");
        if (err instanceof TranslationRequestError) {
          if (err.message.startsWith("Translation service busy") || err.message.startsWith("Translation request failed (5")) {
            lastErr = err;
            continue;
          }
          try {
            const fallbacks = await Promise.all(chunk.map((l) => fetchSingle(l, targetLang)));
            chunk.forEach((line, i) => result.set(line, fallbacks[i]));
            lastErr = null;
            break;
          } catch {
            failed.push(...chunk);
            lastErr = null;
            break;
          }
        }
        lastErr = err;
      }
    }
    if (lastErr) {
      try {
        const fallbacks = await Promise.all(chunk.map((l) => fetchSingle(l, targetLang)));
        chunk.forEach((line, i) => result.set(line, fallbacks[i]));
      } catch {
        failed.push(...chunk);
      }
    }
    done += chunk.length;
  });
  if (failed.length) {
    throw new TranslationRequestError(
      `Translation unavailable for ${failed.length} text fragment(s)`,
      failed
    );
  }
  return result;
}
const STORAGE_KEY = "ndsolo:tr:v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1e3;
const MAX_ENTRIES = 4e3;
let memory = null;
let loaded = false;
function key(lang, text) {
  return `${lang}${text}`;
}
function load() {
  if (loaded) return;
  loaded = true;
  memory = /* @__PURE__ */ new Map();
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    for (const [k, e] of Object.entries(parsed)) {
      if (e && typeof e.v === "string" && typeof e.t === "number") memory.set(k, e);
    }
  } catch {
  }
}
function persist() {
  if (typeof window === "undefined" || !memory) return;
  try {
    const obj = {};
    memory.forEach((e, k) => {
      obj[k] = e;
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
  }
}
function getLangCache(lang) {
  const out = /* @__PURE__ */ new Map();
  if (!lang || lang === "en") return out;
  load();
  const prefix = `${lang}`;
  const now = Date.now();
  memory.forEach((e, k) => {
    if (k.startsWith(prefix)) {
      if (now - e.t <= TTL_MS) {
        out.set(k.slice(prefix.length), e.v);
      }
    }
  });
  return out;
}
function getCached(lang, text) {
  if (!text) return null;
  load();
  const e = memory.get(key(lang, text));
  if (!e) return null;
  if (Date.now() - e.t > TTL_MS) {
    memory.delete(key(lang, text));
    return null;
  }
  return e.v;
}
function setCached(lang, text, value) {
  if (!text || !value) return;
  load();
  memory.set(key(lang, text), { v: value, t: Date.now() });
  if (memory.size > MAX_ENTRIES) {
    const overflow = memory.size - MAX_ENTRIES;
    const keys = memory.keys();
    for (let i = 0; i < overflow; i++) {
      const k = keys.next().value;
      if (k == null) break;
      memory.delete(k);
    }
  }
  persist();
}
const LANGUAGES = [
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
  { code: "ur", label: "Urdu" }
];
const LANG_STORAGE_KEY = "ndsolo:lang";
const AUTO_RETRY_DELAY_MS = 4e3;
function readStoredLang() {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (v && LANGUAGES.some((l) => l.code === v)) return v;
  } catch {
  }
  return "en";
}
function applyDirection(value) {
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
function createStore() {
  let lang = readStoredLang();
  let error = null;
  let activeRequests = 0;
  let version = 0;
  let flushScheduled = false;
  let retryTimer = null;
  const listeners = /* @__PURE__ */ new Set();
  const resolved = /* @__PURE__ */ new Map();
  const pending = /* @__PURE__ */ new Map();
  const inFlight = /* @__PURE__ */ new Set();
  const failed = /* @__PURE__ */ new Set();
  const ctxKey = (l, t) => `${l}${t}`;
  const preloadLang = (targetLang) => {
    if (targetLang === "en") return;
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
          const idx = k.indexOf("");
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
        const failedTexts = e instanceof Error && "failedTexts" in e ? e.failedTexts : batchForFetch;
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
    const texts = [];
    for (const k of failed) {
      const idx = k.indexOf("");
      if (k.slice(0, idx) === lang) texts.push(k.slice(idx + 1));
    }
    failed.clear();
    error = null;
    if (texts.length) {
      let set = pending.get(lang);
      if (!set) {
        set = /* @__PURE__ */ new Set();
        pending.set(lang, set);
      }
      texts.forEach((t) => set.add(t));
      scheduleFlush();
    }
    bump();
  };
  const register = (targetLang, texts) => {
    if (targetLang === "en" || !texts.length) return;
    let added = false;
    for (const text of texts) {
      if (!text) continue;
      const k = ctxKey(targetLang, text);
      if (resolved.has(k) || inFlight.has(k) || failed.has(k)) continue;
      const cached = getCached(targetLang, text);
      if (cached) {
        resolved.set(k, cached);
        continue;
      }
      let set = pending.get(targetLang);
      if (!set) {
        set = /* @__PURE__ */ new Set();
        pending.set(targetLang, set);
      }
      if (!set.has(text)) {
        set.add(text);
        added = true;
      }
    }
    if (added) scheduleFlush();
  };
  const get = (targetLang, text) => {
    if (targetLang === "en" || !text) return null;
    const k = ctxKey(targetLang, text);
    const v = resolved.get(k);
    if (v) return v;
    const cached = getCached(targetLang, text);
    if (cached) {
      resolved.set(k, cached);
      return cached;
    }
    return null;
  };
  const setLang = (next) => {
    if (next === lang) {
      if (next !== "en") retryFailedTexts();
      return;
    }
    lang = next;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
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
  const subscribe2 = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  applyDirection(lang);
  return {
    lang,
    error,
    activeRequests,
    version,
    subscribe: subscribe2,
    get,
    register,
    setLang,
    retryFailed: retryFailedTexts
  };
}
const TranslationContext = reactExports.createContext(null);
function TranslationProvider({ children }) {
  const store = reactExports.useMemo(() => createStore(), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationContext.Provider, { value: store, children });
}
function useStore() {
  const store = reactExports.useContext(TranslationContext);
  if (!store) {
    throw new Error("useT/useTranslations must be used inside <TranslationProvider>");
  }
  reactExports.useSyncExternalStore(
    store.subscribe,
    () => store.version,
    () => store.version
  );
  return store;
}
function useTranslationStore() {
  return useStore();
}
function useT(text) {
  const store = useStore();
  const lang = store.lang;
  if (lang !== "en" && text) {
    store.register(lang, [text]);
  }
  const translated = store.get(lang, text);
  reactExports.useEffect(() => {
    store.register(lang, [text]);
  }, [store, lang, text]);
  return translated ?? text;
}
function useTranslator(staticTexts) {
  const store = useStore();
  const lang = store.lang;
  if (lang !== "en" && staticTexts.length) {
    store.register(lang, staticTexts);
  }
  reactExports.useEffect(() => {
    store.register(lang, [...staticTexts]);
  }, [store, lang, staticTexts]);
  return (text) => store.get(lang, text) ?? text;
}
function useLanguage() {
  const store = useStore();
  return { lang: store.lang, error: store.error, activeRequests: store.activeRequests };
}
function useSetLanguage() {
  const store = useStore();
  return store.setLang;
}
function LanguageSelector() {
  const { lang, error, activeRequests } = useLanguage();
  const setLang = useSetLanguage();
  const translating = activeRequests > 0;
  const [dismissedError, setDismissedError] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  reactExports.useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setDismissedError(true), 8e3);
    return () => clearTimeout(t);
  }, [error]);
  const handleChange = (value) => {
    setDismissedError(false);
    setMenuOpen(false);
    setLang(value);
  };
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center notranslate", translate: "no", ref: menuRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setMenuOpen((v) => !v),
        disabled: translating,
        "aria-label": `Language: ${current.label}`,
        "aria-haspopup": "menu",
        "aria-expanded": menuOpen,
        className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-transparent text-foreground hover:bg-muted/60 transition-colors disabled:opacity-60 disabled:cursor-wait",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" })
      }
    ),
    menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "menu",
        className: "absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-background shadow-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "py-1 max-h-72 overflow-y-auto", children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              role: "menuitemradio",
              "aria-checked": l.code === lang,
              onClick: () => handleChange(l.code),
              className: `flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted ${l.code === lang ? "text-accent font-medium" : "text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l.label }),
                l.code === lang && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "•" })
              ]
            }
          ) }, l.code)) })
        ]
      }
    ),
    translating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        className: "fixed left-1/2 top-4 z-[9999] -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-accent", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Translating…" })
        ]
      }
    ),
    error && !dismissedError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "alert",
        "aria-live": "assertive",
        className: "fixed left-1/2 top-4 z-[9999] -translate-x-1/2 flex items-center gap-2 rounded-full border border-destructive/30 bg-background/95 px-4 py-2 text-xs font-medium text-destructive shadow-lg backdrop-blur",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 text-destructive", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
        ]
      }
    )
  ] });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const searchSite = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  q: stringType().min(1).max(120),
  limit: numberType().min(1).max(20).default(8)
}).parse(input)).handler(createSsrRpc("a6fe99b6c5dcc70449cba6ff172f26fdfca262543e0dcc863e3d4993fb3c4e61"));
function SearchDialog({ open, onClose }) {
  const [q, setQ] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const navigate = useNavigate();
  const staticTexts = reactExports.useMemo(
    () => [
      "Search stories, trails and destinations",
      "Search",
      "Close search",
      "Search across articles, destinations, categories and tags.",
      `No matches for "${q}".`
    ],
    [q]
  );
  const t = useTranslator(staticTexts);
  reactExports.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else {
      setQ("");
      setResults([]);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchSite({ data: { q: q.trim(), limit: 8 } });
        setResults(res.results);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [q]);
  const resultTitles = results.map((r) => r.title);
  const rt = useTranslator(resultTitles);
  if (!open) return null;
  const go = (r) => {
    onClose();
    if (r.kind === "post") navigate({ to: "/blog/$slug", params: { slug: r.slug } });
    else navigate({ to: "/destinations/$slug", params: { slug: r.slug } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 pt-20 sm:pt-32",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": t("Search"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  value: q,
                  onChange: (e) => setQ(e.target.value),
                  placeholder: t("Search stories, trails and destinations"),
                  className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                }
              ),
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  "aria-label": t("Close search"),
                  className: "text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[60vh] overflow-y-auto", children: [
              q.trim() && !loading && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: t(`No matches for "${q}".`) }),
              !q.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: t("Search across articles, destinations, categories and tags.") }),
              results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "py-2", children: results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => go(r),
                  className: "flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted transition-colors",
                  children: [
                    r.kind === "post" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: rt(r.title) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: r.kind === "post" ? rt(r.category) + (r.excerpt ? ` · ${rt(r.excerpt)}` : "") : `${rt(r.country)}${r.region ? ` · ${rt(r.region)}` : ""}` })
                    ] })
                  ]
                }
              ) }, `${r.kind}-${r.id}`)) })
            ] })
          ]
        }
      )
    }
  );
}
const logoPath = "/assets/ndsolo-travel-logo-DrOVnHMo.png";
const LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Stories" },
  { to: "/destinations", label: "Destinations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
const HEADER_TEXTS = [
  "Home",
  "Stories",
  "Destinations",
  "Gallery",
  "About",
  "Contact",
  "Search",
  "Admin",
  "Account",
  "Sign in",
  "Sign out",
  "Menu",
  "Close menu",
  "Language",
  "Theme",
  "Signed out",
  "Sign out failed"
];
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [signedIn, setSignedIn] = reactExports.useState(false);
  const [isStaff, setIsStaff] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const headerTexts = reactExports.useMemo(() => [...HEADER_TEXTS], []);
  const t = useTranslator(headerTexts);
  async function handleSignOut() {
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      try {
        for (const k of Object.keys(localStorage)) {
          if (k.startsWith("sb-") && k.endsWith("-auth-token")) localStorage.removeItem(k);
        }
      } catch (e) {
      }
      setSignedIn(false);
      setIsStaff(false);
      setOpen(false);
      toast.success(t("Signed out"));
      navigate({ to: "/auth", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("Sign out failed"));
    }
  }
  const overHero = pathname === "/" && !scrolled;
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [pathname]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  reactExports.useEffect(() => {
    const checkRoles = async (uid) => {
      if (!uid) return setIsStaff(false);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const roles = (data ?? []).map((r) => r.role);
      setIsStaff(roles.includes("admin") || roles.includes("editor"));
    };
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      checkRoles(data.session?.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((e, session) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT" || e === "USER_UPDATED") {
        setSignedIn(!!session);
        checkRoles(session?.user.id);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const headerClass = overHero ? "bg-transparent text-white" : "bg-background/85 backdrop-blur-md border-b border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: `fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerClass}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: logoPath,
              alt: "ndsolotravel",
              className: `h-8 w-auto ${overHero ? "brightness-0 invert" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-7 text-sm", children: LINKS.map((l) => {
            const isHashLink = "hash" in l && !!l.hash;
            const active = !isHashLink && (l.to === "/" ? pathname === "/" : pathname === l.to || pathname.startsWith(l.to + "/"));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: l.to,
                hash: isHashLink ? l.hash : void 0,
                activeOptions: { exact: l.to === "/" },
                className: `relative transition-colors duration-200 ease-in-out ${overHero ? active ? "text-white font-medium" : "text-white/75 hover:text-[#FF7A00]" : active ? "text-accent font-medium" : "text-muted-foreground hover:text-[#FF7A00]"}`,
                children: [
                  t(l.label),
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      "aria-hidden": true,
                      className: `absolute left-0 right-0 -bottom-1 mx-auto h-px w-6 ${overHero ? "bg-white" : "bg-accent"}`
                    }
                  )
                ]
              },
              `${l.to}-${l.label}`
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSearchOpen(true),
                "aria-label": t("Search"),
                className: `inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${overHero ? "border-white/30 text-white hover:bg-white/10" : "border-border/60 text-foreground hover:bg-muted/60"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSelector, {})
            ] }),
            isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admin",
                className: `hidden sm:inline-flex items-center rounded-full border px-3 py-2 text-xs font-medium transition-colors ${overHero ? "border-white/30 text-white hover:bg-white/10" : "border-border hover:border-accent"}`,
                children: t("Admin")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: signedIn ? "/account" : "/auth",
                "aria-label": signedIn ? t("Account") : t("Sign in"),
                className: `hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${overHero ? "bg-white text-foreground hover:bg-white/90" : "bg-foreground text-background hover:opacity-90"}`,
                children: [
                  signedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }) : null,
                  signedIn ? t("Account") : t("Sign in")
                ]
              }
            ),
            signedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSignOut,
                "aria-label": t("Sign out"),
                title: t("Sign out"),
                className: `hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${overHero ? "border-white/30 text-white hover:bg-white/10" : "border-border/60 text-foreground hover:bg-muted/60"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen((v) => !v),
                "aria-label": t("Menu"),
                "aria-expanded": open,
                className: `md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border ${overHero ? "border-white/30 text-white" : "border-border"}`,
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "md:hidden fixed inset-0 z-[60] bg-black/50",
        onClick: () => setOpen(false),
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `md:hidden fixed top-0 right-0 z-[70] h-dvh w-[82%] max-w-sm bg-background border-l border-border shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`,
        "aria-hidden": !open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: t("Menu") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen(false),
                "aria-label": t("Close menu"),
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col px-3 py-3", children: LINKS.map((l) => {
            const isHashLink = "hash" in l && !!l.hash;
            const active = !isHashLink && (l.to === "/" ? pathname === "/" : pathname === l.to || pathname.startsWith(l.to + "/"));
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: l.to,
                hash: isHashLink ? l.hash : void 0,
                onClick: () => setOpen(false),
                className: `rounded-lg px-4 py-3 text-sm transition-colors duration-200 ease-in-out ${active ? "bg-muted text-accent font-medium" : "text-foreground hover:bg-muted hover:text-[#FF7A00]"}`,
                children: t(l.label)
              },
              `${l.to}-${l.label}`
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 border-t border-border px-5 py-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setOpen(false);
                  setSearchOpen(true);
                },
                className: "flex w-full items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
                  " ",
                  t("Search")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: t("Language") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSelector, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: t("Theme") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
            ] }),
            isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admin",
                onClick: () => setOpen(false),
                className: "block w-full rounded-full border border-border px-4 py-2 text-center text-sm font-medium hover:border-accent",
                children: t("Admin")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: signedIn ? "/account" : "/auth",
                onClick: () => setOpen(false),
                className: "block w-full rounded-full bg-foreground px-4 py-2 text-center text-sm font-medium text-background",
                children: signedIn ? t("Account") : t("Sign in")
              }
            ),
            signedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleSignOut,
                className: "flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  " ",
                  t("Sign out")
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchDialog, { open: searchOpen, onClose: () => setSearchOpen(false) })
  ] });
}
const SITE = {
  name: "ndsolotravel",
  description: "Cinematic stories from solo journeys across Pakistan, the Karakoram, Nanga Parbat, and beyond. Trekking guides, motorcycle adventures, and travel photography.",
  socials: {
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    twitter: "https://twitter.com/",
    facebook: "#",
    linkedin: "#",
    tiktok: "#"
  }
};
const CATEGORIES = [
  "Solo Travel",
  "Motorcycle Adventure Travel",
  "Adventure Travel",
  "Trekking",
  "Hiking",
  "Mountains",
  "Nanga Parbat",
  "Pakistan Tourism",
  "Photography",
  "Travel Tips",
  "Travel Gear",
  "Budget Travel",
  "Travel Stories"
];
const subscribe = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  const email = typeof raw?.email === "string" ? raw.email.trim() : "";
  return objectType({
    email: stringType().email("Please enter a valid email address.")
  }).parse({
    email
  });
}).handler(createSsrRpc("47788b7666be982aca3ef5f15a2fcc6897f28fce0ebb29e9fb1da0ab79c42b13"));
const contactSchema = objectType({
  name: stringType().trim().min(1, "Please enter your name.").max(120),
  email: stringType().trim().email("Please enter a valid email address.").max(320),
  subject: stringType().trim().max(200).optional().default(""),
  message: stringType().trim().min(1, "Please enter your message.").max(5e3),
  // Honeypot — bots fill all fields; humans never see it
  website: stringType().max(0).optional().default("")
});
const sendContact = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  const payload = {
    name: typeof raw?.name === "string" ? raw.name.trim() : "",
    email: typeof raw?.email === "string" ? raw.email.trim() : "",
    subject: typeof raw?.subject === "string" ? raw.subject.trim() : "",
    message: typeof raw?.message === "string" ? raw.message.trim() : "",
    website: typeof raw?.website === "string" ? raw.website.trim() : ""
  };
  return contactSchema.parse(payload);
}).handler(createSsrRpc("ca369ea727ea5123aa5fee3fbc329cf735853eecfa76d8574d642a4ea46deb77"));
createServerFn({
  method: "POST"
}).handler(createSsrRpc("2c4583f12bce21ae798f1680d431270090538471e946cd081e4b8d8460ec2b1a"));
const NEWSLETTER_TEXTS = [
  "you@summit.com",
  "Subscribe",
  "Subscribed. Welcome aboard.",
  "Could not subscribe. Try again."
];
function NewsletterForm({ dark = false }) {
  const subscribeFn = useServerFn(subscribe);
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const t = useTranslator([...NEWSLETTER_TEXTS]);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribeFn({ data: { email } });
      toast.success(t("Subscribed. Welcome aboard."));
      setEmail("");
    } catch {
      toast.error(t("Could not subscribe. Try again."));
    } finally {
      setLoading(false);
    }
  }
  const base = "flex-1 rounded-full px-4 py-2.5 text-sm outline-none border transition focus:border-accent";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "flex flex-col gap-2 sm:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "email",
        required: true,
        placeholder: t("you@summit.com"),
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: `${base} ${dark ? "bg-white/5 border-white/15 text-secondary-foreground placeholder:text-secondary-foreground/40" : "bg-background border-border placeholder:text-muted-foreground"}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: loading,
        className: "rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition disabled:opacity-50",
        children: loading ? "…" : t("Subscribe")
      }
    )
  ] });
}
const FOOTER_TEXTS = [
  "Explore",
  "Stories",
  "Destinations",
  "Gallery",
  "About",
  "Contact",
  "Newsletter",
  "Stories from the road. No spam, ever.",
  "Instagram",
  "YouTube",
  "X",
  "Facebook",
  "LinkedIn",
  "TikTok"
];
function TikTokIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) });
}
function Footer() {
  const footerTexts = reactExports.useMemo(() => [...FOOTER_TEXTS], []);
  const t = useTranslator(footerTexts);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const bottomTexts = reactExports.useMemo(
    () => [
      `© ${year} ${SITE.name}. All stories made on the move.`,
      "Built for solo travellers, by a solo traveller."
    ],
    [year]
  );
  const bottomT = useTranslator(bottomTexts);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-24 border-t border-border bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "group inline-flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logoPath,
            alt: "ndsolotravel",
            className: "h-8 w-auto brightness-0 invert transition-[filter] duration-300 ease-in-out group-hover:[filter:none]"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-sm text-sm text-secondary-foreground/70", children: t(SITE.description) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.instagram,
              "aria-label": t("Instagram"),
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110",
              style: {
                background: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.youtube,
              "aria-label": t("YouTube"),
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.twitter,
              "aria-label": t("X"),
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.facebook,
              "aria-label": t("Facebook"),
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.linkedin,
              "aria-label": t("LinkedIn"),
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.tiktok,
              "aria-label": t("TikTok"),
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: t("Explore") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-secondary-foreground/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "hover:text-accent", children: t("Stories") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations", className: "hover:text-accent", children: t("Destinations") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "hover:text-accent", children: t("Gallery") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-accent", children: t("About") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-accent", children: t("Contact") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: t("Newsletter") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-secondary-foreground/70", children: t("Stories from the road. No spam, ever.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, { dark: true }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: bottomT(bottomTexts[0]) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: bottomT(bottomTexts[1]) })
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Off the map" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This trail doesn't lead anywhere. Let's head back to base camp." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went sideways" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-border px-4 py-2 text-sm", children: "Go home" })
    ] })
  ] }) });
}
const Route$o = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ndsolotravel — Solo travel, mountains & motorcycles" },
      {
        name: "description",
        content: "Cinematic stories from solo journeys across Pakistan, the Karakoram and Nanga Parbat. Trekking guides, motorcycle adventures and travel photography."
      },
      { name: "author", content: "ndsolotravel" },
      { property: "og:site_name", content: "ndsolotravel" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F172A" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Inter:wght@400;500;600;700&display=swap"
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ndsolotravel",
          description: "Solo travel, trekking, motorcycle adventure, Nanga Parbat and Pakistan tourism."
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScriptOnce, { children: `(()=>{try{const t=localStorage.getItem('theme');const d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})()` }),
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$o.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 ${isHome ? "" : "pt-16"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TitleTranslator, {})
  ] }) });
}
function TitleTranslator() {
  const title = typeof document === "undefined" ? "" : document.title;
  const translated = useT(title);
  reactExports.useEffect(() => {
    if (typeof document === "undefined" || !translated || translated === title) return;
    document.title = translated;
  }, [translated, title]);
  return null;
}
const listPosts = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  category: stringType().optional(),
  categories: arrayType(stringType()).optional(),
  tag: stringType().optional(),
  search: stringType().optional(),
  limit: numberType().min(1).max(50).default(24),
  offset: numberType().min(0).default(0),
  featuredOnly: booleanType().optional(),
  sort: enumType(["latest", "popular"]).default("latest"),
  sinceDays: numberType().min(1).max(365).optional()
}).parse(input ?? {})).handler(createSsrRpc("11a3e5221d8be21b9fdddebef660f538b92679319c39b4d5a1df7f1408533287"));
const getPostBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("9c8084edff95c284c741e3785ab938a71693bfe26e2c07e4c0272b47d311afc2"));
const listAllPostSlugs = createServerFn({
  method: "GET"
}).handler(createSsrRpc("98f1f07821f4ca35a777ae3a9c3739bd15d263f1786ca97572dcb7a9cd5f9183"));
const listDestinations = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1e527b6631307654bc7f81cb758bd7a871fe81f3441e69d22bb529f27b5e4965"));
const getDestinationBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(createSsrRpc("42d8c5a0f2ac4a51b2ee36862863046dc42ef21708bdbe47e53e1eb60378f141"));
const BASE_URL = "";
const Route$n = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await listAllPostSlugs();
        const dests = await listDestinations();
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/blog", priority: "0.9", changefreq: "daily" },
          { path: "/destinations", priority: "0.8", changefreq: "weekly" },
          { path: "/gallery", priority: "0.7", changefreq: "weekly" },
          { path: "/about", priority: "0.5", changefreq: "monthly" },
          { path: "/contact", priority: "0.4", changefreq: "monthly" }
        ];
        const postEntries = posts.map((p) => ({
          path: `/blog/${p.slug}`,
          lastmod: p.updated_at,
          changefreq: "monthly",
          priority: "0.8"
        }));
        const destEntries = dests.map((d) => ({
          path: `/destinations/${d.slug}`,
          changefreq: "monthly",
          priority: "0.6"
        }));
        const all = [...staticEntries, ...postEntries, ...destEntries];
        const urls = all.map(
          (e) => `  <url><loc>${BASE_URL}${e.path}</loc>${"lastmod" in e && e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$l = () => import("./map-BTU5dmpx.mjs");
const Route$m = createFileRoute("/map")({
  beforeLoad: () => {
    throw redirect({
      to: "/destinations",
      hash: "interactive-map"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const listGallery = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9af9309080664fa919d9f0ccc1d1b1233ba78f5ec575fcd3aaab715c0a8a455b"));
const qo$1 = queryOptions({
  queryKey: ["gallery"],
  queryFn: () => listGallery()
});
const $$splitComponentImporter$k = () => import("./gallery-BJbnaLcy.mjs");
const Route$l = createFileRoute("/gallery")({
  head: () => ({
    meta: [{
      title: "Gallery — ndsolotravel"
    }, {
      name: "description",
      content: "Travel photography from the Karakoram, Nanga Parbat, Hunza and beyond."
    }, {
      property: "og:title",
      content: "Gallery — ndsolotravel"
    }, {
      property: "og:url",
      content: "/gallery"
    }],
    links: [{
      rel: "canonical",
      href: "/gallery"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(qo$1),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./destinations-vIosy0PX.mjs");
const Route$k = createFileRoute("/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./dashboard-BTU5dmpx.mjs");
const Route$j = createFileRoute("/dashboard")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      hash: "journey-in-numbers"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./contact-DSCOA8j8.mjs");
const Route$i = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — ndsolotravel"
    }, {
      name: "description",
      content: "Get in touch with ndsolotravel for collaborations, questions, or just to say hi."
    }, {
      property: "og:title",
      content: "Contact — ndsolotravel"
    }, {
      property: "og:description",
      content: "Get in touch with ndsolotravel."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./blog-9Hd3AP52.mjs");
const Route$h = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./auth-D_Q7S2CZ.mjs");
const authSearchSchema = objectType({
  redirect: stringType().optional(),
  error: stringType().optional()
});
const Route$g = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  head: () => ({
    meta: [{
      title: "Sign in — ndsolotravel"
    }, {
      name: "description",
      content: "Sign in or create an account to manage CMS and stories."
    }, {
      name: "robots",
      content: "noindex"
    }, {
      property: "og:url",
      content: "/auth"
    }],
    links: [{
      rel: "canonical",
      href: "/auth"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./about-B3lwdFQO.mjs");
const Route$f = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — ndsolotravel"
    }, {
      name: "description",
      content: "About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person."
    }, {
      property: "og:title",
      content: "About — ndsolotravel"
    }, {
      property: "og:description",
      content: "About the solo traveller behind ndsolotravel."
    }, {
      property: "og:url",
      content: "/about"
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./route-BFsOu0JM.mjs");
const SIGN_IN_ROUTE = "/auth";
const Route$e = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({
    location
  }) => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: SIGN_IN_ROUTE,
        search: {
          redirect: location.pathname
        }
      });
    }
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const postsQO = queryOptions({
  queryKey: ["home", "posts"],
  queryFn: () => listPosts({
    data: {
      limit: 6
    }
  })
});
const featuredQO = queryOptions({
  queryKey: ["home", "featured"],
  queryFn: () => listPosts({
    data: {
      limit: 1,
      featuredOnly: true
    }
  })
});
const destQO$1 = queryOptions({
  queryKey: ["home", "destinations"],
  queryFn: () => listDestinations()
});
const popularQO = queryOptions({
  queryKey: ["home", "popular"],
  queryFn: () => listPosts({
    data: {
      limit: 3,
      sort: "popular",
      sinceDays: 30
    }
  })
});
const guidesQO = queryOptions({
  queryKey: ["home", "guides"],
  queryFn: () => listPosts({
    data: {
      limit: 3,
      categories: ["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"]
    }
  })
});
const galleryQO = queryOptions({
  queryKey: ["home", "gallery"],
  queryFn: () => listGallery()
});
const motoQO = queryOptions({
  queryKey: ["home", "moto"],
  queryFn: () => listPosts({
    data: {
      limit: 1,
      categories: ["Motorcycle Adventure Travel"]
    }
  })
});
const $$splitComponentImporter$c = () => import("./index-DJqMH-Eo.mjs");
const Route$d = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "ndsolotravel — Solo travel, mountains & motorcycles"
    }, {
      name: "description",
      content: "Cinematic solo travel stories. Trekking Nanga Parbat, riding the Karakoram, photographing the Himalaya."
    }, {
      property: "og:title",
      content: "ndsolotravel"
    }, {
      property: "og:description",
      content: "Solo travel stories from the Karakoram and beyond."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(postsQO);
    context.queryClient.ensureQueryData(featuredQO);
    context.queryClient.ensureQueryData(destQO$1);
    context.queryClient.ensureQueryData(popularQO);
    context.queryClient.ensureQueryData(guidesQO);
    context.queryClient.ensureQueryData(galleryQO);
    context.queryClient.ensureQueryData(motoQO);
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const destQO = queryOptions({
  queryKey: ["destinations"],
  queryFn: () => listDestinations()
});
const $$splitComponentImporter$b = () => import("./destinations.index-B3Qxx-cl.mjs");
const Route$c = createFileRoute("/destinations/")({
  head: () => ({
    meta: [{
      title: "Destinations — ndsolotravel"
    }, {
      name: "description",
      content: "Country and region guides: Pakistan, Karakoram, Nanga Parbat, Hunza and trekking routes."
    }, {
      property: "og:title",
      content: "Destinations — ndsolotravel"
    }, {
      property: "og:description",
      content: "Country and region guides for solo travellers."
    }, {
      property: "og:url",
      content: "/destinations"
    }],
    links: [{
      rel: "canonical",
      href: "/destinations"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(destQO),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const blogQO = (params) => queryOptions({
  queryKey: ["blog", params],
  queryFn: () => listPosts({
    data: {
      limit: 50,
      ...params
    }
  })
});
const $$splitComponentImporter$a = () => import("./blog.index-bh6PtXTD.mjs");
const searchSchema = objectType({
  category: stringType().optional(),
  tag: stringType().optional(),
  q: stringType().optional()
});
const Route$b = createFileRoute("/blog/")({
  validateSearch: searchSchema,
  loaderDeps: ({
    search
  }) => search,
  head: () => ({
    meta: [{
      title: "Stories — ndsolotravel"
    }, {
      name: "description",
      content: "Solo travel stories, trekking journals, motorcycle adventures and photography essays."
    }, {
      property: "og:title",
      content: "Stories — ndsolotravel"
    }, {
      property: "og:description",
      content: "Solo travel and adventure stories."
    }, {
      property: "og:url",
      content: "/blog"
    }],
    links: [{
      rel: "canonical",
      href: "/blog"
    }]
  }),
  loader: ({
    context,
    deps
  }) => {
    context.queryClient.ensureQueryData(blogQO({
      category: deps.category,
      tag: deps.tag,
      search: deps.q
    }));
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitNotFoundComponentImporter$1 = () => import("./destinations._slug-C5HYyMtN.mjs");
const qo = (slug) => queryOptions({
  queryKey: ["destination", slug],
  queryFn: () => getDestinationBySlug({
    data: {
      slug
    }
  })
});
const Route$a = createFileRoute("/destinations/$slug")({
  loader: async ({
    params,
    context
  }) => {
    const d = await context.queryClient.ensureQueryData(qo(params.slug));
    if (!d) throw notFound();
    return d;
  },
  head: ({
    loaderData,
    params
  }) => ({
    meta: [{
      title: loaderData ? `${loaderData.title} — ndsolotravel` : "Destination"
    }, {
      name: "description",
      content: loaderData?.description ?? "Destination guide."
    }, {
      property: "og:title",
      content: loaderData?.title ?? "Destination"
    }, {
      property: "og:description",
      content: loaderData?.description ?? ""
    }, {
      property: "og:url",
      content: `/destinations/${params.slug}`
    }, ...loaderData?.featured_image ? [{
      property: "og:image",
      content: loaderData.featured_image
    }] : []],
    links: [{
      rel: "canonical",
      href: `/destinations/${params.slug}`
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const $$splitNotFoundComponentImporter = () => import("./blog._slug-DAKq1vMF.mjs");
const $$splitComponentImporter$9 = () => import("./blog._slug-Dbmi6ljn.mjs");
const postQO = (slug) => queryOptions({
  queryKey: ["post", slug],
  queryFn: () => getPostBySlug({
    data: {
      slug
    }
  })
});
const Route$9 = createFileRoute("/blog/$slug")({
  loader: async ({
    params,
    context
  }) => {
    const data = await context.queryClient.ensureQueryData(postQO(params.slug));
    if (!data.post) throw notFound();
    return data;
  },
  head: ({
    loaderData,
    params
  }) => {
    const p = loaderData?.post;
    const title = p?.seo_title || (p ? `${p.title} — ndsolotravel` : "Story — ndsolotravel");
    const desc = p?.seo_description || p?.excerpt || "A solo travel story from ndsolotravel.";
    const image = p?.og_image_url || p?.cover_image;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: `/blog/${params.slug}`
      }, ...image ? [{
        property: "og:image",
        content: image
      }] : [], ...image ? [{
        name: "twitter:image",
        content: image
      }] : [], {
        name: "twitter:card",
        content: "summary_large_image"
      }],
      links: [{
        rel: "canonical",
        href: `/blog/${params.slug}`
      }],
      scripts: p ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: desc,
          image: image ?? void 0,
          datePublished: p.published_at ?? p.created_at,
          articleSection: p.category,
          keywords: p.tags?.join(", "),
          author: {
            "@type": "Person",
            name: "ndsolotravel"
          }
        })
      }] : []
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const getMyRoles = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("bc043367e3258bc0750efadc2962d5983ded7a90f892e25e8da034f07aee469d"));
const adminListPosts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c36083dfd2f49d453c7629b8a868d6b2b5a7c9fc0ff160379cfd2d3adcba24b4"));
const adminGetPost = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("39cc3b2fa50fed380c22addea0464b62e9c7ba06bba85ecf08a5487be7b1b408"));
const postInputSchema = objectType({
  id: stringType().uuid().optional(),
  title: stringType().trim().min(1).max(200),
  slug: stringType().trim().min(1).max(200).optional(),
  excerpt: stringType().max(500).optional().nullable(),
  content: stringType().default(""),
  cover_image: stringType().url().optional().nullable().or(literalType("")),
  category: stringType().min(1).max(80),
  tags: arrayType(stringType().max(40)).max(20).default([]),
  featured: booleanType().default(false),
  published: booleanType().default(false),
  scheduled_at: stringType().datetime().optional().nullable().or(literalType("")),
  destination_id: stringType().uuid().optional().nullable().or(literalType("")),
  travel_date: stringType().optional().nullable().or(literalType("")),
  seo_title: stringType().max(200).optional().nullable().or(literalType("")),
  seo_description: stringType().max(500).optional().nullable().or(literalType("")),
  og_image_url: stringType().url().optional().nullable().or(literalType("")),
  gallery: arrayType(objectType({
    id: stringType().optional(),
    image_url: stringType().min(1),
    alt_text: stringType().optional().nullable(),
    sort_order: numberType().default(0)
  })).optional()
});
const adminUpsertPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => postInputSchema.parse(i)).handler(createSsrRpc("ad25067aac02edfbbef739e707988bc188b8eedd0ff973f2468774a4919f719f"));
const adminDeletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("706974d253749a4b207ea9f45681167b7d9acb69ae04a29b711b2519d6b957f5"));
const adminTogglePublish = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid(),
  published: booleanType()
}).parse(i)).handler(createSsrRpc("4587620b23cd42114286fc00c107bde8089ec278c221ff7eebee1dec6af9875c"));
const destInputSchema = objectType({
  id: stringType().uuid().optional(),
  title: stringType().trim().min(1).max(200),
  slug: stringType().trim().min(1).max(200).optional(),
  country: stringType().min(1).max(120),
  region: stringType().max(120).optional().nullable(),
  description: stringType().max(4e3).optional().nullable(),
  featured_image: stringType().url().optional().nullable().or(literalType("")),
  published: booleanType().default(true)
});
const adminListDestinations = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c8d7c18700bbea254b71d38c25a5baae5134ab94d54a719f78ce477f129a7854"));
const adminUpsertDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => destInputSchema.parse(i)).handler(createSsrRpc("7d4026e9578e6fdf78470f8c8447b5536226df925c9d7afda40f0c5417bd2f77"));
const adminDeleteDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("22dbf5a0bd1aa4105a7bf3eff794bd8738e2b5fef5f61aec5d79f152ea65a351"));
const adminListComments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("041edda5bad3e8b83429c688f7fbe59e6c6dbe398445ee4624099f4b361b1a74"));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118"));
const adminListMessages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a93dcca664db7845b2d7a9b6c8f0b0f7cb52a62972f962422ce68f8dd2e3fd1e"));
const adminUpdateMessageStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid(),
  status: enumType(["new", "read", "replied"])
}).parse(i)).handler(createSsrRpc("373fbb90a7481a50b31f610c285b9e222e7b94cde4e0f85bb3942716793b8ca6"));
const adminDeleteMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("8eec2cf3796c533b3105ae32ffff41f9d081738ea9252d35057f78d72160727a"));
const adminAnalytics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ad0c092d9068302d584e4ee6c929270ef251348f837bd3ea129892db963c741d"));
const adminUploadImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  filename: stringType().min(1).max(200),
  contentType: stringType().min(1).max(100),
  base64: stringType().min(1)
}).parse(i)).handler(createSsrRpc("72eaf964ab7ce14d623874daf7be210de5431691ecf47076df88fef9c15ca3d3"));
const $$splitComponentImporter$8 = () => import("./admin-Bj72c-OC.mjs");
const Route$8 = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    let roles = [];
    try {
      roles = await getMyRoles();
    } catch {
      throw redirect({
        to: "/auth",
        search: {
          redirect: "/admin"
        }
      });
    }
    if (!roles.includes("admin") && !roles.includes("editor")) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: "/admin",
          error: "unauthorized_admin"
        }
      });
    }
    return {
      roles
    };
  },
  head: () => ({
    meta: [{
      title: "Admin — ndsolotravel"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./account-DpSTUqQb.mjs");
const Route$7 = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [{
      title: "Account — ndsolotravel"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.index-DRxjWGje.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.messages-Dcdr7DVY.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.destinations-C2imNdnl.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.comments-B0_eg5_W.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/comments")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.posts.index-BOAo8wzV.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.posts.new-_XK_H9oK.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/posts/new")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.posts._id-PnhhJna_.mjs");
const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$n.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$o
});
const MapRoute = Route$m.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$o
});
const GalleryRoute = Route$l.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$o
});
const DestinationsRoute = Route$k.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => Route$o
});
const DashboardRoute = Route$j.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$o
});
const ContactRoute = Route$i.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$o
});
const BlogRoute = Route$h.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$o
});
const AuthRoute = Route$g.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$o
});
const AboutRoute = Route$f.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$o
});
const AuthenticatedRouteRoute = Route$e.update({
  id: "/_authenticated",
  getParentRoute: () => Route$o
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$o
});
const DestinationsIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => DestinationsRoute
});
const BlogIndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const DestinationsSlugRoute = Route$a.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => DestinationsRoute
});
const BlogSlugRoute = Route$9.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AuthenticatedAdminRoute = Route$8.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAccountRoute = Route$7.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminMessagesRoute = Route$5.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminDestinationsRoute = Route$4.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCommentsRoute = Route$3.update({
  id: "/comments",
  path: "/comments",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPostsIndexRoute = Route$2.update({
  id: "/posts/",
  path: "/posts/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPostsNewRoute = Route$1.update({
  id: "/posts/new",
  path: "/posts/new",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPostsIdRoute = Route.update({
  id: "/posts/$id",
  path: "/posts/$id",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminCommentsRoute,
  AuthenticatedAdminDestinationsRoute,
  AuthenticatedAdminMessagesRoute,
  AuthenticatedAdminIndexRoute,
  AuthenticatedAdminPostsIdRoute,
  AuthenticatedAdminPostsNewRoute,
  AuthenticatedAdminPostsIndexRoute
};
const AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAccountRoute,
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const BlogRouteChildren = {
  BlogSlugRoute,
  BlogIndexRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const DestinationsRouteChildren = {
  DestinationsSlugRoute,
  DestinationsIndexRoute
};
const DestinationsRouteWithChildren = DestinationsRoute._addFileChildren(
  DestinationsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AboutRoute,
  AuthRoute,
  BlogRoute: BlogRouteWithChildren,
  ContactRoute,
  DashboardRoute,
  DestinationsRoute: DestinationsRouteWithChildren,
  GalleryRoute,
  MapRoute,
  SitemapDotxmlRoute
};
const routeTree = Route$o._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  adminTogglePublish as A,
  adminDeletePost as B,
  CATEGORIES as C,
  postsQO as D,
  featuredQO as E,
  destQO$1 as F,
  popularQO as G,
  guidesQO as H,
  galleryQO as I,
  motoQO as J,
  router as K,
  NewsletterForm as N,
  Route$g as R,
  SITE as S,
  useServerFn as a,
  Route$b as b,
  blogQO as c,
  useTranslationStore as d,
  adminAnalytics as e,
  adminListMessages as f,
  getMyRoles as g,
  adminUpdateMessageStatus as h,
  adminDeleteMessage as i,
  adminListDestinations as j,
  adminUpsertDestination as k,
  logoPath as l,
  adminDeleteDestination as m,
  adminUploadImage as n,
  adminListComments as o,
  adminDeleteComment as p,
  qo$1 as q,
  Route as r,
  sendContact as s,
  adminGetPost as t,
  useTranslator as u,
  destQO as v,
  createSsrRpc as w,
  Route$9 as x,
  adminUpsertPost as y,
  adminListPosts as z
};
