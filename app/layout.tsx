import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GrainOverlay from "@/components/ui/GrainOverlay";
import "./globals.css";

// Effra é a fonte oficial da marca. Sem licença Adobe Fonts disponível no
// ambiente de build, usamos Inter como fallback (pesos e proporções
// equivalentes), nunca uma serifada. Trocar por Effra local basta apontar
// este arquivo para a fonte oficial mantendo a variável --font-effra.
const effraFallback = Inter({
  subsets: ["latin"],
  variable: "--font-effra",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MODUX Creative | Make value visible.",
  description:
    "O estúdio criativo para empresas que ficaram maiores do que a própria imagem. Estratégia, identidade, sites e comunicação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={effraFallback.variable}>
      <body>
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
