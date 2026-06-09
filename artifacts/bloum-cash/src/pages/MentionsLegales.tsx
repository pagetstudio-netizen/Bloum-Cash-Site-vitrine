import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import PageLayout from "@/components/PageLayout";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export default function MentionsLegales() {
  const { config } = useSiteConfig();

  const sections = [
    {
      title: "Éditeur du site",
      content: [
        "Dénomination sociale : Ashtech Sarl",
        "Siège social : Cameroun",
        `Email : ${config.contact_email}`,
        "Directeur de la publication : Équipe Bloum Cash",
      ],
    },
    {
      title: "Hébergement",
      content: [
        "L'application et le site web Bloum Cash sont hébergés sur des infrastructures cloud sécurisées.",
        "Les serveurs sont situés en Europe et en Afrique pour garantir la meilleure performance pour les utilisateurs togolais.",
      ],
    },
    {
      title: "Propriété intellectuelle",
      content: [
        "L'ensemble des contenus présents sur l'application Bloum Cash (textes, images, logos, icônes, charte graphique) sont protégés par le droit de la propriété intellectuelle.",
        "Toute reproduction, représentation ou diffusion, en tout ou partie, sans autorisation écrite préalable de Bloum Cash est strictement interdite.",
      ],
    },
    {
      title: "Limitation de responsabilité",
      content: [
        "Bloum Cash s'engage à maintenir un service disponible 24h/24, 7j/7, mais ne peut garantir une disponibilité absolue.",
        "En cas d'indisponibilité du service, Bloum Cash s'engage à informer ses utilisateurs dans les plus brefs délais.",
        "La responsabilité de Bloum Cash ne saurait être engagée en cas de force majeure ou de défaillance des réseaux téléphoniques des opérateurs partenaires.",
      ],
    },
    {
      title: "Droit applicable",
      content: [
        "Les présentes mentions légales sont régies par le droit camerounais.",
        "En cas de litige, les tribunaux compétents sont ceux du Cameroun.",
      ],
    },
    {
      title: "Contact",
      content: [
        `Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à : ${config.legal_email}`,
      ],
    },
  ];

  return (
    <PageLayout>
      <Seo
        title="Mentions légales Bloum Cash | Ashtech Sarl — Cameroun"
        description="Mentions légales de Bloum Cash, édité par Ashtech Sarl. Informations légales sur l'application de transfert d'argent au Togo."
        canonical="https://bloumcash.com/mentions-legales"
      />
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Mentions <span className="text-primary">Légales</span>
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
          <div className="space-y-12">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-slate-100 pb-10 last:border-0 last:pb-0"
              >
                <h2 className="text-xl font-bold text-primary mb-4">{s.title}</h2>
                <ul className="space-y-2">
                  {s.content.map((line, j) => (
                    <li key={j} className="text-muted-foreground leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
