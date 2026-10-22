import { useEffect, useRef } from "react";
import gsap from "gsap";

// Animated equaliser that reshapes itself for each sound profile.
export default function Eq({ curve }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".eq i").forEach((bar, i) => {
        const amp = curve[Math.floor(i / 4)];
        gsap.to(bar, { scaleY: () => gsap.utils.random(amp * 0.3, amp), duration: () => gsap.utils.random(0.35, 0.8), repeat: -1, yoyo: true, repeatRefresh: true, ease: "sine.inOut" });
      });
    }, ref);
    return () => ctx.revert();
  }, [curve]);
  return <div className="eq" ref={ref}>{Array.from({ length: 32 }, (_, i) => <i key={i} />)}</div>;
}
