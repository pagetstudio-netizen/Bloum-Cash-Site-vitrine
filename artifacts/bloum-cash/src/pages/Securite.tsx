import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import PageLayout from "@/components/PageLayout";
import securityImage from "@assets/20260608_153046_1780938046993.png";
import lockIcon from "@assets/mine-mod-change-pwd-D4tL_Aft_1780938124611.png";

const blueFilter =
  "brightness(0) saturate(100%) invert(17%) sepia(100%) saturate(7484%) hue-rotate(213deg) brightness(97%) contrast(103%)";

const guarantees = [
  "Chiffrement AES-256 de bout en bout",
  "Authentification à deux facteurs (OTP)",
  "Protection par code PIN sécurisé",
  "Surveillance anti-fraude 24h/24 et 7j/7",
  "Conformité aux normes bancaires internationales",
  "Sessions sécurisées avec déconnexion automatique",
  "Historique complet et traçabilité de chaque transaction",
];

export default function Securite() {
  return (
    <PageLayout>
      <Seo
        title="Sécurité Bloum Cash | Protection de vos transferts d'argent au Togo"
        description="Bloum Cash protège vos transactions avec un chiffrement AES-256, une authentification à deux facteurs et une surveillance anti-fraude 24h/24."
        canonical="https://bloumcash.com/securite"
      />
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Votre <span className="text-primary">Sécurité</span>, notre priorité
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Bloum Cash utilise les technologies de sécurité les plus avancées pour protéger votre argent et vos données personnelles.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center mb-8 shadow-lg">
                <img src={lockIcon} alt="Sécurité" className="w-9 h-9 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Nos garanties de sécurité</h2>
              <ul className="space-y-5">
                {guarantees.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200/30 rounded-full blur-[60px]" />
                <motion.img
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  src={securityImage}
                  alt="Sécurité Bloum Cash"
                  className="relative z-10 max-w-sm w-full object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
