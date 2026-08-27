import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, N as settingsQO } from "./router-DayqgajF.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PageBreadcrumbs } from "./PageBreadcrumbs-DNC4orEb.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
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
import "./admin.functions-DGJYtjjS.mjs";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./client-BaIz-VBI.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const aboutPortrait = "/assets/nd-about-CHpXGkDQ.jpg";
const BIO = ["Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.", "I am a solo traveler and an Engineer by profession. While engineering has shaped the way I think, solve problems, and plan, traveling has taught me to be curious, adaptable, independent, and open to the unexpected.", "For me, solo travel is more than simply visiting new destinations. It is about getting away from the familiar, riding unfamiliar roads, hiking through remote landscapes, meeting people from different backgrounds, and creating experiences that stay with you long after the journey ends.", "Through NDSOLOTRAVEL, I share my journeys, motorcycle adventures, hiking experiences, destinations, travel stories, photographs, and the lessons I discover along the way.", "I believe you do not always need a group, a perfect plan, or a luxury itinerary to explore the world. Sometimes, all you need is the courage to start, an open mind, and the willingness to take the road less travelled.", "Travel is my way of discovering the world, challenging myself, and continuing to learn beyond the boundaries of everyday life."];
function AboutPage() {
  const t = useTranslations();
  const {
    data: settings
  } = useSuspenseQuery(settingsQO);
  const portraitSrc = settings?.about_image_url || aboutPortrait;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80", alt: "Traveller on a mountain ridge", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("About") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("Solo, slow, and almost always uphill.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "About"
        }] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: t("Solo, slow, and almost always uphill.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-12 lg:grid-cols-2 lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-3xl border border-border shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: portraitSrc, alt: "ndsolotravel portrait", className: "aspect-[3/4] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg", children: BIO.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t(p) }, p)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16 rounded-3xl bg-muted/40 p-8 sm:p-10 border border-border/50 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold sm:text-3xl", children: t("Travel philosophy") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xl italic leading-relaxed text-foreground/90", children: [
          '"',
          t("Solo travel is where the journey becomes the destination"),
          '"'
        ] })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
