import { Link } from "wouter";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "/fonctionnalites" },
    { label: "Sécurité", href: "/securite" },
    { label: "Tarifs", href: "/tarifs" },
  ],
  Entreprise: [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
  ],
  Légal: [
    { label: "Conditions", href: "/conditions" },
    { label: "Confidentialité", href: "/confidentialite" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 mb-6 cursor-pointer">
                <img src={logoUrl} alt="Bloum Cash Logo" className="w-12 h-12 rounded-xl" />
                <span className="text-2xl font-bold tracking-tight text-white">Bloum Cash</span>
              </div>
            </Link>
            <p className="text-blue-200/80 mb-8 max-w-sm leading-relaxed">
              Votre Argent, Partout au Togo. La solution premium de transfert mobile sécurisée, rapide et intuitive pour tous vos besoins au quotidien.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-lg mb-6 text-white">{section}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        className="text-blue-200/80 hover:text-white transition-colors cursor-pointer block"
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
          <p className="text-blue-200/60 text-sm">
            © 2025 Bloum Cash. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.15, backgroundColor: "rgba(59,130,246,1)" }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:text-white transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
