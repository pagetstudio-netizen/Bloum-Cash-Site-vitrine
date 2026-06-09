import { Seo } from "@/components/Seo";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TransferSection from "@/components/sections/TransferSection";
import Features from "@/components/sections/Features";
import AppShowcase from "@/components/sections/AppShowcase";
import Security from "@/components/sections/Security";
import Benefits from "@/components/sections/Benefits";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import DownloadCTA from "@/components/sections/DownloadCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <Seo
        title="Bloum Cash | Transfert d'argent entre TMoney et Moov Money au Togo"
        description="Bloum Cash est une application de transfert d'argent au Togo permettant d'envoyer rapidement des fonds entre TMoney et Moov Money de manière simple et sécurisée."
        canonical="https://bloumcash.com/"
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <TransferSection />
        <Features />
        <AppShowcase />
        <Security />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
