"use client";

import { FormEvent, useState } from "react";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import PillButton from "./ui/PillButton";

type Status = "idle" | "loading" | "success" | "error";
type Field = "name" | "email" | "company" | "message";

const fieldClass =
  "peer w-full border-0 border-b-2 border-modux-graphite/30 bg-transparent py-3 text-modux-black placeholder-transparent outline-none transition-[border-color,box-shadow] duration-300 focus:border-modux-lime focus:shadow-[0_6px_16px_-10px_rgba(199,255,0,0.6)] aria-[invalid=true]:border-red-500/70";

const labelClass =
  "pointer-events-none absolute left-0 top-3 text-body text-modux-graphite transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-modux-graphite peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs";

function validate(values: { name: string; email: string; company: string; message: string }) {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Esse campo é obrigatório.";
  if (!values.email.trim()) errors.email = "Esse campo é obrigatório.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "E-mail inválido.";
  if (!values.message.trim()) errors.message = "Esse campo é obrigatório.";
  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});

  const errors = validate(values);

  function markTouched(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const allErrors = validate(values);
    if (Object.keys(allErrors).length > 0) {
      setTouched({ name: true, email: true, company: true, message: true });
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="contato" className="bg-modux-canvas py-section md:py-section-lg">
        <Container>
          <Reveal>
            <Eyebrow>Contato</Eyebrow>
            <p className="mt-6 max-w-lg text-h2 text-modux-black">
              Mensagem recebida. A gente responde em até 1 dia útil.
            </p>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id="contato" className="bg-modux-canvas py-section md:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Contato</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 max-w-md text-h2 text-modux-black text-balance">
                Fale com a MODUX.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-sm text-body text-modux-graphite">
                Conta o que sua empresa já entrega hoje. A gente te diz onde a
                imagem está ficando para trás e o que fazer sobre isso.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  required
                  placeholder=" "
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  onBlur={() => markTouched("name")}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  className={fieldClass}
                />
                <label htmlFor="name" className={labelClass}>
                  Nome
                </label>
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder=" "
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  onBlur={() => markTouched("email")}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  className={fieldClass}
                />
                <label htmlFor="email" className={labelClass}>
                  E-mail
                </label>
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  id="company"
                  type="text"
                  placeholder=" "
                  value={values.company}
                  onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
                  className={fieldClass}
                />
                <label htmlFor="company" className={labelClass}>
                  Empresa
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  required
                  rows={3}
                  placeholder=" "
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  onBlur={() => markTouched("message")}
                  aria-invalid={Boolean(touched.message && errors.message)}
                  aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  className={`${fieldClass} resize-none`}
                />
                <label htmlFor="message" className={labelClass}>
                  Mensagem
                </label>
                {touched.message && errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <PillButton
                  type="submit"
                  disabled={status === "loading"}
                  variant="primary"
                  showArrow={status !== "loading"}
                >
                  {status === "loading" ? "Enviando…" : "Enviar mensagem"}
                </PillButton>
                {status === "error" && (
                  <span className="text-sm text-modux-graphite">
                    Algo deu errado. Tenta de novo em instantes.
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
