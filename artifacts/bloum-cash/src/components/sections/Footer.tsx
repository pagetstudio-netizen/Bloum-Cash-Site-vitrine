import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a5e] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoUrl} alt="Bloum Cash Logo" className="w-12 h-12 rounded-xl" />
              <span className="text-2xl font-bold tracking-tight text-white">Bloum Cash</span>
            </div>
            <p className="text-blue-200/80 mb-8 max-w-sm leading-relaxed">
              Votre Argent, Partout au Togo. La solution premium de transfert mobile sécurisée, rapide et intuitive pour tous vos besoins au quotidien.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Produit</h4>
            <ul className="space-y-4">
              <li><a href="#fonctionnalites" className="text-blue-200/80 hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#securite" className="text-blue-200/80 hover:text-white transition-colors">Sécurité</a></li>
              <li><a href="#" className="text-blue-200/80 hover:text-white transition-colors">Tarifs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Entreprise</h4>
            <ul className="space-y-4">
              <li><a href="#avantages" className="text-blue-200/80 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="text-blue-200/80 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#faq" className="text-blue-200/80 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Légal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-blue-200/80 hover:text-white transition-colors">Conditions</a></li>
              <li><a href="#" className="text-blue-200/80 hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="text-blue-200/80 hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-blue-200/60 text-sm">
            © 2025 Bloum Cash. Tous droits réservés.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:bg-primary hover:text-white transition-all">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:bg-primary hover:text-white transition-all">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:bg-primary hover:text-white transition-all">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:bg-primary hover:text-white transition-all">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:bg-primary hover:text-white transition-all">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}