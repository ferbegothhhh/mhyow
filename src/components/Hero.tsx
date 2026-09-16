import { HandwritingSvg } from "@/components/handwriting-svg";
import RevealWords from "@/components/RevealWords";
import ProfileCard from "@/components/ProfileCard";
import Parallax from "@/components/Parallax";
import Magnetic from "@/components/Magnetic";
import { CaretDoubleDown, Sparkle } from "@phosphor-icons/react";

const heroSkills = ["Digital Art", "Melukis", "Kriya", "Merajut", "Musik", "Memasak"];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-background to-accent px-6 py-12"
    >
      <Parallax
        speed={-24}
        ariaHidden
        className="pointer-events-none absolute -left-24 top-20 size-80"
      >
        <div className="animate-float size-full rounded-full bg-primary/10 blur-3xl" />
      </Parallax>
      <Parallax
        speed={20}
        ariaHidden
        className="pointer-events-none absolute -right-28 bottom-16 size-96"
      >
        <div className="animate-float-delayed size-full rounded-full bg-accent/50 blur-3xl" />
      </Parallax>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 animate-float [animation-duration:2.4s]">
        <CaretDoubleDown size={28} weight="bold" className="text-primary/70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex-1">
          <p className="font-display font-semibold text-foreground/80 text-lg md:text-xl">
            <RevealWords text="Halo, saya" variant="chars" baseDelay={0.1} step={0.06} />
          </p>
          <svg className="ml-1.5 mt-0.5 block h-3 w-28 text-primary/60" viewBox="0 0 120 12" fill="none" aria-hidden="true">
            <path d="M2 8 C20 2,40 12,60 6 S100 3,118 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="animate-hero-fade-up [animation-delay:0.3s]">
            <HandwritingSvg
              text="Yuan/Mhyow"
              fontSize={90}
              width={600}
              height={120}
              duration={3}
              delay={0.5}
              strokeWidth={2.5}
              className="text-primary"
            />
          </div>
          <p className="mx-auto mt-4 max-w-[560px] leading-relaxed text-muted-foreground text-lg md:text-xl md:mx-0">
            <RevealWords
              text="Kreator visual dan kriya yang menemukan kebahagiaan dalam proses penciptaan. Keahlian saya mencakup digital art, melukis, merajut, membuat handmade gifts yang berkesan, hingga meracik resep di dapur. Setiap karya lahir dari ketelitian, imajinasi, dan inspirasi dari musik yang saya dengarkan."
              baseDelay={0.55}
              step={0.04}
            />
          </p>
          <div className="relative animate-hero-fade-up mt-5 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.6s] md:justify-start">
            <Magnetic>
              <a
                href="#projects"
                className="inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/85 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Lihat Project
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="rounded-full border-2 border-primary px-7 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Hubungi Saya
            </a>
            <svg aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 w-16 rotate-[15deg] text-primary/40 md:w-20" viewBox="0 0 80 80" fill="none">
              <path d="M20 60 C30 40,50 30,60 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 8 L62 8 L62 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <ul
            aria-label="Keahlian"
            className="animate-hero-fade-up mt-6 flex flex-wrap items-center justify-center gap-2 [animation-delay:0.8s] md:justify-start"
          >
            {heroSkills.map((skill) => (
              <li
                key={skill}
                className="inline-flex cursor-default items-center gap-1 rounded-full border border-accent bg-white/60 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur"
              >
                <Sparkle size={11} weight="fill" aria-hidden="true" className="text-primary" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <Parallax speed={-14}>
          <div className="relative animate-hero-card-in [animation-delay:0.6s]">
            <div
              aria-hidden="true"
              className="animate-spin-slow pointer-events-none absolute -right-5 -top-6 z-[5] size-24 md:-right-9 md:-top-9 md:size-28"
            >
              <svg viewBox="0 0 100 100" className="size-full">
                <defs>
                  <path id="heroCircBadge" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-primary/75 font-display text-[10.5px]" fontWeight={600}>
                  <textPath href="#heroCircBadge">Digital Art  •  Kriya  •  Merajut  •  Musik  •</textPath>
                </text>
              </svg>
              <span className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent bg-white/80 text-primary shadow-md backdrop-blur">
                <Sparkle size={14} weight="fill" />
              </span>
            </div>
            <ProfileCard
              avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
              miniAvatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              name="Yuan/Mhyow"
              title="Digital Art & Kriya"
              handle="yuanmhyow"
              status="Terbuka untuk kolaborasi"
              contactText="Hubungi"
              onContactClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </Parallax>
      </div>
    </section>
  );
}