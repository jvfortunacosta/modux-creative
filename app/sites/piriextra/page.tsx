import type { Metadata } from "next";
import SiteLayout from "@/components/sites/SiteLayout";

export const metadata: Metadata = {
  title: "piriExtra | Sites MODUX Creative",
  description:
    "O marketplace de diárias do piriExtra: conectando bares, pousadas e eventos de Pirenópolis a quem quer fazer um extra.",
};

export default function PiriExtraSitePage() {
  return (
    <SiteLayout
      client="piriExtra"
      sector="Marketplace de diárias"
      liveUrl="https://piriextra.com.br/"
      stack={["Marketplace dois lados", "Cadastro e candidatura", "Piloto local (Pirenópolis)"]}
      heroImage={{
        src: "/sites/piriextra/hero.jpg",
        alt: "Home do piriExtra com a chamada 'Sua próxima diária começa hoje' e exemplo do app",
      }}
      intro={{
        heading: "Trabalho de temporada, do jeito que Pirenópolis precisa.",
        body: "O piriExtra conecta bares, restaurantes, pousadas e eventos de Pirenópolis a quem quer fazer um extra: diárias, fins de semana e alta temporada, numa operação piloto pensada pro celular.",
      }}
      sections={[
        {
          heading: "Dos dois lados, em poucos passos.",
          body: [
            "Pro profissional: criar perfil grátis, dizer quando pode trabalhar, se candidatar ou receber convite, confirmar e a diária já aparece na agenda.",
            "Pro estabelecimento, o mesmo fluxo ao contrário: publicar vaga em minutos (até pra hoje), receber candidatura e organizar contratação e escala num só lugar.",
          ],
          image: {
            src: "/sites/piriextra/como-funciona.jpg",
            alt: "Seção 'Como funciona' do piriExtra com os 4 passos para profissionais",
          },
        },
        {
          heading: "Feito pros dois lados ganharem.",
          body: [
            "Profissional vê a remuneração antes de se candidatar e não paga taxa nenhuma. Estabelecimento publica vaga rápido e organiza posições, contratações e escalas com permissão por função e unidade.",
            "As categorias cobrem hotelaria, gastronomia e eventos, além de serviços pra casa (elétrica, pintura, piscina), todas filtráveis direto na home.",
          ],
          image: {
            src: "/sites/piriextra/beneficios.jpg",
            alt: "Seção 'Bom para quem contrata' do piriExtra, lado profissionais e lado estabelecimentos",
          },
        },
        {
          heading: "Confiança antes do primeiro extra.",
          body: [
            "Cadastro verificado, dados protegidos conforme a LGPD, e endereço completo só liberado após a contratação confirmada: até lá, a plataforma mostra apenas o local aproximado.",
            "Na fase piloto o pagamento é combinado direto entre as partes, e o piriExtra só registra o valor combinado, sem entrar no meio da transação.",
          ],
          image: {
            src: "/sites/piriextra/seguranca.jpg",
            alt: "Seção 'Transparência e segurança' do piriExtra com cadastro verificado e privacidade",
          },
        },
      ]}
      gallery={[
        {
          src: "/sites/piriextra/categorias.jpg",
          alt: "Categorias de funções mais procuradas no piriExtra, de hotelaria a serviços pra casa",
        },
        {
          src: "/sites/piriextra/faq.jpg",
          alt: "Perguntas frequentes do piriExtra",
        },
        {
          src: "/sites/piriextra/cta.jpg",
          alt: "Chamada final 'Bora fazer um extra?' do piriExtra",
        },
        {
          src: "/sites/piriextra/footer.jpg",
          alt: "Rodapé do piriExtra com suporte via WhatsApp",
        },
      ]}
      credits="Desenvolvimento: MODUX Creative."
    />
  );
}
