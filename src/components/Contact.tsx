import { useEffect, useRef, useState, type ComponentType, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { Mail } from "lucide-react";
import { Check, GithubLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react";

type ContactIcon = ComponentType<{ className?: string }>;

const contacts: { icon: ContactIcon; label: string; href: string }[] = [
  { icon: Mail, label: "emailkamu@example.com", href: "mailto:emailkamu@example.com" },
  { icon: GithubLogo, label: "GitHub", href: "https://github.com/username" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
  { icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/username" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

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
    setName("");
    setEmail("");
    setMessage("");
    setSent(true);
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setSent(false), 5000);
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-secondary p-3 text-sm font-sans transition outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 ${
      hasError ? "border-red-600" : "border-accent"
    }`;

  return (
    <section id="contact" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading badge="Ngobrol" title="Hubungi Saya" />

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <ScrollReveal>
            <div>
              <p className="mb-6 text-muted-foreground">
                Ada pertanyaan atau mau ngobrol? Silakan hubungi saya lewat email atau media sosial
                berikut.
              </p>
              <ul className="space-y-2">
                {contacts.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 py-1">
                    <c.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-primary transition hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
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

              {sent ? (
                <p
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-medium text-accent-foreground"
                >
                  <Check size={18} weight="bold" className="text-primary" aria-hidden="true" />
                  Terkirim! Terima kasih. (Integrasi pengiriman pesan belum diaktifkan.)
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Catatan: form ini bersifat statis. Untuk kirim pesan sungguhan, hubungkan ke
                  layanan seperti Formspree.
                </p>
              )}

              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-accent-foreground active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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