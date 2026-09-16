import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Joystick,
  Monitor,
  Smartphone,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

interface Game {
  name: string;
  platform: string;
  genre: string;
  href: string;
  image: string;
}

const games: Game[] = [
  { name: "Guardian Tales", platform: "Mobile", genre: "Adventure RPG", href: "https://www.guardiantales.com", image: "https://www.guardiantales.com/images/open_graph_l.jpg" },
  { name: "Genshin Impact", platform: "PC · Mobile", genre: "Action RPG", href: "https://genshin.hoyoverse.com", image: "https://upload-static.hoyoverse.com/hk4e/upload/fb/common.jpg" },
  { name: "Sudoku", platform: "Semua Platform", genre: "Puzzle", href: "https://www.sudoku.com", image: "https://www.sudoku.com/img/icon-app.png" },
  { name: "Roblox", platform: "PC · Mobile", genre: "Sandbox", href: "https://www.roblox.com", image: "https://images.rbxcdn.com/5348266ea6c5e67b19d6a814cbbb70f6.jpg" },
  { name: "Minesweeper", platform: "Semua Platform", genre: "Puzzle", href: "https://minesweeper.online", image: "https://minesweeper.online/img/og_image.png" },
  { name: "Heartopia", platform: "Mobile", genre: "Life Simulation", href: "https://play.google.com/store/apps/details?id=com.xd.xdtglobal.gp", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/64/36/376436d1-7308-d29f-a82d-313559aa52ce/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1024x1024bb.jpg" },
  { name: "Arknights: Endfield", platform: "PC · Mobile", genre: "Tactical RPG", href: "https://endfield.hypergryph.com", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ec/78/36/ec7836d7-d434-6bdd-415e-5bac80a387a6/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1024x1024bb.jpg" },
  { name: "Wuthering Waves", platform: "PC · Mobile", genre: "Action RPG", href: "https://wutheringwaves.kurogames.com", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/3513350/library_hero.jpg" },
  { name: "Infinity Nikki", platform: "PC · Mobile", genre: "Dress-up Open World", href: "https://infinitynikki.infoldgames.com", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/3164330/library_600x900_2x.jpg" },
  { name: "Where Winds Meet", platform: "PC", genre: "Open-World Wuxia", href: "https://wherewindsmeet.com", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/3564740/library_600x900_2x.jpg" },
  { name: "Zerowake GATES", platform: "Mobile · PC", genre: "Turn-based RPG", href: "https://play.google.com/store/apps/details?id=com.storytaco.p33client", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/3709790/library_hero.jpg" },
  { name: "Honkai Impact 3rd", platform: "Mobile · PC", genre: "Action RPG", href: "https://honkaiimpact3.hoyoverse.com", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/58/be/9d/58be9d1b-d8a9-de3c-d210-5f8997345624/AppIcon-1x_U007emarketing-0-10-0-85-220-0.png/1024x1024bb.jpg" },
  { name: "Ensemble Stars", platform: "Mobile", genre: "Idol Rhythm", href: "https://ensemblestars.com", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/24/71/7c/24717cc9-a7c3-b124-0d1e-8e7b1d3653ee/AppIcon-1x_U007emarketing-0-8-0-0-85-220-0.png/1024x1024bb.jpg" },
  { name: "Minecraft", platform: "Semua Platform", genre: "Sandbox", href: "https://www.minecraft.net", image: "https://www.minecraft.net/content/dam/minecraftnet/franchise/logos/minecraft-creeper-face.jpg" },
];

function PlatformBadge({ platform }: { platform: string }) {
  let Icon = Joystick;
  if (platform.includes("PC")) Icon = Monitor;
  else if (platform.includes("Mobile")) Icon = Smartphone;

  return (
    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
      <Icon size={12} aria-hidden="true" />
      {platform}
    </span>
  );
}

export default function Games() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  const arrowClasses =
    "grid size-9 cursor-pointer place-items-center rounded-full border border-accent bg-white/70 text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <section id="games" className="px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Seru-seruan"
          title="Games"
          subtitle={`${games.length} game yang sering saya mainkan. Geser kiri-kanan untuk melihat semua — klik kartu untuk membuka situs resminya.`}
        />

        <ScrollReveal className="mt-14">
          <div className="group relative w-full max-w-6xl">
            <div className="absolute -top-11 right-0 z-10 flex items-center gap-2">
              <button
                type="button"
                aria-label="Geser ke kiri"
                disabled={!canScrollLeft}
                onClick={() => scrollBy(-1)}
                className={arrowClasses}
              >
                <CaretLeft size={16} weight="bold" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Geser ke kanan"
                disabled={!canScrollRight}
                onClick={() => scrollBy(1)}
                className={arrowClasses}
              >
                <CaretRight size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="list"
              aria-label="Daftar game, geser untuk melihat lebih banyak"
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {games.map((game) => (
                <a
                  key={game.name}
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} — buka situs resmi`}
                  role="listitem"
                  className="group flex h-80 w-72 flex-none snap-start flex-col overflow-hidden rounded-2xl border border-accent bg-background transition duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(154,52,18,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background sm:w-80"
                >
                  <div className="relative flex h-[62%] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-accent/70 to-primary/20">
                    <Gamepad2
                      className="size-12 text-primary/60 transition duration-500 group-hover:rotate-6 group-hover:scale-110"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <img
                      src={game.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition duration-300 group-hover:opacity-100"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,52,18,0.25),transparent_60%)]" />
                    </div>
                    <PlatformBadge platform={game.platform} />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-1 text-lg font-bold">{game.name}</h3>
                    <p className="mb-3 text-sm font-medium text-accent-foreground">{game.genre}</p>
                    <span className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-full bg-primary px-4 py-1.5 text-center text-xs font-semibold text-primary-foreground transition group-hover:bg-accent-foreground">
                      Kunjungi
                      <ExternalLink size={12} aria-hidden="true" />
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    aria-hidden="true"
                    className="absolute right-4 top-[62%] -mt-3 text-muted-foreground/70"
                  />
                </a>
              ))}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-background to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-background to-transparent"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}