import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Fades [data-reveal] elements in as they scroll into view. Returns a ref for the page root.
export default function useReveal(extra) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-reveal]", { opacity: 0, y: 40 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%", once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }),
        });
        extra && extra();
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}
