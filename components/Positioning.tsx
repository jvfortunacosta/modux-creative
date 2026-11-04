import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import AngleGraphic from "./ui/AngleGraphic";

export default function Positioning() {
  return (
    <section className="relative overflow-hidden bg-modux-black py-section md:py-section-lg">
      <AngleGraphic theme="dark" />

      <Container className="relative">
        <Reveal>
          <Eyebrow theme="dark">Posicionamento</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-4xl text-h1 text-modux-canvas text-balance">
            A MODUX não vende{" "}
            <span className="underline decoration-modux-lime decoration-[6px] underline-offset-[6px]">
              aparência nova
            </span>
            . Corrige a distância entre o valor que a empresa já entrega e o
            valor que o mercado consegue perceber.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl text-body text-modux-canvas/70">
            Sua empresa já ficou maior do que a imagem que transmite. A gente
            sabe como corrigir essa distância.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
