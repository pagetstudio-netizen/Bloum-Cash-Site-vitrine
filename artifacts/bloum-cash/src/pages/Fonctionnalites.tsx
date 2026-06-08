import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import tmoneyLogo from "@assets/ruU3bQe_1780861412620.png";
import moovLogo from "@assets/op-moov_1780861412914.png";
import downloadIcon from "@assets/mine-mod-download-B1teb57W_(1)_1780938124567.png";
import csIcon from "@assets/mine-mod-cs-DtBQ0Sp0_1780938124590.png";
import lockIcon from "@assets/mine-mod-change-pwd-D4tL_Aft_1780938124611.png";
import aboutIcon from "@assets/mine-mod-aboutus-xnaBhqOq_1780938124633.png";
import settingsIcon from "@assets/1437214_1780938124718.png";

const blueFilter =
  "brightness(0) saturate(100%) invert(17%) sepia(100%) saturate(7484%) hue-rotate(213deg) brightness(97%) contrast(103%)";

const features = [
  {
    icon: downloadIcon,
    filter: blueFilter,
    title: "Transfert Ultra-Rapide",
    description:
      "Envoyez de l'argent en quelques secondes. Notre infrastructure optimisée garantit des transferts instantanés, 24h/24, 7j/7, sans interruption.",
    color: "bg-blue-50",
  },
  {
    icon: csIcon,
    filter: blueFilter,
    title: "Support Client 24/7",
    description:
      "Notre équipe dédiée est disponible à toute heure pour vous aider. Chat en direct, téléphone ou email — nous sommes toujours là pour vous.",
    color: "bg-blue-50",
  },
  {
    icon: lockIcon,
    filter: blueFilter,
    title: "Sécurité Maximale",
    description:
      "Chiffrement de bout en bout, authentification à deux facteurs et surveillance anti-fraude permanente pour protéger chaque transaction.",
    color: "bg-blue-50",
  },
  {
    icon: aboutIcon,
    filter: blueFilter,
    title: "Interface Intuitive",
    description:
      "Conçue pour être simple et agréable à utiliser. Même sans expérience en technologie, vous maîtrisez l'application en quelques minutes.",
    color: "bg-blue-50",
  },
  {
    icon: settingsIcon,
    filter: "none",
    title: "Paramètres Avancés",
    description:
      "Personnalisez votre expérience : limites de transfert, notifications, langue et bien plus. Bloum Cash s'adapte à vos besoins.",
    color: "bg-orange-50",
  },
];

const operators = [
  { name: "TMoney", logo: tmoneyLogo },
  { name: "Moov Money", logo: moovLogo },
];

export default function Fonctionnalites() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Nos <span className="text-primary">Fonctionnalités</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Tout ce dont vous avez besoin pour gérer votre argent facilement au Togo.
          </motion.p>
        </div>
      </section>

      {/* Operators */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            Compatible avec
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {operators.map((op) => (
              <motion.img
                key={op.name}
                src={op.logo}
                alt={op.name}
                className="h-14 object-contain"
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(26,26,219,0.10)" }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm cursor-default"
              >
                <div className={`w-16 h-16 rounded-2xl ${f.color} flex items-center justify-center mb-6`}>
                  <img src={f.icon} alt={f.title} className="w-9 h-9 object-contain" style={{ filter: f.filter }} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
