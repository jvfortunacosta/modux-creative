import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

const CLIENTS = [
  {
    slug: "biomaxx",
    name: "Biomaxx",
    sector: "Indústria química",
    image: "/cases/biomaxx/conceito-aereo.jpg",
  },
  {
    slug: "di-amalfi",
    name: "Di Amalfi",
    sector: "Fragrâncias para casa",
    image: "/cases/di-amalfi/lavanda-campo.jpg",
  },
  {
    slug: "norxx",
    name: "Nørxx",
    sector: "Automotivo · Detailing",
    image: "/cases/norxx/aplicacao-carro.jpg",
  },
  {
    slug: "casa-martinho",
    name: "Casa Martinho",
    sector: "Panificadora artesanal",
    image: "/cases/casa-martinho/fachada-placa.jpg",
  },
];

const PLACEHOLDERS: { bars: number[] }[] = [];

export default function Cases() {
  return (
    <section id="cases" className="bg-modux-canvas py-section md:py-section-lg">
      <Container>
        <Reveal>
          <Eyebrow>Cases</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl text-h2 text-modux-black text-balance">
            Resultado documentado, não prometido.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-body text-modux-graphite">
            Os primeiros cases da MODUX estão em produção. Aqui vai entrar
            prova real: antes/depois, números, contexto. Sem enfeite.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {CLIENTS.map((client, i) => (
            <Reveal key={client.slug} delay={0.08 * i}>
              <Link
                href={`/cases/${client.slug}`}
                className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-modux-graphite/15"
              >
                <Image
                  src={client.image}
                  alt={`Case ${client.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-modux group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-modux-black/45 transition-colors duration-300 ease-modux group-hover:bg-modux-black/55" />
                <div className="relative p-8">
                  <span className="text-eyebrow font-bold uppercase tracking-widest text-modux-canvas/70">
                    {client.sector}
                  </span>
                  <p className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-modux-canvas">
                    {client.name}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 ease-modux group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 8h11.5M9 3.5 13.5 8 9 12.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}

          {PLACEHOLDERS.map((item, i) => (
            <Reveal key={i} delay={0.08 * (CLIENTS.length + i)}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-modux-graphite/25 p-8">
                <span className="text-eyebrow font-bold uppercase tracking-widest text-modux-graphite">
                  Em breve
                </span>
                <div
                  aria-hidden="true"
                  className="mt-8 flex h-24 items-end gap-2"
                >
                  {item.bars.map((h, bi) => (
                    <span
                      key={bi}
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t ${
                        bi === item.bars.length - 1
                          ? "bg-modux-lime"
                          : "bg-modux-graphite/15"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-8 text-sm font-medium text-modux-graphite">
                  Case 0{CLIENTS.length + i + 1} · cliente e setor a confirmar
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
