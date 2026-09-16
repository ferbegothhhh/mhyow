import { useState } from "react";
import Parallax from "./Parallax";
import SectionHeading from "./SectionHeading";
import Masonry from "./Masonry";
import type { Item } from "./Masonry";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "@phosphor-icons/react";

const tagSets = [
  ["Web", "CSS"],
  ["JavaScript", "API"],
  ["Desain", "UI"],
  ["Kriya"],
  ["Digital Art"],
  ["Musik"],
];

const projectItems: Item[] = Array.from({ length: 14 }, (_, i) => ({
  id: `proyek-${i + 1}`,
  img: `https://picsum.photos/seed/proyek-${i + 1}/800/${1020 + ((i * 97) % 5) * 100}?grayscale`,
  url: "#",
  title: `Project ${i + 1}`,
  tags: tagSets[i % tagSets.length],
  height: 500 + ((i * 83) % 5) * 40,
}));

const categories = ["Semua", ...Array.from(new Set(tagSets.flat()))];

export default function Projects() {
  const [activeTag, setActiveTag] = useState("Semua");

  const filteredItems =
    activeTag === "Semua"
      ? projectItems
      : projectItems.filter((item) => item.tags?.includes(activeTag));

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-[4.5rem]">
      <Parallax
        speed={-18}
        ariaHidden
        className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <Parallax
        speed={22}
        ariaHidden
        className="pointer-events-none absolute -right-20 bottom-16 size-96 rounded-full bg-accent/40 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading badge="Karya" title="Project" />

        <div
          role="group"
          aria-label="Filter kategori project"
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((category) => {
            const isActive = activeTag === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTag(category)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(154,52,18,0.25)]"
                    : "border border-accent bg-white/70 text-accent-foreground hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <Masonry
          items={filteredItems}
          revealOnScroll
          animateFrom="bottom"
          blurToFocus
          stagger={0.05}
        />

        <ScrollReveal className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <p className="text-muted-foreground">
            Ada project serupa yang mau ikut saya kerjakan?
          </p>
          <a
            href="#contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Hubungi Saya
            <ArrowRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}