"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "./ui/Container";
import Logo from "./ui/Logo";
import PillButton from "./ui/PillButton";
import Magnetic from "./ui/Magnetic";

const NAV_LINKS = [
  { href: "/#pilares", label: "Estúdio" },
  { href: "/#atuacao", label: "Atuação" },
  { href: "/#cases", label: "Cases" },
  { href: "/#sites", label: "Sites" },
  { href: "/#contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!reducedMotion && !menuOpen) {
        const delta = y - lastY;
        if (y < 120) {
          setHidden(false);
        } else if (delta > 4) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-modux-canvas/95 backdrop-blur transition-[transform,box-shadow] duration-300 ease-modux ${
        scrolled ? "shadow-[0_1px_0_0] shadow-modux-graphite/15" : ""
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <Container className="flex h-20 items-center justify-between md:h-24">
        <span className="hidden md:block">
          <Logo variant="full" theme="black" priority className="w-[190px]" />
        </span>
        <span className="md:hidden">
          <Logo variant="symbol" theme="black" priority className="w-9" />
        </span>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-modux-graphite transition-colors duration-200 hover:text-modux-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="hidden md:block">
          <Magnetic>
            <PillButton href="/#contato" variant="primary">
              Fale com a MODUX
            </PillButton>
          </Magnetic>
        </span>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-modux-graphite/30 md:hidden"
        >
          <span
            className={`h-px w-5 bg-modux-black transition-transform duration-300 ease-modux ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-modux-black transition-transform duration-300 ease-modux ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-modux-graphite/15 bg-modux-canvas md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] items-center text-base font-medium text-modux-graphite transition-colors hover:text-modux-black"
                >
                  {link.label}
                </a>
              ))}
              <PillButton href="/#contato" variant="primary" className="mt-4 justify-center">
                Fale com a MODUX
              </PillButton>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
