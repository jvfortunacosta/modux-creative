import Image from "next/image";
import Container from "./ui/Container";
import PillButton from "./ui/PillButton";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-modux-black py-section md:py-section-lg">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/frames/mobile/f_0100.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50 motion-safe:animate-[climax-zoom_18s_ease-in-out_infinite_alternate] md:hidden"
        />
        <Image
          src="/frames/desktop/f_0161.webp"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover opacity-50 motion-safe:animate-[climax-zoom_18s_ease-in-out_infinite_alternate] md:block"
        />
        <div className="absolute inset-0 bg-modux-black/65" />
      </div>

      <Container className="relative">
        <Reveal>
          <h2 className="max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] text-modux-canvas text-balance">
            Sua marca já ficou maior do que a imagem que ela transmite?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-body text-modux-canvas/70">
            Estratégia, identidade e tecnologia trabalhando na mesma direção.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Magnetic>
            <PillButton href="/#contato" variant="primary">
              Vamos conversar
            </PillButton>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
