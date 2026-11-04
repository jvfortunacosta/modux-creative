import type { Metadata } from "next";
import CaseLayout from "@/components/cases/CaseLayout";

export const metadata: Metadata = {
  title: "Di Amalfi | Case MODUX Creative",
  description:
    "Posicionamento e identidade visual da Di Amalfi: uma linha de aromatizantes de ambiente inspirada na Costa Amalfitana.",
};

export default function DiAmalfiCasePage() {
  return (
    <CaseLayout
      client="Di Amalfi"
      sector="Fragrâncias para casa"
      videoSrc="/videos/di-amalfi-hero-video.mp4"
      videoPoster="/videos/di-amalfi-poster.jpg"
      intro={{
        eyebrow: "Case · Di Amalfi",
        heading:
          "Uma fragrância de ambiente que carrega a Costa Amalfitana para dentro de casa.",
        body: "A Di Amalfi é uma linha de aromatizantes de ambiente inspirada na Itália. A MODUX assinou o posicionamento de marca e o sistema de identidade visual: do manifesto ao rótulo, da tipografia à embalagem.",
      }}
      sections={[
        {
          heading: "Um mito fundador na Costa Amalfitana.",
          body: [
            "Durante a reforma de um hotel tradicional em Amalfi, um conjunto de azulejos antigos revelou um soneto sobre o sol, o mar cristalino e o aroma dos limões sicilianos da região. Esse achado virou o ponto de partida da marca.",
            "A Di Amalfi se posiciona entre sofisticação e custo-benefício: luxo acessível, sem abrir mão de ingredientes naturais e orgânicos, livres de químicos nocivos.",
          ],
          image: {
            src: "/cases/di-amalfi/lavanda-luz.jpg",
            alt: "Ramo de lavanda iluminado pelo entardecer, com partículas de luz suspensas no ar",
          },
        },
        {
          heading: "Tipografia com curvas de romance italiano.",
          body: [
            "A família The Seasons assina os títulos e o logotipo: serifada, sinuosa, com a letra F remetendo à silhueta de um frasco de perfume. Para textos corridos e embalagens, a Sora garante contraste e legibilidade em toda a variação de peso, do Thin ao ExtraBold.",
            "O resultado é uma identidade que se diferencia dos concorrentes do nicho de perfumaria sem abandonar os códigos que o público já reconhece.",
          ],
          image: {
            src: "/cases/di-amalfi/lavanda-flores.png",
            alt: "Frasco Lavanda de Grasse da Di Amalfi entre flores roxas, sobre fundo violeta",
          },
        },
        {
          heading: "Embalagem com a dualidade da costa italiana.",
          body: [
            "A face frontal de cada caixa carrega uma ilustração densa, com elementos da natureza que parecem transbordar. As demais faces trabalham com uma única cor, equilibrando a miscelânea de formas com sobriedade.",
            "No rótulo, o formato em janela emoldura a frase \"Porta la brezza della costa italiana a casa tua\": abrir o produto é abrir uma janela para a Itália.",
          ],
          image: {
            src: "/cases/di-amalfi/lavanda-embalagem.png",
            alt: "Frasco e caixa da linha Lavanda de Grasse da Di Amalfi entre ramos de lavanda",
          },
        },
      ]}
      gallery={[
        {
          src: "/cases/di-amalfi/lavanda-campo.jpg",
          alt: "Frasco Lavanda de Grasse da Di Amalfi em um campo de lavanda ao entardecer",
        },
        {
          src: "/cases/di-amalfi/good-vibes-citrus.jpg",
          alt: "Frasco Good Vibes da Di Amalfi entre folhas e frutas cítricas na água",
        },
      ]}
      credits="Posicionamento e identidade: MODUX Creative."
    />
  );
}
