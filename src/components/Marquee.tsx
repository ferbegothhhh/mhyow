import { Sparkle } from "@phosphor-icons/react";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div className="animate-marquee flex w-max items-center">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-6 whitespace-nowrap px-3 font-display text-xl font-semibold text-foreground/70 md:text-2xl"
          >
            {item}
            <Sparkle
              size={18}
              weight="fill"
              className="text-primary/70"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}