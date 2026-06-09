import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Info, FileText } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: "easeOut" },
});

export default function Conditions() {
  const { config } = useSiteConfig();
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-4 py-2 text-sm font-semibold text-primary mb-6">
            <FileText className="w-4 h-4" />
            Conditions Générales d'Utilisation
          </motion.div>
          <motion.h1 {...fadeUp(0.05)} className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Conditions Générales{" "}
            <span className="text-primary">d'Utilisation</span>
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="text-muted-foreground max-w-xl mx-auto">
            Dernière mise à jour : Juin 2026 · Bloum Cash SAS
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-12">

          {/* ⚠️ AVERTISSEMENT IMPORTANT */}
          <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-2xl border-2 border-red-400 bg-red-50 p-6 md:p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-red-700 font-extrabold text-lg uppercase tracking-wide mb-3">
                  ⚠ Avertissement Important
                </p>
                <p className="text-red-800 font-semibold text-base leading-relaxed mb-3">
                  Bloum Cash n'est <span className="underline decoration-2">PAS</span> une banque ni une institution financière.
                </p>
                <p className="text-red-700 leading-relaxed text-sm">
                  Bloum Cash agit uniquement comme une société <strong>FINTECH</strong> facilitant ses services en partenariat avec des partenaires agréés et licenciés dans leurs juridictions respectives. En utilisant les plateformes de Bloum Cash, vous reconnaissez que toutes les transactions financières sont fournies via des partenaires tiers autorisés.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ⚠️ AVERTISSEMENT NUMÉRO BÉNÉFICIAIRE */}
          <motion.div {...fadeUp(0.05)} className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-amber-800 font-extrabold text-base uppercase tracking-wide mb-2">
                  ⚠ Vérification du numéro de bénéficiaire
                </p>
                <p className="text-amber-900 leading-relaxed text-sm">
                  Vérifiez attentivement le numéro du bénéficiaire avant de confirmer votre transfert. <strong>Une fois la transaction validée et exécutée, les fonds envoyés vers un numéro erroné ne pourront pas être récupérés ou remboursés par Bloum Cash.</strong> Bloum Cash décline toute responsabilité en cas d'erreur de saisie du numéro bénéficiaire par l'utilisateur.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Intro société */}
          <motion.div {...fadeUp(0.08)} className="rounded-2xl bg-blue-50 border border-blue-100 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">À propos de Bloum Cash SAS</p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  <strong>Bloum Cash SAS</strong> est une société enregistrée légalement à Lomé, Togo, spécialisée dans les infrastructures de paiement numérique et les solutions fintech destinées à l'Afrique. Les services proposés peuvent inclure : collecte de paiements Mobile Money, envoi de paiements (Pay-out), outils marchands et solutions fintech. Toutes les opérations sont soumises aux réglementations locales applicables et aux politiques <strong>AML/CFT</strong> (lutte contre le blanchiment d'argent et le financement du terrorisme).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections légales */}
          {[
            {
              num: "1",
              title: "Acceptation des présentes conditions générales d'utilisation",
              content: `En accédant à l'application mobile Bloum Cash ou à tout autre service proposé sous la marque Bloum Cash (ci-après « la Plateforme »), vous reconnaissez avoir lu, compris et accepté sans réserve les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions dans leur intégralité, vous devez cesser immédiatement d'utiliser la Plateforme. L'acceptation des CGU vaut consentement éclairé et constitue un engagement contractuel entre vous et Bloum Cash SAS.`,
            },
            {
              num: "2",
              title: "Description des services proposés par la Plateforme",
              content: `Bloum Cash est une application mobile de paiement numérique permettant à ses utilisateurs d'effectuer des transferts d'argent entre les réseaux de Mobile Money disponibles (notamment TMoney et Moov Money au Togo). Les services peuvent inclure : l'envoi et la réception de fonds entre comptes Mobile Money, la consultation de l'historique des transactions, les notifications de transaction en temps réel, ainsi que des outils marchands pour les professionnels. Ces services sont disponibles 24h/24, 7j/7, sous réserve de maintenance planifiée ou d'interruptions techniques indépendantes de notre volonté.`,
            },
            {
              num: "3",
              title: "Conditions d'éligibilité et d'accès à la Plateforme",
              content: `Pour utiliser les services Bloum Cash, vous devez : (a) être âgé d'au moins 18 ans ou avoir obtenu le consentement écrit d'un tuteur légal ; (b) disposer d'un numéro de téléphone valide et actif dans le pays de service ; (c) posséder un compte Mobile Money actif chez l'un des opérateurs partenaires ; (d) fournir des informations exactes, complètes et à jour lors de votre inscription ; (e) ne pas être sous le coup d'une interdiction légale de contracter. Toute inscription effectuée en violation de ces conditions pourra entraîner la résiliation immédiate du compte.`,
            },
            {
              num: "4",
              title: "Frais de service, commissions et transparence tarifaire",
              content: `Des frais de service s'appliquent à certaines opérations effectuées via la Plateforme. Le taux de frais de transfert est actuellement fixé à ${config.transfer_fee_percent}% du montant de la transaction. Le montant minimum de transfert est de ${config.min_transfer_amount} FCFA et le montant maximum est de ${config.max_transfer_amount} FCFA. Ces frais sont clairement affichés avant toute confirmation de transaction. Bloum Cash s'engage à ne prélever aucun frais caché ou non annoncé. La grille tarifaire complète est disponible dans la section « Tarifs » de l'application et peut être modifiée après préavis de ${config.fee_notice_days} jours communiqué aux utilisateurs actifs.`,
            },
            {
              num: "5",
              title: "Responsabilités de l'utilisateur et obligations de sécurité",
              content: `Vous êtes seul responsable de : la confidentialité de vos identifiants de connexion, de votre code PIN et de votre mot de passe ; de la mise à jour de vos informations personnelles en cas de changement ; de toutes les transactions effectuées depuis votre compte, qu'elles soient autorisées ou non si vous n'avez pas signalé une perte ou un vol dans les meilleurs délais. Vous vous engagez à ne pas utiliser la Plateforme à des fins illicites, frauduleuses, ou contraires aux dispositions légales en vigueur dans votre pays de résidence.`,
            },
            {
              num: "6",
              title: "Caractère irrévocable des transactions et erreurs de saisie",
              content: `Toute transaction confirmée par l'utilisateur est définitivement exécutée et ne peut faire l'objet d'aucune annulation, modification ou remboursement une fois validée. Il incombe à l'utilisateur de vérifier avec soin, avant toute confirmation : le numéro de téléphone du bénéficiaire, le montant de la transaction, et le réseau Mobile Money de destination. Bloum Cash ne saurait être tenu responsable des fonds envoyés vers un numéro erroné ou un compte inexistant. En cas de litige, vous devez contacter notre support dans un délai de 24 heures.`,
            },
            {
              num: "7",
              title: "Limites de transaction et plafonds réglementaires",
              content: `Des limites de transaction minimale et maximale s'appliquent conformément aux exigences réglementaires locales et aux politiques internes de Bloum Cash. Ces plafonds peuvent évoluer en fonction des réglementations en vigueur. Les utilisateurs seront notifiés de toute modification. Le dépassement de certains seuils peut entraîner une demande de justificatifs supplémentaires dans le cadre du dispositif de lutte contre le blanchiment d'argent (AML).`,
            },
            {
              num: "8",
              title: "Suspension, blocage et résiliation du compte utilisateur",
              content: `Bloum Cash se réserve le droit de suspendre, bloquer ou résilier tout compte utilisateur en cas de : violation des présentes CGU ; suspicion de fraude, de blanchiment d'argent ou de financement d'activités illicites ; fourniture de fausses informations lors de l'inscription ; comportement abusif envers notre équipe de support. En cas de résiliation, les fonds disponibles dans votre compte seront restitués conformément à la procédure applicable et après vérification de votre identité.`,
            },
            {
              num: "9",
              title: "Confidentialité et protection des données personnelles",
              content: `Le traitement de vos données personnelles est régi par notre Politique de Confidentialité, disponible à l'adresse /politique-de-confidentialite. Conformément aux réglementations applicables sur la protection des données, vous disposez de droits d'accès, de rectification et de suppression de vos données. Ces droits s'exercent via notre email dédié : ${config.privacy_email}.`,
            },
            {
              num: "10",
              title: "Propriété intellectuelle et usage de la marque Bloum Cash",
              content: `La marque « Bloum Cash », le logo, l'interface graphique, le code source de l'application et tous les contenus publiés sur la Plateforme sont la propriété exclusive de Bloum Cash SAS et sont protégés par les lois sur la propriété intellectuelle. Toute reproduction, copie, distribution ou exploitation commerciale sans autorisation écrite préalable est strictement interdite et pourra donner lieu à des poursuites judiciaires.`,
            },
            {
              num: "11",
              title: "Modifications des conditions générales et notification aux utilisateurs",
              content: `Bloum Cash se réserve le droit de modifier les présentes CGU à tout moment. Toute modification substantielle sera notifiée aux utilisateurs actifs au moins 15 jours avant son entrée en vigueur, par notification dans l'application et/ou par email. La poursuite de l'utilisation de la Plateforme après cette période vaudra acceptation des nouvelles conditions. Les utilisateurs qui refusent les nouvelles conditions devront cesser d'utiliser le service et pourront demander la clôture de leur compte.`,
            },
            {
              num: "12",
              title: "Droit applicable, juridiction compétente et règlement des litiges",
              content: `Les présentes CGU sont régies par les lois en vigueur au Togo, pays de siège social de Bloum Cash SAS. En cas de litige relatif à l'interprétation ou à l'exécution des présentes conditions, les parties s'engagent à rechercher une solution amiable dans un délai de 30 jours. À défaut, le litige sera soumis aux tribunaux compétents de Lomé, Togo.`,
            },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.04)} className="border-b border-slate-100 pb-8 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-3">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{s.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div {...fadeUp(0)} className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center">
            <p className="font-semibold text-foreground mb-1">Des questions sur ces conditions ?</p>
            <p className="text-muted-foreground text-sm mb-3">
              Notre équipe juridique est disponible pour répondre à vos interrogations.
            </p>
            <a href={`mailto:${config.legal_email}`} className="text-primary font-bold hover:underline text-sm">
              {config.legal_email}
            </a>
            <span className="text-muted-foreground mx-3">·</span>
            <a href="/contact" className="text-primary font-bold hover:underline text-sm">
              Formulaire de contact
            </a>
          </motion.div>

        </div>
      </section>
    </PageLayout>
  );
}
