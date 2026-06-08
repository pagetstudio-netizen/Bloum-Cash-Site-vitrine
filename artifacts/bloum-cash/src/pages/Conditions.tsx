import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";

const sections = [
  {
    title: "1. Acceptation des conditions",
    content:
      "En utilisant l'application Bloum Cash, vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.",
  },
  {
    title: "2. Description du service",
    content:
      "Bloum Cash est une application mobile permettant le transfert d'argent entre les réseaux de téléphonie mobile TMoney et Moov Money au Togo. Le service est disponible 24h/24, 7j/7, sous réserve de maintenance planifiée.",
  },
  {
    title: "3. Conditions d'utilisation",
    content:
      "Pour utiliser Bloum Cash, vous devez être âgé d'au moins 18 ans, disposer d'un numéro de téléphone valide au Togo, posséder un compte TMoney ou Moov Money actif, et fournir des informations exactes lors de l'inscription.",
  },
  {
    title: "4. Responsabilités de l'utilisateur",
    content:
      "Vous êtes responsable de la confidentialité de vos identifiants de connexion, du code PIN et du mot de passe associés à votre compte. Toute transaction effectuée avec vos identifiants est réputée être de votre fait.",
  },
  {
    title: "5. Limites de transaction",
    content:
      "Les montants minimum et maximum par transaction ainsi que les plafonds journaliers sont définis dans la section Tarifs. Ces limites peuvent évoluer et vous en serez informé par notification.",
  },
  {
    title: "6. Frais et commissions",
    content:
      "Les frais applicables à chaque transaction sont clairement affichés avant la confirmation. Aucun frais caché ne sera prélevé. La grille tarifaire est disponible dans la section Tarifs de l'application.",
  },
  {
    title: "7. Politique d'annulation",
    content:
      "Une fois confirmée, une transaction ne peut pas être annulée. Veuillez vérifier attentivement les informations (numéro destinataire, montant) avant de valider tout transfert.",
  },
  {
    title: "8. Modifications des conditions",
    content:
      "Bloum Cash se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront notifiés 15 jours avant l'entrée en vigueur des nouvelles conditions.",
  },
];

export default function Conditions() {
  return (
    <PageLayout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Conditions <span className="text-primary">d'Utilisation</span>
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
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-3 text-primary">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
