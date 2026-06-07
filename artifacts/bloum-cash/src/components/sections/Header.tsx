import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Bloum Cash Logo" className="w-10 h-10 rounded-xl" />
          <span className="text-xl font-bold text-primary tracking-tight">Bloum Cash</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("fonctionnalites")} className="text-foreground/80 hover:text-primary font-medium transition-colors">Fonctionnalités</button>
          <button onClick={() => scrollTo("securite")} className="text-foreground/80 hover:text-primary font-medium transition-colors">Sécurité</button>
          <button onClick={() => scrollTo("avantages")} className="text-foreground/80 hover:text-primary font-medium transition-colors">À propos</button>
          <button onClick={() => scrollTo("faq")} className="text-foreground/80 hover:text-primary font-medium transition-colors">Support</button>
        </nav>

        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-primary to-blue-800 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all hover:scale-105">
            Télécharger l'application
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          <button onClick={() => scrollTo("fonctionnalites")} className="text-left text-foreground font-medium py-2">Fonctionnalités</button>
          <button onClick={() => scrollTo("securite")} className="text-left text-foreground font-medium py-2">Sécurité</button>
          <button onClick={() => scrollTo("avantages")} className="text-left text-foreground font-medium py-2">À propos</button>
          <button onClick={() => scrollTo("faq")} className="text-left text-foreground font-medium py-2">Support</button>
          <Button className="bg-gradient-to-r from-primary to-blue-800 text-white rounded-full w-full mt-2">
            Télécharger l'application
          </Button>
        </div>
      )}
    </header>
  );
}