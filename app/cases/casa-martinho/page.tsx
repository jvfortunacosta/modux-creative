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
      heroVideoBackground
      intro={{
        eyebrow: "Case · Casa Martinho",
        heading:
          "Uma rede de panificadoras vira Casa Martinho para homenagear seu fundador.",
        body: "Há 39 anos a família Moreira construiu uma rede de panificadoras em Goiânia. Para comemorar 4 décadas de história, a marca foi renomeada em homenagem ao patriarca Martinho Moreira. A MODUX assinou o reposicionamento completo: manifesto, identidade visual, embalagens e aplicações.",
      }}
      brandBlocks={[
        {
          type: "pair",
          images: [
            {
              src: "/cases/casa-martinho/vitrine/logo-completa-1.jpg",
              alt: "Logotipo completo da Casa Martinho gravado em relevo sobre papel kraft",
            },
            {
              src: "/cases/casa-martinho/vitrine/logo-completa-2.jpg",
              alt: "Logotipo completo da Casa Martinho em placa circular dourada na fachada",
            },
          ],
        },
        {
          type: "quad",
          images: [
            {
              src: "/cases/casa-martinho/vitrine/simbolo-kraft.jpg",
              alt: "Símbolo M da Casa Martinho em relevo kraft",
            },
            {
              src: "/cases/casa-martinho/vitrine/simbolo-burgundy.jpg",
              alt: "Símbolo M da Casa Martinho em variação de cor vermelho profundo",
            },
            {
              src: "/cases/casa-martinho/vitrine/simbolo-grafite.jpg",
              alt: "Símbolo M da Casa Martinho em variação de cor grafite",
            },
            {
              src: "/cases/casa-martinho/vitrine/simbolo-dourado.jpg",
              alt: "Símbolo M da Casa Martinho em variação de cor dourada",
            },
          ],
        },
        {
          type: "video",
          src: "/cases/casa-martinho/vitrine/gif-logo-1.mp4",
          poster: "/cases/casa-martinho/vitrine/gif-logo-1-poster.jpg",
        },
        {
          type: "pair",
          images: [
            {
              src: "/cases/casa-martinho/vitrine/making-of-fachada.jpg",
              alt: "Artesão montando a placa circular da Casa Martinho em oficina",
            },
            {
              src: "/cases/casa-martinho/vitrine/making-of-oficina.jpg",
              alt: "Artesão lixando e ajustando o relevo da placa Casa Martinho em bancada de oficina",
            },
          ],
        },
        {
          type: "quad",
          images: [
            {
              src: "/cases/casa-martinho/vitrine/selo-01-creme.jpg",
              alt: "Selo completo da Casa Martinho em variação de cor creme e dourado",
            },
            {
              src: "/cases/casa-martinho/vitrine/selo-02-caramelo.jpg",
              alt: "Selo completo da Casa Martinho em variação de cor caramelo",
            },
            {
              src: "/cases/casa-martinho/vitrine/selo-03-burgundy.jpg",
              alt: "Selo completo da Casa Martinho em variação de cor vermelho profundo",
            },
            {
              src: "/cases/casa-martinho/vitrine/selo-04-creme-alt.jpg",
              alt: "Selo completo da Casa Martinho em segunda variação de cor creme",
            },
          ],
        },
        {
          type: "pair",
          images: [
            {
              src: "/cases/casa-martinho/embalagem-sacola.jpg",
              alt: "Mockup da embalagem de pão da Casa Martinho, sacola kraft com o logotipo aplicado",
            },
            {
              src: "/cases/casa-martinho/xicaras.jpg",
              alt: "Mockup de xícaras da Casa Martinho com o logotipo e o símbolo M aplicados",
            },
          ],
        },
        {
          type: "video",
          src: "/cases/casa-martinho/vitrine/gif-logo-2.mp4",
          poster: "/cases/casa-martinho/vitrine/gif-logo-2-poster.jpg",
        },
        {
          type: "pair",
          images: [
            {
              src: "/cases/casa-martinho/vitrine/embalagem-paes.jpg",
              alt: "Embalagem kraft da Casa Martinho entre pães frescos no balcão da padaria",
            },
            {
              src: "/cases/casa-martinho/vitrine/vitrine-fachada.jpg",
              alt: "Selo da Casa Martinho aplicado na vitrine de vidro da loja, com pães em exposição",
            },
          ],
        },
      ]}
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
        {
          src: "/cases/casa-martinho/vitrine/making-of-acrilico.jpg",
          alt: "Letra M em acrílico vermelho sendo montada à mão em oficina",
        },
        {
          src: "/cases/casa-martinho/vitrine/making-of-artesao.jpg",
          alt: "Artesão posicionando as letras da placa Casa Martinho sobre a bancada",
        },
        {
          src: "/cases/casa-martinho/vitrine/selo-avental.jpg",
          alt: "Avental da equipe da Casa Martinho com o logotipo bordado",
        },
        {
          src: "/cases/casa-martinho/vitrine/xicaras-empilhadas.jpg",
          alt: "Xícaras da Casa Martinho empilhadas em variações de aplicação do selo",
        },
        {
          src: "/cases/casa-martinho/vitrine/placa-fachada-externa.jpg",
          alt: "Placa circular da Casa Martinho pendurada na fachada externa da loja",
        },
        {
          src: "/cases/casa-martinho/vitrine/selo-relevo-editorial.jpg",
          alt: "Composição editorial do selo Casa Martinho em relevo de mármore sobre fundo vermelho",
        },
      ]}
      credits="Reposicionamento de marca e identidade visual: MODUX Creative."
    />
  );
}
