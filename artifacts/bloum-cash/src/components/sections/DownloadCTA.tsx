import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import StoreButtons from "@/components/StoreButtons";

export default function DownloadCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-blue-900 rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-xl"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Commencez dès aujourd'hui avec Bloum Cash
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10">
              Rejoignez des milliers d'utilisateurs au Togo et profitez de transferts d'argent rapides, simples et sécurisés.
            </p>
            
            <StoreButtons size="lg" center className="mb-4" />
            <div className="flex justify-center">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 h-auto text-base font-bold transition-all">
                Créer un compte
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}