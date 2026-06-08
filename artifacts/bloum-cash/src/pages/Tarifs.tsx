import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const tiers = [
  {
    name: "Basique",
    price: "Gratuit",
    desc: "Pour commencer à transférer sans frais",
    features: [
      "Transferts jusqu'à 50 000 FCFA/jour",
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
      "5 comptes mobiles liés",
      "Historique illimité",
      "Support VIP 24/7",
      "Notifications SMS + Push",
      "Transferts planifiés",
    ],
    cta: "Choisir Premium",
    highlight: false,
  },
];

const fees = [
  { range: "0 – 5 000 FCFA", fee: "50 FCFA" },
  { range: "5 001 – 20 000 FCFA", fee: "100 FCFA" },
  { range: "20 001 – 50 000 FCFA", fee: "200 FCFA" },
  { range: "50 001 – 200 000 FCFA", fee: "500 FCFA" },
  { range: "> 200 000 FCFA", fee: "Sur devis" },
];

export default function Tarifs() {
  return (
    <PageLayout>
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
            Des prix transparents, sans surprise. Choisissez le plan qui correspond à vos besoins.
          </motion.p>
        </div>
      </section>

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

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Frais de transaction</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Montant</th>
                  <th className="py-4 px-6 text-right font-semibold">Frais</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="py-4 px-6 text-foreground">{row.range}</td>
                    <td className="py-4 px-6 text-right font-semibold text-primary">{row.fee}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
