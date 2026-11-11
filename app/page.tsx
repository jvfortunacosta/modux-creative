import Header from "@/components/Header";
import FrameSequenceHero from "@/components/hero/FrameSequenceHero";
import ShockMarquee from "@/components/ShockMarquee";
import Pillars from "@/components/Pillars";
import CtaBanner from "@/components/CtaBanner";
import Positioning from "@/components/Positioning";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Sites from "@/components/Sites";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <>
      <SmoothScrollProvider />
      <CursorGlow />
      <main>
        <Header />
        <FrameSequenceHero />
        <ShockMarquee />
        <Positioning />
        <Cases />
        <Pillars />
        <Services />
        <Sites />
        <CtaBanner />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
