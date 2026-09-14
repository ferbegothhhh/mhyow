import { useEffect, useState } from "react"
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

const sectionIds = navItems.map((i) => i.href.slice(1))

function App() {
  const [activeHref, setActiveHref] = useState("#home")

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          const best = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0]
          setActiveHref("#" + best.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PillNav
        logo="/favicon.svg"
        logoAlt="Yuan/Mhyow"
        items={navItems}
        activeHref={activeHref}
        baseColor="#ec4899"
        pillColor="#ffffff"
        pillTextColor="#ec4899"
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