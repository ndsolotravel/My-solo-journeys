import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  getPublicColorSettings,
  adminSaveColorSettings,
} from "@/lib/colors.functions";
import {
  DEFAULT_COLOR_CONFIG,
  generateColorCss,
  parseColorConfig,
  type ColorConfig,
} from "@/lib/colors";
import { toast } from "sonner";
import { Palette, Check, X, SlidersHorizontal } from "lucide-react";

export const COLOR_PREVIEW_STORAGE_KEY = "nd_color_preview_config";

export function ColorManager() {
  const getSettingsFn = useServerFn(getPublicColorSettings);
  const saveSettingsFn = useServerFn(adminSaveColorSettings);
  const queryClient = useQueryClient();

  const { data: publishedConfig = DEFAULT_COLOR_CONFIG } = useQuery({
    queryKey: ["color-settings"],
    queryFn: () => getSettingsFn(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const [previewConfig, setPreviewConfig] = useState<ColorConfig | null>(null);

  // Check for local preview in sessionStorage
  useEffect(() => {
    const readPreview = () => {
      try {
        const raw = sessionStorage.getItem(COLOR_PREVIEW_STORAGE_KEY);
        if (raw) {
          setPreviewConfig(parseColorConfig(raw));
        } else {
          setPreviewConfig(null);
        }
      } catch {
        setPreviewConfig(null);
      }
    };

    readPreview();
    window.addEventListener("storage", readPreview);
    window.addEventListener("nd-color-preview-changed", readPreview);
    return () => {
      window.removeEventListener("storage", readPreview);
      window.removeEventListener("nd-color-preview-changed", readPreview);
    };
  }, []);

  const activeConfig = previewConfig || publishedConfig;

  // Apply dynamic CSS variables to document head
  useEffect(() => {
    if (typeof document === "undefined") return;

    const css = generateColorCss(activeConfig, ":root");
    let styleEl = document.getElementById("nd-dynamic-colors-css") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "nd-dynamic-colors-css";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  }, [activeConfig]);

  const publishMutation = useMutation({
    mutationFn: async (cfg: ColorConfig) => {
      return await saveSettingsFn({ data: cfg });
    },
    onSuccess: (saved) => {
      sessionStorage.removeItem(COLOR_PREVIEW_STORAGE_KEY);
      setPreviewConfig(null);
      window.dispatchEvent(new Event("nd-color-preview-changed"));
      queryClient.setQueryData(["color-settings"], saved);
      queryClient.invalidateQueries({ queryKey: ["color-settings"] });
      toast.success("Color changes published live!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to publish colors: ${err.message}`);
    },
  });

  const handleExitPreview = () => {
    sessionStorage.removeItem(COLOR_PREVIEW_STORAGE_KEY);
    setPreviewConfig(null);
    window.dispatchEvent(new Event("nd-color-preview-changed"));
    toast.info("Exited color preview mode");
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
          aria-label="Color Preview Notification"
          className="fixed bottom-6 left-1/2 z-[9998] -translate-x-1/2 flex items-center gap-3 rounded-full border border-[#4085FF]/40 bg-neutral-900/95 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-2 font-medium">
            <span
              className="flex h-2.5 w-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: activeConfig.accentColor }}
            />
            <Palette className="h-3.5 w-3.5" style={{ color: activeConfig.accentColor }} />
            <span>Color Preview Mode</span>
          </div>

          <div className="h-3 w-px bg-white/20" />

          <div className="flex items-center gap-1.5">
            <a
              href="/admin/colors"
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium hover:bg-white/20 transition-colors"
            >
              <SlidersHorizontal className="h-3 w-3" />
              Adjust
            </a>

            <button
              type="button"
              onClick={handlePublishPreview}
              disabled={publishMutation.isPending}
              className="inline-flex items-center gap-1 rounded-full bg-[#4085FF] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-[#3570D0] transition-colors disabled:opacity-50"
            >
              <Check className="h-3 w-3" />
              {publishMutation.isPending ? "Publishing..." : "Save & Publish"}
            </button>

            <button
              type="button"
              onClick={handleExitPreview}
              title="Exit Preview"
              aria-label="Exit Preview"
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
