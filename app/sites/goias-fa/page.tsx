import type { Metadata } from "next";
import SiteLayout from "@/components/sites/SiteLayout";

export const metadata: Metadata = {
  title: "Goiás F.A. | Sites MODUX Creative",
  description:
    "O sistema completo por trás do Goiás Futebol Americano: site institucional, loja, inscrição de seletiva e painel de gestão.",
};

export default function GoiasFaSitePage() {
  return (
    <SiteLayout
      client="Goiás F.A."
      sector="Futebol Americano"
      liveUrl="https://goiasfa.vercel.app"
      videoSrc="/videos/goias-fa-hero-video.mp4"
      videoPoster="/videos/goias-fa-poster.jpg"
      videoPlaybackRate={1.5}
      stack={["Next.js", "PostgreSQL", "Vercel", "Mercado Pago"]}
      heroImage={{
        src: "/sites/goias-fa/home.jpg",
        alt: "Home do site do Goiás Futebol Americano, com banner de vídeo aéreo do estádio",
      }}
      intro={{
        heading: "Um sistema, não só um site.",
        body: "O Goiás F.A. entrega o site institucional, a loja de uniformes, a inscrição da seletiva e o painel de gestão do time, tudo no mesmo lugar. Começou como uma loja simples e virou a base completa da operação.",
      }}
      sections={[
        {
          heading: "Site, loja e seletiva num só lugar.",
          body: [
            "A Home reúne banner com vídeo de fundo, destaque da seletiva aberta, notícias, vídeos dos jogos e chamada pra loja.",
            "A Loja vende os uniformes oficiais: catálogo, carrinho, frete calculado automaticamente e pagamento via Mercado Pago, com consulta de pedido por CPF ou e-mail.",
          ],
          image: {
            src: "/sites/goias-fa/loja-catalogo.jpg",
            alt: "Catálogo de uniformes da loja do Goiás F.A. com preços",
          },
        },
        {
          heading: "Inscrição que já vira pagamento.",
          body: [
            "A Seletiva reúne data, local, valor e regras do evento. O formulário de inscrição troca na mesma tela para pagamento, sem redirecionar o candidato pra outro site.",
          ],
          image: {
            src: "/sites/goias-fa/seletiva.jpg",
            alt: "Formulário de inscrição da seletiva do Goiás F.A.",
          },
        },
        {
          heading: "Um painel pra time rodar sozinho.",
          body: [
            "Login protegido com menu lateral: pedidos e status de pagamento, cadastro de produtos com upload de imagem, resumo de produção, configuração de lotes de venda, lista de inscritos na seletiva com filtro, notícias, vídeos e agenda.",
            "Na prática, quem cuida do time publica notícia, abre seletiva e atualiza jogo sem depender de um desenvolvedor.",
          ],
          image: {
            src: "/sites/goias-fa/admin-login.jpg",
            alt: "Tela de login do painel administrativo do Goiás F.A.",
          },
        },
      ]}
      gallery={[
        {
          src: "/sites/goias-fa/home-noticias.jpg",
          alt: "Seção de notícias e vídeos em destaque na home do Goiás F.A.",
        },
        {
          src: "/sites/goias-fa/loja-intro.jpg",
          alt: "Página da loja do Goiás F.A. explicando o funcionamento por lote",
        },
        {
          src: "/sites/goias-fa/agenda.jpg",
          alt: "Página de agenda de jogos do Goiás F.A. por temporada",
        },
      ]}
      credits="Desenvolvimento: MODUX Creative."
    />
  );
}
