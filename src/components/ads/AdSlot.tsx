import { useEffect, useRef } from "react";

export type AdSlotFormat = "horizontal" | "rectangle" | "in-feed" | "auto";

export type AdSlotProps = {
  /** Label displayed on the placeholder container (e.g. "Advertisement"). */
  label?: string;
  /** Google AdSense Ad Slot ID (can also be read from environment variable if configured). */
  slotId?: string;
  /** Google AdSense Publisher Client ID (e.g., ca-pub-xxxxxxxxxxxxxxxx). */
  clientId?: string;
  /** Ad layout format matching standard responsive AdSense unit sizes. */
  format?: AdSlotFormat;
  /** Whether the ad should be full-width responsive. */
  fullWidthResponsive?: boolean;
  /** Custom CSS class names. */
  className?: string;
  /** Custom height override utility if needed (e.g., "h-24", "min-h-[90px]"). */
  heightClass?: string;
};

/**
 * Standard reserved sizes to prevent Cumulative Layout Shift (CLS):
 * - horizontal: Mobile 320x100, Tablet 728x90, Desktop up to 970x90
 * - rectangle: Mobile/Desktop 300x250 / 336x280
 * - in-feed: Mobile 320x120, Desktop responsive horizontal card
 * - auto: Fluid responsive container with reserved vertical height
 */
function getFormatSizeClasses(format: AdSlotFormat): string {
  switch (format) {
    case "horizontal":
      return "min-h-[100px] sm:min-h-[90px] max-w-[320px] sm:max-w-[728px] lg:max-w-[970px]";
    case "rectangle":
      return "min-h-[250px] max-w-[300px] sm:max-w-[336px]";
    case "in-feed":
      return "min-h-[120px] sm:min-h-[140px] max-w-full";
    case "auto":
    default:
      return "min-h-[100px] sm:min-h-[90px] max-w-full";
  }
}

/**
 * Reusable, layout-stable ad container for Google AdSense.
 * 
 * Key Features:
 * 1. Fixed responsive container structure with pre-reserved height to strictly prevent Cumulative Layout Shift (CLS).
 * 2. Subtle, clean "ADVERTISEMENT" badge label.
 * 3. Ready for future AdSense activation via environment variables (`VITE_ADSENSE_CLIENT_ID`) or props.
 * 4. Hidden from screen readers / SEO crawlers (`aria-hidden="true"` / `role="presentation"`).
 */
export function AdSlot({
  label = "Advertisement",
  slotId,
  clientId,
  format = "horizontal",
  fullWidthResponsive = true,
  className = "",
  heightClass,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  // Retrieve client ID from prop, environment variable, or fallback
  const resolvedClientId =
    clientId ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_ADSENSE_CLIENT_ID) ||
    "";

  // Check if AdSense is loaded and active on the window object
  const isAdSenseActive =
    typeof window !== "undefined" &&
    Boolean((window as any).adsbygoogle && resolvedClientId && slotId);

  useEffect(() => {
    if (isAdSenseActive && adRef.current) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        // Silently catch ad-blocker or initialization errors
      }
    }
  }, [isAdSenseActive, slotId]);

  const sizeClasses = heightClass || getFormatSizeClasses(format);

  return (
    <div
      role="presentation"
      aria-hidden="true"
      data-ad-format={format}
      data-ad-slot={slotId}
      className={`ad-container relative mx-auto flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-muted/20 text-center transition-colors dark:bg-card/20 ${sizeClasses} ${className}`}
    >
      {isAdSenseActive ? (
        <ins
          ref={adRef}
          className="adsbygoogle block w-full text-center"
          style={{ display: "block" }}
          data-ad-client={resolvedClientId}
          data-ad-slot={slotId}
          data-ad-format={format === "auto" ? "auto" : undefined}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-3 select-none">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/60">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
