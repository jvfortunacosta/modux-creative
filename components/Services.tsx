import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

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
  return (
    <section id="atuacao" className="bg-modux-canvas py-section md:py-section-lg">
      <Container>
        <Reveal>
          <Eyebrow>Áreas de atuação</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl text-h2 text-modux-black text-balance">
            O que a MODUX entrega.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={0.08 * i}>
              <div className="relative overflow-hidden rounded-2xl border border-modux-graphite/15 bg-modux-graphite/5 p-8 md:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 text-7xl font-extrabold text-modux-black/[0.06] md:text-8xl"
                >
                  {service.number}
                </span>
                <span className="text-eyebrow font-bold uppercase tracking-widest text-modux-graphite">
                  {service.number}
                </span>
                <h3 className="mt-4 inline-block bg-[linear-gradient(transparent_88%,theme(colors.modux.lime)_88%)] bg-no-repeat pb-0.5 text-2xl font-extrabold text-modux-black">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-sm text-body text-modux-graphite">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
