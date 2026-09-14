import { HandwritingSvg } from "@/components/handwriting-svg";
import RevealWords from "@/components/RevealWords";
import ProfileCard from "@/components/ProfileCard";
import Parallax from "@/components/Parallax";
import Magnetic from "@/components/Magnetic";
import { CaretDoubleDown } from "@phosphor-icons/react";

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
          <p className="font-display mx-auto mt-4 max-w-[560px] text-muted-foreground text-base md:text-xl md:mx-0">
            <RevealWords
              text="Kreator visual dan kriya yang menemukan kebahagiaan dalam proses penciptaan. Keahlian saya mencakup digital art, melukis, merajut, membuat handmade gifts yang berkesan, hingga meracik resep di dapur. Setiap karya lahir dari ketelitian, imajinasi, dan inspirasi dari musik yang saya dengarkan."
              baseDelay={0.55}
              step={0.04}
            />
          </p>
          <div className="animate-hero-fade-up mt-5 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.6s] md:justify-start">
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
          </div>
        </div>

        <Parallax speed={-14}>
          <div className="animate-hero-card-in [animation-delay:0.6s]">
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