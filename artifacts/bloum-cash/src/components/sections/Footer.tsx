import { Link } from "wouter";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { ShieldAlert } from "lucide-react";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "/fonctionnalites" },
    { label: "Sécurité", href: "/securite" },
    { label: "Tarifs & frais", href: "/tarifs" },
    { label: "Télécharger l'app", href: "/telecharger" },
  ],
  Entreprise: [
    { label: "À propos de nous", href: "/a-propos" },
    { label: "Nous contacter", href: "/contact" },
    { label: "Support & aide", href: "/support" },
  ],
  Légal: [
    { label: "Conditions générales d'utilisation", href: "/conditions-generales-dutilisation" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ],
};

const socials = [
  { icon: FaFacebook, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaLinkedin, href: "#" },
  { icon: FaYoutube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a5e] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">

        {/* Disclaimer légal */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-14 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4 text-red-300" />
          </div>
          <div>
            <p className="text-red-300 font-bold text-xs uppercase tracking-widest mb-1">⚠ Avertissement important</p>
            <p className="text-blue-200/70 text-xs leading-relaxed">
              <strong className="text-white">Bloum Cash n'est PAS une banque</strong> ni une institution financière. Bloum Cash agit uniquement comme une société <strong className="text-white">FINTECH</strong> facilitant ses services en partenariat avec des partenaires agréés et licenciés. Toutes les transactions financières sont fournies via des partenaires tiers autorisés. <strong className="text-white">ashtech Sarl</strong> est une société enregistrée légalement au Cameroun, spécialisée dans les infrastructures de paiement numérique pour l'Afrique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 mb-6 cursor-pointer">
                <img src={logoUrl} alt="Bloum Cash Logo" className="w-12 h-12 rounded-xl" />
                <span className="text-2xl font-bold tracking-tight text-white">Bloum Cash</span>
              </div>
            </Link>
            <p className="text-blue-200/80 mb-4 max-w-sm leading-relaxed text-sm">
              Votre Argent, Partout au Togo. La solution FINTECH de transfert mobile entre TMoney et Moov Money — sécurisée, rapide et transparente.
            </p>
            <p className="text-blue-200/50 text-xs leading-relaxed max-w-sm">
              Frais de transfert : <strong className="text-blue-200/80">3,5%</strong> — Sans frais cachés.
              Vérifiez toujours le numéro bénéficiaire avant de confirmer.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white/60">{section}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        className="text-blue-200/70 hover:text-white transition-colors cursor-pointer block text-sm leading-snug"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-blue-200/60 text-sm">
              © 2026 Bloum Cash · ashtech Sarl — Yaoundé, Cameroun. Tous droits réservés.
            </p>
            <p className="text-blue-200/40 text-xs mt-1">
              Opérations soumises aux réglementations locales et aux politiques AML/CFT.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.15, backgroundColor: "rgba(59,130,246,1)" }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:text-white transition-colors"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
