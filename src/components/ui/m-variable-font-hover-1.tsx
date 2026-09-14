"use client";
import { VariableFontHover } from "@/components/ui/variable-font-hover";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Musik", href: "#music" },
  { label: "Games", href: "#games" },
  { label: "Kontak", href: "#contact" },
];

export default function VariableFontHoverNav() {
  return (
    <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1 py-2">
      {navLinks.map((link) => (
        <a key={link.label} href={link.href}>
          <VariableFontHover
            className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
            fromFontVariationSettings="'wght' 400"
            label={link.label}
            staggerDuration={0.03}
            staggerFrom="center"
            toFontVariationSettings="'wght' 700"
          />
        </a>
      ))}
    </nav>
  );
}