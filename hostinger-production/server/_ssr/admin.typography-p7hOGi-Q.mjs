import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn, x as adminGetTypographySettings, y as adminSaveTypographySettings, P as PREVIEW_STORAGE_KEY } from "./router-B6m4P0F8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as DEFAULT_TYPOGRAPHY_CONFIG, p as parseTypographyConfig, g as generateGoogleFontsUrl, C as CURATED_SCRIPT_FONTS, r as resolveGoogleFamily, b as CURATED_GOOGLE_FONTS } from "./typography-DvZTlhwY.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { ax as Type, R as RotateCcw, E as Eye, ay as Save, az as PenTool, a0 as Layers, aA as Monitor, aB as Tablet, aC as Smartphone, d as Sparkles, aD as SlidersVertical, J as Info, N as Compass, h as ArrowRight, y as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "./colors-C0oqDCsc.mjs";
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
function AdminTypographyPage() {
  const getSettingsFn = useServerFn(adminGetTypographySettings);
  const saveSettingsFn = useServerFn(adminSaveTypographySettings);
  const queryClient = useQueryClient();
  const {
    data: savedConfig,
    isLoading
  } = useQuery({
    queryKey: ["admin-typography-settings"],
    queryFn: () => getSettingsFn()
  });
  const [draftConfig, setDraftConfig] = reactExports.useState(DEFAULT_TYPOGRAPHY_CONFIG);
  const [activeDevice, setActiveDevice] = reactExports.useState("desktop");
  const [previewTheme, setPreviewTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    if (savedConfig) {
      setDraftConfig(parseTypographyConfig(savedConfig));
    }
  }, [savedConfig]);
  const isDirty = reactExports.useMemo(() => {
    if (!savedConfig) return false;
    return JSON.stringify(draftConfig) !== JSON.stringify(savedConfig);
  }, [draftConfig, savedConfig]);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    const fontsUrl = generateGoogleFontsUrl(draftConfig);
    if (!fontsUrl) return;
    let draftLink = document.getElementById("nd-draft-fonts-cms");
    if (!draftLink) {
      draftLink = document.createElement("link");
      draftLink.id = "nd-draft-fonts-cms";
      draftLink.rel = "stylesheet";
      document.head.appendChild(draftLink);
    }
    if (draftLink.href !== fontsUrl) {
      draftLink.href = fontsUrl;
    }
  }, [draftConfig]);
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      return await saveSettingsFn({
        data: payload
      });
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(["admin-typography-settings"], saved);
      queryClient.setQueryData(["typography-settings"], saved);
      queryClient.invalidateQueries({
        queryKey: ["typography-settings"]
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-typography-settings"]
      });
      sessionStorage.removeItem(PREVIEW_STORAGE_KEY);
      window.dispatchEvent(new Event("nd-typography-preview-changed"));
      toast.success("Typography settings saved and published live!");
    },
    onError: (err) => {
      toast.error(`Failed to publish typography: ${err.message}`);
    }
  });
  const handleReset = () => {
    setDraftConfig({
      ...DEFAULT_TYPOGRAPHY_CONFIG
    });
    toast.info("Reset to default typography. Click 'Save & Publish' to push live.");
  };
  const handleResetScript = () => {
    setDraftConfig((prev) => ({
      ...prev,
      scriptFont: DEFAULT_TYPOGRAPHY_CONFIG.scriptFont,
      scriptWeight: DEFAULT_TYPOGRAPHY_CONFIG.scriptWeight,
      scriptSize: {
        ...DEFAULT_TYPOGRAPHY_CONFIG.scriptSize
      },
      scriptLineHeight: {
        ...DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight
      },
      scriptLetterSpacing: {
        ...DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing
      }
    }));
    toast.info("Reset Script font to Yuyu Short default settings.");
  };
  const handlePreviewOnSite = () => {
    try {
      sessionStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(draftConfig));
      window.dispatchEvent(new Event("nd-typography-preview-changed"));
      toast.success("Preview mode activated! Opening home page in new tab...", {
        duration: 4e3
      });
      window.open("/", "_blank");
    } catch {
      toast.error("Failed to activate session preview");
    }
  };
  const updateResponsive = (field, val) => {
    setDraftConfig((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [activeDevice]: val
      }
    }));
  };
  const updateScriptResponsive = (field, val) => {
    setDraftConfig((prev) => ({
      ...prev,
      [field]: {
        ...prev[field] || DEFAULT_TYPOGRAPHY_CONFIG[field],
        [activeDevice]: val
      }
    }));
  };
  const currentScriptFontObj = reactExports.useMemo(() => {
    return CURATED_SCRIPT_FONTS.find((f) => f.name.toLowerCase() === (draftConfig.scriptFont || "").toLowerCase() || f.googleFamily.toLowerCase() === (draftConfig.scriptFont || "").toLowerCase()) || CURATED_SCRIPT_FONTS[0];
  }, [draftConfig.scriptFont]);
  const handleScriptFontChange = (fontName) => {
    const fontObj = CURATED_SCRIPT_FONTS.find((f) => f.name.toLowerCase() === fontName.toLowerCase() || f.googleFamily.toLowerCase() === fontName.toLowerCase());
    const availableWeights = fontObj?.weights || [400];
    let newWeight = draftConfig.scriptWeight || "400";
    const currentWeightNum = parseInt(newWeight, 10);
    if (!availableWeights.includes(currentWeightNum)) {
      newWeight = availableWeights.includes(400) ? "400" : String(availableWeights[0]);
    }
    setDraftConfig((prev) => ({
      ...prev,
      scriptFont: fontName,
      scriptWeight: newWeight
    }));
  };
  const previewCanvasStyles = reactExports.useMemo(() => {
    const activeSize = draftConfig.bodySize[activeDevice];
    const activeLineHeight = draftConfig.lineHeight[activeDevice];
    const activeLetterSpacing = draftConfig.letterSpacing[activeDevice];
    const scriptInfo = resolveGoogleFamily(draftConfig.scriptFont || "Yuyu Short");
    const activeScriptSize2 = (draftConfig.scriptSize || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize)[activeDevice];
    const activeScriptLineHeight2 = (draftConfig.scriptLineHeight || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight)[activeDevice];
    const activeScriptLetterSpacing2 = (draftConfig.scriptLetterSpacing || DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing)[activeDevice];
    return {
      "--font-display": `"${draftConfig.headingFont}", serif`,
      "--font-sans": `"${draftConfig.bodyFont}", sans-serif`,
      "--font-nav": `"${draftConfig.navigationFont}", sans-serif`,
      "--font-button": `"${draftConfig.buttonFont}", sans-serif`,
      "--font-weight-heading": draftConfig.headingWeight,
      "--font-weight-body": draftConfig.bodyWeight,
      "--font-size-body": `${activeSize}px`,
      "--line-height-body": `${activeLineHeight}`,
      "--letter-spacing-body": `${activeLetterSpacing}em`,
      "--letter-spacing-heading": `${draftConfig.headingLetterSpacing}em`,
      // Independent Script Font Variables (Home Hero Headline & Accents)
      "--font-hero-script": `"${scriptInfo.family}", ${scriptInfo.fallback}`,
      "--font-weight-script": draftConfig.scriptWeight || "400",
      "--font-size-hero-script": `${activeScriptSize2}px`,
      "--line-height-hero-script": `${activeScriptLineHeight2}`,
      "--letter-spacing-hero-script": `${activeScriptLetterSpacing2}em`
    };
  }, [draftConfig, activeDevice]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[400px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading typography configuration..." })
    ] }) });
  }
  const activeScriptSize = (draftConfig.scriptSize || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize)[activeDevice];
  const activeScriptLineHeight = (draftConfig.scriptLineHeight || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight)[activeDevice];
  const activeScriptLetterSpacing = (draftConfig.scriptLetterSpacing || DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing)[activeDevice];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: "Typography Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground max-w-2xl", children: "Control fonts, weights, sizes, and responsive hierarchy across the entire website without editing code. Changes update the preview in real-time and only affect the live site when published." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleReset, className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          "Reset to Default"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handlePreviewOnSite, className: "inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-xs font-semibold text-brand hover:bg-brand/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
          "Preview Changes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => saveMutation.mutate(draftConfig), disabled: saveMutation.isPending, className: `inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all ${isDirty ? "bg-brand hover:bg-brand/90 ring-2 ring-brand/20" : "bg-foreground hover:opacity-90"} disabled:opacity-50`, children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" }),
          "Publishing..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          "Save & Publish",
          isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]", children: "Unpublished" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 lg:col-span-6 xl:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-[#4085FF]/30 bg-card p-5 sm:p-6 shadow-sm space-y-5 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 h-28 w-28 bg-[#4085FF]/5 rounded-bl-full pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-[#4085FF]/15 text-[#4085FF]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: "Script Fonts" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-[#4085FF]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#4085FF] border border-[#4085FF]/20", children: "Independent System" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Configures the elegant cursive typeface specifically used for the Home Hero headline:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-[#4085FF] font-medium", children: "“Stories from the high places. Most people only fly over.”" }),
              " ",
              "Completely isolated from standard Heading and Body settings."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Script Font Family" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-[#4085FF]", children: draftConfig.scriptFont || "Yuyu Short" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: draftConfig.scriptFont || "Yuyu Short", onChange: (e) => handleScriptFontChange(e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-[#4085FF] focus:outline-none focus:ring-1 focus:ring-[#4085FF]", children: CURATED_SCRIPT_FONTS.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: font.name, children: [
              font.name,
              " ",
              font.name === "Yuyu Short" ? "(Default Hero Headline)" : "",
              " — ",
              font.description
            ] }, `script-opt-${font.name}`)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[#4085FF]/5 border border-[#4085FF]/20 p-3 text-xs flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: currentScriptFontObj.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] opacity-75", children: [
                  "Google Fonts API: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: currentScriptFontObj.googleFamily })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[11px] leading-relaxed", children: currentScriptFontObj.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3 text-[#4085FF]" }),
                "Live Hero Headline Preview"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground capitalize", children: [
                activeDevice,
                " view (",
                activeScriptSize,
                "px)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-black/85 p-5 text-center relative overflow-hidden transition-all shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
              fontFamily: `"${resolveGoogleFamily(draftConfig.scriptFont || "Yuyu Short").family}", ${currentScriptFontObj.fallback}`,
              fontSize: `${activeScriptSize}px`,
              fontWeight: draftConfig.scriptWeight || "400",
              lineHeight: activeScriptLineHeight,
              letterSpacing: `${activeScriptLetterSpacing}em`,
              color: "var(--accent, #4085FF)"
            }, className: "transition-all duration-200 select-none break-words", children: "Stories from the high places. Most people only fly over." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Script Font Weight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-muted px-2 py-0.5 text-xs font-semibold", children: draftConfig.scriptWeight || "400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: currentScriptFontObj.weights.map((weightNum) => {
              const weightStr = String(weightNum);
              const isSelected = (draftConfig.scriptWeight || "400") === weightStr;
              const labelMap = {
                100: "Thin",
                200: "Extra Light",
                300: "Light",
                400: "Regular",
                500: "Medium",
                600: "Semi-Bold",
                700: "Bold",
                800: "Extra Bold",
                900: "Black"
              };
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraftConfig({
                ...draftConfig,
                scriptWeight: weightStr
              }), className: `flex flex-col items-center justify-center rounded-xl border px-3.5 py-2 text-xs transition-all ${isSelected ? "border-[#4085FF] bg-[#4085FF]/15 font-bold text-[#4085FF] shadow-sm" : "border-border bg-background text-muted-foreground hover:bg-muted"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: weightStr }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-normal", children: labelMap[weightNum] || "Normal" })
              ] }, `sw-${weightStr}`);
            }) }),
            currentScriptFontObj.weights.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              currentScriptFontObj.name,
              " is designed with a single signature weight (",
              currentScriptFontObj.weights[0],
              ")."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-3 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5 text-[#4085FF]" }),
                "Responsive Headline Typography"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-xl bg-muted p-1 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("desktop"), className: `flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${activeDevice === "desktop" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3 w-3" }),
                  "Desktop"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("tablet"), className: `flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${activeDevice === "tablet" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tablet, { className: "h-3 w-3" }),
                  "Tablet"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("mobile"), className: `flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${activeDevice === "mobile" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3 w-3" }),
                  "Mobile"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Headline Font Size (",
                  activeDevice,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
                  activeScriptSize,
                  "px (",
                  (activeScriptSize / 16).toFixed(3),
                  "rem)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "14", max: "46", step: "1", value: activeScriptSize, onChange: (e) => updateScriptResponsive("scriptSize", parseFloat(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-[#4085FF]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "14", max: "46", step: "1", value: activeScriptSize, onChange: (e) => updateScriptResponsive("scriptSize", parseFloat(e.target.value) || activeScriptSize), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-[#4085FF] focus:outline-none" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Headline Line Height (",
                  activeDevice,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-foreground", children: activeScriptLineHeight })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "1.0", max: "2.0", step: "0.05", value: activeScriptLineHeight, onChange: (e) => updateScriptResponsive("scriptLineHeight", parseFloat(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-[#4085FF]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1.0", max: "2.0", step: "0.05", value: activeScriptLineHeight, onChange: (e) => updateScriptResponsive("scriptLineHeight", parseFloat(e.target.value) || activeScriptLineHeight), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-[#4085FF] focus:outline-none" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Headline Letter Spacing (",
                  activeDevice,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
                  activeScriptLetterSpacing,
                  "em"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "-0.05", max: "0.15", step: "0.005", value: activeScriptLetterSpacing, onChange: (e) => updateScriptResponsive("scriptLetterSpacing", parseFloat(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-[#4085FF]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "-0.05", max: "0.15", step: "0.005", value: activeScriptLetterSpacing, onChange: (e) => updateScriptResponsive("scriptLetterSpacing", parseFloat(e.target.value) || activeScriptLetterSpacing), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-[#4085FF] focus:outline-none" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleResetScript, className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
              "Reset Script to Yuyu Short"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handlePreviewOnSite, className: "inline-flex items-center gap-1.5 rounded-lg border border-[#4085FF]/30 bg-[#4085FF]/10 px-3 py-1.5 text-xs font-medium text-[#4085FF] hover:bg-[#4085FF]/20 transition", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                "Preview Changes"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => saveMutation.mutate(draftConfig), disabled: saveMutation.isPending, className: "inline-flex items-center gap-1.5 rounded-lg bg-[#4085FF] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#3570D0] transition disabled:opacity-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3 w-3" }),
                "Save & Publish"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: "Standard Font Families" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "1. Heading Font" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-brand", children: draftConfig.headingFont })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: draftConfig.headingFont, onChange: (e) => setDraftConfig({
              ...draftConfig,
              headingFont: e.target.value
            }), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Editorial & Cinematic Serifs", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: f.name, children: [
                f.name,
                " — ",
                f.vibe
              ] }, `heading-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Modern & Geometric Sans", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: f.name, children: [
                f.name,
                " — ",
                f.vibe
              ] }, `heading-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Adventure & Display", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Adventure & Display").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: f.name, children: [
                f.name,
                " — ",
                f.vibe
              ] }, `heading-${f.name}`)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Applied to hero titles, blog headings, section titles, and story covers." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "2. Body Font" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-brand", children: draftConfig.bodyFont })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: draftConfig.bodyFont, onChange: (e) => setDraftConfig({
              ...draftConfig,
              bodyFont: e.target.value
            }), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Modern & Clean Sans", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: f.name, children: [
                f.name,
                " — ",
                f.vibe
              ] }, `body-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Editorial & Reading Serifs", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: f.name, children: [
                f.name,
                " — ",
                f.vibe
              ] }, `body-${f.name}`)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Applied to story paragraphs, descriptions, metadata, and captions." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "3. Navigation Font" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-brand", children: draftConfig.navigationFont })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: draftConfig.navigationFont, onChange: (e) => setDraftConfig({
              ...draftConfig,
              navigationFont: e.target.value
            }), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Modern Sans-Serif", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.name, children: f.name }, `nav-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Adventure & Display", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Adventure & Display").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.name, children: f.name }, `nav-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Editorial Serif", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.name, children: f.name }, `nav-${f.name}`)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Header navigation bar, footer menus, category tabs, and sub-nav links." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "4. Button Font" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-brand", children: draftConfig.buttonFont })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: draftConfig.buttonFont, onChange: (e) => setDraftConfig({
              ...draftConfig,
              buttonFont: e.target.value
            }), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Modern Sans-Serif", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.name, children: f.name }, `btn-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Adventure & Display", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Adventure & Display").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.name, children: f.name }, `btn-${f.name}`)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Editorial Serif", children: CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.name, children: f.name }, `btn-${f.name}`)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Action buttons, call-to-actions, filters, badges, and interactive pills." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersVertical, { className: "h-4 w-4 text-brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: "Standard Font Weights" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "5. Heading Font Weight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-muted px-2 py-0.5 text-xs font-semibold", children: draftConfig.headingWeight })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: [{
              label: "500",
              sub: "Medium",
              val: "500"
            }, {
              label: "600",
              sub: "Semi",
              val: "600"
            }, {
              label: "700",
              sub: "Bold",
              val: "700"
            }, {
              label: "800",
              sub: "Heavy",
              val: "800"
            }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraftConfig({
              ...draftConfig,
              headingWeight: item.val
            }), className: `flex flex-col items-center justify-center rounded-xl border py-2 text-xs transition-all ${draftConfig.headingWeight === item.val ? "border-brand bg-brand/10 font-bold text-brand shadow-sm" : "border-border bg-background text-muted-foreground hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-normal", children: item.sub })
            ] }, `hw-${item.val}`)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "6. Body Font Weight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-muted px-2 py-0.5 text-xs font-semibold", children: draftConfig.bodyWeight })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: [{
              label: "300",
              sub: "Light",
              val: "300"
            }, {
              label: "400",
              sub: "Regular",
              val: "400"
            }, {
              label: "500",
              sub: "Medium",
              val: "500"
            }, {
              label: "600",
              sub: "Semi",
              val: "600"
            }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraftConfig({
              ...draftConfig,
              bodyWeight: item.val
            }), className: `flex flex-col items-center justify-center rounded-xl border py-2 text-xs transition-all ${draftConfig.bodyWeight === item.val ? "border-brand bg-brand/10 font-bold text-brand shadow-sm" : "border-border bg-background text-muted-foreground hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-normal", children: item.sub })
            ] }, `bw-${item.val}`)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: "Standard Sizing & Spacing" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-xl bg-muted p-1 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("desktop"), className: `flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${activeDevice === "desktop" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3.5 w-3.5" }),
                "Desktop"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("tablet"), className: `flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${activeDevice === "tablet" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tablet, { className: "h-3.5 w-3.5" }),
                "Tablet"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveDevice("mobile"), className: `flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${activeDevice === "mobile" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3.5 w-3.5" }),
                "Mobile"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/40 p-3 text-xs text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 shrink-0 text-brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Currently configuring for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground capitalize", children: activeDevice }),
              " ",
              activeDevice === "desktop" ? "(screen width ≥ 1024px)" : activeDevice === "tablet" ? "(screen width 641px – 1023px)" : "(screen width ≤ 640px)",
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
                "7. Body Font Size (",
                activeDevice,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
                draftConfig.bodySize[activeDevice],
                "px (",
                (draftConfig.bodySize[activeDevice] / 16).toFixed(3),
                "rem)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "13", max: "24", step: "0.5", value: draftConfig.bodySize[activeDevice], onChange: (e) => updateResponsive("bodySize", parseFloat(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "13", max: "24", step: "0.5", value: draftConfig.bodySize[activeDevice], onChange: (e) => updateResponsive("bodySize", parseFloat(e.target.value) || draftConfig.bodySize[activeDevice]), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
                "8. Line Height (",
                activeDevice,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-foreground", children: draftConfig.lineHeight[activeDevice] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "1.2", max: "2.2", step: "0.05", value: draftConfig.lineHeight[activeDevice], onChange: (e) => updateResponsive("lineHeight", parseFloat(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1.2", max: "2.2", step: "0.05", value: draftConfig.lineHeight[activeDevice], onChange: (e) => updateResponsive("lineHeight", parseFloat(e.target.value) || draftConfig.lineHeight[activeDevice]), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
                "9. Body Letter Spacing (",
                activeDevice,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
                draftConfig.letterSpacing[activeDevice],
                "em"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "-0.05", max: "0.08", step: "0.005", value: draftConfig.letterSpacing[activeDevice], onChange: (e) => updateResponsive("letterSpacing", parseFloat(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "-0.05", max: "0.08", step: "0.005", value: draftConfig.letterSpacing[activeDevice], onChange: (e) => updateResponsive("letterSpacing", parseFloat(e.target.value) || draftConfig.letterSpacing[activeDevice]), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Heading Letter Spacing (Global)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
                draftConfig.headingLetterSpacing,
                "em"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "-0.05", max: "0.05", step: "0.005", value: draftConfig.headingLetterSpacing, onChange: (e) => setDraftConfig({
                ...draftConfig,
                headingLetterSpacing: parseFloat(e.target.value)
              }), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "-0.05", max: "0.05", step: "0.005", value: draftConfig.headingLetterSpacing, onChange: (e) => setDraftConfig({
                ...draftConfig,
                headingLetterSpacing: parseFloat(e.target.value) || draftConfig.headingLetterSpacing
              }), className: "w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Real-Time Typography Preview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-lg bg-muted p-0.5 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveDevice("desktop"), title: "Simulate Desktop View", className: `p-1.5 rounded-md transition ${activeDevice === "desktop" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveDevice("tablet"), title: "Simulate Tablet View", className: `p-1.5 rounded-md transition ${activeDevice === "tablet" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tablet, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveDevice("mobile"), title: "Simulate Mobile View", className: `p-1.5 rounded-md transition ${activeDevice === "mobile" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3.5 w-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPreviewTheme((t) => t === "dark" ? "light" : "dark"), className: "rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted", children: previewTheme === "dark" ? "🌙 Dark Canvas" : "☀️ Light Canvas" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto w-full transition-all duration-300 ${activeDevice === "desktop" ? "max-w-full" : activeDevice === "tablet" ? "max-w-[720px]" : "max-w-[380px]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: previewCanvasStyles, className: `rounded-2xl border border-border p-6 sm:p-8 shadow-xl transition-colors duration-200 overflow-hidden ${previewTheme === "dark" ? "bg-[#0b0f17] text-white" : "bg-white text-neutral-900"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-5 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-5 w-5 text-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-heading)",
                letterSpacing: "var(--letter-spacing-heading)"
              }, className: "text-base tracking-tight font-bold", children: "NDSOLOTRAVEL" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { style: {
              fontFamily: "var(--font-nav)"
            }, className: "hidden sm:flex items-center gap-4 text-xs tracking-wide", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-medium", children: "Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 hover:opacity-100", children: "Destinations" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 hover:opacity-100", children: "Gallery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 hover:opacity-100", children: "About" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: {
              fontFamily: "var(--font-button)"
            }, className: "rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90", children: "Read Dispatch" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-[11px] font-semibold text-brand tracking-wider uppercase", children: "Featured Expedition" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "var(--letter-spacing-heading)"
            }, className: "text-2xl sm:text-3xl lg:text-4xl leading-[1.18] font-bold text-inherit", children: "Solo journeys, motorcycle adventures, and trekking across the world" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
              fontFamily: "var(--font-hero-script)",
              fontSize: "var(--font-size-hero-script)",
              fontWeight: "var(--font-weight-script)",
              lineHeight: "var(--line-height-hero-script)",
              letterSpacing: "var(--letter-spacing-hero-script)",
              color: "var(--accent, #4085FF)"
            }, className: "mt-2 mb-4 font-medium break-words", children: "Stories from the high places. Most people only fly over." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-5 pt-4 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-brand font-semibold", children: "Field Notes · Day 14" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "var(--letter-spacing-heading)"
            }, className: "text-xl sm:text-2xl leading-snug font-semibold text-inherit", children: "The Solitude of High Passes and Whispering Glaciers" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
            fontFamily: "var(--font-sans)",
            fontWeight: "var(--font-weight-body)",
            fontSize: "var(--font-size-body)",
            lineHeight: "var(--line-height-body)",
            letterSpacing: "var(--letter-spacing-body)"
          }, className: "text-inherit opacity-90", children: "There is an austere tranquility to the northern valleys when the dusk light begins to settle against jagged ridgelines. Travelling on two wheels with no fixed schedule changes how you perceive distance, weather, and silence. Out here, every gravel bend demands presence, and every mountain pass reminds you of your humble place under the open sky." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-6 pt-4 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: {
              fontFamily: "var(--font-button)"
            }, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Explore Route Itinerary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: {
              fontFamily: "var(--font-button)"
            }, className: `inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${previewTheme === "dark" ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "border-neutral-300 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"}`, children: "View Coordinates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider opacity-60", children: "expedition metrics (composite number stack)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 min-[420px]:grid-cols-4 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl p-3 border ${previewTheme === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-neutral-50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase opacity-70", children: "Pass Altitude" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabular-nums text-lg sm:text-xl font-bold text-brand", children: "4,693m" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl p-3 border ${previewTheme === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-neutral-50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase opacity-70", children: "Distance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabular-nums text-lg sm:text-xl font-bold text-brand", children: "18,420 km" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl p-3 border ${previewTheme === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-neutral-50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase opacity-70", children: "Solo Trips" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabular-nums text-lg sm:text-xl font-bold text-brand", children: "102+" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl p-3 border ${previewTheme === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-neutral-50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase opacity-70", children: "Days on Trail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabular-nums text-lg sm:text-xl font-bold text-brand", children: "142+" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground flex flex-col gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#4085FF] font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Hero Script:" }),
              " ",
              draftConfig.scriptFont || "Yuyu Short",
              " (",
              draftConfig.scriptWeight || "400",
              " / ",
              activeScriptSize,
              "px)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Headings:" }),
              " ",
              draftConfig.headingFont,
              " (",
              draftConfig.headingWeight,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Body:" }),
              " ",
              draftConfig.bodyFont,
              " (",
              draftConfig.bodyWeight,
              " /",
              " ",
              draftConfig.bodySize[activeDevice],
              "px)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nav:" }),
              " ",
              draftConfig.navigationFont
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Button:" }),
              " ",
              draftConfig.buttonFont
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-emerald-600 font-medium border-t border-border/40 pt-2 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Optimized performance (loads only required and selected font families)" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminTypographyPage as component
};
