import { useEffect, useRef, useState, type ComponentType, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { Mail } from "lucide-react";
import { Check, GithubLogo, LinkedinLogo, InstagramLogo, CaretRight } from "@phosphor-icons/react";

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
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
      const firstInvalid = nextError.name ? nameRef : nextError.email ? emailRef : messageRef;
      requestAnimationFrame(() => firstInvalid.current?.focus());
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
              <ul className="grid gap-3 sm:grid-cols-2">
                {contacts.map((c, i) => (
                  <li key={i}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-accent bg-white/70 p-3 transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_8px_24px_rgba(154,52,18,0.12)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                        <c.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                        {c.label}
                      </span>
                      <CaretRight
                        size={14}
                        weight="bold"
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground/60 transition duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
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
              {Object.keys(error).length > 0 && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-600/40 bg-red-600/10 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-red-700">
                    Mohon perbaiki isian berikut:
                  </p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-red-700">
                    {error.name ? <li>{error.name}</li> : null}
                    {error.email ? <li>{error.email}</li> : null}
                    {error.message ? <li>{error.message}</li> : null}
                  </ul>
                </div>
              )}

              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Nama
                </label>
                <input
                  ref={nameRef}
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  aria-invalid={Boolean(error.name)}
                  aria-describedby={error.name ? "name-error" : undefined}
                  className={inputClass(Boolean(error.name))}
                />
                {error.name && (
                  <p id="name-error" className="text-xs text-red-600">
                    {error.name}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  aria-invalid={Boolean(error.email)}
                  aria-describedby={error.email ? "email-error" : undefined}
                  className={inputClass(Boolean(error.email))}
                />
                {error.email && (
                  <p id="email-error" className="text-xs text-red-600">
                    {error.email}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Pesan
                </label>
                <textarea
                  ref={messageRef}
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesanmu..."
                  aria-invalid={Boolean(error.message)}
                  aria-describedby={error.message ? "message-error" : undefined}
                  className={`${inputClass(Boolean(error.message))} resize-none`}
                />
                {error.message && (
                  <p id="message-error" className="text-xs text-red-600">
                    {error.message}
                  </p>
                )}
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
                className="cursor-pointer rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-accent-foreground active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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