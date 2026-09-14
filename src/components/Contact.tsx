import { useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";

const contacts = [
  { icon: "📧", label: "emailkamu@example.com", href: "mailto:emailkamu@example.com" },
  { icon: "🐙", label: "GitHub", href: "https://github.com/username" },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
  { icon: "📸", label: "Instagram", href: "https://www.instagram.com/username" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextError: Record<string, string> = {};

    if (!name.trim()) nextError.name = "Nama wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextError.email = "Email tidak valid.";
    if (!message.trim()) nextError.message = "Pesan wajib diisi.";

    if (Object.keys(nextError).length > 0) {
      setError(nextError);
      return;
    }

    setError({});
    alert("Terima kasih! (Integrasi pengiriman pesan belum diaktifkan.)");
    setName("");
    setEmail("");
    setMessage("");
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-secondary p-3 text-sm font-sans transition outline-none focus:border-primary ${
      hasError ? "border-red-600" : "border-accent"
    }`;

  return (
    <section id="contact" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Hubungi Saya
            <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-primary" />
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <ScrollReveal>
            <div>
              <p className="mb-6 text-muted-foreground">
                Ada pertanyaan atau mau ngobrol? Silakan hubungi saya lewat email atau media sosial
                berikut.
              </p>
              <ul className="space-y-2">
                {contacts.map((c, i) => (
                  <li key={i} className="py-1">
                    <span className="mr-1">{c.icon}</span>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-4 rounded-2xl border border-accent bg-background p-6"
            >
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  className={inputClass(Boolean(error.name))}
                />
                {error.name && <p className="text-xs text-red-600">{error.name}</p>}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  className={inputClass(Boolean(error.email))}
                />
                {error.email && <p className="text-xs text-red-600">{error.email}</p>}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesanmu..."
                  className={`${inputClass(Boolean(error.message))} resize-none`}
                />
                {error.message && <p className="text-xs text-red-600">{error.message}</p>}
              </div>

              <p className="text-xs text-muted-foreground">
                Catatan: form ini bersifat statis. Untuk kirim pesan sungguhan, hubungkan ke layanan
                seperti Formspree.
              </p>

              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-accent-foreground"
              >
                Kirim
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}