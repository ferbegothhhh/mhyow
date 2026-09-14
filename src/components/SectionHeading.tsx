import { Sparkle } from "@phosphor-icons/react";
import RevealWords from "./RevealWords";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ badge, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent bg-white/70 px-4 py-1.5 text-sm font-semibold text-accent-foreground backdrop-blur">
        <Sparkle size={14} weight="fill" aria-hidden="true" className="text-primary" />
        {badge}
      </span>
      <h2 className="text-3xl font-bold md:text-4xl">
        <RevealWords text={title} variant="chars" baseDelay={0.05} step={0.03} />
        <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-[560px] text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}