import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useMemo } from "react";
import {
  Type,
  Save,
  RotateCcw,
  Eye,
  CheckCircle2,
  Sliders,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  Compass,
  PenTool,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminGetTypographySettings,
  adminSaveTypographySettings,
} from "@/lib/typography.functions";
import {
  CURATED_GOOGLE_FONTS,
  CURATED_SCRIPT_FONTS,
  DEFAULT_TYPOGRAPHY_CONFIG,
  generateGoogleFontsUrl,
  parseTypographyConfig,
  resolveGoogleFamily,
  type TypographyConfig,
  type GoogleFontOption,
  type ScriptFontOption,
} from "@/lib/typography";
import { PREVIEW_STORAGE_KEY } from "@/components/layout/TypographyManager";

export const Route = createFileRoute("/_authenticated/admin/typography")({
  head: () => ({
    meta: [
      { title: "Typography Management — Admin CMS" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminTypographyPage,
});

type DeviceMode = "desktop" | "tablet" | "mobile";

function AdminTypographyPage() {
  const getSettingsFn = useServerFn(adminGetTypographySettings);
  const saveSettingsFn = useServerFn(adminSaveTypographySettings);
  const queryClient = useQueryClient();

  const { data: savedConfig, isLoading } = useQuery({
    queryKey: ["admin-typography-settings"],
    queryFn: () => getSettingsFn(),
  });

  const [draftConfig, setDraftConfig] = useState<TypographyConfig>(DEFAULT_TYPOGRAPHY_CONFIG);
  const [activeDevice, setActiveDevice] = useState<DeviceMode>("desktop");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");

  // Sync loaded configuration into draft state
  useEffect(() => {
    if (savedConfig) {
      setDraftConfig(parseTypographyConfig(savedConfig));
    }
  }, [savedConfig]);

  // Compute dirty state
  const isDirty = useMemo(() => {
    if (!savedConfig) return false;
    return JSON.stringify(draftConfig) !== JSON.stringify(savedConfig);
  }, [draftConfig, savedConfig]);

  // Dynamically load draft fonts in CMS document head so real-time preview renders accurately
  useEffect(() => {
    if (typeof document === "undefined") return;
    const fontsUrl = generateGoogleFontsUrl(draftConfig);
    if (!fontsUrl) return;

    let draftLink = document.getElementById("nd-draft-fonts-cms") as HTMLLinkElement | null;
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

  // Save & Publish mutation
  const saveMutation = useMutation({
    mutationFn: async (payload: TypographyConfig) => {
      return await saveSettingsFn({ data: payload });
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(["admin-typography-settings"], saved);
      queryClient.setQueryData(["typography-settings"], saved);
      queryClient.invalidateQueries({ queryKey: ["typography-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-typography-settings"] });
      // Remove any temporary session preview
      sessionStorage.removeItem(PREVIEW_STORAGE_KEY);
      window.dispatchEvent(new Event("nd-typography-preview-changed"));
      toast.success("Typography settings saved and published live!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to publish typography: ${err.message}`);
    },
  });

  // Reset to default
  const handleReset = () => {
    setDraftConfig({ ...DEFAULT_TYPOGRAPHY_CONFIG });
    toast.info("Reset to default typography. Click 'Save & Publish' to push live.");
  };

  // Reset only script font to default Yuyu Short
  const handleResetScript = () => {
    setDraftConfig((prev) => ({
      ...prev,
      scriptFont: DEFAULT_TYPOGRAPHY_CONFIG.scriptFont,
      scriptWeight: DEFAULT_TYPOGRAPHY_CONFIG.scriptWeight,
      scriptSize: { ...DEFAULT_TYPOGRAPHY_CONFIG.scriptSize },
      scriptLineHeight: { ...DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight },
      scriptLetterSpacing: { ...DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing },
    }));
    toast.info("Reset Script font to Yuyu Short default settings.");
  };

  // Preview Changes across live website
  const handlePreviewOnSite = () => {
    try {
      sessionStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(draftConfig));
      window.dispatchEvent(new Event("nd-typography-preview-changed"));
      toast.success("Preview mode activated! Opening home page in new tab...", {
        duration: 4000,
      });
      window.open("/", "_blank");
    } catch {
      toast.error("Failed to activate session preview");
    }
  };

  // Helper updater for standard responsive values
  const updateResponsive = (
    field: "bodySize" | "lineHeight" | "letterSpacing",
    val: number,
  ) => {
    setDraftConfig((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [activeDevice]: val,
      },
    }));
  };

  // Helper updater for script font responsive values
  const updateScriptResponsive = (
    field: "scriptSize" | "scriptLineHeight" | "scriptLetterSpacing",
    val: number,
  ) => {
    setDraftConfig((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] || DEFAULT_TYPOGRAPHY_CONFIG[field]),
        [activeDevice]: val,
      },
    }));
  };

  // Lookup active script font metadata and supported weights
  const currentScriptFontObj: ScriptFontOption = useMemo(() => {
    return (
      CURATED_SCRIPT_FONTS.find(
        (f) =>
          f.name.toLowerCase() === (draftConfig.scriptFont || "").toLowerCase() ||
          f.googleFamily.toLowerCase() === (draftConfig.scriptFont || "").toLowerCase(),
      ) || CURATED_SCRIPT_FONTS[0]
    );
  }, [draftConfig.scriptFont]);

  // Handle script font change with auto weight compatibility
  const handleScriptFontChange = (fontName: string) => {
    const fontObj = CURATED_SCRIPT_FONTS.find(
      (f) =>
        f.name.toLowerCase() === fontName.toLowerCase() ||
        f.googleFamily.toLowerCase() === fontName.toLowerCase(),
    );
    const availableWeights = fontObj?.weights || [400];
    let newWeight = draftConfig.scriptWeight || "400";
    const currentWeightNum = parseInt(newWeight, 10);
    if (!availableWeights.includes(currentWeightNum)) {
      newWeight = availableWeights.includes(400) ? "400" : String(availableWeights[0]);
    }
    setDraftConfig((prev) => ({
      ...prev,
      scriptFont: fontName,
      scriptWeight: newWeight,
    }));
  };

  // Scoped CSS styles for the preview canvas
  const previewCanvasStyles = useMemo(() => {
    const activeSize = draftConfig.bodySize[activeDevice];
    const activeLineHeight = draftConfig.lineHeight[activeDevice];
    const activeLetterSpacing = draftConfig.letterSpacing[activeDevice];

    const scriptInfo = resolveGoogleFamily(draftConfig.scriptFont || "Yuyu Short");
    const activeScriptSize = (draftConfig.scriptSize || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize)[activeDevice];
    const activeScriptLineHeight = (draftConfig.scriptLineHeight || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight)[activeDevice];
    const activeScriptLetterSpacing = (draftConfig.scriptLetterSpacing || DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing)[activeDevice];

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
      "--font-size-hero-script": `${activeScriptSize}px`,
      "--line-height-hero-script": `${activeScriptLineHeight}`,
      "--letter-spacing-hero-script": `${activeScriptLetterSpacing}em`,

      // Theme Accent & Brand Tokens
      "--accent": "#4085FF",
      "--brand": "#4085FF",
    } as React.CSSProperties;
  }, [draftConfig, activeDevice]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading typography configuration...</p>
        </div>
      </div>
    );
  }

  const activeScriptSize = (draftConfig.scriptSize || DEFAULT_TYPOGRAPHY_CONFIG.scriptSize)[activeDevice];
  const activeScriptLineHeight = (draftConfig.scriptLineHeight || DEFAULT_TYPOGRAPHY_CONFIG.scriptLineHeight)[activeDevice];
  const activeScriptLetterSpacing = (draftConfig.scriptLetterSpacing || DEFAULT_TYPOGRAPHY_CONFIG.scriptLetterSpacing)[activeDevice];

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Global Action Bar */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Type className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Typography Management
            </h1>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            Control fonts, weights, sizes, and responsive hierarchy across the entire website
            without editing code. Changes update the preview in real-time and only affect the live
            site when published.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
            Reset to Default
          </button>

          <button
            type="button"
            onClick={handlePreviewOnSite}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-xs font-semibold text-brand hover:bg-brand/20 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview Changes
          </button>

          <button
            type="button"
            onClick={() => saveMutation.mutate(draftConfig)}
            disabled={saveMutation.isPending}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all ${
              isDirty
                ? "bg-brand hover:bg-brand/90 ring-2 ring-brand/20"
                : "bg-foreground hover:opacity-90"
            } disabled:opacity-50`}
          >
            {saveMutation.isPending ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Publishing...
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                Save & Publish
                {isDirty && (
                  <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                    Unpublished
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (Left) vs Real-Time Preview (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Controls */}
        <div className="space-y-6 lg:col-span-6 xl:col-span-5">
          {/* ========================================================= */}
          {/* DEDICATED SCRIPT FONTS SECTION (Completely Independent) */}
          {/* ========================================================= */}
          <div className="rounded-2xl border-2 border-[#4085FF]/30 bg-card p-5 sm:p-6 shadow-sm space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-28 w-28 bg-[#4085FF]/5 rounded-bl-full pointer-events-none" />

            <div className="flex flex-col gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4085FF]/15 text-[#4085FF]">
                    <PenTool className="h-4 w-4" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">
                    Script Fonts
                  </h2>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#4085FF]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#4085FF] border border-[#4085FF]/20">
                  Independent System
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Configures the elegant cursive typeface specifically used for the Home Hero headline:{" "}
                <em className="text-[#4085FF] font-medium">“Stories from the high places. Most people only fly over.”</em>{" "}
                Completely isolated from standard Heading and Body settings.
              </p>
            </div>

            {/* Script Font Selection Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Script Font Family
                </label>
                <span className="text-xs font-bold text-[#4085FF]">
                  {draftConfig.scriptFont || "Yuyu Short"}
                </span>
              </div>

              <select
                value={draftConfig.scriptFont || "Yuyu Short"}
                onChange={(e) => handleScriptFontChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-[#4085FF] focus:outline-none focus:ring-1 focus:ring-[#4085FF]"
              >
                {CURATED_SCRIPT_FONTS.map((font) => (
                  <option key={`script-opt-${font.name}`} value={font.name}>
                    {font.name} {font.name === "Yuyu Short" ? "(Default Hero Headline)" : ""} — {font.description}
                  </option>
                ))}
              </select>

              <div className="rounded-xl bg-[#4085FF]/5 border border-[#4085FF]/20 p-3 text-xs flex flex-col gap-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="font-semibold text-foreground">{currentScriptFontObj.name}</span>
                  <span className="text-[11px] opacity-75">
                    Google Fonts API: <code>{currentScriptFontObj.googleFamily}</code>
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {currentScriptFontObj.description}
                </p>
              </div>
            </div>

            {/* Dedicated Live Preview of Selected Script Font */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Eye className="h-3 w-3 text-[#4085FF]" />
                  Live Hero Headline Preview
                </label>
                <span className="text-[11px] text-muted-foreground capitalize">
                  {activeDevice} view ({activeScriptSize}px)
                </span>
              </div>

              <div
                className="rounded-xl border border-border bg-black/85 p-5 text-center relative overflow-hidden transition-all shadow-inner"
              >
                <p
                  style={{
                    fontFamily: `"${resolveGoogleFamily(draftConfig.scriptFont || "Yuyu Short").family}", ${currentScriptFontObj.fallback}`,
                    fontSize: `${activeScriptSize}px`,
                    fontWeight: draftConfig.scriptWeight || "400",
                    lineHeight: activeScriptLineHeight,
                    letterSpacing: `${activeScriptLetterSpacing}em`,
                    color: "var(--accent, #4085FF)",
                  }}
                  className="transition-all duration-200 select-none break-words"
                >
                  Stories from the high places. Most people only fly over.
                </p>
              </div>
            </div>

            {/* Script Font Weight Control (Where supported by font) */}
            <div className="space-y-2.5 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Script Font Weight
                </label>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">
                  {draftConfig.scriptWeight || "400"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentScriptFontObj.weights.map((weightNum) => {
                  const weightStr = String(weightNum);
                  const isSelected = (draftConfig.scriptWeight || "400") === weightStr;
                  const labelMap: Record<number, string> = {
                    100: "Thin",
                    200: "Extra Light",
                    300: "Light",
                    400: "Regular",
                    500: "Medium",
                    600: "Semi-Bold",
                    700: "Bold",
                    800: "Extra Bold",
                    900: "Black",
                  };
                  return (
                    <button
                      key={`sw-${weightStr}`}
                      type="button"
                      onClick={() =>
                        setDraftConfig({ ...draftConfig, scriptWeight: weightStr })
                      }
                      className={`flex flex-col items-center justify-center rounded-xl border px-3.5 py-2 text-xs transition-all ${
                        isSelected
                          ? "border-[#4085FF] bg-[#4085FF]/15 font-bold text-[#4085FF] shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="font-mono">{weightStr}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        {labelMap[weightNum] || "Normal"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {currentScriptFontObj.weights.length === 1 && (
                <p className="text-[11px] text-muted-foreground">
                  {currentScriptFontObj.name} is designed with a single signature weight ({currentScriptFontObj.weights[0]}).
                </p>
              )}
            </div>

            {/* Script Responsive Controls (Desktop, Tablet, Mobile) */}
            <div className="space-y-4 pt-3 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-[#4085FF]" />
                  Responsive Headline Typography
                </label>

                {/* Device Selector */}
                <div className="flex items-center rounded-xl bg-muted p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveDevice("desktop")}
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                      activeDevice === "desktop"
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Monitor className="h-3 w-3" />
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDevice("tablet")}
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                      activeDevice === "tablet"
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Tablet className="h-3 w-3" />
                    Tablet
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDevice("mobile")}
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                      activeDevice === "mobile"
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Smartphone className="h-3 w-3" />
                    Mobile
                  </button>
                </div>
              </div>

              {/* Script Font Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Headline Font Size ({activeDevice})
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {activeScriptSize}px ({(activeScriptSize / 16).toFixed(3)}rem)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="14"
                    max="46"
                    step="1"
                    value={activeScriptSize}
                    onChange={(e) =>
                      updateScriptResponsive("scriptSize", parseFloat(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-[#4085FF]"
                  />
                  <input
                    type="number"
                    min="14"
                    max="46"
                    step="1"
                    value={activeScriptSize}
                    onChange={(e) =>
                      updateScriptResponsive(
                        "scriptSize",
                        parseFloat(e.target.value) || activeScriptSize,
                      )
                    }
                    className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-[#4085FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Script Line Height */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Headline Line Height ({activeDevice})
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {activeScriptLineHeight}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1.0"
                    max="2.0"
                    step="0.05"
                    value={activeScriptLineHeight}
                    onChange={(e) =>
                      updateScriptResponsive("scriptLineHeight", parseFloat(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-[#4085FF]"
                  />
                  <input
                    type="number"
                    min="1.0"
                    max="2.0"
                    step="0.05"
                    value={activeScriptLineHeight}
                    onChange={(e) =>
                      updateScriptResponsive(
                        "scriptLineHeight",
                        parseFloat(e.target.value) || activeScriptLineHeight,
                      )
                    }
                    className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-[#4085FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Script Letter Spacing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Headline Letter Spacing ({activeDevice})
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {activeScriptLetterSpacing}em
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="-0.05"
                    max="0.15"
                    step="0.005"
                    value={activeScriptLetterSpacing}
                    onChange={(e) =>
                      updateScriptResponsive("scriptLetterSpacing", parseFloat(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-[#4085FF]"
                  />
                  <input
                    type="number"
                    min="-0.05"
                    max="0.15"
                    step="0.005"
                    value={activeScriptLetterSpacing}
                    onChange={(e) =>
                      updateScriptResponsive(
                        "scriptLetterSpacing",
                        parseFloat(e.target.value) || activeScriptLetterSpacing,
                      )
                    }
                    className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-[#4085FF] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Script Section Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/40">
              <button
                type="button"
                onClick={handleResetScript}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Script to Yuyu Short
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviewOnSite}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#4085FF]/30 bg-[#4085FF]/10 px-3 py-1.5 text-xs font-medium text-[#4085FF] hover:bg-[#4085FF]/20 transition"
                >
                  <Eye className="h-3 w-3" />
                  Preview Changes
                </button>
                <button
                  type="button"
                  onClick={() => saveMutation.mutate(draftConfig)}
                  disabled={saveMutation.isPending}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#4085FF] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#3570D0] transition disabled:opacity-50"
                >
                  <Save className="h-3 w-3" />
                  Save & Publish
                </button>
              </div>
            </div>
          </div>

          {/* Section 1: Standard Website Font Families */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Sparkles className="h-4 w-4 text-brand" />
              <h2 className="text-base font-bold text-foreground">Standard Font Families</h2>
            </div>

            {/* 1. Heading Font */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  1. Heading Font
                </label>
                <span className="text-xs font-medium text-brand">
                  {draftConfig.headingFont}
                </span>
              </div>
              <select
                value={draftConfig.headingFont}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, headingFont: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <optgroup label="Editorial & Cinematic Serifs">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map(
                    (f) => (
                      <option key={`heading-${f.name}`} value={f.name}>
                        {f.name} — {f.vibe}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Modern & Geometric Sans">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map(
                    (f) => (
                      <option key={`heading-${f.name}`} value={f.name}>
                        {f.name} — {f.vibe}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Adventure & Display">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Adventure & Display").map(
                    (f) => (
                      <option key={`heading-${f.name}`} value={f.name}>
                        {f.name} — {f.vibe}
                      </option>
                    ),
                  )}
                </optgroup>
              </select>
              <p className="text-[11px] text-muted-foreground">
                Applied to hero titles, blog headings, section titles, and story covers.
              </p>
            </div>

            {/* 2. Body Font */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  2. Body Font
                </label>
                <span className="text-xs font-medium text-brand">{draftConfig.bodyFont}</span>
              </div>
              <select
                value={draftConfig.bodyFont}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, bodyFont: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <optgroup label="Modern & Clean Sans">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map(
                    (f) => (
                      <option key={`body-${f.name}`} value={f.name}>
                        {f.name} — {f.vibe}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Editorial & Reading Serifs">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map(
                    (f) => (
                      <option key={`body-${f.name}`} value={f.name}>
                        {f.name} — {f.vibe}
                      </option>
                    ),
                  )}
                </optgroup>
              </select>
              <p className="text-[11px] text-muted-foreground">
                Applied to story paragraphs, descriptions, metadata, and captions.
              </p>
            </div>

            {/* 3. Navigation Font */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  3. Navigation Font
                </label>
                <span className="text-xs font-medium text-brand">
                  {draftConfig.navigationFont}
                </span>
              </div>
              <select
                value={draftConfig.navigationFont}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, navigationFont: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <optgroup label="Modern Sans-Serif">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map(
                    (f) => (
                      <option key={`nav-${f.name}`} value={f.name}>
                        {f.name}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Adventure & Display">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Adventure & Display").map(
                    (f) => (
                      <option key={`nav-${f.name}`} value={f.name}>
                        {f.name}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Editorial Serif">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map(
                    (f) => (
                      <option key={`nav-${f.name}`} value={f.name}>
                        {f.name}
                      </option>
                    ),
                  )}
                </optgroup>
              </select>
              <p className="text-[11px] text-muted-foreground">
                Header navigation bar, footer menus, category tabs, and sub-nav links.
              </p>
            </div>

            {/* 4. Button Font */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  4. Button Font
                </label>
                <span className="text-xs font-medium text-brand">
                  {draftConfig.buttonFont}
                </span>
              </div>
              <select
                value={draftConfig.buttonFont}
                onChange={(e) =>
                  setDraftConfig({ ...draftConfig, buttonFont: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <optgroup label="Modern Sans-Serif">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Sans-Serif (Modern)").map(
                    (f) => (
                      <option key={`btn-${f.name}`} value={f.name}>
                        {f.name}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Adventure & Display">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Adventure & Display").map(
                    (f) => (
                      <option key={`btn-${f.name}`} value={f.name}>
                        {f.name}
                      </option>
                    ),
                  )}
                </optgroup>
                <optgroup label="Editorial Serif">
                  {CURATED_GOOGLE_FONTS.filter((f) => f.category === "Serif (Editorial)").map(
                    (f) => (
                      <option key={`btn-${f.name}`} value={f.name}>
                        {f.name}
                      </option>
                    ),
                  )}
                </optgroup>
              </select>
              <p className="text-[11px] text-muted-foreground">
                Action buttons, call-to-actions, filters, badges, and interactive pills.
              </p>
            </div>
          </div>

          {/* Section 2: Font Weights */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Sliders className="h-4 w-4 text-brand" />
              <h2 className="text-base font-bold text-foreground">Standard Font Weights</h2>
            </div>

            {/* 5. Heading Font Weight */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  5. Heading Font Weight
                </label>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">
                  {draftConfig.headingWeight}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "500", sub: "Medium", val: "500" },
                  { label: "600", sub: "Semi", val: "600" },
                  { label: "700", sub: "Bold", val: "700" },
                  { label: "800", sub: "Heavy", val: "800" },
                ].map((item) => (
                  <button
                    key={`hw-${item.val}`}
                    type="button"
                    onClick={() =>
                      setDraftConfig({ ...draftConfig, headingWeight: item.val })
                    }
                    className={`flex flex-col items-center justify-center rounded-xl border py-2 text-xs transition-all ${
                      draftConfig.headingWeight === item.val
                        ? "border-brand bg-brand/10 font-bold text-brand shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Body Font Weight */}
            <div className="space-y-2.5 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  6. Body Font Weight
                </label>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">
                  {draftConfig.bodyWeight}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "300", sub: "Light", val: "300" },
                  { label: "400", sub: "Regular", val: "400" },
                  { label: "500", sub: "Medium", val: "500" },
                  { label: "600", sub: "Semi", val: "600" },
                ].map((item) => (
                  <button
                    key={`bw-${item.val}`}
                    type="button"
                    onClick={() =>
                      setDraftConfig({ ...draftConfig, bodyWeight: item.val })
                    }
                    className={`flex flex-col items-center justify-center rounded-xl border py-2 text-xs transition-all ${
                      draftConfig.bodyWeight === item.val
                        ? "border-brand bg-brand/10 font-bold text-brand shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Responsive Controls (Desktop, Tablet, Mobile) */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand" />
                <h2 className="text-base font-bold text-foreground">
                  Standard Sizing & Spacing
                </h2>
              </div>

              {/* Device Tabs */}
              <div className="flex items-center rounded-xl bg-muted p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setActiveDevice("desktop")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    activeDevice === "desktop"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDevice("tablet")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    activeDevice === "tablet"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Tablet className="h-3.5 w-3.5" />
                  Tablet
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDevice("mobile")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    activeDevice === "mobile"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Mobile
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-muted/40 p-3 text-xs text-muted-foreground flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0 text-brand" />
              <span>
                Currently configuring for{" "}
                <strong className="text-foreground capitalize">{activeDevice}</strong>{" "}
                {activeDevice === "desktop"
                  ? "(screen width ≥ 1024px)"
                  : activeDevice === "tablet"
                    ? "(screen width 641px – 1023px)"
                    : "(screen width ≤ 640px)"}
                .
              </span>
            </div>

            {/* 7. Body Font Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  7. Body Font Size ({activeDevice})
                </label>
                <span className="font-mono text-xs font-bold text-foreground">
                  {draftConfig.bodySize[activeDevice]}px (
                  {(draftConfig.bodySize[activeDevice] / 16).toFixed(3)}rem)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="13"
                  max="24"
                  step="0.5"
                  value={draftConfig.bodySize[activeDevice]}
                  onChange={(e) =>
                    updateResponsive("bodySize", parseFloat(e.target.value))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand"
                />
                <input
                  type="number"
                  min="13"
                  max="24"
                  step="0.5"
                  value={draftConfig.bodySize[activeDevice]}
                  onChange={(e) =>
                    updateResponsive(
                      "bodySize",
                      parseFloat(e.target.value) || draftConfig.bodySize[activeDevice],
                    )
                  }
                  className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            {/* 8. Line Height */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  8. Line Height ({activeDevice})
                </label>
                <span className="font-mono text-xs font-bold text-foreground">
                  {draftConfig.lineHeight[activeDevice]}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1.2"
                  max="2.2"
                  step="0.05"
                  value={draftConfig.lineHeight[activeDevice]}
                  onChange={(e) =>
                    updateResponsive("lineHeight", parseFloat(e.target.value))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand"
                />
                <input
                  type="number"
                  min="1.2"
                  max="2.2"
                  step="0.05"
                  value={draftConfig.lineHeight[activeDevice]}
                  onChange={(e) =>
                    updateResponsive(
                      "lineHeight",
                      parseFloat(e.target.value) || draftConfig.lineHeight[activeDevice],
                    )
                  }
                  className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            {/* 9. Letter Spacing */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  9. Body Letter Spacing ({activeDevice})
                </label>
                <span className="font-mono text-xs font-bold text-foreground">
                  {draftConfig.letterSpacing[activeDevice]}em
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="-0.05"
                  max="0.08"
                  step="0.005"
                  value={draftConfig.letterSpacing[activeDevice]}
                  onChange={(e) =>
                    updateResponsive("letterSpacing", parseFloat(e.target.value))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand"
                />
                <input
                  type="number"
                  min="-0.05"
                  max="0.08"
                  step="0.005"
                  value={draftConfig.letterSpacing[activeDevice]}
                  onChange={(e) =>
                    updateResponsive(
                      "letterSpacing",
                      parseFloat(e.target.value) || draftConfig.letterSpacing[activeDevice],
                    )
                  }
                  className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            {/* Heading Letter Spacing */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Heading Letter Spacing (Global)
                </label>
                <span className="font-mono text-xs font-bold text-foreground">
                  {draftConfig.headingLetterSpacing}em
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="-0.05"
                  max="0.05"
                  step="0.005"
                  value={draftConfig.headingLetterSpacing}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      headingLetterSpacing: parseFloat(e.target.value),
                    })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-brand"
                />
                <input
                  type="number"
                  min="-0.05"
                  max="0.05"
                  step="0.005"
                  value={draftConfig.headingLetterSpacing}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      headingLetterSpacing:
                        parseFloat(e.target.value) || draftConfig.headingLetterSpacing,
                    })
                  }
                  className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Typography Preview */}
        <div className="space-y-4 lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Real-Time Typography Preview
              </h2>
            </div>

            {/* Viewport simulation and light/dark toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg bg-muted p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveDevice("desktop")}
                  title="Simulate Desktop View"
                  className={`p-1.5 rounded-md transition ${
                    activeDevice === "desktop"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDevice("tablet")}
                  title="Simulate Tablet View"
                  className={`p-1.5 rounded-md transition ${
                    activeDevice === "tablet"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Tablet className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDevice("mobile")}
                  title="Simulate Mobile View"
                  className={`p-1.5 rounded-md transition ${
                    activeDevice === "mobile"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPreviewTheme((t) => (t === "dark" ? "light" : "dark"))
                }
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
              >
                {previewTheme === "dark" ? "🌙 Dark Canvas" : "☀️ Light Canvas"}
              </button>
            </div>
          </div>

          {/* PREVIEW CONTAINER CANVAS */}
          <div
            className={`mx-auto w-full transition-all duration-300 ${
              activeDevice === "desktop"
                ? "max-w-full"
                : activeDevice === "tablet"
                  ? "max-w-[720px]"
                  : "max-w-[380px]"
            }`}
          >
            <div
              style={previewCanvasStyles}
              className={`rounded-2xl border border-border p-6 sm:p-8 shadow-xl transition-colors duration-200 overflow-hidden ${
                previewTheme === "dark"
                  ? "bg-[#0b0f17] text-white"
                  : "bg-white text-neutral-900"
              }`}
            >
              {/* Header / Nav Preview */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-brand" />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 'var(--font-weight-heading)',
                      letterSpacing: 'var(--letter-spacing-heading)',
                    }}
                    className="text-base tracking-tight font-bold"
                  >
                    NDSOLOTRAVEL
                  </span>
                </div>

                <nav
                  style={{
                    fontFamily: 'var(--font-nav)',
                  }}
                  className="hidden sm:flex items-center gap-4 text-xs tracking-wide"
                >
                  <span className="text-brand font-medium">Stories</span>
                  <span className="opacity-70 hover:opacity-100">Destinations</span>
                  <span className="opacity-70 hover:opacity-100">Gallery</span>
                  <span className="opacity-70 hover:opacity-100">About</span>
                </nav>

                <button
                  type="button"
                  style={{
                    fontFamily: 'var(--font-button)',
                  }}
                  className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Read Dispatch
                </button>
              </div>

              {/* Hero Heading Preview */}
              <div className="space-y-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-[11px] font-semibold text-brand tracking-wider uppercase">
                  Featured Expedition
                </span>

                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-heading)',
                    letterSpacing: 'var(--letter-spacing-heading)',
                  }}
                  className="text-2xl sm:text-3xl lg:text-4xl leading-[1.18] font-bold text-inherit"
                >
                  Solo journeys, motorcycle adventures, and trekking across the world
                </h1>

                {/* Home Hero Subtitle / Script Headline (Independent Yuyu Short / Script Font) */}
                <p
                  style={{
                    fontFamily: 'var(--font-hero-script)',
                    fontSize: 'var(--font-size-hero-script)',
                    fontWeight: 'var(--font-weight-script)',
                    lineHeight: 'var(--line-height-hero-script)',
                    letterSpacing: 'var(--letter-spacing-hero-script)',
                    color: 'var(--accent, #4085FF)',
                  }}
                  className="mt-2 mb-4 font-medium break-words"
                >
                  Stories from the high places. Most people only fly over.
                </p>
              </div>

              {/* Blog Heading Preview */}
              <div className="space-y-2 mb-5 pt-4 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-brand font-semibold">
                  Field Notes · Day 14
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-heading)',
                    letterSpacing: 'var(--letter-spacing-heading)',
                  }}
                  className="text-xl sm:text-2xl leading-snug font-semibold text-inherit"
                >
                  The Solitude of High Passes and Whispering Glaciers
                </h2>
              </div>

              {/* Body Paragraph Preview */}
              <div className="space-y-3 mb-6">
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 'var(--font-weight-body)',
                    fontSize: 'var(--font-size-body)',
                    lineHeight: 'var(--line-height-body)',
                    letterSpacing: 'var(--letter-spacing-body)',
                  }}
                  className="text-inherit opacity-90"
                >
                  There is an austere tranquility to the northern valleys when the dusk light
                  begins to settle against jagged ridgelines. Travelling on two wheels with no
                  fixed schedule changes how you perceive distance, weather, and silence. Out here,
                  every gravel bend demands presence, and every mountain pass reminds you of your
                  humble place under the open sky.
                </p>
              </div>

              {/* Button text preview */}
              <div className="flex flex-wrap items-center gap-3 mb-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  style={{
                    fontFamily: 'var(--font-button)',
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90 transition"
                >
                  <span>Explore Route Itinerary</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  style={{
                    fontFamily: 'var(--font-button)',
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                    previewTheme === "dark"
                      ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                      : "border-neutral-300 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  }`}
                >
                  View Coordinates
                </button>
              </div>

              {/* Numbers / Statistics Preview */}
              <div className="pt-4 border-t border-white/10">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider opacity-60">
                  expedition metrics (composite number stack)
                </div>
                <div className="grid grid-cols-2 min-[420px]:grid-cols-4 gap-3">
                  <div
                    className={`rounded-xl p-3 border ${
                      previewTheme === "dark"
                        ? "border-white/10 bg-white/5"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-70">Pass Altitude</div>
                    <div className="tabular-nums text-lg sm:text-xl font-bold text-brand">
                      4,693m
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 border ${
                      previewTheme === "dark"
                        ? "border-white/10 bg-white/5"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-70">Distance</div>
                    <div className="tabular-nums text-lg sm:text-xl font-bold text-brand">
                      18,420 km
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 border ${
                      previewTheme === "dark"
                        ? "border-white/10 bg-white/5"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-70">Solo Trips</div>
                    <div className="tabular-nums text-lg sm:text-xl font-bold text-brand">
                      102+
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 border ${
                      previewTheme === "dark"
                        ? "border-white/10 bg-white/5"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-70">Days on Trail</div>
                    <div className="tabular-nums text-lg sm:text-xl font-bold text-brand">
                      142+
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Font Summary Card */}
          <div className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#4085FF] font-semibold">
                <strong>Hero Script:</strong> {draftConfig.scriptFont || "Yuyu Short"} ({draftConfig.scriptWeight || "400"} / {activeScriptSize}px)
              </span>
              <span>•</span>
              <span>
                <strong>Headings:</strong> {draftConfig.headingFont} ({draftConfig.headingWeight})
              </span>
              <span>•</span>
              <span>
                <strong>Body:</strong> {draftConfig.bodyFont} ({draftConfig.bodyWeight} /{" "}
                {draftConfig.bodySize[activeDevice]}px)
              </span>
              <span>•</span>
              <span>
                <strong>Nav:</strong> {draftConfig.navigationFont}
              </span>
              <span>•</span>
              <span>
                <strong>Button:</strong> {draftConfig.buttonFont}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-600 font-medium border-t border-border/40 pt-2 text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Optimized performance (loads only required and selected font families)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
