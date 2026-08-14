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
const GTX_URLS = [
  "https://translate.googleapis.com/translate_a/single",
  "https://translate.google.com/translate_a/t?client=webapp"
];
function extractTranslation(data) {
  if (!Array.isArray(data) || !Array.isArray(data[0])) return "";
  return data[0].map((item) => Array.isArray(item) && item ? String(item[0] ?? "") : "").join("");
}
const FETCH_TIMEOUT_MS = 8e3;
async function fetchTranslation(text, targetLang) {
  for (const url of GTX_URLS) {
    try {
      const params = new URLSearchParams({
        client: url.includes("webapp") ? "webapp" : "gtx",
        sl: "en",
        tl: targetLang,
        dt: "t",
        q: text
      });
      const endpoint = new URL(url);
      endpoint.search = params.toString();
      const res = await fetch(endpoint.toString(), {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const translated = extractTranslation(data);
      if (translated) return translated;
    } catch {
    }
  }
  return "";
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function requestTranslations(texts, targetLang) {
  const result = /* @__PURE__ */ new Map();
  if (!texts.length || targetLang === "en") return result;
  const chunkSize = 5;
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    const translated = await Promise.all(
      chunk.map(async (text) => {
        if (!text || !text.trim()) return null;
        const value = await fetchTranslation(text.trim(), targetLang);
        return { text, value };
      })
    );
    for (const entry of translated) {
      if (entry?.value) result.set(entry.text, entry.value);
    }
    if (i + chunkSize < texts.length) await delay(120);
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
