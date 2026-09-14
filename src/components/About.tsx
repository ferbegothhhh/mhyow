import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Tentang Saya
            <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-start">
          <ScrollReveal>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Saya adalah seorang pelajar yang sedang menempuh pendidikan di{" "}
                <strong className="text-foreground">[Nama Sekolah / Jurusan]</strong>. Saya tertarik pada
                dunia teknologi, terutama web development, desain, dan game.
              </p>
              <p className="text-muted-foreground">
                Di luar jam pelajaran, saya suka eksplorasi tools baru, ikut komunitas belajar, dan
                mengerjakan project kecil-kecilan untuk mengasah kemampuan. Tujuan saya adalah terus
                belajar dan suatu hari bisa berkontribusi di industri teknologi.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-xl border border-accent bg-secondary p-6">
              <h3 className="mb-4 font-bold text-accent-foreground">Highlight</h3>
              <ul className="space-y-2.5 text-foreground">
                <li>📍 [Kota / Domisili]</li>
                <li>🎓 [Nama Sekolah] — [Tahun masuk–sekarang]</li>
                <li>💡 Interested: Web Dev, UI/UX, Game</li>
                <li>🌱 Sedang belajar: [Topik yang sedang dipelajari]</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}