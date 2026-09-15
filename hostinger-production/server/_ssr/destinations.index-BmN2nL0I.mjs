import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, a8 as destQO$1, a9 as heroQO } from "./router-CPQnAHT3.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdSlot } from "./AdSlot-DPYKPH6A.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { a6 as MountainSnow, $ as Earth, O as Route, a7 as BookOpen, a5 as ArrowUpRight, B as Compass, a8 as ChevronDown, f as ArrowRight, m as MapPin } from "../_libs/lucide-react.mjs";
import { M as MotionConfig, m as motion, u as useReducedMotion, a as useScroll, b as useTransform } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./createSsrRpc-BLJWJFkS.mjs";
import "./client-BqBvvzI9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "./posts.functions-S458rgU7.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-DKXRUyGU.mjs";
import "./admin.functions-MvZQXaGD.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const EASE$3 = [0.16, 1, 0.3, 1];
function AtlasHero({ image }) {
  const t = useTranslations();
  const ref = reactExports.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.24]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const parallaxBg = reduce ? {} : { y: bgY, scale: bgScale };
  const parallaxContent = reduce ? {} : { y: contentY, opacity: contentOpacity };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: "atlas-hero relative flex min-h-[max(92svh,600px)] w-full flex-col justify-end overflow-hidden",
      "aria-label": t("Destinations — Expedition Atlas hero"),
      children: [
        image ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: parallaxBg, className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image,
            alt: "",
            "aria-hidden": "true",
            className: "h-full w-full object-cover object-center",
            style: { filter: "saturate(0.92)" }
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/55" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/45" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-4 hidden sm:block md:inset-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-white/25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-white/25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-white/25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-white/25" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: parallaxContent, className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "atlas-canvas pb-40 sm:pb-44", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0, y: 26 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, ease: EASE$3 },
              className: "mb-5 flex items-center gap-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3.5 w-3.5 text-[#FF7A00]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85 sm:text-xs", children: t("The Expedition Atlas") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden h-px w-14 bg-gradient-to-r from-[#FF7A00]/70 to-transparent sm:block" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 44, filter: "blur(10px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" },
              transition: { duration: 1.15, delay: 0.12, ease: EASE$3 },
              className: "atlas-hero-title max-w-[13ch] font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl",
              children: t("Where the road runs out.")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, delay: 0.34, ease: EASE$3 },
              className: "mt-6 max-w-2xl font-display text-base leading-relaxed text-white/80 sm:text-lg",
              children: t("Honest country guides, trekking routes and the maps I wish I'd had before I left.")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.5, ease: EASE$3 },
              className: "mt-9 flex flex-wrap items-center gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "#interactive-map",
                    className: "group inline-flex items-center gap-2.5 rounded-full bg-[#FF7A00] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#FF7A00]/25 transition-all hover:bg-[#ff8a21] hover:shadow-[#FF7A00]/40",
                    children: [
                      t("Explore the Journey"),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "#chapters",
                    className: "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15",
                    children: t("Browse the chapters")
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 0.85 },
              className: "mt-12 flex flex-wrap items-center gap-x-3 gap-y-2",
              children: [t("Solo"), t("Slow"), t("Mapped")].map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-[#FF7A00]/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60", children: label })
              ] }, i))
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1.2, delay: 1 },
            className: "absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-4 lg:flex",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 [writing-mode:vertical-rl]", children: t("Scroll to explore") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "atlas-scroll-line" })
            ]
          }
        )
      ]
    }
  );
}
const EASE$2 = [0.16, 1, 0.3, 1];
function ExpeditionTile({
  destination: d,
  index,
  preferred = false,
  tall = false,
  motionDelay = 0,
  className = ""
}) {
  const t = useTranslations();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 42 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.15 },
      transition: { duration: 0.85, delay: motionDelay, ease: EASE$2 },
      className: `h-full ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/destinations/$slug",
          params: { slug: d.slug },
          className: "block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-offset-2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `atlas-tile flex h-full w-full flex-col justify-end ${tall ? "min-h-[380px] lg:min-h-[560px]" : "min-h-[340px] lg:min-h-[460px]"}`,
              children: [
                d.featured_image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: d.featured_image,
                    alt: t(d.title),
                    loading: "lazy",
                    className: "absolute inset-0 h-full w-full object-cover object-center"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-zinc-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40", children: t("No image fielded") }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "atlas-veil absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "atlas-ghost pointer-events-none absolute left-5 top-4 text-5xl sm:left-6 sm:top-5 sm:text-6xl",
                    children: String(index + 1).padStart(2, "0")
                  }
                ),
                d.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-4 rounded-full bg-[#FF7A00] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/20 sm:right-5 sm:top-5", children: t("Featured") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-6 sm:p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
                    d.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF7A00] backdrop-blur-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-2.5 w-2.5" }),
                      t(d.category)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-medium uppercase tracking-[0.18em] text-white/70", children: [
                      t(d.country),
                      d.region ? ` · ${t(d.region)}` : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "atlas-text-move", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: `atlas-title mt-3 font-display font-bold leading-[1.05] tracking-tight text-white ${preferred ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`,
                        children: t(d.title)
                      }
                    ),
                    d.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-[15px]", children: t(d.description) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between border-t border-white/15 pt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55", children: t("Expedition log") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "atlas-arrow inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white", children: [
                      t("Open"),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
                    ] })
                  ] })
                ] })
              ]
            }
          )
        }
      )
    }
  );
}
const EASE$1 = [0.16, 1, 0.3, 1];
function FeaturedExpedition({ destination: d }) {
  const t = useTranslations();
  const ref = reactExports.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const parallaxBg = reduce ? {} : { y: bgY };
  const parallaxBadge = reduce ? {} : { y: badgeY };
  const rows = [
    { label: t("Country"), value: t(d.country) },
    { label: t("Region"), value: d.region ? t(d.region) : "—" },
    { label: t("Type"), value: d.category ? t(d.category) : "—" },
    {
      label: t("Coordinates"),
      value: d.latitude && d.longitude ? `${Number(d.latitude).toFixed(3)}°N · ${Number(d.longitude).toFixed(2)}°E` : "—"
    },
    { label: t("Field reports"), value: String(d.posts?.length ?? 0) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      id: "featured",
      "aria-labelledby": "featured-heading",
      className: "relative scroll-mt-24",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "atlas-canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 lg:rounded-[2.5rem]", children: [
        d.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: parallaxBg, className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: d.featured_image,
            alt: "",
            "aria-hidden": "true",
            className: "h-full w-full object-cover object-center"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" }),
        !reduce && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            style: parallaxBadge,
            "aria-hidden": "true",
            className: "atlas-ghost pointer-events-none absolute -right-4 top-2 select-none text-[9rem] lg:text-[13rem]",
            children: "00"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:p-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.7, ease: EASE$1 },
                className: "flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF7A00] sm:text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-[#FF7A00]/70" }),
                  t("Featured Expedition")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                id: "featured-heading",
                initial: { opacity: 0, y: 34, filter: "blur(8px)" },
                whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.9, delay: 0.08, ease: EASE$1 },
                className: "atlas-section-title mt-5 max-w-xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl xl:text-6xl",
                children: t(d.title)
              }
            ),
            d.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.8, delay: 0.18, ease: EASE$1 },
                className: "mt-6 max-w-2xl font-display text-base leading-relaxed text-white/80 sm:text-lg",
                children: t(d.description)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 18 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.7, delay: 0.28, ease: EASE$1 },
                className: "mt-9",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/destinations/$slug",
                    params: { slug: d.slug },
                    className: "group inline-flex items-center gap-3 rounded-full bg-[#FF7A00] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#FF7A00]/25 transition-colors hover:bg-[#ff8a21]",
                    children: [
                      t("Read the field report"),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" })
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.9, delay: 0.2, ease: EASE$1 },
              className: "rounded-2xl border border-white/12 bg-white/[0.07] p-6 backdrop-blur-md sm:p-7",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 border-b border-white/15 pb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[#FF7A00]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-[0.26em] text-white/70", children: t("Field reference") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "divide-y divide-white/10 pt-2", children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 18 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, amount: 0.5 },
                    transition: { duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE$1 },
                    className: "flex items-baseline justify-between gap-6 py-3.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55", children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right font-display text-sm font-semibold text-white sm:text-[15px]", children: row.value })
                    ]
                  },
                  row.label
                )) })
              ]
            }
          )
        ] })
      ] }) })
    }
  );
}
const DestinationsMap = reactExports.lazy(() => import("./DestinationsMap-BPEmFGLF.mjs").then((m) => ({
  default: m.DestinationsMap
})));
const CATEGORIES = ["Mountains", "Motorcycle Journeys", "Trekking", "Adventure", "Cultural Experiences"];
const EASE = [0.16, 1, 0.3, 1];
function DestinationsPage() {
  const t = useTranslations();
  const {
    data: destinations
  } = useSuspenseQuery(destQO$1);
  const {
    data: hero
  } = useSuspenseQuery(heroQO);
  const featuredDest = reactExports.useMemo(() => destinations.find((d) => d.featured), [destinations]);
  const chapters = reactExports.useMemo(() => {
    const cats = [];
    CATEGORIES.forEach((cat) => {
      const items = destinations.filter((d) => d.category === cat);
      if (items.length > 0) cats.push({
        cat,
        items,
        startIndex: 0
      });
    });
    const uncategorized = destinations.filter((d) => !d.category || !CATEGORIES.includes(d.category));
    if (uncategorized.length > 0) cats.push({
      cat: "Other Destinations",
      items: uncategorized,
      startIndex: 0
    });
    let n = 0;
    return cats.map((c) => {
      const start = n;
      n += c.items.length;
      return {
        ...c,
        startIndex: start
      };
    });
  }, [destinations]);
  const stats = reactExports.useMemo(() => {
    const countries = new Set(destinations.map((d) => d.country));
    const journeyTypes = new Set(destinations.map((d) => d.category).filter(Boolean));
    const stories = destinations.reduce((acc, d) => acc + (d.posts?.length ?? 0), 0);
    return [{
      icon: MountainSnow,
      label: t("Destinations charted"),
      value: String(destinations.length)
    }, {
      icon: Earth,
      label: t("Countries in the log"),
      value: String(countries.size)
    }, {
      icon: Route,
      label: t("Journeys mapped"),
      value: String(journeyTypes.size)
    }, {
      icon: BookOpen,
      label: t("Stories from the road"),
      value: String(stories)
    }];
  }, [destinations, t]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.location.hash.replace("#", "");
    const target = ["interactive-map", "map", "chapters", "featured"].includes(raw) ? raw : null;
    if (!target) return;
    requestAnimationFrame(() => {
      document.getElementById(target === "map" ? "interactive-map" : target)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MotionConfig, { reducedMotion: "user", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AtlasHero, { image: hero?.image }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "atlas-canvas relative z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 46
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      amount: 0.3
    }, transition: {
      duration: 0.9,
      ease: EASE
    }, className: "atlas-ledger -mt-24 rounded-3xl px-6 py-8 sm:px-10 sm:py-9 lg:-mt-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00] ring-1 ring-[#FF7A00]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "atlas-ledger-value font-display text-2xl font-bold tracking-tight sm:text-3xl", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: stat.label })
      ] })
    ] }, stat.label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "atlas-canvas mt-16 lg:mt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { className: "mt-2", label: t("Sponsored"), heightClass: "h-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "interactive-map", "aria-labelledby": "atlas-map-heading", className: "mt-20 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true,
          amount: 0.4
        }, transition: {
          duration: 0.8,
          ease: EASE
        }, className: "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.26em] text-[#FF7A00]", children: t("The Route Atlas") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "atlas-map-heading", className: "atlas-section-title mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl", children: t("Every place, mapped.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base", children: t("Trailheads, river valleys and border crossings I've fielded so far — pinned from the field log, not from a database of dreams.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[#FF7A00]" }),
            destinations.length,
            " ",
            t("marked")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 36
          }, whileInView: {
            opacity: 1,
            y: 0
          }, viewport: {
            once: true,
            amount: 0.15
          }, transition: {
            duration: 0.9,
            ease: EASE
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[380px] w-full animate-pulse rounded-2xl border border-border bg-muted/30 sm:h-[440px] lg:h-[480px]" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationsMap, { destinations }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.aside, { initial: {
            opacity: 0,
            x: 28
          }, whileInView: {
            opacity: 1,
            x: 0
          }, viewport: {
            once: true,
            amount: 0.2
          }, transition: {
            duration: 0.8,
            delay: 0.12,
            ease: EASE
          }, "aria-label": t("Atlas index of destinations"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold uppercase tracking-[0.24em]", children: t("Atlas Index") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: String(destinations.length).padStart(2, "0") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "divide-y divide-border overflow-hidden rounded-2xl border border-border", children: destinations.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations/$slug", params: {
              slug: d.slug
            }, className: "group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "atlas-ghost atlas-ghost-dark w-8 shrink-0 font-display text-lg font-bold", children: String(i + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-display text-sm font-semibold transition-colors group-hover:text-[#FF7A00]", children: t(d.title) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
                  t(d.country),
                  d.category ? ` · ${t(d.category)}` : ""
                ] })
              ] }),
              d.latitude && d.longitude && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden font-mono text-[10px] font-medium tracking-wide text-muted-foreground/70 xl:inline-block", children: [
                Number(d.latitude).toFixed(2),
                ", ",
                Number(d.longitude).toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF7A00]" })
            ] }) }, d.id)) })
          ] })
        ] })
      ] }),
      featuredDest && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedExpedition, { destination: featuredDest }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "chapters", "aria-labelledby": "chapters-heading", className: "mt-24 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 26
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true,
          amount: 0.4
        }, transition: {
          duration: 0.8,
          ease: EASE
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.26em] text-[#FF7A00]", children: t("The Chapters") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "chapters-heading", className: "atlas-section-title mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl", children: t("Expeditions, by journey.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base", children: t("Each chapter is a mode of travel — the terrain changes, the pace changes, the light changes.") })
        ] }),
        destinations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, whileInView: {
          opacity: 1
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.8
        }, className: "mt-16 rounded-2xl border border-border py-24 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: t("The atlas is being compiled.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground", children: t("New expeditions are being logged. Check back soon.") })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 space-y-24", children: chapters.map((chapter, cIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
          opacity: 0,
          y: 44
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true,
          amount: 0.1
        }, transition: {
          duration: 0.9,
          ease: EASE
        }, "aria-labelledby": `chapter-${cIdx}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 sm:gap-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "atlas-ghost atlas-ghost-dark atlas-chapter-num shrink-0 text-6xl sm:text-7xl", children: String(cIdx + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: `chapter-${cIdx}`, className: "font-display text-3xl font-bold tracking-tight sm:text-4xl", children: t(chapter.cat) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: [
                  chapter.items.length,
                  " ",
                  chapter.items.length === 1 ? t("expedition fielded") : t("expeditions fielded")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground lg:max-w-sm lg:text-right", children: t("Fielded images, routes and stories under this journey — every tile opens the full field report.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "atlas-rule mt-8" }),
          chapter.items.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpeditionTile, { preferred: true, tall: true, index: chapter.startIndex, destination: chapter.items[0] }) }),
          chapter.items.length === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-8 sm:grid-cols-2", children: chapter.items.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExpeditionTile, { index: chapter.startIndex + idx, motionDelay: idx * 0.1, destination: d }, d.id)) }),
          chapter.items.length >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-8 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExpeditionTile, { preferred: true, tall: true, className: "lg:col-span-2", index: chapter.startIndex, destination: chapter.items[0] }),
            chapter.items.slice(1).map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExpeditionTile, { index: chapter.startIndex + 1 + idx, motionDelay: idx * 0.08, destination: d }, d.id))
          ] })
        ] }, chapter.cat)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-28 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mb-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "atlas-section-title font-display text-4xl font-bold tracking-tight sm:text-5xl", children: t("More to Discover") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-lg text-muted-foreground sm:text-base", children: t("Every route tells a story. Every summit has a voice. Keep exploring.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { className: "mx-auto", label: t("Advertisement"), heightClass: "h-28 sm:h-32" }) })
      ] })
    ] })
  ] });
}
export {
  DestinationsPage as component
};
