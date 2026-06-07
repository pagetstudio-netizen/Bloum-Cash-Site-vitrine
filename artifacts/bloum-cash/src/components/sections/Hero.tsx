import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";
import heroImage from "@assets/Image_fx_1780861320599.png";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Phone Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-3 justify-center perspective-[1000px]"
          >
            <div className="relative w-[240px] h-[500px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 shadow-[20px_20px_40px_rgba(26,26,219,0.15)] transform rotate-y-[15deg] rotate-x-[5deg] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-20 flex justify-center rounded-b-2xl w-32 mx-auto" />
              <div className="w-full h-full bg-slate-50 flex flex-col pt-8 pb-4 relative">
                {/* App UI */}
                <div className="px-5 pt-4 pb-6 bg-primary text-white rounded-b-[2rem] shadow-sm">
                  <p className="text-xs opacity-80 mb-1 font-medium">Solde actuel</p>
                  <h3 className="text-2xl font-bold">25 000 CFA</h3>
                </div>
                
                <div className="px-4 py-6 flex-1 flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 text-primary">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </div>
                      <span className="text-[10px] font-bold">Envoyer</span>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 text-primary">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </div>
                      <span className="text-[10px] font-bold">Payer</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs font-bold text-slate-800 mb-3">Récent</p>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100" />
                            <div className="h-2 w-16 bg-slate-200 rounded" />
                          </div>
                          <div className="h-2 w-10 bg-slate-200 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              BLOUM CASH : Votre Argent, Partout au <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Togo</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Envoyez de l'argent instantanément entre TMoney et Moov Money, gérez vos transferts et profitez d'une expérience simple, rapide et sécurisée depuis votre téléphone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-6 h-auto w-full sm:w-auto shadow-md">
                <Apple className="mr-2 h-6 w-6" />
                <div className="text-left">
                  <div className="text-[10px] font-normal leading-none opacity-80">Télécharger sur</div>
                  <div className="text-sm font-semibold leading-tight">l'App Store</div>
                </div>
              </Button>
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-6 h-auto w-full sm:w-auto shadow-md">
                <Play className="mr-2 h-6 w-6" />
                <div className="text-left">
                  <div className="text-[10px] font-normal leading-none opacity-80">DISPONIBLE SUR</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block lg:col-span-4"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
              <img 
                src={heroImage} 
                alt="Person using phone in market" 
                className="w-full h-full object-cover object-center aspect-[4/5] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}