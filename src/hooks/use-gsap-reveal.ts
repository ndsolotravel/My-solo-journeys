import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Premium, subtle scroll-triggered reveal for a section.
 * Animates elements with data-reveal="heading" | "card" | "featured" | "info".
 * - heading: fade + 24px up, 0.8s power3.out
 * - card: opacity/y:30 → 0, stagger 0.08
 * - featured: fades in after cards with a subtle border-glow flash (no loop)
 * - info: opacity/y:20 → 0, stagger 0.1
 * Respects prefers-reduced-motion.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const headings = root.querySelectorAll<HTMLElement>('[data-reveal="heading"]');
      const cards = root.querySelectorAll<HTMLElement>('[data-reveal="card"]');
      const featured = root.querySelectorAll<HTMLElement>('[data-reveal="featured"]');
      const info = root.querySelectorAll<HTMLElement>('[data-reveal="info"]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(headings, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      })
        .from(
          cards,
          {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.3",
        )
        .from(
          featured,
          {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power3.out",
            onStart: () => {
              featured.forEach((el) => el.classList.add("is-glowing"));
            },
          },
          "-=0.3",
        )
        .from(
          info,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.4",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
