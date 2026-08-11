import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslator, q as qo$1 } from "./router-Pb4k1ggT.mjs";
import { a as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useLocalizedGallery } from "./useLocalized-cp7Zp1YA.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import { X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./client-BaX1TKIB.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-7J1GkVFt.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
function GalleryPage() {
  const {
    data: rawItems
  } = useSuspenseQuery(qo$1);
  const items = useLocalizedGallery(rawItems);
  const [active, setActive] = reactExports.useState(null);
  const t = useTranslator(["Photography", "The light, the cold, the patience.", "A thousand sunrises above 4,000 metres.", "Close"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&q=80", alt: "Yosemite valley golden hour", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Photography") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("The light, the cold, the patience.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: t("A thousand sunrises above 4,000 metres.") })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-3xl sr-only", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Photography") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl", children: t("The light, the cold, the patience.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: t("A thousand sunrises above 4,000 metres.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3", children: items.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActive(g), className: "mb-4 block w-full overflow-hidden rounded-2xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.image_url, alt: g.caption ?? "", loading: "lazy", className: "aspect-[16/9] w-full object-cover transition-transform duration-700 hover:scale-105" }) }, g.id)) }),
      active && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActive(null), className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": t("Close"), onClick: () => setActive(null), className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: active.image_url, alt: active.caption ?? "", className: "max-h-[90vh] max-w-[95vw] rounded-2xl" }),
        active.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white", children: active.caption })
      ] })
    ] })
  ] });
}
export {
  GalleryPage as component
};
