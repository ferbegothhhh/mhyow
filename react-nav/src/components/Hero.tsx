import Bubbles from "./Bubbles";
import { useTypewriter } from "@/hooks/use-typewriter";

export default function Hero() {
  const typedName = useTypewriter("Yuan/Mhyow", 90, 800);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden bg-gradient-to-br from-background to-accent px-6 py-12"
    >
      <Bubbles />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex-1">
          <p className="animate-hero-fade-up font-semibold text-foreground/80 [animation-delay:0.15s] text-lg md:text-xl">
            Halo, saya
          </p>
          <h1 className="typewriter-caret animate-hero-fade-up mb-2 text-5xl font-bold leading-tight [animation-delay:0.3s] md:text-7xl">
            {typedName}
          </h1>
          <p className="animate-hero-fade-up mx-auto mt-2 max-w-[560px] text-muted-foreground [animation-delay:0.45s] text-base md:text-xl md:mx-0">
            Pelajar yang suka eksplorasi teknologi, desain, dan sedang belajar membangun hal-hal keren di internet.
          </p>
          <div className="animate-hero-fade-up mt-5 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.6s] md:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/85"
            >
              Lihat Project
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-primary px-7 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <div className="animate-hero-fade-in [animation-delay:0.6s]">
          <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border-[6px] border-white shadow-[0_8px_24px_rgba(236,72,153,0.12)] md:h-[260px] md:w-[260px]">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-primary/40">
              <span className="text-7xl">👤</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}