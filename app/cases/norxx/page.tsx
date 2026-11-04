import type { Metadata } from "next";
import CaseLayout from "@/components/cases/CaseLayout";

export const metadata: Metadata = {
  title: "Nørxx | Case MODUX Creative",
  description:
    "Posicionamento e identidade visual da Nørxx: performance automotiva de nível profissional, sem promessa vazia.",
};

export default function NorxxCasePage() {
  return (
    <CaseLayout
      client="Nørxx"
      sector="Automotivo · Detailing"
      videoSrc="/videos/norxx-hero-video.mp4"
      videoPoster="/videos/norxx-poster.jpg"
      intro={{
        eyebrow: "Case · Nørxx",
        heading:
          "Não foi criado para perfumar resultado. Foi criado para entregar padrão.",
        body: "A Nørxx é uma linha de produtos para detalhamento automotivo profissional. A MODUX assinou o posicionamento de marca e o sistema de identidade: da fórmula ao rótulo, da embalagem à aplicação.",
      }}
      sections={[
        {
          heading: "Cada fórmula, pensada como ferramenta.",
          body: [
            "Inspirada na lógica nórdica de eficiência, onde cada processo precisa funcionar sob pressão, a Nørxx transforma limpeza automotiva em performance.",
            "Aqui não existe \"bom o suficiente\". Existe o que resolve, o que eleva, o que mantém o nível. Não é só sobre deixar limpo: é sobre entregar no padrão que só quem é profissional reconhece.",
          ],
          image: {
            src: "/cases/norxx/produto-lab-concreto.jpg",
            alt: "Frasco Nørxx LAB sobre blocos de concreto, em estúdio preto e branco",
          },
        },
        {
          heading: "Um sistema visual construído em lote.",
          body: [
            "A identidade se estende da fórmula à caixa: linhas diagonais, contraste entre preto e cinza, e o verde-limão como acento de precisão técnica, nunca decoração.",
            "Cada variante da linha mantém a mesma lógica de composição, para o produto ser reconhecível em qualquer prateleira ou lote.",
          ],
          image: {
            src: "/cases/norxx/embalagens-lote.jpg",
            alt: "Caixas da linha Nørxx empilhadas, com variações LAB e PRO",
          },
        },
        {
          heading: "Performance que aparece no resultado, não no rótulo.",
          body: [
            "A fórmula PRO foi criada para quem trabalha com detalhamento automotivo em nível profissional, do interior de couro ao acabamento externo.",
            "A aplicação é o verdadeiro teste da marca. Por isso a comunicação visual sempre volta para o produto em uso, não para a promessa.",
          ],
          image: {
            src: "/cases/norxx/aplicacao-carro.jpg",
            alt: "Aplicação do Nørxx LAB com esponja aplicadora sobre pintura automotiva preta",
          },
        },
      ]}
      gallery={[
        {
          src: "/cases/norxx/linha-spray-interior.jpg",
          alt: "Frascos spray da linha Nørxx sobre console automotivo",
        },
        {
          src: "/cases/norxx/produto-banco-couro.jpg",
          alt: "Frasco Nørxx LAB sobre banco de couro com gotas d'água",
        },
      ]}
      credits="Posicionamento e identidade: MODUX Creative."
    />
  );
}
