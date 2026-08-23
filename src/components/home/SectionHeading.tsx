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
  accentColor = "#FF7A00",
  className = "",
}: SectionHeadingProps) {
  const t = useTranslations();

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title + Badge */}
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t(title)}
          </h2>
          {badge && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]">
              {t(badge)}
            </span>
          )}
        </div>

        {/* Divider bar */}
        <div className="hidden md:flex flex-1 mx-4 h-[2px] rounded-full bg-gradient-to-r from-[#FF7A00] via-border to-transparent" />

        {/* Right: Custom elements, filter tabs, or Action Link */}
        <div className="flex items-center gap-3 text-sm">
          {rightElement}
          {linkText && linkTo && (
            <Link
              to={linkTo as any}
              hash={linkHash}
              className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-[#FF7A00]"
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
        <p className="mt-1.5 text-sm text-muted-foreground">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}
