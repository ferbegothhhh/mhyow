import { Heart, GithubLogo, LinkedinLogo, InstagramLogo, ArrowUp } from "@phosphor-icons/react";

const socials = [
  { icon: GithubLogo, label: "GitHub", href: "https://github.com/username" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
  { icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/username" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-accent bg-secondary px-4 py-6 text-center text-sm text-muted-foreground">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div className="relative z-10">
        <p className="inline-flex items-center gap-1.5 font-display text-xl font-semibold text-primary">
          Terima kasih sudah mampir
          <Heart className="size-3.5 fill-primary" aria-hidden="true" />
        </p>

        <p className="mt-1 inline-flex items-center gap-1">
          © {new Date().getFullYear()} Yuan/Mhyow. Dibuat dengan{" "}
          <Heart className="size-3.5 fill-primary text-primary" aria-hidden="true" /> menggunakan
          React, CSS & Tailwind.
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-accent bg-white/70 text-primary transition duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <s.icon size={16} aria-hidden="true" />
            </a>
          ))}
          <button
            type="button"
            aria-label="Kembali ke atas"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              })
            }
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-accent bg-white/70 text-primary transition duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowUp size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}