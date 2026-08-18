import type { ReactNode } from "react";

type HeroBannerProps = {
  imageUrl: string;
  imageAlt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  heightClass?: string;
  children?: ReactNode;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

/**
 * Reusable Hero Banner Component
 * Features smooth brightness hover effect (10-15% increase) on desktop devices
 * while preserving mobile touch behavior and cinematic overlays.
 */
export function HeroBanner({
  imageUrl,
  imageAlt,
  className = "",
  imageClassName = "object-cover object-center",
  overlayClassName = "bg-gradient-to-b from-black/40 via-black/30 to-black/75",
  heightClass = "h-[45vh] min-h-[280px]",
  children,
  loading = "eager",
  fetchPriority = "high",
  onError,
}: HeroBannerProps) {
  return (
    <section className={`hero-banner group/hero relative w-full overflow-hidden ${heightClass} ${className}`}>
      <img
        src={imageUrl}
        alt={imageAlt}
        loading={loading}
        fetchPriority={fetchPriority}
        onError={onError}
        className={`hero-banner-image absolute inset-0 h-full w-full ${imageClassName}`}
      />
      <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />
      {children && <div className="relative h-full w-full">{children}</div>}
    </section>
  );
}
