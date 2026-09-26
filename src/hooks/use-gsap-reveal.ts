import { useEffect, useRef } from "react";
import { onVisibleAndIdle } from "@/lib/idle";

let gsapModule: any = null;
let gsapPromise: Promise<any> | null = null;
async function getGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([g, st]) => {
        const G = g.default || g;
        G.registerPlugin(st.ScrollTrigger);
        gsapModule = G;
        return G;
      })
      .catch((err) => {
        // Allow a later call to retry if the chunk failed to load.
        gsapPromise = null;
        throw err;
      });
  }
  return gsapPromise;
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

    let cancelled = false;
    let ctx: any = null;

    // GSAP (~110 kB) is only downloaded once the section is close to the
    // viewport *and* the main thread is idle, so it never competes with
    // hydration or the first interaction.
    const cancelDefer = onVisibleAndIdle(root, () => {
      getGsap()
        .then((G) => {
          if (cancelled || !root) return;
          ctx = G.context(() => {
            const headings = root.querySelectorAll<HTMLElement>('[data-reveal="heading"]');
            const cards = root.querySelectorAll<HTMLElement>('[data-reveal="card"]');
            const featured = root.querySelectorAll<HTMLElement>('[data-reveal="featured"]');
            const info = root.querySelectorAll<HTMLElement>('[data-reveal="info"]');

            const tl = G.timeline({
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
        })
        .catch(() => {
          // Animation is progressive enhancement; content stays visible.
        });
    }, "300px 0px");

    return () => {
      cancelled = true;
      cancelDefer();
      ctx?.revert();
    };
  }, []);

  return ref;
}