import Parallax from "./Parallax";
import ScrollReveal from "./ScrollReveal";
import RevealWords from "./RevealWords";
import Magnetic from "./Magnetic";
import { ArrowRight, ChatCircleText } from "@phosphor-icons/react";

export default function CtaBanner() {
  return (
    <section id="kolaborasi" className="relative overflow-hidden px-6 py-[5.5rem]">
      <Parallax
        speed={-16}
        ariaHidden
        className="pointer-events-none absolute -left-20 top-10 size-72"
      >
        <div className="animate-float size-full rounded-full bg-accent/70 blur-3xl" />
      </Parallax>
      <Parallax
        speed={20}
        ariaHidden
        className="pointer-events-none absolute -right-16 bottom-6 size-80"
      >
        <div className="animate-float-delayed size-full rounded-full bg-primary/15 blur-3xl" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent bg-white/70 px-4 py-1.5 text-sm font-semibold text-accent-foreground backdrop-blur">
            <ChatCircleText size={15} weight="fill" aria-hidden="true" className="text-primary" />
            Kolaborasi
          </span>
        </ScrollReveal>

        <h2 className="text-3xl font-bold md:text-5xl">
          <RevealWords
            text="Punya ide atau project seru? Mari berkolaborasi!"
            baseDelay={0.1}
            step={0.04}
          />
          <span className="mx-auto mt-3 block h-1 w-20 rounded-full bg-primary" />
        </h2>

        <ScrollReveal distance={14}>
          <p className="mx-auto mt-5 max-w-[560px] text-lg text-muted-foreground">
            Digital art, kriya, handmade gifts, hingga resep — saya terbuka untuk proyek kolaborasi
            dan cerita baru.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-accent-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Hubungi Saya
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </Magnetic>
          <a
            href="#projects"
            className="cursor-pointer rounded-full border-2 border-primary px-7 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Lihat Project
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}