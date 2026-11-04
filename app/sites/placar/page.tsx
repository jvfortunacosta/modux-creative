import type { Metadata } from "next";
import SiteLayout from "@/components/sites/SiteLayout";

export const metadata: Metadata = {
  title: "Placar | Sites MODUX Creative",
  description:
    "O Placar transforma vendas do ERP em ranking ao vivo no telão da sala comercial, com metas e comemoração automática.",
};

export default function PlacarSitePage() {
  return (
    <SiteLayout
      client="Placar"
      sector="SaaS · Gestão comercial"
      liveUrl="https://placarcomercial.online/"
      stack={["Integração com ERP (Conta Azul)", "Painel administrativo", "Exibição ao vivo em TV"]}
      heroImage={{
        src: "/sites/placar/hero.jpg",
        alt: "Home do Placar com a chamada 'Cada venda vira festa no telão' e exemplo do ranking ao vivo",
      }}
      intro={{
        heading: "Cada venda vira festa no telão.",
        body: "O Placar lê as vendas direto do ERP (Conta Azul) e mostra na TV da sala comercial em segundos: quem vendeu, quanto, e quem passou quem. Ranking, metas e comemoração, sem planilha e sem ninguém mexer.",
      }}
      sections={[
        {
          heading: "Da venda fechada à comemoração.",
          body: [
            "Ninguém precisa avisar que vendeu. O Placar acompanha o financeiro e coloca a venda na TV sozinho: conecta o ERP, a venda entra e o telão comemora, tocando o som e reordenando o ranking.",
            "Se a internet cai, ele se recupera sozinho, sem precisar reiniciar nada na sala.",
          ],
          image: {
            src: "/sites/placar/como-funciona.jpg",
            alt: "Seção 'Como funciona' do Placar com os passos conecta o ERP, a venda entra e a TV comemora",
          },
        },
        {
          heading: "Oito tipos de comemoração, cada um com sua própria animação.",
          body: [
            "Venda épica, ultrapassagem (no estilo corrida de F1), novo líder, meta batida: cada marco do ranking tem som e efeito configurável por time, pra criar tensão de verdade na sala comercial.",
            "Além do ranking do dia, o telão também alterna sozinho entre a visão da semana, do mês e de campanha de produto, no tempo que o gestor escolher.",
          ],
          image: {
            src: "/sites/placar/comemoracoes.jpg",
            alt: "Comemoração 'Venda épica' do Placar em destaque no telão",
          },
        },
        {
          heading: "Um painel pro gestor configurar tudo.",
          body: [
            "O painel administrativo mostra meta do mês com ritmo necessário por dia, melhor vendedor, últimas vendas e o status de cada telão e da integração, atualizando sozinho a cada poucos segundos.",
            "Tem também log de vendas pra auditoria, regras de contagem por valor ou quantidade, e um modo simulador pra demonstrar o telão funcionando antes mesmo de conectar o ERP.",
          ],
          image: {
            src: "/sites/placar/painel.jpg",
            alt: "Painel administrativo do Placar com visão geral de metas e últimas vendas",
          },
        },
      ]}
      gallery={[
        {
          src: "/sites/placar/recursos.jpg",
          alt: "Grade de recursos do Placar: telão ao vivo, integração com ERP, ranking e pódio",
        },
        {
          src: "/sites/placar/views.jpg",
          alt: "Modo discreto do Placar embaçando os valores de venda na tela",
        },
        {
          src: "/sites/placar/integracao.jpg",
          alt: "Fluxo de integração do Placar entre o Conta Azul, o sistema e o telão",
        },
        {
          src: "/sites/placar/cta-final.jpg",
          alt: "Chamada final 'Coloque o seu time no Placar' com botão de agendar demonstração",
        },
      ]}
      credits="Desenvolvimento: MODUX Creative."
    />
  );
}
