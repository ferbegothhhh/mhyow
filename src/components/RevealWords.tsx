import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type RevealWordsProps = {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
  variant?: "words" | "chars";
};

export default function RevealWords({
  text,
  className = "",
  baseDelay = 0,
  step = 0.05,
  variant = "words",
}: RevealWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (variant === "chars") {
      const split = new SplitText(el, { type: "chars" });
      gsap.fromTo(
        split.chars,
        { yPercent: 110, opacity: 0, rotate: 4 },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: step,
          delay: baseDelay,
        }
      );
      return () => {
        split.revert();
      };
    }

    const words = el.querySelectorAll<HTMLElement>("[data-reveal-word]");
    const tween = gsap.fromTo(
      words,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: step,
        delay: baseDelay,
      }
    );
    return () => {
      tween.kill();
    };
  }, [variant, baseDelay, step, text]);

  const words = text.split(" ");

  if (variant === "chars") {
    return (
      <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span data-reveal-word className="inline-block">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}