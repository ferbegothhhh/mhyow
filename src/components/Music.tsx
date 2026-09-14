import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { Music as MusicIcon, Play } from "lucide-react";

const songs = [
  { title: "[Judul Lagu]", artist: "[Nama Artis]" },
  { title: "[Judul Lagu]", artist: "[Nama Artis]" },
  { title: "[Judul Lagu]", artist: "[Nama Artis]" },
  { title: "[Judul Lagu]", artist: "[Nama Artis]" },
];

export default function Music() {
  return (
    <section id="music" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Favorit"
          title="Musik Favorit"
          subtitle="Beberapa lagu yang sering saya dengar saat belajar atau nugas."
        />

        <ScrollReveal
          stagger={0.08}
          className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {songs.map((song, i) => (
            <article
              key={i}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-accent bg-background transition duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]"
            >
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-accent/70 to-primary/20">
                <MusicIcon
                  className="size-10 text-primary/60 transition duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-4 flex h-6 items-end justify-center gap-1 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <span className="eq-bar w-1 rounded-full bg-primary" />
                  <span className="eq-bar w-1 rounded-full bg-primary" />
                  <span className="eq-bar w-1 rounded-full bg-primary" />
                  <span className="eq-bar w-1 rounded-full bg-accent-foreground" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-0.5 text-base font-bold">{song.title}</h3>
                <p className="mb-3 text-xs text-muted-foreground">{song.artist}</p>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-accent-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Play className="size-3" fill="currentColor" aria-hidden="true" />
                  Dengar
                </a>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}