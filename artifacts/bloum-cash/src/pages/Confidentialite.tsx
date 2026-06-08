import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";

const sections = [
  {
    title: "1. Données collectées",
    content:
      "Nous collectons les données nécessaires au fonctionnement du service : nom, numéro de téléphone, adresse email (optionnel), données de transaction (montants, dates, destinataires). Nous ne collectons jamais de données bancaires ou de numéros de carte.",
  },
  {
    title: "2. Utilisation des données",
    content:
      "Vos données sont utilisées exclusivement pour : traiter vos transactions, sécuriser votre compte, vous envoyer des notifications de transaction, améliorer nos services. Nous ne vendons jamais vos données à des tiers.",
  },
  {
    title: "3. Stockage et sécurité",
    content:
      "Toutes vos données sont stockées sur des serveurs sécurisés, chiffrées avec AES-256. L'accès est strictement limité aux équipes techniques autorisées. Vos données de transaction sont conservées pendant 5 ans conformément à la réglementation financière en vigueur.",
  },
  {
    title: "4. Partage des données",
    content:
      "Bloum Cash peut partager des données avec : les opérateurs téléphoniques (TMoney, Moov Money) pour traiter vos transactions, les autorités compétentes en cas d'obligation légale. Aucun autre partage n'est effectué sans votre consentement explicite.",
  },
  {
    title: "5. Vos droits",
    content:
      "Vous disposez du droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à privacy@bloumcash.tg. Nous traiterons votre demande dans un délai de 30 jours.",
  },
  {
    title: "6. Cookies et tracking",
    content:
      "L'application mobile n'utilise pas de cookies. Des données d'utilisation anonymisées peuvent être collectées à des fins d'amélioration du service (crashs, performances). Vous pouvez désactiver cette collecte dans les paramètres de l'application.",
  },
  {
    title: "7. Contact DPO",
    content:
      "Pour toute question relative à la protection de vos données, vous pouvez contacter notre Délégué à la Protection des Données : privacy@bloumcash.tg",
  },
];

export default function Confidentialite() {
  return (
    <PageLayout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Politique de <span className="text-primary">Confidentialité</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Dernière mise à jour : Juin 2025
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
            <p className="text-primary font-medium">
              Chez Bloum Cash, la protection de votre vie privée est fondamentale. Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
          </div>
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="text-xl font-bold text-primary mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
