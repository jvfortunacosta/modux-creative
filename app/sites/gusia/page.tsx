import type { Metadata } from "next";
import SiteLayout from "@/components/sites/SiteLayout";

export const metadata: Metadata = {
  title: "GUS IA | Sites MODUX Creative",
  description:
    "O site autoral do branding specialist Gustavo Henrique: portfólio, posicionamento e captação direto pelo WhatsApp.",
};

export default function GusiaSitePage() {
  return (
    <SiteLayout
      client="Gustavo Henrique"
      sector="Branding & Direção Criativa"
      liveUrl="https://www.gusia.com.br/"
      stack={["Design dark mode", "Storytelling de portfólio", "Captação via WhatsApp"]}
      heroImage={{
        src: "/sites/gusia/hero.jpg",
        alt: "Home da GUS IA com a chamada 'Marcas fracas pedem atenção. As fortes criam história.'",
      }}
      intro={{
        heading: "Um portfólio para quem já decidiu subir de prateleira.",
        body: "A GUS IA é o site autoral do branding specialist Gustavo Henrique: portfólio, posicionamento e canal de contato num site só, pensado para atrair clientes que já entendem o valor de marca.",
      }}
      sections={[
        {
          heading: "Estratégia antes da estética.",
          body: [
            "Logo na abertura, o site deixa claro o método: diagnóstico de marca, posicionamento, identidade visual e direção criativa, nessa ordem. Design bonito chama atenção; marca bem construída muda percepção.",
            "A seção de apresentação usa uma foto real de Gustavo ao lado de uma peça gerada por IA, reforçando o nome da marca pessoal (GUS IA) sem exagerar no efeito.",
          ],
          image: {
            src: "/sites/gusia/apresentacao.jpg",
            alt: "Seção de apresentação da GUS IA com foto de Gustavo Henrique e o texto 'Design bonito chama atenção'",
          },
        },
        {
          heading: "O portfólio como prova, não promessa.",
          body: [
            "A grade de 'Trabalhos selecionados' reúne 9 projetos reais, cada um com setor, tipo de trabalho e uma frase de posicionamento, não só uma imagem bonita.",
            "Entre eles estão alguns dos mesmos cases que a MODUX também documentou (Biomaxx, Nørxx, Di Amalfi, Casa Martinho): prova de que estratégia de marca e execução de site andam juntas.",
          ],
          image: {
            src: "/sites/gusia/projetos-1.jpg",
            alt: "Grade de projetos selecionados da GUS IA, incluindo Biomaxx e Nørxx",
          },
        },
        {
          heading: "Depoimento como argumento de venda.",
          body: [
            "Os depoimentos não falam de layout: falam de percepção, autoridade e portas que se abriram depois do projeto. Cada card traz cargo e tipo de cliente, sem precisar expor nome e empresa.",
            "A página fecha com uma chamada direta para o WhatsApp, sem formulário: a primeira conversa é para entender onde a marca perde valor.",
          ],
          image: {
            src: "/sites/gusia/contato.jpg",
            alt: "Seção de contato da GUS IA com chamada para o WhatsApp",
          },
        },
      ]}
      gallery={[
        {
          src: "/sites/gusia/servicos.jpg",
          alt: "Seção 'O que fazemos' da GUS IA com os 4 passos do método de branding",
        },
        {
          src: "/sites/gusia/projetos-2.jpg",
          alt: "Projetos Green, Di Amalfi e Casa Martinho na grade de trabalhos da GUS IA",
        },
        {
          src: "/sites/gusia/projetos-3.jpg",
          alt: "Projetos Goianos FA, GIGA, Gansos e Sicoob UniCentro Br na grade de trabalhos da GUS IA",
        },
        {
          src: "/sites/gusia/depoimentos.jpg",
          alt: "Seção de depoimentos da GUS IA, 'Cliente bom não elogia layout, elogia resultado'",
        },
      ]}
      credits="Desenvolvimento: MODUX Creative."
    />
  );
}
