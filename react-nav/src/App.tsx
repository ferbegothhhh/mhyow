import VariableFontHoverNav from "@/components/ui/m-variable-font-hover-1"

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur">
        <VariableFontHoverNav />
      </header>
      
      <section id="home" className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Yuan/Mhyow</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Pelajar yang suka eksplorasi teknologi, desain, dan sedang belajar membangun hal-hal keren di internet.
        </p>
      </section>

      <section id="about" className="py-20 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Tentang Saya</h2>
          <p className="text-lg">
            Saya adalah seorang pelajar yang tertarik pada dunia teknologi, terutama web development, desain, dan game.
          </p>
        </div>
      </section>

      <footer className="py-10 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Yuan/Mhyow. Dibuat dengan React & Tailwind.</p>
      </footer>
    </main>
  )
}

export default App