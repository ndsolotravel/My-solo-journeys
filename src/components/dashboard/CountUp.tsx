import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `end` when the element first scrolls into view.
 *
 * This deliberately does NOT use GSAP. `CountUp` renders on the homepage, and
 * GSAP is ~110 kB of JS that would otherwise be pulled into the initial
 * bundle just to animate one number. A `requestAnimationFrame` tween with the
 * same easing produces the same visual result for a few lines of code.
 */
export function CountUp({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Render the final value during SSR/initial paint to avoid hydration mismatches;
  // on mount we reset to 0 then tween up.
  const [display, setDisplay] = useState<number>(end);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(end);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    let cancelled = false;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (cancelled) return;
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(end * easeOutCubic(progress)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(end);
      }
    };

    const start = () => {
      if (cancelled) return;
      setDisplay(0);
      frame = requestAnimationFrame(tick);
    };

    // Only animate once the counter is actually near the viewport. This keeps
    // work off the critical path for a stat block that is usually below the fold.
    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            start();
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className="font-sans tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
