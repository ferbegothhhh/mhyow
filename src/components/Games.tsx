import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { Gamepad2 } from "lucide-react";

const games = [
  { name: "[Nama Game]", meta: "PC · Genre" },
  { name: "[Nama Game]", meta: "Mobile · Genre" },
  { name: "[Nama Game]", meta: "Console · Genre" },
  { name: "[Nama Game]", meta: "PC · Genre" },
];

export default function Games() {
  return (
    <section id="games" className="px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Seru-seruan"
          title="Games"
          subtitle="Game yang sering saya mainkan. Klik untuk cek di platformnya."
        />

        <ScrollReveal
          stagger={0.08}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {games.map((game, i) => (
            <article
              key={i}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-accent bg-background transition duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]"
            >
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-accent/70 to-primary/20">
                <Gamepad2
                  className="size-12 text-primary/60 transition duration-500 group-hover:rotate-6 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.25),transparent_60%)]" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1 text-lg font-bold">{game.name}</h3>
                <p className="mb-3 text-sm font-medium text-accent-foreground">{game.meta}</p>
                <a
                  href="#"
                  className="mt-auto rounded-full bg-primary px-4 py-1.5 text-center text-xs font-semibold text-primary-foreground transition hover:bg-accent-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Selengkapnya
                </a>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}