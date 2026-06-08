import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import csIcon from "@assets/mine-mod-cs-DtBQ0Sp0_1780938124590.png";
import faqIcon from "@assets/téléchargement_(67)_1780938124508.png";

const blueFilter =
  "brightness(0) saturate(100%) invert(17%) sepia(100%) saturate(7484%) hue-rotate(213deg) brightness(97%) contrast(103%)";

const faqs = [
  {
    q: "Comment envoyer de l'argent avec Bloum Cash ?",
    a: "Téléchargez l'application, créez votre compte, sélectionnez 'Envoyer', entrez le numéro du destinataire et le montant. La transaction est confirmée en quelques secondes.",
  },
  {
    q: "Quels opérateurs sont compatibles avec Bloum Cash ?",
    a: "Bloum Cash est compatible avec TMoney et Moov Money (anciennement Flooz). Vous pouvez transférer entre ces deux réseaux sans frais supplémentaires.",
  },
  {
    q: "Quels sont les frais de transfert ?",
    a: "Les frais varient selon le montant transféré. Consultez notre page Tarifs pour les détails complets. En général, les frais sont très compétitifs par rapport aux autres solutions disponibles.",
  },
  {
    q: "Mon argent est-il en sécurité ?",
    a: "Absolument. Bloum Cash utilise un chiffrement AES-256 de bout en bout, une authentification à deux facteurs et une surveillance anti-fraude en temps réel pour protéger chaque transaction.",
  },
  {
    q: "Comment contacter le support client ?",
    a: "Vous pouvez nous contacter via le formulaire sur la page Contact, par email ou via le chat intégré dans l'application. Notre équipe répond dans un délai de 2 heures.",
  },
  {
    q: "L'application est-elle disponible hors ligne ?",
    a: "L'application nécessite une connexion internet pour effectuer des transactions. Cependant, vous pouvez consulter votre historique de transactions en mode hors ligne.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border border-slate-200 rounded-2xl overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-blue-50/40 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-primary shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-slate-100 pt-4 bg-white">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Support() {
  return (
    <PageLayout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6"
          >
            <img src={csIcon} alt="Support" className="w-11 h-11 object-contain" style={{ filter: blueFilter }} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Centre d'<span className="text-primary">Assistance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Trouvez des réponses à vos questions ou contactez notre équipe. Nous sommes là pour vous aider.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-10">
            <img src={faqIcon} alt="FAQ" className="w-8 h-8 object-contain" />
            <h2 className="text-2xl font-bold text-foreground">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Besoin d'aide supplémentaire ?</h2>
          <p className="text-blue-200 mb-8">Notre équipe répond dans les 2 heures, 7j/7.</p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            Contacter le Support
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
