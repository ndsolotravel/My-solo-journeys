import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useMemo } from "react";
import {
  adminGetColorSettings,
  adminSaveColorSettings,
} from "@/lib/colors.functions";
import {
  COLOR_FIELDS,
  DEFAULT_COLOR_CONFIG,
  normalizeToHex6,
  parseColorConfig,
  type ColorConfig,
  type ColorFieldDefinition,
} from "@/lib/colors";
import { COLOR_PREVIEW_STORAGE_KEY } from "@/components/layout/ColorManager";
import { toast } from "sonner";
import {
  Palette,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  Check,
  ExternalLink,
  ArrowRight,
  Compass,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Bookmark,
  Sliders,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/colors")({
  head: () => ({
    meta: [
      { title: "Color Management — Admin CMS" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminColorsPage,
});

function AdminColorsPage() {
  const getSettingsFn = useServerFn(adminGetColorSettings);
  const saveSettingsFn = useServerFn(adminSaveColorSettings);
  const queryClient = useQueryClient();

  const { data: savedConfig, isLoading } = useQuery({
    queryKey: ["admin-color-settings"],
    queryFn: () => getSettingsFn(),
  });

  const [draftConfig, setDraftConfig] = useState<ColorConfig>(DEFAULT_COLOR_CONFIG);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");

  // Sync draft whenever server config loads
  useEffect(() => {
    if (savedConfig) {
      setDraftConfig(parseColorConfig(savedConfig));
    }
  }, [savedConfig]);

  const isDirty = useMemo(() => {
    if (!savedConfig) return false;
    return JSON.stringify(draftConfig) !== JSON.stringify(savedConfig);
  }, [draftConfig, savedConfig]);

  const saveMutation = useMutation({
    mutationFn: async (payload: ColorConfig) => {
      return await saveSettingsFn({ data: payload });
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(["admin-color-settings"], saved);
      queryClient.setQueryData(["color-settings"], saved);
      queryClient.invalidateQueries({ queryKey: ["color-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-color-settings"] });
      sessionStorage.removeItem(COLOR_PREVIEW_STORAGE_KEY);
      window.dispatchEvent(new Event("nd-color-preview-changed"));
      toast.success("Global color palette published live across the website!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to publish colors: ${err.message}`);
    },
  });

  const handleResetToDefault = () => {
    setDraftConfig({ ...DEFAULT_COLOR_CONFIG });
    toast.info("Reset to default color palette (#4085FF accent). Click 'Save & Publish' to push live.");
  };

  const handlePreviewOnSite = () => {
    try {
      sessionStorage.setItem(COLOR_PREVIEW_STORAGE_KEY, JSON.stringify(draftConfig));
      window.dispatchEvent(new Event("nd-color-preview-changed"));
      toast.success("Preview mode activated! Opening homepage preview in a new tab.", {
        action: {
          label: "Open Preview",
          onClick: () => window.open("/", "_blank"),
        },
      });
      window.open("/", "_blank");
    } catch {
      toast.error("Could not activate preview mode in browser storage.");
    }
  };

  const updateColor = (key: keyof ColorConfig, value: string) => {
    setDraftConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Categories list for filtering
  const categories = ["All", "Brand & Accent", "Typography", "Links & Navigation", "Buttons", "Surfaces & Layout"] as const;

  const filteredFields = useMemo(() => {
    if (activeCategory === "All") return COLOR_FIELDS;
    return COLOR_FIELDS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  // CSS variables applied to the live preview container
  const previewCanvasStyles = useMemo(() => {
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
      "--footer-text": draftConfig.footerTextColor,
    } as React.CSSProperties;
  }, [draftConfig]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4085FF] border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading color palette settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* CMS Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4085FF]/10 text-[#4085FF]">
              <Palette className="h-5 w-5" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Color Management
            </h1>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            Control the website’s global color palette, branding tokens, buttons, surfaces, and typography accents from the CMS without editing code. Accent default set to{" "}
            <span className="font-mono font-semibold text-[#4085FF]">#4085FF</span>.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            title="Reset all colors to default configuration"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Default
          </button>

          <button
            type="button"
            onClick={handlePreviewOnSite}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#4085FF]/30 bg-[#4085FF]/10 px-4 py-2 text-xs font-semibold text-[#4085FF] hover:bg-[#4085FF]/20 transition-all shadow-xs"
            title="Preview changes across the live site"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview Changes
          </button>

          <button
            type="button"
            onClick={() => saveMutation.mutate(draftConfig)}
            disabled={saveMutation.isPending || !isDirty}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#4085FF] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#3570D0] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Save className="h-3.5 w-3.5" />
            {saveMutation.isPending ? "Publishing..." : isDirty ? "Save & Publish" : "Published Live"}
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Controls on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Color Pickers and HEX Input Controls */}
        <div className="space-y-6 lg:col-span-6 xl:col-span-5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/50 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#4085FF] text-white shadow-xs font-semibold"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Color Controls List */}
          <div className="space-y-3.5">
            {filteredFields.map((field) => {
              const currentValue = draftConfig[field.key];
              const hexValue = normalizeToHex6(currentValue);

              return (
                <div
                  key={field.key}
                  className="group rounded-2xl border border-border bg-card p-4 transition-all hover:border-[#4085FF]/40 hover:shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`color-input-${field.key}`}
                          className="text-xs font-bold text-foreground cursor-pointer"
                        >
                          {field.label}
                        </label>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {field.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {field.description}
                      </p>
                    </div>

                    {/* Live Swatch Pill */}
                    <div
                      className="h-8 w-8 rounded-xl border border-black/10 dark:border-white/10 shrink-0 shadow-xs flex items-center justify-center"
                      style={{ backgroundColor: currentValue }}
                    />
                  </div>

                  {/* Dual Color Control: Color Picker Swatch + Exact HEX Input */}
                  <div className="flex items-center gap-2 pt-1">
                    {/* Native Picker Swatch */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        type="color"
                        id={`color-picker-${field.key}`}
                        value={hexValue}
                        onChange={(e) => updateColor(field.key, e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded-xl border border-border bg-background p-0.5 outline-none transition"
                        title={`Select ${field.label} from color picker`}
                      />
                    </div>

                    {/* HEX Manual Input Field */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        id={`color-input-${field.key}`}
                        value={currentValue}
                        onChange={(e) => updateColor(field.key, e.target.value)}
                        placeholder="#4085FF"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 font-mono text-xs font-medium text-foreground outline-none focus:border-[#4085FF] focus:ring-1 focus:ring-[#4085FF] transition"
                      />
                    </div>

                    {/* Reset Single Color Button */}
                    <button
                      type="button"
                      onClick={() => updateColor(field.key, field.default)}
                      title={`Reset to default (${field.default})`}
                      className="rounded-xl border border-border bg-muted/50 p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition shrink-0"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Summary Note */}
          <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[#4085FF]" />
              How it works
            </div>
            <p className="text-[11px] leading-relaxed">
              Colors edited in this CMS update the live preview panel on the right immediately. The public website remains on the published palette until you click <strong>Save & Publish</strong>. You can also click <strong>Preview Changes</strong> to test the live website in an isolated sandbox session before publishing.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Interactive Live Preview Panel */}
        <div className="lg:col-span-6 xl:col-span-7 sticky top-24 space-y-4">
          {/* Preview Canvas Header with Responsive & Theme Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4085FF]/10 text-[#4085FF]">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-foreground">
                  Live Color Preview Panel
                </h2>
                <p className="text-[10px] text-muted-foreground">
                  Real-time component simulation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Responsive Device Viewport Switcher */}
              <div className="flex items-center rounded-xl bg-muted p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setActiveDevice("desktop")}
                  title="Desktop View"
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
                  title="Tablet View"
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
                  title="Mobile View"
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

              {/* Theme Canvas Switcher */}
              <button
                type="button"
                onClick={() => setPreviewTheme((t) => (t === "dark" ? "light" : "dark"))}
                className="rounded-xl border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition"
              >
                {previewTheme === "dark" ? "🌙 Dark Canvas" : "☀️ Light Canvas"}
              </button>
            </div>
          </div>

          {/* SIMULATED VIEWPORT CONTAINER */}
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
              className={`rounded-3xl border border-border shadow-2xl transition-colors duration-200 overflow-hidden divide-y divide-border/60 ${
                previewTheme === "dark" ? "bg-[#0b0f17] text-white" : "bg-white text-neutral-900"
              }`}
            >
              {/* 1. SIMULATED NAVIGATION BAR */}
              <div
                style={{
                  backgroundColor: previewTheme === "dark" ? "rgba(11, 15, 23, 0.85)" : "rgba(255, 255, 255, 0.9)",
                  borderColor: draftConfig.borderColor,
                }}
                className="p-4 sm:p-5 flex items-center justify-between backdrop-blur-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: draftConfig.accentColor }}
                    className="h-7 w-7 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm"
                  >
                    ND
                  </div>
                  <span
                    style={{ color: draftConfig.headingColor }}
                    className="font-display font-bold text-sm tracking-wider"
                  >
                    NDSOLOTRAVEL
                  </span>
                </div>

                <nav className="hidden sm:flex items-center gap-4 text-xs font-medium">
                  <span
                    style={{ color: draftConfig.navHoverColor }}
                    className="font-semibold cursor-pointer transition-colors"
                  >
                    Stories
                  </span>
                  <span
                    style={{ color: draftConfig.navTextColor }}
                    className="cursor-pointer hover:opacity-80 transition-colors"
                  >
                    Destinations
                  </span>
                  <span
                    style={{ color: draftConfig.navTextColor }}
                    className="cursor-pointer hover:opacity-80 transition-colors"
                  >
                    Gallery
                  </span>
                  <span
                    style={{ color: draftConfig.navTextColor }}
                    className="cursor-pointer hover:opacity-80 transition-colors"
                  >
                    About
                  </span>
                </nav>

                <button
                  type="button"
                  style={{
                    backgroundColor: draftConfig.buttonBgColor,
                    color: draftConfig.buttonTextColor,
                  }}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm transition hover:opacity-90"
                >
                  Read Dispatch
                </button>
              </div>

              {/* 2. SIMULATED HOMEPAGE HERO WITH OVERLAY */}
              <div className="relative overflow-hidden p-6 sm:p-10 text-white min-h-[260px] flex flex-col justify-end">
                {/* Hero Background image simulation */}
                <div
                  className="absolute inset-0 bg-cover bg-center -z-20 scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
                  }}
                />

                {/* Hero Overlay Tint Controlled by CMS */}
                <div
                  className="absolute inset-0 -z-10 transition-colors duration-200"
                  style={{ backgroundColor: draftConfig.heroOverlayColor }}
                />

                <div className="space-y-3 relative z-10 max-w-lg">
                  <span
                    style={{
                      backgroundColor: `${draftConfig.accentColor}26`,
                      color: draftConfig.accentColor,
                      borderColor: `${draftConfig.accentColor}40`,
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border backdrop-blur-sm"
                  >
                    <Compass className="h-3 w-3" />
                    High Passes Expedition
                  </span>

                  <h1
                    style={{ color: draftConfig.headingColor }}
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
                  >
                    Stories from the high places.{" "}
                    <span style={{ color: draftConfig.accentColor }}>
                      Most people only fly over.
                    </span>
                  </h1>

                  <p
                    style={{ color: draftConfig.bodyTextColor }}
                    className="text-xs sm:text-sm line-clamp-2 leading-relaxed"
                  >
                    A visual archive of high-altitude solo expeditions, alpine routes, and raw frontiers across the globe.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      style={{
                        backgroundColor: draftConfig.buttonBgColor,
                        color: draftConfig.buttonTextColor,
                      }}
                      className="rounded-full px-4 py-2 text-xs font-bold shadow-md transition hover:opacity-90 flex items-center gap-1.5"
                    >
                      Start Exploring
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      style={{
                        borderColor: draftConfig.borderColor,
                        color: draftConfig.headingColor,
                      }}
                      className="rounded-full border bg-black/30 backdrop-blur-md px-4 py-2 text-xs font-semibold hover:bg-white/10 transition"
                    >
                      View Map
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. SIMULATED CONTENT & TYPOGRAPHY SECTION */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h2
                    style={{ color: draftConfig.headingColor }}
                    className="text-xl sm:text-2xl font-bold tracking-tight"
                  >
                    Editorial Typography & Links
                  </h2>
                  <p
                    style={{ color: draftConfig.bodyTextColor }}
                    className="text-sm leading-relaxed"
                  >
                    This paragraph demonstrates your configured body text color. Links inside text seamlessly highlight in{" "}
                    <span
                      style={{ color: draftConfig.linkColor }}
                      className="font-medium underline underline-offset-4 cursor-pointer hover:opacity-80"
                    >
                      your custom link color
                    </span>{" "}
                    with interactive states.
                  </p>
                  <p
                    style={{ color: draftConfig.mutedTextColor }}
                    className="text-xs flex items-center gap-2"
                  >
                    <Calendar className="h-3 w-3" /> Published on September 24, 2026
                    <span>•</span>
                    <Clock className="h-3 w-3" /> 8 min read
                  </p>
                </div>

                {/* 4. SIMULATED CARDS (Blog Card & Destination Card) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Blog Card Simulation */}
                  <div
                    style={{
                      backgroundColor: draftConfig.cardBgColor,
                      borderColor: draftConfig.borderColor,
                    }}
                    className="rounded-2xl border p-4 shadow-sm space-y-3 transition-colors"
                  >
                    <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
                        alt="Karakoram Pass"
                        className="h-full w-full object-cover"
                      />
                      <span
                        style={{
                          backgroundColor: `${draftConfig.accentColor}e6`,
                          color: "#ffffff",
                        }}
                        className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      >
                        Expedition
                      </span>
                    </div>

                    <h3
                      style={{ color: draftConfig.headingColor }}
                      className="font-bold text-sm leading-snug line-clamp-2"
                    >
                      Crossing the Baltoro Glacier on Two Wheels
                    </h3>

                    <p
                      style={{ color: draftConfig.bodyTextColor }}
                      className="text-xs line-clamp-2 leading-relaxed"
                    >
                      Surviving deep washouts and high altitude passes during monsoon transition.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40">
                      <span
                        style={{ color: draftConfig.mutedTextColor }}
                        className="text-[11px]"
                      >
                        Pakistan · Karakoram
                      </span>
                      <span
                        style={{ color: draftConfig.linkColor }}
                        className="text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        Read Post <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Destination Card Simulation */}
                  <div
                    style={{
                      backgroundColor: draftConfig.cardBgColor,
                      borderColor: draftConfig.borderColor,
                    }}
                    className="rounded-2xl border p-4 shadow-sm space-y-3 transition-colors"
                  >
                    <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
                        alt="High Mountain"
                        className="h-full w-full object-cover"
                      />
                      <span
                        style={{
                          backgroundColor: draftConfig.secondaryColor,
                          color: "#ffffff",
                        }}
                        className="absolute top-2.5 right-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1"
                      >
                        <MapPin className="h-2.5 w-2.5" /> 14 Dispatches
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span
                        style={{ color: draftConfig.accentColor }}
                        className="text-[10px] font-bold uppercase tracking-widest"
                      >
                        Central Asia
                      </span>
                      <h3
                        style={{ color: draftConfig.headingColor }}
                        className="font-bold text-sm"
                      >
                        Pamir Highway & Wakhan Corridor
                      </h3>
                    </div>

                    <p
                      style={{ color: draftConfig.bodyTextColor }}
                      className="text-xs line-clamp-2 leading-relaxed"
                    >
                      The roof of the world across Tajikistan and Kyrgyzstan borderlands.
                    </p>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                      <span style={{ color: draftConfig.mutedTextColor }} className="text-[11px]">
                        Difficult · 4,655m
                      </span>
                      <button
                        type="button"
                        style={{
                          backgroundColor: draftConfig.buttonBgColor,
                          color: draftConfig.buttonTextColor,
                        }}
                        className="rounded-lg px-2.5 py-1 text-[11px] font-semibold hover:opacity-90 transition"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. CMS CONTROLLED SECTION SIMULATION */}
                <div
                  style={{
                    backgroundColor: draftConfig.sectionBgColor,
                    borderColor: draftConfig.borderColor,
                  }}
                  className="rounded-2xl border p-5 sm:p-6 text-white space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: draftConfig.accentColor }}
                      className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Layers className="h-3.5 w-3.5" /> CMS Controlled Block
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">
                      sectionBgColor: {draftConfig.sectionBgColor}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div
                      style={{
                        backgroundColor: draftConfig.cardBgColor,
                        borderColor: draftConfig.borderColor,
                      }}
                      className="rounded-xl border p-3 shadow-xs"
                    >
                      <div
                        style={{ color: draftConfig.accentColor }}
                        className="text-lg sm:text-xl font-bold font-mono"
                      >
                        42+
                      </div>
                      <div style={{ color: draftConfig.mutedTextColor }} className="text-[11px]">
                        Countries
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: draftConfig.cardBgColor,
                        borderColor: draftConfig.borderColor,
                      }}
                      className="rounded-xl border p-3 shadow-xs"
                    >
                      <div
                        style={{ color: draftConfig.accentColor }}
                        className="text-lg sm:text-xl font-bold font-mono"
                      >
                        180k
                      </div>
                      <div style={{ color: draftConfig.mutedTextColor }} className="text-[11px]">
                        Kilometers
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: draftConfig.cardBgColor,
                        borderColor: draftConfig.borderColor,
                      }}
                      className="rounded-xl border p-3 shadow-xs"
                    >
                      <div
                        style={{ color: draftConfig.accentColor }}
                        className="text-lg sm:text-xl font-bold font-mono"
                      >
                        12
                      </div>
                      <div style={{ color: draftConfig.mutedTextColor }} className="text-[11px]">
                        Years Solo
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. SIMULATED FOOTER */}
              <div
                style={{
                  backgroundColor: draftConfig.footerBgColor,
                  color: draftConfig.footerTextColor,
                  borderColor: draftConfig.borderColor,
                }}
                className="p-6 text-xs border-t space-y-3 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-bold tracking-wider text-sm">
                    <span
                      style={{ backgroundColor: draftConfig.accentColor }}
                      className="h-5 w-5 rounded-md flex items-center justify-center text-white text-[10px]"
                    >
                      ND
                    </span>
                    NDSOLOTRAVEL
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hover:underline cursor-pointer">Stories</span>
                    <span className="hover:underline cursor-pointer">Destinations</span>
                    <span className="hover:underline cursor-pointer">Privacy</span>
                    <span className="hover:underline cursor-pointer">Contact</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 opacity-75 text-[11px]">
                  <span>© 2026 ndsolotravel. All rights reserved.</span>
                  <span>Atmospheric Solo Travel & Adventure Photography</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
