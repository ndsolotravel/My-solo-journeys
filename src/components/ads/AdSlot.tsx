type AdSlotProps = {
  label?: string;
  className?: string;
  /** Tailwind height utility, e.g. "h-24" (default), "h-[90px]", "h-60". */
  heightClass?: string;
};

/**
 * Reserved, layout-stable placeholder for Google Ads (AdSense).
 * Renders a fixed-height container so swapping in a real <ins class="adsbygoogle" />
 * later won't cause CLS. Hidden from screen readers.
 */
export function AdSlot({ label = "Advertisement", className = "", heightClass = "h-24" }: AdSlotProps) {
  return (
    <div
      aria-hidden
      className={`relative w-full ${heightClass} overflow-hidden rounded-md border border-dashed border-border/70 bg-muted/30 ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
          {label}
        </span>
      </div>
      {/* Real ad slot goes here:
          <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto" data-full-width-responsive="true" />
      */}
    </div>
  );
}
