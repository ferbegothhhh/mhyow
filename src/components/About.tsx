import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-screen items-center bg-gradient-to-br from-background via-accent/40 to-accent/70 px-6 py-[4.5rem]"
    >
      <div className="w-full">
        <ScrollReveal group>
          <h2 className="reveal-item mb-8 text-center text-3xl font-bold md:text-4xl">
            Tentang Saya
            <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-start">
            <div className="reveal-item [transition-delay:120ms]">
              <p className="text-muted-foreground">
                Selamat datang di ruang kreatif saya. Saya menggabungkan kecintaan pada seni visual
                (digital art &amp; melukis) dengan keterampilan kriya (merajut &amp; handmade gifts) untuk
                menghasilkan karya yang tidak hanya estetis, tetapi juga memiliki nilai emosional.
                Berbekal kreativitas yang terus menyala dari musik dan hobi memasak, saya berkomitmen
                untuk menghadirkan produk dan karya seni yang autentik, dibuat dengan hati, dan dirancang
                khusus untuk Anda.
              </p>
            </div>

            <div className="reveal-item [transition-delay:240ms]">
              <div className="rounded-xl border border-accent bg-secondary p-6">
                <h3 className="mb-4 font-bold text-accent-foreground">Highlight</h3>
                <ul className="space-y-2.5 text-foreground">
                  <li className="reveal-item [transition-delay:300ms]">📍 [Kota / Domisili]</li>
                  <li className="reveal-item [transition-delay:380ms]">🎓 [Nama Sekolah] — [Tahun masuk–sekarang]</li>
                  <li className="reveal-item [transition-delay:460ms]">💡 Interested: Web Dev, UI/UX, Game</li>
                  <li className="reveal-item [transition-delay:540ms]">🌱 Sedang belajar: [Topik yang sedang dipelajari]</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}