import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 90, delay = 800) {
  const [display, setDisplay] = useState(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return text;
    }
    return "";
  });

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      setDisplay(text.slice(0, i));
      i += 1;
      if (i <= text.length) {
        timer = setTimeout(typeNext, speed);
      }
    };

    timer = setTimeout(typeNext, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return display;
}