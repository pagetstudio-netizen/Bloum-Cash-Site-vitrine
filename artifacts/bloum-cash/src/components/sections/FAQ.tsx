import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment envoyer de l'argent ?",
    answer: "Connectez-vous, choisissez \"Envoyer\", entrez le montant et le numéro du destinataire, puis confirmez avec votre code PIN.",
  },
  {
    question: "Quels sont les frais ?",
    answer: "Les frais varient selon le montant transféré. Consultez notre grille tarifaire dans l'application.",
  },
  {
    question: "Comment contacter le support ?",
    answer: "Notre équipe est disponible 24h/24 via le chat en ligne dans l'application ou par email.",
  },
  {
    question: "Quels opérateurs sont disponibles ?",
    answer: "Bloum Cash supporte TMoney et Moov Money (Moov Africa), les deux principaux opérateurs au Togo.",
  },
  {
    question: "Comment sécurisez-vous les transactions ?",
    answer: "Toutes les transactions sont protégées par un code PIN, une vérification OTP et un chiffrement de bout en bout.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Questions Fréquentes
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-[20px] p-6 md:p-10 shadow-sm border border-slate-100"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 last:border-0 py-2">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}