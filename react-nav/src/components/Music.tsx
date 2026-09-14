import ScrollReveal from "./ScrollReveal";

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
        <ScrollReveal>
          <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
            Musik Favorit
            <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
          </h2>
          <p className="mx-auto mb-8 max-w-[560px] text-center text-muted-foreground">
            Beberapa lagu yang sering saya dengar saat belajar atau nugas.
          </p>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {songs.map((song, i) => (
            <ScrollReveal key={i} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-accent bg-background transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]">
                <div className="flex aspect-square items-center justify-center bg-accent text-4xl">
                  🎵
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-0.5 text-base font-bold">{song.title}</h3>
                  <p className="mb-3 text-xs text-muted-foreground">{song.artist}</p>
                  <a
                    href="#"
                    className="mt-auto rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-accent-foreground"
                  >
                    ▶ Dengar
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}