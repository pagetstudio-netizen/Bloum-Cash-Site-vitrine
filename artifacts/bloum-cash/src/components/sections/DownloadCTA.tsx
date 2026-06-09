import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Link } from "wouter";
import StoreButtons from "@/components/StoreButtons";

export default function DownloadCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl px-6 py-10 md:px-12 md:py-14 xl:px-20 xl:py-16 text-center relative overflow-hidden shadow-xl"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              className="font-extrabold text-white mb-3 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Commencez dès aujourd'hui avec Bloum Cash
            </h2>
            <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
              Rejoignez des milliers d'utilisateurs au Togo — transferts rapides, sécurisés, à seulement 5%.
            </p>

            <StoreButtons size="md" center className="mb-5" />

            <Link href="/telecharger">
              <button className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors border border-white/30 text-white font-semibold text-sm rounded-full px-6 py-3">
                <Download className="w-4 h-4" />
                Télécharger l'application
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
