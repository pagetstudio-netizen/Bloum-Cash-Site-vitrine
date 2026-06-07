import { motion } from "framer-motion";
import { UserPlus, LogIn, ArrowRightLeft, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-6 h-6 text-white" />,
    title: "Créer un compte",
    description: "Téléchargez l'application et inscrivez-vous en quelques minutes.",
  },
  {
    icon: <LogIn className="w-6 h-6 text-white" />,
    title: "Se connecter",
    description: "Accédez à votre espace sécurisé avec votre code PIN.",
  },
  {
    icon: <ArrowRightLeft className="w-6 h-6 text-white" />,
    title: "Choisir le transfert",
    description: "Sélectionnez l'opérateur et entrez le numéro du destinataire.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    title: "Confirmer l'opération",
    description: "Validez la transaction et recevez une notification instantanée.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Comment ça marche ?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-12 right-12 h-1 bg-blue-100 rounded-full -z-10" />
          <div className="md:hidden absolute left-10 top-12 bottom-12 w-1 bg-blue-100 rounded-full -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative flex flex-col md:items-center md:text-center"
              >
                <div className="flex flex-row md:flex-col items-center gap-6 md:gap-0">
                  <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-lg border-4 border-slate-50 relative z-10 mb-0 md:mb-6">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-primary font-bold flex items-center justify-center shadow-sm text-sm border border-slate-100">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}