import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  group?: boolean;
  stagger?: number;
  distance?: number;
  duration?: number;
  ease?: string;
  start?: string;
}

export default function ScrollReveal({
  children,
  className,
  group = false,
  stagger = 0,
  distance = 24,
  duration = 0.6,
  ease = "power2.out",
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = group
      ? Array.from(el.querySelectorAll<HTMLElement>(".reveal-item"))
      : stagger > 0
        ? (Array.from(el.children) as HTMLElement[])
        : [el];

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: distance,
        duration,
        ease,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [group, stagger, distance, duration, ease, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}