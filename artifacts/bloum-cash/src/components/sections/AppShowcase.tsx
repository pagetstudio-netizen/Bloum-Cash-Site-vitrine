import { motion } from "framer-motion";
import { Star } from "lucide-react";
import appScreen from "@assets/20260608_153216_1780938183352.png";
import StoreButtons from "@/components/StoreButtons";

export default function AppShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a1a5e] via-primary to-blue-600 overflow-hidden relative">
      {/* Background glow circles */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 xl:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Application disponible maintenant
            </motion.div>

            <h2
              className="font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.875rem, 3vw, 3rem)" }}
            >
              Toute la puissance de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Bloum Cash
              </span>{" "}
              dans votre poche
            </h2>

            <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
              Une interface pensée pour être simple, rapide et agréable. Transférez de l'argent en quelques secondes depuis n'importe où au Togo.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-blue-100 font-medium">4.8 / 5 — 2 000+ avis</span>
            </div>

            <StoreButtons size="lg" />
          </motion.div>

          {/* Right: Phone screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" as const }}
              className="relative"
            >
              {/* Glow behind phone */}
              <div className="absolute inset-[-20px] bg-blue-300/20 rounded-[3rem] blur-2xl" />
              <img
                src={appScreen}
                alt="Bloum Cash Application - écran de transfert d'argent au Togo"
                loading="lazy"
                width="320"
                height="640"
                className="relative z-10 w-72 md:w-80 xl:w-96 2xl:w-[26rem] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-[2.5rem]"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
