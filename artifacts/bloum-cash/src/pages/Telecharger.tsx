import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import PageLayout from "@/components/PageLayout";
import downloadIcon from "@assets/mine-mod-download-B1teb57W_(1)_1780938124567.png";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";
import StoreButtons from "@/components/StoreButtons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Download } from "lucide-react";

const blueFilter =
  "brightness(0) saturate(100%) invert(17%) sepia(100%) saturate(7484%) hue-rotate(213deg) brightness(97%) contrast(103%)";

const steps = [
  { num: "1", title: "Téléchargez l'application", desc: "Disponible gratuitement sur App Store et Google Play." },
  { num: "2", title: "Créez votre compte", desc: "Inscription en 2 minutes avec votre numéro de téléphone." },
  { num: "3", title: "Ajoutez votre compte mobile", desc: "Liez votre TMoney ou Moov Money en toute sécurité." },
  { num: "4", title: "Commencez à transférer", desc: "Envoyez de l'argent instantanément, partout au Togo." },
];

export default function Telecharger() {
  const { config } = useSiteConfig();
  const apkEnabled = config.apk_enabled === "true";

  return (
    <PageLayout>
      <Seo
        title="Télécharger Bloum Cash | App de transfert d'argent iOS & Android Togo"
        description="Téléchargez Bloum Cash gratuitement sur App Store et Google Play. Envoyez de l'argent entre TMoney et Moov Money en quelques secondes au Togo."
        canonical="https://bloumcash.com/telecharger"
      />
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <img src={logoUrl} alt="Bloum Cash" className="w-16 h-16 rounded-2xl object-contain" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Téléchargez Bloum Cash
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-xl mx-auto mb-10"
          >
            Gratuit, sans frais cachés. Disponible sur iOS et Android.
          </motion.p>
          <StoreButtons size="lg" center />

          {apkEnabled && config.apk_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex justify-center"
            >
              <a
                href="/api/dl/apk"
                download
                className="inline-flex items-center gap-3 bg-white text-[#1a1a5e] font-bold px-7 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-[#1a1a5e] flex items-center justify-center flex-shrink-0">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-extrabold leading-none">{config.apk_label || "Télécharger l'APK"}</p>
                  {config.apk_size && (
                    <p className="text-xs text-slate-500 mt-0.5">Android direct · {config.apk_size}</p>
                  )}
                </div>
              </a>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <img src={downloadIcon} alt="Télécharger" className="w-8 h-8 object-contain" style={{ filter: blueFilter }} />
            <h2 className="text-3xl font-bold text-foreground">Comment démarrer ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
