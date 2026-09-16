import Navbar from "@/components/Navbar"
import ScrollProgress from "@/components/ScrollProgress"
import BackToTop from "@/components/BackToTop"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Music from "@/components/Music"
import Games from "@/components/Games"
import CtaBanner from "@/components/CtaBanner"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ScrollProgress />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Music />
      <Games />
      <CtaBanner />
      <Contact />

      <Footer />
      <BackToTop />
    </main>
  )
}

export default App