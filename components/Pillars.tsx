import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

const PILLARS = [
  {
    word: "Palpável",
    description:
      "Estratégia que vira presença, sistema e resultado. Não fica só no slide.",
  },
  {
    word: "Acessível",
    description:
      "Clareza para conversar com empresas de todos os tamanhos, sem empobrecer o pensamento.",
  },
  {
    word: "Competente",
    description:
      "Confiança sustentada por repertório, processo e execução. Não por promessa.",
  },
  {
    word: "Moderna",
    description:
      "Tecnologia com critério. A gente usa o que funciona, não o que está na moda.",
  },
];

export default function Pillars() {
  return (
    <section id="pilares" className="bg-modux-canvas py-section md:py-section-lg">
      <Container>
        <Reveal>
          <Eyebrow>Sobre a MODUX</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl text-h2 text-modux-black text-balance">
            Uma marca para quem já entrega.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.word} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-modux-graphite/15 bg-modux-graphite/5 p-8 md:p-10">
                <span className="text-eyebrow font-bold uppercase tracking-widest text-modux-graphite">
                  Pilar 0{i + 1}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-modux-black">
                  {pillar.word}
                </h3>
                <p className="mt-3 text-body text-modux-graphite">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
