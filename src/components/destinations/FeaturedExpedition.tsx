import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import type { Destination } from "@/lib/destinations.functions";
import { useTranslations } from "@/lib/translate/store";

type FeaturedExpeditionProps = {
  destination: Destination;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeaturedExpedition({ destination: d }: FeaturedExpeditionProps) {
  const t = useTranslations();
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const parallaxBg = reduce ? {} : { y: bgY };
  const parallaxBadge = reduce ? {} : { y: badgeY };

  const rows = [
    { label: t("Country"), value: t(d.country) },
    { label: t("Region"), value: d.region ? t(d.region) : "—" },
    { label: t("Type"), value: d.category ? t(d.category) : "—" },
    {
      label: t("Coordinates"),
      value:
        d.latitude && d.longitude
          ? `${Number(d.latitude).toFixed(3)}°N · ${Number(d.longitude).toFixed(2)}°E`
          : "—",
    },
    { label: t("Field reports"), value: String(d.posts?.length ?? 0) },
  ];

  return (
    <section
      ref={ref}
      id="featured"
      aria-labelledby="featured-heading"
      className="relative scroll-mt-24"
    >
      <div className="atlas-canvas">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 lg:rounded-[2.5rem]">
          {/* Backdrop */}
          {d.featured_image && (
            <motion.div style={parallaxBg} className="absolute inset-0">
              <img
                src={d.featured_image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Ghost expedition number */}
          {!reduce && (
            <motion.span
              style={parallaxBadge}
              aria-hidden="true"
              className="atlas-ghost pointer-events-none absolute -right-4 top-2 select-none text-[9rem] lg:text-[13rem]"
            >
              00
            </motion.span>
          )}

          <div className="relative z-10 grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:p-14">
            {/* Narrative side */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF7A00] sm:text-xs"
              >
                <span className="h-px w-10 bg-[#FF7A00]/70" />
                {t("Featured Expedition")}
              </motion.p>

              <motion.h2
                id="featured-heading"
                initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                className="atlas-section-title mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl xl:text-6xl"
              >
                {t(d.title)}
              </motion.h2>

              {d.description && (
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
                  className="mt-6 max-w-2xl font-display text-base leading-relaxed text-white/80 sm:text-lg"
                >
                  {t(d.description)}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
                className="mt-9"
              >
                <Link
                  to="/destinations/$slug"
                  params={{ slug: d.slug }}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#FF7A00] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#FF7A00]/25 transition-colors hover:bg-[#ff8a21]"
                >
                  {t("Read the field report")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Field reference panel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="rounded-2xl border border-white/12 bg-white/[0.07] p-6 backdrop-blur-md sm:p-7"
            >
              <div className="flex items-center gap-2.5 border-b border-white/15 pb-4">
                <MapPin className="h-4 w-4 text-[#FF7A00]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/70">
                  {t("Field reference")}
                </span>
              </div>
              <dl className="divide-y divide-white/10 pt-2">
                {rows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
                    className="flex items-baseline justify-between gap-6 py-3.5"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                      {row.label}
                    </dt>
                    <dd className="text-right font-display text-sm font-semibold text-white sm:text-[15px]">
                      {row.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
