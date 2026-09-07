import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/translate/store";
import { KineticHeading } from "@/components/common/KineticHeading";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  linkText?: string;
  linkTo?: string;
  linkHash?: string;
  rightElement?: ReactNode;
  accentColor?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  linkText,
  linkTo,
  linkHash,
  rightElement,
  accentColor = "#FF7A00",
  className = "",
}: SectionHeadingProps) {
  const t = useTranslations();
  const translatedTitle = t(title);

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title + Badge */}
        <div className="flex items-center gap-3">
          <KineticHeading
            as="h2"
            className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {translatedTitle}
          </KineticHeading>
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hidden sm:inline-flex items-center rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]"
            >
              {t(badge)}
            </motion.span>
          )}
        </div>

        {/* Divider bar with graceful entry */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-1 mx-4 h-[2px] rounded-full bg-gradient-to-r from-[#FF7A00] via-border to-transparent origin-left rtl:origin-right"
        />

        {/* Right: Custom elements, filter tabs, or Action Link */}
        <div className="flex items-center gap-3 text-sm">
          {rightElement}
          {linkText && linkTo && (
            <Link
              to={linkTo as any}
              hash={linkHash}
              className="group inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-[#FF7A00]"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {t(linkText)}
                </span>
                <span
                  aria-hidden
                  className="absolute left-0 top-full inline-block text-[#FF7A00] transition-transform duration-300 group-hover:-translate-y-full"
                >
                  {t(linkText)}
                </span>
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">
                →
              </span>
            </Link>
          )}
        </div>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-1.5 text-sm text-muted-foreground"
        >
          {t(subtitle)}
        </motion.p>
      )}
    </div>
  );
}
