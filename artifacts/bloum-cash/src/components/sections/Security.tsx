import { motion } from "framer-motion";
import { Check } from "lucide-react";
import securityImage from "@assets/20260608_153046_1780938046993.png";
import lockIcon from "@assets/mine-mod-change-pwd-D4tL_Aft_1780938124611.png";

export default function Security() {
  return (
    <section id="securite" className="py-24 bg-blue-50/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center mb-8 shadow-lg">
              <img
                src={lockIcon}
                alt="Sécurité"
                className="w-9 h-9 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sécurité Certifiée
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              La protection de votre argent et de vos données est notre priorité absolue. Bloum Cash utilise les technologies de chiffrement les plus avancées du marché.
            </p>

            <ul className="space-y-5">
              {[
                "Chiffrement de bout en bout de toutes les transactions",
                "Authentification à deux facteurs (OTP)",
                "Protection par code PIN sécurisé",
                "Surveillance anti-fraude 24h/24 et 7j/7",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
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

          {/* Right Column: Security Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-200/40 rounded-full blur-[60px] pointer-events-none" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" as const }}
              className="relative z-10 max-w-sm w-full"
            >
              <img
                src={securityImage}
                alt="Sécurité Bloum Cash - protection des transferts d'argent"
                loading="lazy"
                width="400"
                height="400"
                className="w-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
