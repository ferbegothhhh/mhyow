import Parallax from "./Parallax";
import SectionHeading from "./SectionHeading";
import Masonry from "./Masonry";
import type { Item } from "./Masonry";

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

export default function Projects() {
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

        <Masonry
          items={projectItems}
          revealOnScroll
          animateFrom="bottom"
          blurToFocus
          stagger={0.05}
        />
      </div>
    </section>
  );
}