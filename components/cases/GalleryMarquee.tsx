import Image from "next/image";
import type { CaseImage } from "./CaseLayout";

/**
 * Carrossel que rola sozinho, devagar, em loop infinito (pausa no hover).
 * A faixa é dividida em duas metades idênticas para o loop ficar contínuo
 * (translateX de 0 a -50%). Cada metade repete as imagens o quanto for
 * preciso para preencher telas largas; sem isso, com poucas imagens, as
 * duas metades cabem inteiras na tela e a costura do loop fica visível.
 * Todas as imagens carregam eager: como todas aparecem cedo ou tarde no
 * mesmo carrossel, adiar o carregamento (lazy) só troca o "salto" por um
 * flash em branco quando a imagem ainda não chegou.
 */
export default function GalleryMarquee({
  images,
  aspectClassName = "aspect-[3/4]",
  cardWidthClassName = "w-[220px] md:w-[320px]",
}: {
  images: CaseImage[];
  /** Proporção do card; portrait (3/4) serve pra foto de produto, use algo
   * como aspect-[16/10] para prints de tela (paisagem). */
  aspectClassName?: string;
  cardWidthClassName?: string;
}) {
  const minPerHalf = 6;
  const repeats = Math.max(1, Math.ceil(minPerHalf / images.length));
  const half = Array.from({ length: repeats }, () => images).flat();
  const track = [...half, ...half];
  // Segundos por imagem fixos: a faixa cresce com o número de repetições,
  // então a duração cresce junto para o ritmo ficar igual em todo case.
  const durationSeconds = half.length * 8;

  const edgeMask =
    "linear-gradient(to right, transparent, black 6%, black 94%, transparent)";

  return (
    <div
      className="group -mx-6 w-[calc(100%+3rem)] overflow-hidden md:-mx-20 md:w-[calc(100%+10rem)]"
      style={{
        contain: "paint",
        maskImage: edgeMask,
        WebkitMaskImage: edgeMask,
        overscrollBehaviorX: "contain",
        overflowAnchor: "none",
      }}
    >
      <div
        className="flex w-max gap-5 px-6 animate-marquee group-hover:[animation-play-state:paused] md:gap-6 md:px-20"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            className={`relative ${aspectClassName} ${cardWidthClassName} shrink-0 overflow-hidden rounded-2xl`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="420px"
              loading="eager"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
