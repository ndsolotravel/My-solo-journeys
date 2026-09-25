import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn, a6 as adminGetColorSettings, a7 as adminSaveColorSettings, a8 as COLOR_PREVIEW_STORAGE_KEY } from "./router-B6m4P0F8.mjs";
import { D as DEFAULT_COLOR_CONFIG, p as parseColorConfig, C as COLOR_FIELDS, n as normalizeToHex6 } from "./colors-C0oqDCsc.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { P as Palette, R as RotateCcw, E as Eye, ay as Save, d as Sparkles, aA as Monitor, aB as Tablet, aC as Smartphone, N as Compass, h as ArrowRight, v as Calendar, z as Clock, o as MapPin, a0 as Layers } from "../_libs/lucide-react.mjs";
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
import "./typography-DvZTlhwY.mjs";
import "../_libs/zod.mjs";
import "./posts.functions-Bt0QAIcW.mjs";
import "./server-cache-B0GOEAA-.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-5OPpyOwL.mjs";
import "./admin.functions-CnEC2dM5.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AdminColorsPage() {
  const getSettingsFn = useServerFn(adminGetColorSettings);
  const saveSettingsFn = useServerFn(adminSaveColorSettings);
  const queryClient = useQueryClient();
  const {
    data: savedConfig,
    isLoading
  } = useQuery({
    queryKey: ["admin-color-settings"],
    queryFn: () => getSettingsFn()
  });
  const [draftConfig, setDraftConfig] = reactExports.useState(DEFAULT_COLOR_CONFIG);
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [activeDevice, setActiveDevice] = reactExports.useState("desktop");
  const [previewTheme, setPreviewTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    if (savedConfig) {
      setDraftConfig(parseColorConfig(savedConfig));
    }
  }, [savedConfig]);
  const isDirty = reactExports.useMemo(() => {
    if (!savedConfig) return false;
    return JSON.stringify(draftConfig) !== JSON.stringify(savedConfig);
  }, [draftConfig, savedConfig]);
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      return await saveSettingsFn({
        data: payload
      });
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(["admin-color-settings"], saved);
      queryClient.setQueryData(["color-settings"], saved);
      queryClient.invalidateQueries({
        queryKey: ["color-settings"]
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-color-settings"]
      });
      sessionStorage.removeItem(COLOR_PREVIEW_STORAGE_KEY);
      window.dispatchEvent(new Event("nd-color-preview-changed"));
      toast.success("Global color palette published live across the website!");
    },
    onError: (err) => {
      toast.error(`Failed to publish colors: ${err.message}`);
    }
  });
  const handleResetToDefault = () => {
    setDraftConfig({
      ...DEFAULT_COLOR_CONFIG
    });
    toast.info("Reset to default color palette (#4085FF accent). Click 'Save & Publish' to push live.");
  };
  const handlePreviewOnSite = () => {
    try {
      sessionStorage.setItem(COLOR_PREVIEW_STORAGE_KEY, JSON.stringify(draftConfig));
      window.dispatchEvent(new Event("nd-color-preview-changed"));
      toast.success("Preview mode activated! Opening homepage preview in a new tab.", {
        action: {
          label: "Open Preview",
          onClick: () => window.open("/", "_blank")
        }
      });
      window.open("/", "_blank");
    } catch {
      toast.error("Could not activate preview mode in browser storage.");
    }
  };
  const updateColor = (key, value) => {
    setDraftConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const categories = ["All", "Brand & Accent", "Typography", "Links & Navigation", "Buttons", "Surfaces & Layout"];
  const filteredFields = reactExports.useMemo(() => {
    if (activeCategory === "All") return COLOR_FIELDS;
    return COLOR_FIELDS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);
  const previewCanvasStyles = reactExports.useMemo(() => {
    return {
      "--primary": draftConfig.primaryColor,
      "--secondary": draftConfig.secondaryColor,
      "--brand": draftConfig.accentColor,
      "--accent": draftConfig.accentColor,
      "--ring": draftConfig.accentColor,
      "--color-heading": draftConfig.headingColor,
      "--color-body-text": draftConfig.bodyTextColor,
      "--color-muted-text": draftConfig.mutedTextColor,
      "--color-link": draftConfig.linkColor,
      "--color-link-hover": draftConfig.linkHoverColor,
      "--btn-bg": draftConfig.buttonBgColor,
      "--btn-text": draftConfig.buttonTextColor,
      "--btn-hover": draftConfig.buttonHoverColor,
      "--card-bg": draftConfig.cardBgColor,
      "--section-bg": draftConfig.sectionBgColor,
      "--border-color": draftConfig.borderColor,
      "--nav-text": draftConfig.navTextColor,
      "--nav-hover": draftConfig.navHoverColor,
      "--hero-overlay": draftConfig.heroOverlayColor,
      "--footer-bg": draftConfig.footerBgColor,
      "--footer-text": draftConfig.footerTextColor
    };
  }, [draftConfig]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[400px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-[#4085FF] border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading color palette settings..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#4085FF]/10 text-[#4085FF]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground", children: "Color Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-sm text-muted-foreground max-w-2xl", children: [
          "Control the website’s global color palette, branding tokens, buttons, surfaces, and typography accents from the CMS without editing code. Accent default set to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-[#4085FF]", children: "#4085FF" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleResetToDefault, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all", title: "Reset all colors to default configuration", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          "Reset to Default"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handlePreviewOnSite, className: "inline-flex items-center gap-1.5 rounded-xl border border-[#4085FF]/30 bg-[#4085FF]/10 px-4 py-2 text-xs font-semibold text-[#4085FF] hover:bg-[#4085FF]/20 transition-all shadow-xs", title: "Preview changes across the live site", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
          "Preview Changes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => saveMutation.mutate(draftConfig), disabled: saveMutation.isPending || !isDirty, className: "inline-flex items-center gap-1.5 rounded-xl bg-[#4085FF] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#3570D0] transition-all disabled:opacity-50 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          saveMutation.isPending ? "Publishing..." : isDirty ? "Save & Publish" : "Published Live"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 lg:col-span-6 xl:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/50 scrollbar-none", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveCategory(cat), className: `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${activeCategory === cat ? "bg-[#4085FF] text-white shadow-xs font-semibold" : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: cat }, cat)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3.5", children: filteredFields.map((field) => {
          const currentValue = draftConfig[field.key];
          const hexValue = normalizeToHex6(currentValue);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-4 transition-all hover:border-[#4085FF]/40 hover:shadow-xs space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `color-input-${field.key}`, className: "text-xs font-bold text-foreground cursor-pointer", children: field.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground", children: field.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: field.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-xl border border-black/10 dark:border-white/10 shrink-0 shadow-xs flex items-center justify-center", style: {
                backgroundColor: currentValue
              } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", id: `color-picker-${field.key}`, value: hexValue, onChange: (e) => updateColor(field.key, e.target.value), className: "h-9 w-12 cursor-pointer rounded-xl border border-border bg-background p-0.5 outline-none transition", title: `Select ${field.label} from color picker` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: `color-input-${field.key}`, value: currentValue, onChange: (e) => updateColor(field.key, e.target.value), placeholder: "#4085FF", className: "w-full rounded-xl border border-border bg-background px-3 py-2 font-mono text-xs font-medium text-foreground outline-none focus:border-[#4085FF] focus:ring-1 focus:ring-[#4085FF] transition" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateColor(field.key, field.default), title: `Reset to default (${field.default})`, className: "rounded-xl border border-border bg-muted/50 p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, field.key);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/80 bg-muted/40 p-4 text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-semibold text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-[#4085FF]" }),
            "How it works"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] leading-relaxed", children: [
            "Colors edited in this CMS update the live preview panel on the right immediately. The public website remains on the published palette until you click ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Save & Publish" }),
            ". You can also click ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Preview Changes" }),
            " to test the live website in an isolated sandbox session before publishing."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 xl:col-span-7 sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-[#4085FF]/10 text-[#4085FF]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold text-foreground", children: "Live Color Preview Panel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Real-time component simulation" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-xl bg-muted p-1 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("desktop"), title: "Desktop View", className: `flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${activeDevice === "desktop" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3 w-3" }),
                "Desktop"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("tablet"), title: "Tablet View", className: `flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${activeDevice === "tablet" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tablet, { className: "h-3 w-3" }),
                "Tablet"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("mobile"), title: "Mobile View", className: `flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${activeDevice === "mobile" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3 w-3" }),
                "Mobile"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPreviewTheme((t) => t === "dark" ? "light" : "dark"), className: "rounded-xl border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition", children: previewTheme === "dark" ? "🌙 Dark Canvas" : "☀️ Light Canvas" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto w-full transition-all duration-300 ${activeDevice === "desktop" ? "max-w-full" : activeDevice === "tablet" ? "max-w-[720px]" : "max-w-[380px]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: previewCanvasStyles, className: `rounded-3xl border border-border shadow-2xl transition-colors duration-200 overflow-hidden divide-y divide-border/60 ${previewTheme === "dark" ? "bg-[#0b0f17] text-white" : "bg-white text-neutral-900"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            backgroundColor: previewTheme === "dark" ? "rgba(11, 15, 23, 0.85)" : "rgba(255, 255, 255, 0.9)",
            borderColor: draftConfig.borderColor
          }, className: "p-4 sm:p-5 flex items-center justify-between backdrop-blur-md transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                backgroundColor: draftConfig.accentColor
              }, className: "h-7 w-7 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm", children: "ND" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: draftConfig.headingColor
              }, className: "font-display font-bold text-sm tracking-wider", children: "NDSOLOTRAVEL" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden sm:flex items-center gap-4 text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: draftConfig.navHoverColor
              }, className: "font-semibold cursor-pointer transition-colors", children: "Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: draftConfig.navTextColor
              }, className: "cursor-pointer hover:opacity-80 transition-colors", children: "Destinations" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: draftConfig.navTextColor
              }, className: "cursor-pointer hover:opacity-80 transition-colors", children: "Gallery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: draftConfig.navTextColor
              }, className: "cursor-pointer hover:opacity-80 transition-colors", children: "About" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: {
              backgroundColor: draftConfig.buttonBgColor,
              color: draftConfig.buttonTextColor
            }, className: "rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm transition hover:opacity-90", children: "Read Dispatch" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden p-6 sm:p-10 text-white min-h-[260px] flex flex-col justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cover bg-center -z-20 scale-105", style: {
              backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 transition-colors duration-200", style: {
              backgroundColor: draftConfig.heroOverlayColor
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 relative z-10 max-w-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                backgroundColor: `${draftConfig.accentColor}26`,
                color: draftConfig.accentColor,
                borderColor: `${draftConfig.accentColor}40`
              }, className: "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border backdrop-blur-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3 w-3" }),
                "High Passes Expedition"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: {
                color: draftConfig.headingColor
              }, className: "text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight", children: [
                "Stories from the high places.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  color: draftConfig.accentColor
                }, children: "Most people only fly over." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                color: draftConfig.bodyTextColor
              }, className: "text-xs sm:text-sm line-clamp-2 leading-relaxed", children: "A visual archive of high-altitude solo expeditions, alpine routes, and raw frontiers across the globe." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: {
                  backgroundColor: draftConfig.buttonBgColor,
                  color: draftConfig.buttonTextColor
                }, className: "rounded-full px-4 py-2 text-xs font-bold shadow-md transition hover:opacity-90 flex items-center gap-1.5", children: [
                  "Start Exploring",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: {
                  borderColor: draftConfig.borderColor,
                  color: draftConfig.headingColor
                }, className: "rounded-full border bg-black/30 backdrop-blur-md px-4 py-2 text-xs font-semibold hover:bg-white/10 transition", children: "View Map" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
                color: draftConfig.headingColor
              }, className: "text-xl sm:text-2xl font-bold tracking-tight", children: "Editorial Typography & Links" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: {
                color: draftConfig.bodyTextColor
              }, className: "text-sm leading-relaxed", children: [
                "This paragraph demonstrates your configured body text color. Links inside text seamlessly highlight in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  color: draftConfig.linkColor
                }, className: "font-medium underline underline-offset-4 cursor-pointer hover:opacity-80", children: "your custom link color" }),
                " ",
                "with interactive states."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: {
                color: draftConfig.mutedTextColor
              }, className: "text-xs flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                " Published on September 24, 2026",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                " 8 min read"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                backgroundColor: draftConfig.cardBgColor,
                borderColor: draftConfig.borderColor
              }, className: "rounded-2xl border p-4 shadow-sm space-y-3 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video w-full rounded-xl bg-muted overflow-hidden relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80", alt: "Karakoram Pass", className: "h-full w-full object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    backgroundColor: `${draftConfig.accentColor}e6`,
                    color: "#ffffff"
                  }, className: "absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", children: "Expedition" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: {
                  color: draftConfig.headingColor
                }, className: "font-bold text-sm leading-snug line-clamp-2", children: "Crossing the Baltoro Glacier on Two Wheels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                  color: draftConfig.bodyTextColor
                }, className: "text-xs line-clamp-2 leading-relaxed", children: "Surviving deep washouts and high altitude passes during monsoon transition." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    color: draftConfig.mutedTextColor
                  }, className: "text-[11px]", children: "Pakistan · Karakoram" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                    color: draftConfig.linkColor
                  }, className: "text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer", children: [
                    "Read Post ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                backgroundColor: draftConfig.cardBgColor,
                borderColor: draftConfig.borderColor
              }, className: "rounded-2xl border p-4 shadow-sm space-y-3 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video w-full rounded-xl bg-muted overflow-hidden relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80", alt: "High Mountain", className: "h-full w-full object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                    backgroundColor: draftConfig.secondaryColor,
                    color: "#ffffff"
                  }, className: "absolute top-2.5 right-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5" }),
                    " 14 Dispatches"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    color: draftConfig.accentColor
                  }, className: "text-[10px] font-bold uppercase tracking-widest", children: "Central Asia" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: {
                    color: draftConfig.headingColor
                  }, className: "font-bold text-sm", children: "Pamir Highway & Wakhan Corridor" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                  color: draftConfig.bodyTextColor
                }, className: "text-xs line-clamp-2 leading-relaxed", children: "The roof of the world across Tajikistan and Kyrgyzstan borderlands." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border/40 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    color: draftConfig.mutedTextColor
                  }, className: "text-[11px]", children: "Difficult · 4,655m" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: {
                    backgroundColor: draftConfig.buttonBgColor,
                    color: draftConfig.buttonTextColor
                  }, className: "rounded-lg px-2.5 py-1 text-[11px] font-semibold hover:opacity-90 transition", children: "Explore" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              backgroundColor: draftConfig.sectionBgColor,
              borderColor: draftConfig.borderColor
            }, className: "rounded-2xl border p-5 sm:p-6 text-white space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                  color: draftConfig.accentColor
                }, className: "text-xs font-bold uppercase tracking-wider flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5" }),
                  " CMS Controlled Block"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] opacity-75 font-mono", children: [
                  "sectionBgColor: ",
                  draftConfig.sectionBgColor
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  backgroundColor: draftConfig.cardBgColor,
                  borderColor: draftConfig.borderColor
                }, className: "rounded-xl border p-3 shadow-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: draftConfig.accentColor
                  }, className: "text-lg sm:text-xl font-bold font-mono", children: "42+" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: draftConfig.mutedTextColor
                  }, className: "text-[11px]", children: "Countries" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  backgroundColor: draftConfig.cardBgColor,
                  borderColor: draftConfig.borderColor
                }, className: "rounded-xl border p-3 shadow-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: draftConfig.accentColor
                  }, className: "text-lg sm:text-xl font-bold font-mono", children: "180k" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: draftConfig.mutedTextColor
                  }, className: "text-[11px]", children: "Kilometers" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  backgroundColor: draftConfig.cardBgColor,
                  borderColor: draftConfig.borderColor
                }, className: "rounded-xl border p-3 shadow-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: draftConfig.accentColor
                  }, className: "text-lg sm:text-xl font-bold font-mono", children: "12" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: draftConfig.mutedTextColor
                  }, className: "text-[11px]", children: "Years Solo" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            backgroundColor: draftConfig.footerBgColor,
            color: draftConfig.footerTextColor,
            borderColor: draftConfig.borderColor
          }, className: "p-6 text-xs border-t space-y-3 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-bold tracking-wider text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  backgroundColor: draftConfig.accentColor
                }, className: "h-5 w-5 rounded-md flex items-center justify-center text-white text-[10px]", children: "ND" }),
                "NDSOLOTRAVEL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hover:underline cursor-pointer", children: "Stories" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hover:underline cursor-pointer", children: "Destinations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hover:underline cursor-pointer", children: "Privacy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hover:underline cursor-pointer", children: "Contact" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 opacity-75 text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 ndsolotravel. All rights reserved." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Atmospheric Solo Travel & Adventure Photography" })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AdminColorsPage as component
};
