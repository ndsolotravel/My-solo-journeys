import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Compass, ChevronDown } from "lucide-react";
import { useTranslations } from "@/lib/translate/store";

type AtlasHeroProps = {
  image?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function AtlasHero({ image }: AtlasHeroProps) {
  const t = useTranslations();
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.24]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  const parallaxBg = reduce ? {} : { y: bgY, scale: bgScale };
  const parallaxContent = reduce ? {} : { y: contentY, opacity: contentOpacity };

  return (
    <section
      ref={ref}
      className="atlas-hero relative flex min-h-[max(92svh,600px)] w-full flex-col justify-end overflow-hidden"
      aria-label={t("Destinations — Expedition Atlas hero")}
    >
      {image ? (
        <motion.div style={parallaxBg} className="absolute inset-0">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
            style={{ filter: "saturate(0.92)" }}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/45" />

      {/* Map-frame registration marks */}
      <div aria-hidden className="pointer-events-none absolute inset-4 hidden sm:block md:inset-6">
        <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-white/25" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-white/25" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-white/25" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-white/25" />
      </div>

      {/* Content */}
      <motion.div style={parallaxContent} className="absolute inset-0 flex items-end">
        <div className="atlas-canvas pb-40 sm:pb-44">
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-5 flex items-center gap-2.5"
          >
            <Compass className="h-3.5 w-3.5 text-[#FF7A00]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85 sm:text-xs">
              {t("The Expedition Atlas")}
            </span>
            <span className="hidden h-px w-14 bg-gradient-to-r from-[#FF7A00]/70 to-transparent sm:block" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.15, delay: 0.12, ease: EASE }}
            className="atlas-hero-title max-w-[13ch] font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {t("Where the road runs out.")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
            className="mt-6 max-w-2xl font-display text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {t("Honest country guides, trekking routes and the maps I wish I'd had before I left.")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#interactive-map"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF7A00] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#FF7A00]/25 transition-all hover:bg-[#ff8a21] hover:shadow-[#FF7A00]/40"
            >
              {t("Explore the Journey")}
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#chapters"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              {t("Browse the chapters")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {[t("Solo"), t("Slow"), t("Mapped")].map((label, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-[#FF7A00]/70" />}
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
                  {label}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll rail (large screens) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-4 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 [writing-mode:vertical-rl]">
          {t("Scroll to explore")}
        </span>
        <span className="atlas-scroll-line" />
      </motion.div>
    </section>
  );
}
