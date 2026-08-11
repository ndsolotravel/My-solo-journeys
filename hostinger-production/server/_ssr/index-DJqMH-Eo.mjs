import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { G as popularQO, H as guidesQO, u as useTranslator, C as CATEGORIES, N as NewsletterForm, D as postsQO, E as featuredQO, F as destQO$1, I as galleryQO, J as motoQO, w as createSsrRpc } from "./router-Dk8gz-sr.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useSuspenseQuery, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as gsapWithCSS, S as ScrollTrigger } from "../_libs/gsap.mjs";
import { P as PostCard } from "./PostCard-UVkkv_pN.mjs";
import { a as useLocalizedPosts, b as useLocalizedDestinations, u as useLocalizedGallery, c as useLocalizedText } from "./useLocalized-BWBzEFCl.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import "../_libs/sonner.mjs";
import "../_libs/ws.mjs";
import "../_libs/seroval.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { S as Search, A as ArrowRight, E as Earth, B as Bike, k as Camera, R as Route, l as Calendar, f as MapPin, m as Eye, n as Users, o as BookOpen, p as Activity, q as Compass, r as Mountain, s as Map, t as ChevronLeft, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./client-Bkj-llDP.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-CKFEJwfb.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger);
}
function CountUp({
  end,
  duration = 2,
  suffix = ""
}) {
  const ref = reactExports.useRef(null);
  const [display, setDisplay] = reactExports.useState(end);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(end);
      return;
    }
    setDisplay(0);
    const obj = { v: 0 };
    const tween = gsapWithCSS.to(obj, {
      v: end,
      duration,
      ease: "power3.out",
      onUpdate: () => setDisplay(Math.round(obj.v)),
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true
      }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className: "tabular-nums", children: [
    display.toLocaleString(),
    suffix
  ] });
}
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger);
}
function useGsapReveal() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsapWithCSS.context(() => {
      const headings = root.querySelectorAll('[data-reveal="heading"]');
      const cards = root.querySelectorAll('[data-reveal="card"]');
      const featured = root.querySelectorAll('[data-reveal="featured"]');
      const info = root.querySelectorAll('[data-reveal="info"]');
      const tl = gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true
        }
      });
      tl.from(headings, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08
      }).from(
        cards,
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08
        },
        "-=0.3"
      ).from(
        featured,
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          onStart: () => {
            featured.forEach((el) => el.classList.add("is-glowing"));
          }
        },
        "-=0.3"
      ).from(
        info,
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08
        },
        "-=0.4"
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return ref;
}
function PostCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] w-full rounded-2xl bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-3 w-32 rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-5 w-3/4 rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-3 w-full rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-3 w-5/6 rounded bg-muted" })
  ] });
}
function DestinationCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] w-full rounded-2xl bg-muted" }) });
}
function HeroSlider({ slides, intervalMs = 1e4, className = "" }) {
  const [index, setIndex] = reactExports.useState(0);
  const count = slides.length;
  const go = reactExports.useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count]
  );
  reactExports.useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, index]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute inset-0 overflow-hidden ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, mode: "sync", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.img,
      {
        src: slides[index].src,
        alt: slides[index].alt,
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1.1, ease: "easeInOut" },
        loading: index === 0 ? "eager" : "lazy",
        fetchPriority: index === 0 ? "high" : "auto",
        className: "absolute inset-0 h-full w-full object-cover animate-ken-burns"
      },
      index
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" }),
    count > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => go(-1),
          "aria-label": "Previous slide",
          className: "group absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-2.5 text-white backdrop-blur transition hover:bg-black/50 sm:left-6 sm:p-3",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => go(1),
          "aria-label": "Next slide",
          className: "group absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-2.5 text-white backdrop-blur transition hover:bg-black/50 sm:right-6 sm:p-3",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIndex(i),
          "aria-label": `Go to slide ${i + 1}`,
          className: `h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`
        },
        i
      )) })
    ] })
  ] });
}
const MAX_SESSION_ID_LEN = 128;
const pingVisitor = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  sessionId: stringType().min(1).max(MAX_SESSION_ID_LEN)
}).parse(input ?? {})).handler(createSsrRpc("520baea3e7c2272f79b5ac53e6ed105f6eccae84814ffc3a8209d4dd1e873603"));
const getLiveVisitorCount = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ffc2428cef4d12b860fc080e49e0dd8562fbc2bf28349768bad7c39f124c82b2"));
const SESSION_KEY = "ndsolo:visitor-session";
const HEARTBEAT_INTERVAL_MS = 6e4;
const POLL_INTERVAL_MS = 3e4;
function getVisitorSessionId() {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID?.() ?? `v-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}
function useActiveVisitors() {
  const [count, setCount] = reactExports.useState(0);
  const sessionIdRef = reactExports.useRef(null);
  const mountedRef = reactExports.useRef(true);
  const ping = reactExports.useCallback(async () => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;
    try {
      await pingVisitor({ data: { sessionId } });
    } catch {
    }
  }, []);
  const poll = reactExports.useCallback(async () => {
    try {
      const res = await getLiveVisitorCount();
      if (mountedRef.current) setCount(res.count);
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    sessionIdRef.current = getVisitorSessionId();
    mountedRef.current = true;
    void ping();
    void poll();
    const heartbeatTimer = window.setInterval(() => void ping(), HEARTBEAT_INTERVAL_MS);
    const pollTimer = window.setInterval(() => void poll(), POLL_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void ping();
        void poll();
      }
    };
    const onFocus = () => {
      void ping();
      void poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    return () => {
      mountedRef.current = false;
      window.clearInterval(heartbeatTimer);
      window.clearInterval(pollTimer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
    };
  }, [ping, poll]);
  return count;
}
const CAT_ICONS = {
  Trekking: Mountain,
  Mountains: Mountain,
  "Motorcycle Adventure Travel": Bike,
  Photography: Camera,
  "Solo Travel": Compass
};
const JOURNEY_CARDS = [{
  title: "Solo Travel",
  body: "Diaries, lessons and practical notes from travelling alone — the slow way.",
  to: "/blog",
  search: {
    category: "Solo Travel"
  },
  icon: Compass,
  img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=70"
}, {
  title: "Motorcycle Journeys",
  body: "Karakoram, Deosai and beyond — long rides, route notes and machine prep.",
  to: "/blog",
  search: {
    category: "Motorcycle Adventure Travel"
  },
  icon: Bike,
  img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=70"
}, {
  title: "Trekking Guides",
  body: "Step-by-step trekking guides, gear, altitude advice and trip planning.",
  to: "/blog",
  search: {
    category: "Trekking"
  },
  icon: Mountain,
  img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=70"
}];
function HomePage() {
  const {
    data: postsData
  } = useSuspenseQuery(postsQO);
  const {
    data: featuredData
  } = useSuspenseQuery(featuredQO);
  const {
    data: destinationsData
  } = useSuspenseQuery(destQO$1);
  const popular = useQuery(popularQO);
  const guides = useQuery(guidesQO);
  const {
    data: galleryData
  } = useSuspenseQuery(galleryQO);
  const {
    data: motoData
  } = useSuspenseQuery(motoQO);
  const featuredList = useLocalizedPosts(featuredData.posts);
  const latest = useLocalizedPosts(postsData.posts);
  const popularPosts = useLocalizedPosts(popular.data?.posts ?? []);
  const guidePosts = useLocalizedPosts(guides.data?.posts ?? []);
  const destinations = useLocalizedDestinations(destinationsData);
  const gallery = useLocalizedGallery(galleryData ?? []);
  const featured = featuredList[0] ?? featuredData.posts[0];
  const motoPosts = useLocalizedPosts(motoData?.posts ?? []);
  const latestMoto = motoPosts[0] ?? null;
  const latestDest = destinations[0];
  const latestPhoto = gallery[0] ?? (galleryData ?? [])[0];
  const latestPhotoCaption = useLocalizedText(latestPhoto?.caption ?? null);
  const t = useTranslator(["Solo · Slow · Cinematic", "Stories from the high places ", "most people only fly over.", "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.", "Search stories, trails and destinations", "Search", "Read the stories", "Explore destinations", "By the numbers", "Journey in numbers", "A quiet tally of countries crossed, trips ridden and photographs made along the way.", "Countries Visited", "Solo Motorcycle Trips", "Photos Captured", "Kilometres Travelled", " km", "Days on the Road", "Latest trip", "Recent destination", "Longest journey", "Karakoram Highway · 1,840 km", "Latest photo", "From the gallery", "Get the next dispatch", "One email when a new expedition story drops. No spam, no algorithm noise.", "All stories →", "All destinations →", "View all →", "All guides →", "Featured", "The latest expedition", "Browse by category", "What others are reading", "Popular this month", "From the road", "Latest stories", "Plan your trip", "Travel guides", "Practical, no-fluff guides to logistics, gear, costs and the small details that make a trip work.", "Start here", "Start your journey", "Three places to begin — pick the journey that pulls you in.", "Where the road runs out.", "Honest country guides, trekking routes and the maps I wish I'd had before I left.", "Explore", "Discover visited destinations, motorcycle routes and stories from the road.", "Map View", "Grid View", "Sponsored", "Advertisement", "Live Traffic Analytics", "Website Hit Counter & Analytics", "Real-time reader activity, page hits, and engagement across stories and field guides.", "Updated real-time · 99.9% uptime", "Total Page Hits", "+1,240 page views this week", "Unique Readers", "Across 64 countries", "Stories Read", "Avg. reading time: 4.8 min", "Live Now", "active readers", "Reading stories right now", "Solo Travel", "Motorcycle Journeys", "Trekking Guides", "Diaries, lessons and practical notes from travelling alone — the slow way.", "Karakoram, Deosai and beyond — long rides, route notes and machine prep.", "Step-by-step trekking guides, gear, altitude advice and trip planning.", "Featured destinations", "min read", "Read the full story"]);
  const [heroQuery, setHeroQuery] = reactExports.useState("");
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#journey-in-numbers") {
      requestAnimationFrame(() => document.getElementById("journey-in-numbers")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }));
    }
  }, []);
  const submitSearch = (e) => {
    e.preventDefault();
    const q = heroQuery.trim();
    if (!q) return;
    navigate({
      to: "/blog",
      search: {
        q
      }
    });
  };
  const countries = new Set(destinations.map((d) => d.country)).size;
  const photosCount = gallery?.length ?? 0;
  const motoCount = motoData?.total ?? 0;
  const stats = [{
    icon: Earth,
    label: "Countries Visited",
    value: Math.max(countries, 1),
    suffix: "",
    featured: false
  }, {
    icon: Bike,
    label: "Solo Motorcycle Trips",
    value: Math.max(motoCount, 12),
    suffix: "",
    featured: false
  }, {
    icon: Camera,
    label: "Photos Captured",
    value: Math.max(photosCount, 248),
    suffix: "",
    featured: false
  }, {
    icon: Route,
    label: "Kilometres Travelled",
    value: 18420,
    suffix: " km",
    featured: true
  }, {
    icon: Calendar,
    label: "Days on the Road",
    value: 142,
    suffix: "",
    featured: false
  }];
  const journeyRef = useGsapReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[100svh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlider, { slides: [{
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80",
        alt: "Nanga Parbat at sunrise"
      }, {
        src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
        alt: "Mountain road at dusk"
      }, {
        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80",
        alt: "Trekker on alpine ridge"
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none relative mx-auto flex h-[100svh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white backdrop-blur", children: t("Solo · Slow · Cinematic") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8,
          delay: 0.1
        }, className: "mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl", children: [
          t("Stories from the high places "),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: t("most people only fly over.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8,
          delay: 0.2
        }, className: "mt-5 max-w-2xl text-base text-white/80 sm:text-lg", children: t("Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.35
        }, onSubmit: submitSearch, className: "pointer-events-auto mt-7 flex w-full max-w-xl items-center gap-2 rounded-full border border-white/30 bg-white/10 px-2 py-1.5 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "ml-3 h-4 w-4 text-white/80", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: heroQuery, onChange: (e) => setHeroQuery(e.target.value), type: "search", placeholder: t("Search stories, trails and destinations"), "aria-label": t("Search stories, trails and destinations"), className: "flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/70 outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-full bg-white px-4 py-2 text-xs font-medium text-foreground hover:bg-white/90", children: t("Search") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8,
          delay: 0.45
        }, className: "pointer-events-auto mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground hover:bg-white/90", children: [
            t("Read the stories"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations", className: "inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10", children: t("Explore destinations") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "journey-in-numbers", "aria-labelledby": "journey-numbers-heading", className: "scroll-mt-24 border-b border-border bg-muted/20 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: journeyRef, className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-reveal": "heading", className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("By the numbers") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { "data-reveal": "heading", id: "journey-numbers-heading", className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Journey in numbers") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-reveal": "heading", className: "mt-3 text-sm text-muted-foreground", children: t("A quiet tally of countries crossed, trips ridden and photographs made along the way.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-reveal": s.featured ? "featured" : "card", className: `jin-card rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40 ${s.featured ? "jin-featured" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-2xl font-bold sm:text-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: s.value, suffix: s.suffix ? t(s.suffix) : void 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: t(s.label) })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        latestMoto && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/blog/$slug", params: {
          slug: latestMoto.slug
        }, className: "jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-3 w-3" }),
            " ",
            t("Latest trip")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 line-clamp-2 font-display text-base font-semibold group-hover:text-accent", children: latestMoto.title })
        ] }),
        latestDest && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/destinations/$slug", params: {
          slug: latestDest.slug
        }, className: "jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            " ",
            t("Recent destination")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 line-clamp-2 font-display text-base font-semibold group-hover:text-accent", children: latestDest.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/destinations", hash: "interactive-map", className: "jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "h-3 w-3" }),
            " ",
            t("Longest journey")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-base font-semibold group-hover:text-accent", children: t("Karakoram Highway · 1,840 km") })
        ] }),
        latestPhoto && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/gallery", className: "jin-card group rounded-2xl border border-border bg-background p-5 hover:border-[#FF7A00]/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }),
            " ",
            t("Latest photo")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 line-clamp-2 font-display text-base font-semibold group-hover:text-accent", children: latestPhotoCaption || t("From the gallery") })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "hit-counter", "aria-labelledby": "hit-counter-heading", className: "border-b border-border bg-slate-100/90 dark:bg-muted/30 py-16 sm:py-20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3.5 py-1 text-xs font-medium text-accent shadow-sm backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-500" })
            ] }),
            t("Live Traffic Analytics")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "hit-counter-heading", className: "font-display text-3xl font-bold tracking-tight sm:text-4xl", children: t("Website Hit Counter & Analytics") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 max-w-xl text-sm text-muted-foreground", children: t("Real-time reader activity, page hits, and engagement across stories and field guides.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }),
          t("Updated real-time · 99.9% uptime")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: t("Total Page Hits") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: 48290, suffix: "+" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: t("+1,240 page views this week") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: t("Unique Readers") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: 18450, suffix: "+" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: t("Across 64 countries") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: t("Stories Read") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: 34120, suffix: "+" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: t("Avg. reading time: 4.8 min") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: t("Live Now") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2 font-display text-3xl font-bold text-emerald-600 dark:text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LiveNowNumber, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: t("active readers") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" }),
            t("Reading stories right now")
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Start here") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Start your journey") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: t("Three places to begin — pick the journey that pulls you in.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: JOURNEY_CARDS.map((c) => {
        const Icon = c.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: c.to, search: c.search, className: "group relative block overflow-hidden rounded-2xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl font-semibold", children: t(c.title) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/80", children: t(c.body) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-xs font-medium", children: [
              t("Explore"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" })
            ] })
          ] })
        ] }, c.title);
      }) })
    ] }),
    featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Featured") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("The latest expedition") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "text-sm text-muted-foreground hover:text-foreground", children: t("All stories →") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: featured.slug
      }, className: "group grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-3xl bg-muted", children: featured.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featured.cover_image, alt: featured.title, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium uppercase tracking-wider text-accent", children: [
            featured.category,
            " · ",
            featured.reading_minutes,
            " ",
            t("min read")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl group-hover:text-accent transition-colors", children: featured.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-muted-foreground", children: featured.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-6 inline-flex items-center gap-2 text-sm font-medium", children: [
            t("Read the full story"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold sm:text-3xl", children: t("Browse by category") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: CATEGORIES.slice(0, 12).map((c) => {
        const Icon = CAT_ICONS[c] ?? Compass;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", search: {
          category: c
        }, className: "group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-xs font-medium hover:border-accent hover:text-accent transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t(c) })
        ] }, c);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("What others are reading") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Popular this month") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "text-sm text-muted-foreground hover:text-foreground", children: t("All stories →") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: popular.isLoading ? Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCardSkeleton, {}, i)) : popularPosts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("From the road") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Latest stories") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "text-sm text-muted-foreground hover:text-foreground", children: t("View all →") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: latest.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-muted/20 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
            " ",
            t("Plan your trip")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Travel guides") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-muted-foreground", children: t("Practical, no-fluff guides to logistics, gear, costs and the small details that make a trip work.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: {
          category: "Travel Tips"
        }, className: "text-sm text-muted-foreground hover:text-foreground", children: t("All guides →") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: guides.isLoading ? Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCardSkeleton, {}, i)) : guidePosts.slice(0, 3).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-3.5 w-3.5" }),
            " ",
            t("Where")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: t("Featured destinations") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations", className: "text-sm text-muted-foreground hover:text-foreground", children: t("All destinations →") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: destinations.length === 0 ? Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCardSkeleton, {}, i)) : destinations.slice(0, 8).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-50px"
      }, transition: {
        duration: 0.5,
        delay: i * 0.05
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations/$slug", params: {
        slug: d.slug
      }, className: "group block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-2xl", children: [
        d.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.featured_image, alt: d.title, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wider text-white/70", children: [
            d.country,
            d.region ? ` · ${d.region}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display text-xl font-semibold", children: d.title })
        ] })
      ] }) }) }, d.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-4 pb-24 pt-8 text-center sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("Get the next dispatch") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("One email when a new expedition story drops. No spam, no algorithm noise.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-6 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {}) })
    ] })
  ] });
}
function LiveNowNumber() {
  const count = useActiveVisitors();
  const [display, setDisplay] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setDisplay(count);
  }, [count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", suppressHydrationWarning: true, children: display.toLocaleString() });
}
export {
  HomePage as component
};
