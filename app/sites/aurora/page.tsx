import type { Metadata } from "next";
import SiteLayout from "@/components/sites/SiteLayout";

export const metadata: Metadata = {
  title: "Aurora's Cleaning Services | Sites MODUX Creative",
  description:
    "O site da Aurora's Cleaning Services: orçamento conversacional que já sai pronto para o WhatsApp.",
};

export default function AuroraSitePage() {
  return (
    <SiteLayout
      client="Aurora's Cleaning Services"
      sector="Limpeza residencial"
      liveUrl="https://aurorascleaningservices.com.br/"
      stack={["Formulário conversacional", "Antes/depois interativo", "Integração WhatsApp"]}
      heroImage={{
        src: "/sites/aurora/hero.jpg",
        alt: "Home da Aurora's Cleaning Services, com a chamada 'A spotless home, without the hassle'",
      }}
      intro={{
        heading: "Um orçamento que já sai pronto para o WhatsApp.",
        body: "A Aurora's Cleaning Services atende limpeza residencial em Massachusetts e Rhode Island (EUA). O site substitui login e calendário por um formulário conversacional: a cliente escolhe serviço, tamanho da casa e frequência, e a mensagem já sai pronta para continuar no WhatsApp ou por SMS.",
      }}
      sections={[
        {
          heading: "Antes de tudo, mostrar o resultado.",
          body: [
            "O antes/depois é o argumento mais forte da Aurora's: um slider compara fotos reais de cada tipo de serviço (limpeza regular, pós-mudança, pós-obra), com o antes e o depois lado a lado na mesma imagem.",
            "A página dispensa a promessa vazia: o resultado aparece antes mesmo do cliente pedir um orçamento.",
          ],
          image: {
            src: "/sites/aurora/antes-depois.jpg",
            alt: "Slider de comparação antes e depois de uma limpeza, com uma pia suja de um lado e limpa do outro",
          },
        },
        {
          heading: "Orçamento sem formulário chato.",
          body: [
            "Em vez de um formulário tradicional, a cliente responde perguntas rápidas em botões (tipo de serviço, tamanho do imóvel, frequência, se tem pet) e o site já monta a mensagem pronta para continuar a conversa.",
            "Sem conta para criar, sem calendário para preencher: o fechamento acontece na conversa, não num painel.",
          ],
          image: {
            src: "/sites/aurora/formulario.jpg",
            alt: "Formulário conversacional em botões para montar um orçamento de limpeza",
          },
        },
        {
          heading: "Confiança construída em cima da fundadora.",
          body: [
            "A página 'About' apresenta a fundadora Raphaela Faltz Vasconcelos pelo nome, reforçando que quem responde a mensagem é ela, não um call center.",
            "Depoimentos reais, com nota e tipo de serviço, e uma seção de perguntas frequentes fecham a jornada antes do pedido de orçamento.",
          ],
          image: {
            src: "/sites/aurora/fundadora.jpg",
            alt: "Seção 'A personal touch in every clean' com foto da fundadora Raphaela Faltz Vasconcelos",
          },
        },
      ]}
      gallery={[
        {
          src: "/sites/aurora/servicos.jpg",
          alt: "Cards dos três serviços da Aurora's: limpeza regular, pós-mudança e pós-obra",
        },
        {
          src: "/sites/aurora/como-funciona.jpg",
          alt: "Seção 'How booking works' com os 4 passos do atendimento",
        },
        {
          src: "/sites/aurora/depoimentos.jpg",
          alt: "Depoimentos de clientes da Aurora's Cleaning Services, todos com 5 estrelas",
        },
        {
          src: "/sites/aurora/galeria-footer.jpg",
          alt: "Galeria de fotos de trabalhos realizados e rodapé do site da Aurora's",
        },
      ]}
      credits="Desenvolvimento: MODUX Creative."
    />
  );
}
