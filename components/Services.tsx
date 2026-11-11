"use client";

import { useState } from "react";
import Container from "./ui/Container";

const SERVICES = [
  {
    number: "01",
    title: "Estratégia",
    description:
      "A gente entende o que sua empresa entrega de verdade antes de desenhar qualquer coisa. Sem isso, marca é só maquiagem.",
  },
  {
    number: "02",
    title: "Identidade",
    description:
      "Sistema visual com repertório, não um logo bonito solto no ar. Resolve da apresentação ao anúncio, sempre com a mesma lógica.",
  },
  {
    number: "03",
    title: "Sites",
    description:
      "MODUX Sites entrega presença digital que prova capacidade, não uma vitrine genérica. Produto pronto para converter.",
  },
  {
    number: "04",
    title: "Comunicação",
    description:
      "Mensagem que faz o mercado prestar atenção antes de você pedir. Leitura certa, tom certo, lugar certo.",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="atuacao" className="relative bg-modux-black py-section md:py-section-lg">
      <Container>
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-modux-canvas/50">
          Áreas de atuação
        </span>
      </Container>

      <ul className="mt-10 border-t border-modux-canvas/15">
        {SERVICES.map((service, i) => {
          const isActive = active === i;
          return (
            <li key={service.number} className="border-b border-modux-canvas/15">
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`service-panel-${service.number}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((a) => (a === i ? null : a))}
                className="group relative block w-full overflow-hidden px-6 py-8 text-left md:px-20"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 origin-left bg-modux-lime transition-transform duration-500 ease-modux ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <span className="relative flex items-baseline gap-6">
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      isActive ? "text-modux-black/60" : "text-modux-canvas/40"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span
                    className={`text-h2 font-bold transition-colors duration-300 ${
                      isActive ? "text-modux-black" : "text-modux-canvas"
                    }`}
                  >
                    {service.title}
                  </span>
                </span>
              </button>
              <div
                id={`service-panel-${service.number}`}
                className="grid transition-[grid-template-rows] duration-[400ms] ease-modux"
                style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-xl px-6 pb-8 text-body text-modux-canvas/70 md:px-20">
                    {service.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
