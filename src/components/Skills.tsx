import ScrollReveal from "./ScrollReveal";

const skills = [
  { icon: "🌐", name: "HTML & CSS" },
  { icon: "⚡", name: "JavaScript" },
  { icon: "🎨", name: "Desain (Canva/Figma)" },
  { icon: "📊", name: "Microsoft Office" },
  { icon: "🗣️", name: "Bahasa Inggris" },
  { icon: "🎮", name: "Game Dev (Dasar)" },
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
                <span className="text-2xl">{skill.icon}</span>
                <p className="font-medium">{skill.name}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}