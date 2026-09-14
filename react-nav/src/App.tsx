import VariableFontHoverNav from "@/components/ui/m-variable-font-hover-1"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Music from "@/components/Music"
import Games from "@/components/Games"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-accent bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
          <a href="#home" className="text-lg font-bold">
            Yuan/Mhyow<span className="text-primary">.</span>
          </a>
          <VariableFontHoverNav />
        </div>
      </header>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Music />
      <Games />
      <Contact />

      <Footer />
    </main>
  )
}

export default App