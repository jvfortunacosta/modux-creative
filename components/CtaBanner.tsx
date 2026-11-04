import Container from "./ui/Container";
import PillButton from "./ui/PillButton";
import Reveal from "./ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="border-b border-modux-canvas/10 bg-modux-black py-10 md:py-12">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-h2 text-modux-canvas text-balance">
              Sua marca já ficou maior do que a imagem que ela transmite?
            </h3>
            <p className="mt-2 text-body text-modux-canvas/60">
              Estratégia, identidade e tecnologia trabalhando na mesma direção.
            </p>
          </div>
          <PillButton href="/#contato" variant="outline-dark" className="shrink-0">
            Vamos conversar
          </PillButton>
        </Reveal>
      </Container>
    </section>
  );
}
