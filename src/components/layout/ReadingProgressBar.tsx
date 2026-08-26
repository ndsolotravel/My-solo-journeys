import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * ReadingProgressBar
 * A fixed, lightweight, high-performance scroll progress indicator at the very top of the viewport.
 * Uses requestAnimationFrame and direct DOM transforms for 60/120fps smoothness without re-renders.
 */
export function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    let currentProgress = 0;
    let isVisible = false;

    const updateProgress = () => {
      ticking = false;
      const el = barRef.current;
      if (!el) return;

      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight,
      );
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = docHeight - viewportHeight;

      // Handle very short pages: if there is negligible or no scrollable content, hide cleanly
      if (scrollable <= 15) {
        if (isVisible) {
          el.style.opacity = "0";
          isVisible = false;
        }
        return;
      }

      // Show bar when page is scrollable
      if (!isVisible) {
        el.style.opacity = "1";
        isVisible = true;
      }

      const scrollTop = Math.max(
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0,
        0,
      );

      // Clamp progress strictly between 0 and 1
      const progress = Math.min(Math.max(scrollTop / scrollable, 0), 1);

      // Avoid unnecessary style application if progress hasn't changed meaningfully
      if (Math.abs(progress - currentProgress) > 0.0005 || progress === 0 || progress === 1) {
        currentProgress = progress;
        el.style.transform = `scaleX(${progress})`;
      }
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };

    // Reset progress to 0 on route change and recalculate for the new page
    if (barRef.current) {
      barRef.current.style.transform = "scaleX(0)";
      currentProgress = 0;
    }

    // Initial calculation after layout paints
    const initialTimer = setTimeout(updateProgress, 50);

    // Passive scroll listener for maximum performance
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    // ResizeObserver watches document body to handle lazy-loaded images, comments, and dynamic posts
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(() => {
        requestUpdate();
      });
      resizeObserver.observe(document.body);
      if (document.documentElement) {
        resizeObserver.observe(document.documentElement);
      }
    }

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [pathname]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] w-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-accent via-accent to-[#FFA040] shadow-[0_0_8px_rgba(255,122,0,0.6)] origin-left will-change-transform"
        style={{
          transform: "scaleX(0)",
          opacity: 0,
          transition: "transform 75ms ease-out, opacity 250ms ease-out",
        }}
      />
    </div>
  );
}
