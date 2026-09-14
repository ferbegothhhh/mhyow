import ScrollReveal from "./ScrollReveal";
import Parallax from "./Parallax";
import RevealWords from "./RevealWords";
import Marquee from "./Marquee";
import CountUp from "./CountUp";
import {
  Sparkle,
  Palette,
  PuzzlePiece,
  MusicNotes,
  Heart,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const media = [
  "Digital Art",
  "Melukis",
  "Merajut",
  "Handmade Gifts",
  "Memasak",
  "Musik",
  "Kriya",
];

const stats: { icon: Icon; value: number; suffix: string; label: string }[] = [
  { icon: Palette, value: 10, suffix: "+", label: "Project & karya" },
  { icon: PuzzlePiece, value: 6, suffix: "+", label: "Keahlian kreatif" },
  { icon: MusicNotes, value: 50, suffix: "+", label: "Playlist inspirasi" },
  { icon: Heart, value: 100, suffix: "%", label: "Selalu dengan hati" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-background via-accent/40 to-accent/70 px-6 py-16"
    >
      <Parallax
        speed={-22}
        ariaHidden
        className="pointer-events-none absolute -right-24 top-16 size-72"
      >
        <div className="animate-float size-full rounded-full bg-primary/20 blur-3xl" />
      </Parallax>
      <Parallax
        speed={18}
        ariaHidden
        className="pointer-events-none absolute -left-20 bottom-10 size-80"
      >
        <div className="animate-float-delayed size-full rounded-full bg-accent/60 blur-3xl" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-5 flex justify-center">
          <span className="animate-float inline-flex items-center gap-2 rounded-full border border-accent bg-white/70 px-4 py-1.5 text-sm font-semibold text-accent-foreground backdrop-blur">
            <Sparkle size={16} weight="fill" aria-hidden="true" className="text-primary" />
            Profil & Cerita
          </span>
        </div>

        <h2 className="text-center text-3xl font-bold md:text-4xl">
          <RevealWords text="Tentang Saya" variant="chars" baseDelay={0.05} step={0.03} />
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-primary" />
        </h2>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="font-display text-lg font-semibold leading-relaxed text-foreground md:text-xl">
            <RevealWords
              text="Selamat datang di ruang kreatif saya, tempat seni visual, kriya, dan proses penciptaan bertemu."
              baseDelay={0.1}
              step={0.03}
            />
          </p>
          <ScrollReveal distance={16}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Saya menggabungkan kecintaan pada seni visual (
              <span className="font-semibold text-foreground">digital art &amp; melukis</span>)
              dengan keterampilan kriya (<span className="font-semibold text-foreground">merajut &amp; handmade gifts</span>)
              untuk menghasilkan karya yang tidak hanya estetis, tetapi juga bernilai emosional.
              Berbekal inspirasi dari <span className="font-semibold text-foreground">musik dan hobi memasak</span>,
              setiap karya dibuat dengan hati dan dirancang khusus untuk Anda.
            </p>
          </ScrollReveal>
        </div>

        <Marquee
          items={media}
          className="mt-8 border-y border-accent bg-white/40 py-2 backdrop-blur"
        />

        <ScrollReveal
          stagger={0.08}
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <CountUp key={stat.label} {...stat} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}