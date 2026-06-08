import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/Image_fx_1780861320599.png";
import banner1 from "@assets/20260607_084736_1780938066058.jpg";
import banner2 from "@assets/20260607_090625_1780938066105.jpg";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Banner Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-3 justify-center"
          >
            <div className="relative w-full flex flex-col gap-4">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="rounded-2xl overflow-hidden shadow-xl border border-blue-100"
              >
                <img src={banner1} alt="Bloum Cash - Transfert TMoney Moov" className="w-full object-cover" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-xl border border-blue-100"
              >
                <img src={banner2} alt="Bloum Cash - TMoney Flooz" className="w-full object-cover" />
              </motion.div>
            </div>
          </motion.div>

          {/* Center Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6 w-fit mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Disponible sur iOS & Android
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              BLOUM CASH : Votre Argent, Partout au{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Togo
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Envoyez de l'argent instantanément entre TMoney et Moov Money, gérez vos transferts et profitez d'une expérience simple, rapide et sécurisée depuis votre téléphone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/telecharger">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-6 h-auto w-full sm:w-auto shadow-md">
                    <Apple className="mr-2 h-6 w-6" />
                    <div className="text-left">
                      <div className="text-[10px] font-normal leading-none opacity-80">Télécharger sur</div>
                      <div className="text-sm font-semibold leading-tight">l'App Store</div>
                    </div>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/telecharger">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-6 h-auto w-full sm:w-auto shadow-md">
                    <Play className="mr-2 h-6 w-6" />
                    <div className="text-left">
                      <div className="text-[10px] font-normal leading-none opacity-80">DISPONIBLE SUR</div>
                      <div className="text-sm font-semibold leading-tight">Google Play</div>
                    </div>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Hero Image */}
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
