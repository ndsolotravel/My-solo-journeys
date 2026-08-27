import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const serverCache = /* @__PURE__ */ new Map();
const BATCH_SIZE = 15;
const FETCH_TIMEOUT_MS = 6e3;
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
function extractTranslation(data) {
  if (!Array.isArray(data) || !Array.isArray(data[0])) return "";
  return data[0].map((item) => Array.isArray(item) && item ? String(item[0] ?? "") : "").join("");
}
async function fetchSingleFromGoogle(text, targetLang) {
  const clients = ["dict-chrome-ex", "gtx"];
  for (const client of clients) {
    try {
      const params = new URLSearchParams({
        client,
        sl: "en",
        tl: targetLang,
        dt: "t",
        q: text
      });
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const translated = extractTranslation(data);
      if (translated && translated.trim()) return translated.trim();
    } catch {
    }
  }
  try {
    const u = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(u, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    if (res.ok) {
      const data = await res.json();
      const val = data.responseData?.translatedText;
      if (val && !val.includes("MYMEMORY WARNING")) return val.trim();
    }
  } catch {
  }
  return "";
}
async function translateBatch(batch, targetLang) {
  const batchResult = /* @__PURE__ */ new Map();
  if (!batch.length) return batchResult;
  if (batch.length === 1) {
    const single = batch[0];
    const trans = await fetchSingleFromGoogle(single, targetLang);
    if (trans) batchResult.set(single, trans);
    return batchResult;
  }
  const joined = batch.join("\n");
  let batchSuccess = false;
  try {
    const params = new URLSearchParams({
      client: "dict-chrome-ex",
      sl: "en",
      tl: targetLang,
      dt: "t",
      q: joined
    });
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    if (res.ok) {
      const data = await res.json();
      const raw = extractTranslation(data);
      const splitLines = raw.split("\n");
      if (splitLines.length === batch.length) {
        batch.forEach((orig, idx) => {
          const trans = splitLines[idx]?.trim();
          if (trans) {
            batchResult.set(orig, trans);
          }
        });
        batchSuccess = true;
      }
    }
  } catch {
  }
  if (!batchSuccess) {
    const individual = await Promise.all(
      batch.map(async (text) => {
        const trans = await fetchSingleFromGoogle(text, targetLang);
        return { text, trans };
      })
    );
    for (const item of individual) {
      if (item.trans) batchResult.set(item.text, item.trans);
    }
  }
  return batchResult;
}
async function requestTranslations(texts, targetLang) {
  const result = /* @__PURE__ */ new Map();
  if (!texts.length || targetLang === "en") return result;
  const uncached = [];
  for (const text of texts) {
    if (!text || !text.trim()) continue;
    const cleanText = text.trim();
    const cacheKey = `${targetLang}:${cleanText}`;
    if (serverCache.has(cacheKey)) {
      const val = serverCache.get(cacheKey);
      result.set(text, val);
      result.set(cleanText, val);
    } else {
      if (!uncached.includes(cleanText)) {
        uncached.push(cleanText);
      }
    }
  }
  if (uncached.length) {
    const chunks = [];
    for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
      chunks.push(uncached.slice(i, i + BATCH_SIZE));
    }
    const chunkResults = await Promise.all(
      chunks.map((chunk) => translateBatch(chunk, targetLang))
    );
    for (const map of chunkResults) {
      map.forEach((val, key) => {
        if (val) {
          result.set(key, val);
          serverCache.set(`${targetLang}:${key}`, val);
        }
      });
    }
  }
  for (const text of texts) {
    if (!text) continue;
    const clean = text.trim();
    const val = result.get(clean) || serverCache.get(`${targetLang}:${clean}`);
    if (val) {
      result.set(text, val);
    }
  }
  return result;
}
const translateTexts_createServerFn_handler = createServerRpc({
  id: "b77a5bffb98582e79619ef6ddb56139906f9f742c4a164964c7ca6ce1c154ee8",
  name: "translateTexts",
  filename: "src/lib/translate/translate.functions.ts"
}, (opts) => translateTexts.__executeServer(opts));
const translateTexts = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  lang: stringType().min(2).max(8),
  texts: arrayType(stringType()).max(300).default([])
}).parse(input ?? {})).handler(translateTexts_createServerFn_handler, async ({
  data
}) => {
  const map = await requestTranslations(data.texts, data.lang);
  const out = {};
  map.forEach((value, key) => {
    out[key] = value;
  });
  return out;
});
export {
  translateTexts_createServerFn_handler
};
