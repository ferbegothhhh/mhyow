import ScrollReveal from "./ScrollReveal";
import Parallax from "./Parallax";
import SectionHeading from "./SectionHeading";
import { Image } from "lucide-react";

const projects = [
  {
    title: "[Judul Project 1]",
    desc: "Deskripsi singkat project 1 di sini.",
    tags: ["HTML", "CSS"],
  },
  {
    title: "[Judul Project 2]",
    desc: "Deskripsi singkat project 2 di sini.",
    tags: ["JavaScript", "API"],
  },
  {
    title: "[Judul Project 3]",
    desc: "Deskripsi singkat project 3 di sini.",
    tags: ["Desain", "UI"],
  },
];

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

        <ScrollReveal
          stagger={0.08}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p, i) => (
            <article
              key={i}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-accent bg-background transition duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]"
            >
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-accent/70 to-primary/20">
                <Image
                  className="size-12 text-primary/60 transition duration-500 group-hover:rotate-6 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1/3 -translate-x-[200%] skew-x-[-12deg] bg-white/30 transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1 text-lg font-bold">{p.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-2.5">
                  <a
                    href="#"
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-accent-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Demo
                  </a>
                  <a
                    href="#"
                    className="rounded-full border border-primary px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}