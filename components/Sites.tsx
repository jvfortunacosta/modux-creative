import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

const PROJECTS = [
  {
    slug: "goias-fa",
    name: "Goiás F.A.",
    sector: "Futebol Americano",
    image: "/sites/goias-fa/home.jpg",
  },
  {
    slug: "aurora",
    name: "Aurora's Cleaning",
    sector: "Limpeza residencial",
    image: "/sites/aurora/hero.jpg",
  },
  {
    slug: "gusia",
    name: "GUS IA",
    sector: "Branding & Direção Criativa",
    image: "/sites/gusia/hero.jpg",
  },
  {
    slug: "piriextra",
    name: "piriExtra",
    sector: "Marketplace de diárias",
    image: "/sites/piriextra/hero.jpg",
  },
  {
    slug: "placar",
    name: "Placar",
    sector: "SaaS · Gestão comercial",
    image: "/sites/placar/hero.jpg",
  },
];

export default function Sites() {
  return (
    <section id="sites" className="bg-modux-canvas py-section md:py-section-lg">
      <Container>
        <Reveal>
          <Eyebrow>Sites</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl text-h2 text-modux-black text-balance">
            Sistemas que rodam sozinhos, não só páginas bonitas.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-body text-modux-graphite">
            MODUX Sites entrega presença digital que já nasce funcional: loja,
            formulário, painel de gestão. O cliente publica sozinho, sem
            depender de desenvolvedor.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={0.08 * i}>
              <Link
                href={`/sites/${project.slug}`}
                className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-modux-graphite/15"
              >
                <Image
                  src={project.image}
                  alt={`Site ${project.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-modux group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-modux-black/45 transition-colors duration-300 ease-modux group-hover:bg-modux-black/55" />
                <div className="relative p-8">
                  <span className="text-eyebrow font-bold uppercase tracking-widest text-modux-canvas/70">
                    {project.sector}
                  </span>
                  <p className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-modux-canvas">
                    {project.name}
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
        </div>
      </Container>
    </section>
  );
}
