import Container from "./ui/Container";
import Logo from "./ui/Logo";

const NAV_LINKS = [
  { href: "/#pilares", label: "Estúdio" },
  { href: "/#atuacao", label: "Atuação" },
  { href: "/#cases", label: "Cases" },
  { href: "/#sites", label: "Sites" },
  { href: "/#contato", label: "Contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-modux-black py-16 md:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[6vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-tight text-modux-canvas/[0.04]"
      >
        MODUX
      </span>
      <Container className="relative">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-6">
            <Logo variant="full" theme="canvas" className="w-[190px]" />
            <p className="max-w-xs font-mono text-xs uppercase tracking-[0.25em] text-modux-canvas/60">
              Make value visible.
            </p>
          </div>

          <nav
            className="flex flex-col gap-3 md:items-end"
            aria-label="Navegação do rodapé"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-modux-canvas/80 transition-colors hover:text-modux-canvas"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-modux-canvas/10 pt-8 text-xs text-modux-canvas/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} MODUX Creative. Todos os direitos reservados.</p>
          <p>Estratégia · Identidade · Sites · Comunicação</p>
        </div>
      </Container>
    </footer>
  );
}
