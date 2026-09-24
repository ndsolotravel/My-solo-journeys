import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  getPublicTypographySettings,
  adminSaveTypographySettings,
} from "@/lib/typography.functions";
import {
  DEFAULT_TYPOGRAPHY_CONFIG,
  generateGoogleFontsUrl,
  generateTypographyCss,
  parseTypographyConfig,
  type TypographyConfig,
} from "@/lib/typography";
import { toast } from "sonner";
import { Eye, Check, X, SlidersHorizontal } from "lucide-react";

export const PREVIEW_STORAGE_KEY = "nd_typography_preview_config";

export function TypographyManager() {
  const getSettingsFn = useServerFn(getPublicTypographySettings);
  const saveSettingsFn = useServerFn(adminSaveTypographySettings);
  const queryClient = useQueryClient();

  const { data: publishedConfig = DEFAULT_TYPOGRAPHY_CONFIG } = useQuery({
    queryKey: ["typography-settings"],
    queryFn: () => getSettingsFn(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const [previewConfig, setPreviewConfig] = useState<TypographyConfig | null>(null);

  // Check for local preview in sessionStorage
  useEffect(() => {
    const readPreview = () => {
      try {
        const raw = sessionStorage.getItem(PREVIEW_STORAGE_KEY);
        if (raw) {
          setPreviewConfig(parseTypographyConfig(raw));
        } else {
          setPreviewConfig(null);
        }
      } catch {
        setPreviewConfig(null);
      }
    };

    readPreview();
    window.addEventListener("storage", readPreview);
    window.addEventListener("nd-typography-preview-changed", readPreview);
    return () => {
      window.removeEventListener("storage", readPreview);
      window.removeEventListener("nd-typography-preview-changed", readPreview);
    };
  }, []);

  const activeConfig = previewConfig || publishedConfig;

  // Apply Google Fonts link & Dynamic CSS variables to document head
  useEffect(() => {
    if (typeof document === "undefined") return;

    // 1. Google Fonts URL - loads ONLY when custom fonts are selected (avoids duplicate default font request)
    const fontsUrl = generateGoogleFontsUrl(activeConfig);
    const defaultFontsUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500;600;700&family=Yuyu+Short&display=swap";
    let linkEl = document.getElementById("nd-dynamic-google-fonts") as HTMLLinkElement | null;

    if (fontsUrl && fontsUrl !== defaultFontsUrl) {
      if (!linkEl) {
        linkEl = document.createElement("link");
        linkEl.id = "nd-dynamic-google-fonts";
        linkEl.rel = "stylesheet";
        document.head.appendChild(linkEl);
      }
      if (linkEl.href !== fontsUrl) {
        linkEl.href = fontsUrl;
      }
    } else if (linkEl) {
      linkEl.remove();
    }

    // 2. Dynamic CSS Variables Stylesheet
    const css = generateTypographyCss(activeConfig, ":root");
    let styleEl = document.getElementById("nd-dynamic-typography-css") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "nd-dynamic-typography-css";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  }, [activeConfig]);

  const publishMutation = useMutation({
    mutationFn: async (cfg: TypographyConfig) => {
      return await saveSettingsFn({ data: cfg });
    },
    onSuccess: (saved) => {
      sessionStorage.removeItem(PREVIEW_STORAGE_KEY);
      setPreviewConfig(null);
      window.dispatchEvent(new Event("nd-typography-preview-changed"));
      queryClient.setQueryData(["typography-settings"], saved);
      queryClient.invalidateQueries({ queryKey: ["typography-settings"] });
      toast.success("Typography changes published live!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to publish typography: ${err.message}`);
    },
  });

  const handleExitPreview = () => {
    sessionStorage.removeItem(PREVIEW_STORAGE_KEY);
    setPreviewConfig(null);
    window.dispatchEvent(new Event("nd-typography-preview-changed"));
    toast.info("Exited typography preview mode");
  };

  const handlePublishPreview = () => {
    if (previewConfig) {
      publishMutation.mutate(previewConfig);
    }
  };

  return (
    <>
      {/* Floating indicator when viewing the live site in preview mode */}
      {previewConfig && (
        <aside
          aria-label="Typography Preview Notification"
          className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 flex items-center gap-3 rounded-full border border-accent/40 bg-neutral-900/95 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <Eye className="h-3.5 w-3.5 text-accent" />
            <span>Typography Preview Mode</span>
          </div>

          <div className="h-3 w-px bg-white/20" />

          <div className="flex items-center gap-1.5">
            <a
              href="/admin/typography"
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium hover:bg-white/20 transition-colors"
            >
              <SlidersHorizontal className="h-3 w-3" />
              Adjust
            </a>
            <button
              onClick={handlePublishPreview}
              disabled={publishMutation.isPending}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
            >
              <Check className="h-3 w-3" />
              {publishMutation.isPending ? "Publishing..." : "Publish Live"}
            </button>
            <button
              onClick={handleExitPreview}
              title="Exit preview"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
