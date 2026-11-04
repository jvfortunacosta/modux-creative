import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MODUX brand palette: never introduce hex outside these tokens.
        modux: {
          black: "#161716", // MODUX BLACK, base escura, ~30% de uso
          canvas: "#F3F0E8", // WARM CANVAS, base clara, ~60% de uso (dominante)
          lime: "#C7FF00", // SIGNAL LIME, acento, máx. ~10%, nunca fundo extenso
          graphite: "#343633", // GRAPHITE, textos secundários, bordas, ícones
        },
      },
      fontFamily: {
        sans: ["var(--font-effra)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: [
          "clamp(2.75rem, 2rem + 4vw, 5.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "800" },
        ],
        h2: [
          "clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "700" },
        ],
        body: ["1.0625rem", { lineHeight: "1.3" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        container: "1280px",
      },
      minWidth: {
        // Larguras mínimas de segurança da assinatura (manual de marca)
        logo: "180px",
        symbol: "32px",
      },
      spacing: {
        section: "7rem",
        "section-lg": "10rem",
      },
      transitionTimingFunction: {
        modux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
