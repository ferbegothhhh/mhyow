import ScrollReveal from "./ScrollReveal";
import Parallax from "./Parallax";
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
        <ScrollReveal>
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Project
            <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
          </h2>
        </ScrollReveal>

        <ScrollReveal
          stagger={0.08}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p, i) => (
            <article
              key={i}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-accent bg-background transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]"
            >
              <div className="flex aspect-[16/10] items-center justify-center bg-accent">
                <Image className="size-12 text-primary/50" strokeWidth={1.5} />
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
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-accent-foreground"
                  >
                    Demo
                  </a>
                  <a
                    href="#"
                    className="rounded-full border border-primary px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
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
