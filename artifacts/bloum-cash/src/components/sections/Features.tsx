import { motion } from "framer-motion";
import { Send, ArrowLeftRight, Bell, ShieldCheck } from "lucide-react";
import tmoneyLogo from "@assets/ruU3bQe_1780861412620.png";
import moovLogo from "@assets/op-moov_1780861412914.png";

const features = [
  {
    icon: <Send className="w-8 h-8 text-primary" />,
    title: "Envoi Rapide",
    description: "Envoyez vos transferts en quelques secondes.",
    delay: 0.1,
  },
  {
    icon: <ArrowLeftRight className="w-8 h-8 text-primary" />,
    title: "Transfert Inter-Opérateurs",
    description: "Transférez facilement entre TMoney et Moov Money.",
    logos: [tmoneyLogo, moovLogo],
    delay: 0.2,
  },
  {
    icon: <Bell className="w-8 h-8 text-primary" />,
    title: "Notifications Instantanées",
    description: "Recevez une confirmation immédiate après chaque opération.",
    delay: 0.3,
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Sécurité Avancée",
    description: "Vos données sont protégées grâce aux meilleures pratiques de sécurité.",
    delay: 0.4,
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Nos Fonctionnalités
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              className="bg-white rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              {feature.logos && (
                <div className="flex items-center gap-4 mt-6">
                  {feature.logos.map((logo, i) => (
                    <img key={i} src={logo} alt="Operator Logo" className="h-8 object-contain" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}