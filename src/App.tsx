import PillNav from "@/components/PillNav"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Music from "@/components/Music"
import Games from "@/components/Games"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Musik", href: "#music" },
  { label: "Games", href: "#games" },
  { label: "Kontak", href: "#contact" },
]

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PillNav
        logo="/favicon.svg"
        logoAlt="Yuan/Mhyow"
        items={navItems}
        baseColor="#ffffff"
        pillColor="#ec4899"
        pillTextColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        initialLoadAnimation={true}
      />

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