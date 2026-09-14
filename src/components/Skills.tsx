import ScrollReveal from "./ScrollReveal";
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

export default function Skills() {
  return (
    <section id="skills" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Skills
            <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {skills.map((skill, index) => (
            <ScrollReveal key={index} className="h-full">
              <div className="flex h-full items-center gap-3 rounded-xl border border-accent bg-background p-4 transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]">
                <skill.icon className="size-5 shrink-0 text-primary" strokeWidth={2} />
                <p className="font-medium">{skill.name}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
