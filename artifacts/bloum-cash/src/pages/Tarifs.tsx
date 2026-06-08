import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const tiers = [
  {
    name: "Basique",
    price: "Gratuit",
    desc: "Pour commencer à transférer facilement",
    features: [
      "Transferts jusqu'à 50 000 FCFA/jour",
      "Frais de 3,5% par transfert",
      "1 compte mobile lié",
      "Historique 30 jours",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    highlight: false,
  },
  {
    name: "Standard",
    price: "500 FCFA",
    period: "/mois",
    desc: "Pour un usage régulier et confortable",
    features: [
      "Transferts jusqu'à 200 000 FCFA/jour",
      "Frais réduits à 2,5% par transfert",
      "2 comptes mobiles liés",
      "Historique illimité",
      "Support prioritaire",
      "Notifications SMS",
    ],
    cta: "Choisir Standard",
    highlight: true,
  },
  {
    name: "Premium",
    price: "1 500 FCFA",
    period: "/mois",
    desc: "Pour les professionnels et les grandes familles",
    features: [
      "Transferts illimités",
      "Frais ultra-réduits à 1,5%",
      "5 comptes mobiles liés",
      "Historique illimité",
      "Support VIP 24/7",
      "Transferts planifiés",
    ],
    cta: "Choisir Premium",
    highlight: false,
  },
];

const fees = [
  { range: "0 – 5 000 FCFA", fee: "3,5%", example: "≈ 175 FCFA" },
  { range: "5 001 – 20 000 FCFA", fee: "3,5%", example: "≈ 350–700 FCFA" },
  { range: "20 001 – 50 000 FCFA", fee: "3,5%", example: "≈ 700–1 750 FCFA" },
  { range: "50 001 – 200 000 FCFA", fee: "3,5%", example: "≈ 1 750–7 000 FCFA" },
  { range: "> 200 000 FCFA", fee: "3,5%", example: "Contactez-nous" },
];

export default function Tarifs() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Nos <span className="text-primary">Tarifs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Des prix transparents, sans surprise. Un seul frais simple :{" "}
            <strong className="text-primary">3,5% par transfert</strong>.
          </motion.p>
        </div>
      </section>

      {/* Fee highlight banner */}
      <section className="py-10 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"
          >
            <div>
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-1">Frais de transfert</p>
              <p className="text-white text-5xl font-extrabold">3,5%</p>
            </div>
            <div className="w-px h-16 bg-white/20 hidden md:block" />
            <div className="max-w-sm">
              <p className="text-white font-semibold text-lg mb-1">Simple, clair, sans surprise</p>
              <p className="text-blue-200">Un seul taux appliqué sur chaque transfert. Aucun frais caché, aucun abonnement obligatoire.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 border-2 flex flex-col ${
                  tier.highlight
                    ? "border-primary bg-primary text-white shadow-2xl scale-105"
                    : "border-slate-200 bg-white"
                }`}
              >
                {tier.highlight && (
                  <div className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full w-fit mb-4">
                    Le plus populaire
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-foreground"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-6 ${tier.highlight ? "text-blue-100" : "text-muted-foreground"}`}>
                  {tier.desc}
                </p>
                <div className="mb-8">
                  <span className={`text-4xl font-extrabold ${tier.highlight ? "text-white" : "text-foreground"}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className={`text-sm ${tier.highlight ? "text-blue-100" : "text-muted-foreground"}`}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? "bg-white/20" : "bg-blue-50"}`}>
                        <Check className={`w-3 h-3 ${tier.highlight ? "text-white" : "text-primary"}`} />
                      </div>
                      <span className={`text-sm ${tier.highlight ? "text-blue-50" : "text-foreground"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/telecharger"
                  className={`block text-center font-bold py-3 rounded-full transition-colors ${
                    tier.highlight
                      ? "bg-white text-primary hover:bg-blue-50"
                      : "bg-primary text-white hover:bg-blue-700"
                  }`}
                >
                  {tier.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees table */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground text-center mb-3"
          >
            Exemples de frais (3,5%)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-10"
          >
            Le taux de 3,5% s'applique uniformément à tous les montants.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Montant envoyé</th>
                  <th className="py-4 px-6 text-center font-semibold">Taux</th>
                  <th className="py-4 px-6 text-right font-semibold">Frais estimés</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="py-4 px-6 text-foreground font-medium">{row.range}</td>
                    <td className="py-4 px-6 text-center font-extrabold text-primary text-lg">{row.fee}</td>
                    <td className="py-4 px-6 text-right text-muted-foreground text-sm">{row.example}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            * Frais prélevés automatiquement lors du transfert. Montant affiché avant confirmation.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
