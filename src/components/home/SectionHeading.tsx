import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/lib/translate/store";

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
  accentColor = "#3B7FA8",
  className = "",
}: SectionHeadingProps) {
  const t = useTranslations();

  return (
    <div className={`mb-8 sm:mb-10 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title + Badge */}
        <div className="flex items-center gap-3">
          <h2 className="font-display text-[1.65rem] font-semibold leading-tight tracking-tight text-heading sm:text-[2rem]">
            {t(title)}
          </h2>
          {badge && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t(badge)}
            </span>
          )}
        </div>

        {/* Divider bar */}
        <div className="hidden md:flex flex-1 mx-5 h-px bg-gradient-to-r from-border via-border/70 to-transparent" />

        {/* Right: Custom elements, filter tabs, or Action Link */}
        <div className="flex items-center gap-3 text-sm">
          {rightElement}
          {linkText && linkTo && (
            <Link
              to={linkTo as any}
              hash={linkHash}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-link transition-colors hover:text-link-hover group"
            >
              <span>{t(linkText)}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180">
                →
              </span>
            </Link>
          )}
        </div>
      </div>

      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-[0.95rem]">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}
