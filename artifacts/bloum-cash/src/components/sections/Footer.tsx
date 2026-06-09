import { Link } from "wouter";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

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

const SOCIAL_ICONS: Record<string, typeof FaFacebook> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
};

export default function Footer() {
  const { config } = useSiteConfig();
  const [, setLocation] = useLocation();

  const activeSocials = ["facebook", "instagram", "twitter", "linkedin", "youtube"].filter(
    (k) => config[`${k}_enabled` as keyof typeof config] === "true"
  );

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
            <p className="text-blue-200/80 mb-4 max-w-sm leading-relaxed text-sm">
              Votre Argent, Partout au Togo. La solution FINTECH de transfert mobile entre TMoney et Moov Money — sécurisée, rapide et transparente.
            </p>
            <p className="text-blue-200/50 text-xs leading-relaxed max-w-sm">
              Frais de transfert : <strong className="text-blue-200/80">5%</strong> — Sans frais cachés.
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
              © 2026 Bloum Cash. Tous droits réservés.
            </p>
            <button
              onClick={() => setLocation("/admin")}
              className="inline-block w-1.5 h-1.5 rounded-full bg-white/10 hover:bg-white/30 transition-colors mt-2 cursor-pointer"
              aria-hidden="true"
              title=""
            />
          </div>
          <div className="flex items-center gap-3">
            {activeSocials.map((key) => {
              const Icon = SOCIAL_ICONS[key];
              const href = config[`${key}_url` as keyof typeof config] as string;
              return (
                <motion.a
                  key={key}
                  href={href === "#" ? undefined : href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(59,130,246,1)" }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-200 hover:text-white transition-colors"
                >
                  <Icon size={17} />
                </motion.a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
}
