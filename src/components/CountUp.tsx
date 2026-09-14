import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Icon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  icon?: Icon;
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export default function CountUp({
  icon,
  value,
  suffix = "",
  label,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const numEl = numRef.current;
    if (!el || !numEl) return;

    const finalText = `${value}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      numEl.textContent = finalText;
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          numEl.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [value, suffix]);

  const IconComponent = icon;

  return (
    <div
      ref={ref}
      className={`flex h-full flex-col items-center justify-center gap-0.5 rounded-2xl border border-accent bg-white/70 p-4 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(236,72,153,0.15)] ${className}`}
    >
      {IconComponent ? (
        <IconComponent size={22} aria-hidden="true" className="text-primary" />
      ) : null}
      <span
        ref={numRef}
        className="font-display text-2xl font-bold text-foreground md:text-3xl"
      >
        0
      </span>
      <span className="text-xs font-medium text-muted-foreground md:text-sm">
        {label}
      </span>
    </div>
  );
}