import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import CtaBanner from "@/components/CtaBanner";
import Positioning from "@/components/Positioning";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Sites from "@/components/Sites";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/ui/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <main>
        <Header />
        <Hero />
        <Pillars />
        <CtaBanner />
        <Positioning />
        <Services />
        <Cases />
        <Sites />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
