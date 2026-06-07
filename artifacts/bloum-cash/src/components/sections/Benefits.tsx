import { motion } from "framer-motion";
import { Zap, Smile, Clock, CheckCircle2, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: "Rapidité",
    description: "Transferts instantanés 24h/24",
    delay: 0.1,
  },
  {
    icon: <Smile className="w-6 h-6 text-white" />,
    title: "Simplicité",
    description: "Interface intuitive pour tous les utilisateurs",
    delay: 0.2,
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "Disponibilité",
    description: "Service disponible 7j/7, 24h/24",
    delay: 0.3,
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-white" />,
    title: "Fiabilité",
    description: "Transactions sécurisées et fiables",
    delay: 0.4,
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6 text-white" />,
    title: "Assistance",
    description: "Support client réactif et disponible",
    delay: 0.5,
  },
];

export default function Benefits() {
  return (
    <section id="avantages" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Pourquoi Bloum Cash ?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: benefit.delay, duration: 0.4 }}
              className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all rounded-[20px] p-6 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}