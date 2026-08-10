import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    if (!ref.current) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(end);
      return;
    }

    setDisplay(0);
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: end,
      duration,
      ease: "power3.out",
      onUpdate: () => setDisplay(Math.round(obj.v)),
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
