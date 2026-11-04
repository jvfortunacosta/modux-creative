import type { Metadata } from "next";
import CaseLayout from "@/components/cases/CaseLayout";

export const metadata: Metadata = {
  title: "Casa Martinho | Case MODUX Creative",
  description:
    "O reposicionamento da Casa Martinho: uma rede de panificadoras que virou homenagem ao seu fundador.",
};

export default function CasaMartinhoCasePage() {
  return (
    <CaseLayout
      client="Casa Martinho"
      sector="Panificadora artesanal"
      videoSrc="/videos/casa-martinho-hero-video.mp4"
      videoPoster="/videos/casa-martinho-poster.jpg"
      intro={{
        eyebrow: "Case · Casa Martinho",
        heading:
          "Uma rede de panificadoras vira Casa Martinho para homenagear seu fundador.",
        body: "Há 39 anos a família Moreira construiu uma rede de panificadoras em Goiânia. Para comemorar 4 décadas de história, a marca foi renomeada em homenagem ao patriarca Martinho Moreira. A MODUX assinou o reposicionamento completo: manifesto, identidade visual, embalagens e aplicações.",
      }}
      sections={[
        {
          heading: "Um símbolo tirado da própria assinatura.",
          body: [
            "O símbolo nasce da assinatura do senhor Martinho: a letra M foi evidenciada, e sua haste serifada e sinuosa virou um raminho de trigo.",
            "Os três círculos do selo representam as três gerações à frente do negócio: a força da família como estrutura viva da empresa.",
          ],
          image: {
            src: "/cases/casa-martinho/simbolo-relevo.jpg",
            alt: "Símbolo M da Casa Martinho, com haste em forma de raminho de trigo, gravado em relevo sobre papel kraft",
          },
        },
        {
          heading: "Tradição sem parecer caro.",
          body: [
            "O público da Casa Martinho valoriza qualidade e tradição, mas é sensível a preço. O direcionamento foi claro: reforçar aumento de qualidade e compromisso com preço justo, nunca dar a impressão de que a mudança de marca encareceu o produto.",
            "A paleta combina vermelho profundo e dourado sobre papel kraft: padaria de bairro com acabamento mais autoral, sem virar exclusiva ou inacessível.",
          ],
          image: {
            src: "/cases/casa-martinho/relevo-kraft.jpg",
            alt: "Logotipo Casa Martinho gravado em relevo sobre papel kraft",
          },
        },
        {
          heading: "Da embalagem à fachada, a mesma história.",
          body: [
            "A embalagem de pães conta a história da família Moreira no verso, com ilustração do casal fundador. Xícaras, placas e fachada replicam o selo circular, sempre com o mesmo raminho de trigo como assinatura.",
            "O resultado: uma marca que parece ter sempre existido, mesmo sendo uma homenagem recente.",
          ],
          image: {
            src: "/cases/casa-martinho/fachada-placa.jpg",
            alt: "Placa circular da Casa Martinho pendurada na fachada da loja",
          },
        },
      ]}
      gallery={[
        {
          src: "/cases/casa-martinho/embalagem-sacola.jpg",
          alt: "Embalagem de pão da Casa Martinho, sacola kraft com o logotipo aplicado",
        },
        {
          src: "/cases/casa-martinho/xicaras.jpg",
          alt: "Xícaras da Casa Martinho com o logotipo e o símbolo M aplicados",
        },
      ]}
      credits="Reposicionamento de marca e identidade visual: MODUX Creative."
    />
  );
}
