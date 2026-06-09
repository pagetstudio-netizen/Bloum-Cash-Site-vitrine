import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import PageLayout from "@/components/PageLayout";
import aboutIcon from "@assets/mine-mod-aboutus-xnaBhqOq_1780938124633.png";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";
import banner1 from "@assets/20260607_084736_1780938066058.jpg";

const blueFilter =
  "brightness(0) saturate(100%) invert(17%) sepia(100%) saturate(7484%) hue-rotate(213deg) brightness(97%) contrast(103%)";

const values = [
  { title: "Simplicité", desc: "Une expérience utilisateur sans friction, accessible à tous." },
  { title: "Rapidité", desc: "Des transferts instantanés, partout au Togo, à toute heure." },
  { title: "Fiabilité", desc: "99,9% de disponibilité garantie pour vos transactions." },
  { title: "Confiance", desc: "Nous protégeons votre argent comme si c'était le nôtre." },
];

const stats = [
  { value: "100K+", label: "Utilisateurs actifs" },
  { value: "5M+", label: "Transactions traitées" },
  { value: "2", label: "Opérateurs partenaires" },
  { value: "24/7", label: "Support disponible" },
];

export default function APropos() {
  return (
    <PageLayout>
      <Seo
        title="À propos de Bloum Cash | Application de transfert d'argent au Togo"
        description="Découvrez Bloum Cash, l'application togolaise de transfert d'argent entre TMoney et Moov Money. Notre histoire, nos valeurs et notre mission."
        canonical="https://bloumcash.com/a-propos"
      />
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6"
          >
            <img src={aboutIcon} alt="À propos de Bloum Cash" loading="lazy" width="44" height="44" className="w-11 h-11 object-contain" style={{ filter: blueFilter }} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            À propos de <span className="text-primary">Bloum Cash</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Nous simplifions les transferts d'argent au Togo pour que chaque togolais puisse gérer son argent facilement, rapidement et en toute sécurité.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={logoUrl} alt="Logo Bloum Cash" loading="lazy" width="80" height="80" className="w-20 h-20 rounded-2xl mb-6 shadow-lg" />
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Histoire</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bloum Cash est né d'une vision simple : permettre à chaque togolais d'envoyer de l'argent entre TMoney et Moov Money sans se déplacer, sans attente, en quelques secondes depuis son téléphone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Fondée par une équipe passionnée par la fintech africaine, notre application a été conçue pour répondre aux réalités quotidiennes des Togolais, avec une interface simple et une sécurité sans compromis.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
              <img src={banner1} alt="Bloum Cash en action - transfert d'argent au Togo" loading="lazy" width="600" height="400" className="w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold text-white mb-2">{s.value}</div>
                <div className="text-blue-200 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{v.title[0]}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
