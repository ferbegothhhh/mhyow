import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import CircularGallery from "./CircularGallery";
import SectionHeading from "./SectionHeading";
import { Globe, Zap, Palette, BarChart3, Languages, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const skills: { icon: LucideIcon; name: string }[] = [
  { icon: Globe, name: "HTML & CSS" },
  { icon: Zap, name: "JavaScript" },
  { icon: Palette, name: "Desain (Canva/Figma)" },
  { icon: BarChart3, name: "Microsoft Office" },
  { icon: Languages, name: "Bahasa Inggris" },
  { icon: Gamepad2, name: "Game Dev (Dasar)" },
];

const galleryItems = [
  { image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop&auto=format&q=60", text: "Digital Art" },
  { image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&h=600&fit=crop&auto=format&q=60", text: "Melukis" },
  { image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=600&fit=crop&auto=format&q=60", text: "Merajut" },
  { image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop&auto=format&q=60", text: "Memasak" },
  { image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop&auto=format&q=60", text: "Musik" },
  { image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&auto=format&q=60", text: "Coding" },
];

export default function Skills() {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <section id="skills" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading badge="Keahlian" title="Skills" />

        {reducedMotion ? (
          <ScrollReveal
            stagger={0.08}
            className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex h-full items-center gap-3 rounded-xl border border-accent bg-background p-4 transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(154,52,18,0.12)]"
              >
                <skill.icon className="size-5 shrink-0 text-primary" strokeWidth={2} />
                <p className="font-medium">{skill.name}</p>
              </div>
            ))}
          </ScrollReveal>
        ) : (
          <ScrollReveal className="mt-8">
            <div className="h-[420px] w-full overflow-hidden rounded-3xl md:h-[500px]">
              <CircularGallery
                items={galleryItems}
                bend={2.5}
                borderRadius={0.06}
                textColor="#ffffff"
                font="bold 28px 'Montserrat Variable'"
              />
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}