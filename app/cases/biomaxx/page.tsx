import type { Metadata } from "next";
import CaseLayout from "@/components/cases/CaseLayout";

export const metadata: Metadata = {
  title: "Biomaxx | Case MODUX Creative",
  description:
    "Rebranding industrial da Biomaxx: estratégia, identidade visual e o X como símbolo de transformação.",
};

export default function BiomaxxCasePage() {
  return (
    <CaseLayout
      client="Biomaxx"
      sector="Indústria química"
      videoSrc="/videos/biomaxx-hero-video.mp4"
      videoPoster="/videos/biomaxx-poster.jpg"
      intro={{
        eyebrow: "Case · Biomaxx",
        heading: "Uma identidade industrial construída para precisão e performance.",
        body: "A Biomaxx é uma indústria brasileira especializada em produtos de limpeza industrial, profissional e doméstica. A MODUX assinou o rebranding completo: da estratégia de posicionamento ao sistema visual aplicado em embalagens, uniformes, frota e arquitetura.",
      }}
      sections={[
        {
          heading: "Afastar do genérico, aproximar do técnico.",
          body: [
            "O setor de limpeza é dominado por códigos visuais genéricos. O rebranding buscou o oposto: um território mais técnico, contemporâneo e proprietário, à altura da engenharia por trás do produto.",
            "A nova linguagem combina princípios construtivistas (formas estruturadas, módulos, diagonais e composições geométricas) com uma tipografia display moderna.",
          ],
          image: {
            src: "/cases/biomaxx/fabrica-detalhe.jpg",
            alt: "Colaborador da Biomaxx carregando um galão do produto dentro da fábrica",
          },
        },
        {
          heading: "O X como símbolo de transformação.",
          body: [
            "O X laranja é o principal elemento proprietário da marca. Sua construção assimétrica rompe a regularidade do nome e representa o encontro entre tecnologia e produtividade, fórmula e resultado.",
            "Mais do que uma letra, o X estrutura todo o sistema visual: impresso, bordado, gravado, prensado ou incorporado à arquitetura, sem perder reconhecimento.",
          ],
          image: {
            src: "/cases/biomaxx/linha-produtos.jpg",
            alt: "Linha de produtos Biomaxx em embalagens branca, azul e transparente",
          },
        },
        {
          heading: "Confiança técnica, energia de alta performance.",
          body: [
            "O azul profundo comunica confiança, controle técnico e solidez industrial. O laranja adiciona energia e movimento.",
            "A identidade foi projetada para funcionar em toda a operação: galões, embalagens, uniformes, veículos, sinalização e ambientes industriais, com a mesma ideia em cada ponto de contato.",
          ],
          image: {
            src: "/cases/biomaxx/operacao-painel.jpg",
            alt: "Colaboradora da Biomaxx operando painel de controle industrial",
          },
        },
      ]}
      gallery={[
        {
          src: "/cases/biomaxx/producao-empilhadeira.jpg",
          alt: "Colaborador da Biomaxx operando empilhadeira entre paletes de produto",
        },
        {
          src: "/cases/biomaxx/frota-entrega.jpg",
          alt: "Equipe da Biomaxx carregando caminhão de entrega com a marca aplicada",
        },
        {
          src: "/cases/biomaxx/conceito-aereo.jpg",
          alt: "Vista aérea de galões Biomaxx organizados formando o símbolo da marca",
        },
        {
          src: "/cases/biomaxx/operacao-controle.jpg",
          alt: "Colaboradora da Biomaxx ajustando equipamento em tanque industrial",
        },
      ]}
      credits="Rebranding e direção criativa: MODUX Creative."
    />
  );
}
