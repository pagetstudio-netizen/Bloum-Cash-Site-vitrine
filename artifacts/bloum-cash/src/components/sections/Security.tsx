import { motion } from "framer-motion";
import { Shield, Lock, KeyRound, Check } from "lucide-react";

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
              <Shield className="w-8 h-8 text-white" />
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
                "Surveillance anti-fraude 24h/24 et 7j/7"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: Decorative Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Abstract background shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="relative z-10 w-[280px] h-[580px] bg-slate-50 rounded-[3rem] border-[8px] border-white shadow-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
              {/* Phone screen background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
              
              {/* Top notch */}
              <div className="absolute top-0 inset-x-0 h-7 bg-white z-20 flex justify-center rounded-b-3xl w-40 mx-auto" />
              
              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Lock Circle */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-700 shadow-xl flex items-center justify-center mb-8 relative"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-[1.15]" />
                  <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.3]" />
                  <Lock className="w-12 h-12 text-white" />
                </motion.div>
                
                {/* Fake UI cards */}
                <div className="w-full space-y-4 px-2">
                  <div className="h-16 w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center px-4 gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <KeyRound className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-20 bg-slate-200 rounded mb-2" />
                      <div className="h-2 w-12 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="h-16 w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center px-4 gap-4 opacity-70">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-slate-200 rounded mb-2" />
                      <div className="h-2 w-16 bg-slate-100 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}