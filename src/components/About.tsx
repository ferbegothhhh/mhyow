import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-br from-background via-accent/40 to-accent/70 px-6 py-[4.5rem]">
      <div className="w-full">
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
                Selamat datang di ruang kreatif saya. Saya menggabungkan kecintaan pada seni visual
                (digital art &amp; melukis) dengan keterampilan kriya (merajut &amp; handmade gifts) untuk
                menghasilkan karya yang tidak hanya estetis, tetapi juga memiliki nilai emosional.
                Berbekal kreativitas yang terus menyala dari musik dan hobi memasak, saya berkomitmen
                untuk menghadirkan produk dan karya seni yang autentik, dibuat dengan hati, dan dirancang
                khusus untuk Anda.
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