export default function Footer() {
  return (
    <footer className="border-t border-accent bg-secondary px-4 py-6 text-center text-sm text-muted-foreground">
      <p>
        © {new Date().getFullYear()} [Nama Kamu]. Dibuat dengan 💗 menggunakan React, CSS & Tailwind.
      </p>
    </footer>
  );
}