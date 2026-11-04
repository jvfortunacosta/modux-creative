"use client";

import { FormEvent, useState } from "react";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import PillButton from "./ui/PillButton";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "peer w-full border-0 border-b border-modux-graphite/30 bg-transparent py-3 text-modux-black placeholder-transparent outline-none transition-colors duration-300 focus:border-modux-lime";

const labelClass =
  "pointer-events-none absolute left-0 top-3 text-body text-modux-graphite transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-modux-graphite peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
                  className={fieldClass}
                />
                <label htmlFor="name" className={labelClass}>
                  Nome
                </label>
              </div>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder=" "
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  className={fieldClass}
                />
                <label htmlFor="email" className={labelClass}>
                  E-mail
                </label>
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
                  className={`${fieldClass} resize-none`}
                />
                <label htmlFor="message" className={labelClass}>
                  Mensagem
                </label>
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
