import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Compass } from "lucide-react";
import type { Destination } from "@/lib/destinations.functions";
import { useTranslations } from "@/lib/translate/store";

const EASE = [0.16, 1, 0.3, 1] as const;

type ExpeditionTileProps = {
  destination: Destination;
  index: number;
  preferred?: boolean;
  tall?: boolean;
  motionDelay?: number;
  className?: string;
};

/**
 * Large photographic expedition tile. Photography is the primary visual;
 * category, country and an editable description overlay in an elegant band.
 * Hover: soft image zoom + brightness bloom, overlay darkening, text lift and
 * a sliding arrow. Scroll reveal via framer-motion (respects reduced motion).
 */
export function ExpeditionTile({
  destination: d,
  index,
  preferred = false,
  tall = false,
  motionDelay = 0,
  className = "",
}: ExpeditionTileProps) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: motionDelay, ease: EASE }}
      className={`h-full ${className}`}
    >
      <Link
        to="/destinations/$slug"
        params={{ slug: d.slug }}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-offset-2"
      >
        <div
          className={`atlas-tile flex h-full w-full flex-col justify-end ${tall ? "min-h-[380px] lg:min-h-[560px]" : "min-h-[340px] lg:min-h-[460px]"}`}
        >
          {d.featured_image ? (
            <img
              src={d.featured_image}
              alt={t(d.title)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
              <span className="text-xs text-white/40">{t("No image fielded")}</span>
            </div>
          )}

          {/* Elegant overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
          <div className="atlas-veil absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />

          {/* Ghost edition number */}
          <span
            aria-hidden="true"
            className="atlas-ghost pointer-events-none absolute left-5 top-4 text-5xl sm:left-6 sm:top-5 sm:text-6xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Featured ribbon */}
          {d.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-[#FF7A00] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/20 sm:right-5 sm:top-5">
              {t("Featured")}
            </span>
          )}

          {/* Content band */}
          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2.5">
              {d.category && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF7A00] backdrop-blur-sm">
                  <Compass className="h-2.5 w-2.5" />
                  {t(d.category)}
                </span>
              )}
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                {t(d.country)}
                {d.region ? ` · ${t(d.region)}` : ""}
              </span>
            </div>

            <div className="atlas-text-move">
              <h3
                className={`atlas-title mt-3 font-display font-extrabold leading-[1.05] tracking-tight text-white ${
                  preferred ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                }`}
              >
                {t(d.title)}
              </h3>
              {d.description && (
                <p className="mt-2.5 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-[15px]">
                  {t(d.description)}
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {t("Expedition log")}
              </span>
              <span className="atlas-arrow inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {t("Open")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
