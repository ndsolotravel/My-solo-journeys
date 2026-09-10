import { motion } from "framer-motion";
import { ArrowDown, Camera, Sparkles } from "lucide-react";
import { useTranslations } from "@/lib/translate/store";
import type { PageHeroConfig } from "@/lib/page-hero.functions";

type GalleryHeroProps = {
  config?: PageHeroConfig;
  photoCount?: number;
};

export function GalleryHero({ config, photoCount }: GalleryHeroProps) {
  const t = useTranslations();

  const image = config?.image || "";
  const badge = config?.badge || "Visual Archive · High Frontiers";
  const title = config?.title || "Moments Frozen in the Wild";
  const titleHighlight = config?.titleHighlight || "High passes, silent valleys, raw frontiers.";
  const description =
    config?.description ||
    "An intimate visual log of solo expeditions across Pakistan, the Karakoram, and high-altitude Himalayan trails.";
  const buttonText = config?.buttonText || "Browse Photographs";
  const overlayMode = (config?.overlay || "cinematic").toLowerCase().trim();

  const scrollToContent = () => {
    const el = document.getElementById("gallery-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderOverlay = () => {
    switch (overlayMode) {
      case "dark":
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
            <div className="absolute inset-0 bg-black/40" />
          </>
        );
      case "medium":
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" />
        );
      case "subtle":
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/50" />
        );
      case "cinematic":
      default:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
          </>
        );
    }
  };

  return (
    <section
      aria-label={t("Gallery Hero Banner")}
      className="relative min-h-[416px] sm:min-h-[464px] lg:min-h-[512px] xl:min-h-[560px] w-full overflow-hidden flex flex-col justify-end"
    >
      {/* Background Image with Ken Burns animation */}
      {image ? (
        <img
          src={image}
          alt={title}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center animate-ken-burns scale-105 transition-transform duration-1000"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      )}

      {/* Dynamic Overlay */}
      {renderOverlay()}

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16">
        <div className="max-w-4xl min-w-0">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-xs">
                <Sparkles className="h-3 w-3 text-[#FF7A00]" />
                <span>{t(badge)}</span>
              </span>
              {typeof photoCount === "number" && photoCount > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/70">
                  <Camera className="h-3.5 w-3.5 text-white/60" />
                  <span>{photoCount} {t("photographs")}</span>
                </span>
              )}
            </motion.div>
          )}

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 sm:mt-5 max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-[1.12] text-white tracking-tight break-words [overflow-wrap:anywhere]"
          >
            <span className="block">{t(title)}</span>
            {titleHighlight && (
              <span className="block text-[#FF7A00] mt-1 sm:mt-1.5 font-extrabold">
                {t(titleHighlight)}
              </span>
            )}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base lg:text-lg text-white/85 leading-relaxed"
            >
              {t(description)}
            </motion.p>
          )}

          {/* CTA Button */}
          {buttonText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={scrollToContent}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF7A00]/90 transition-all duration-200 shadow-lg shadow-[#FF7A00]/25 cursor-pointer hover:gap-2.5 active:scale-[0.98]"
              >
                <span>{t(buttonText)}</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
