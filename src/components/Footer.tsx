import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-accent bg-secondary px-4 py-6 text-center text-sm text-muted-foreground">
      <p className="inline-flex items-center gap-1">
        © {new Date().getFullYear()} [Nama Kamu]. Dibuat dengan{" "}
        <Heart className="size-3.5 fill-primary text-primary" /> menggunakan React, CSS & Tailwind.
      </p>
    </footer>
  );
}
