import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Database, UserCheck, Mail, Globe, FileText } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: "easeOut" },
});

const principles = [
  { icon: <Lock className="w-5 h-5 text-primary" />, label: "Chiffrement AES-256" },
  { icon: <Eye className="w-5 h-5 text-primary" />, label: "Zéro revente de données" },
  { icon: <UserCheck className="w-5 h-5 text-primary" />, label: "Droits utilisateurs garantis" },
  { icon: <Database className="w-5 h-5 text-primary" />, label: "Stockage sécurisé" },
  { icon: <Globe className="w-5 h-5 text-primary" />, label: "Conformité réglementaire" },
  { icon: <ShieldCheck className="w-5 h-5 text-primary" />, label: "AML/CFT appliqué" },
];

export default function Confidentialite() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-4 py-2 text-sm font-semibold text-primary mb-6">
            <ShieldCheck className="w-4 h-4" />
            Protection de vos données personnelles
          </motion.div>
          <motion.h1 {...fadeUp(0.05)} className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Politique de{" "}
            <span className="text-primary">Confidentialité</span>
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="text-muted-foreground max-w-xl mx-auto">
            Dernière mise à jour : Juin 2026 · Bloum Cash
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-12">

          {/* Engagement principes */}
          <motion.div {...fadeUp(0)} className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <p className="font-bold text-foreground text-lg">Notre engagement envers votre vie privée</p>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm mb-6">
              Chez Bloum Cash, la protection de votre vie privée est une priorité absolue. Cette Politique de Confidentialité vous explique de manière claire et transparente comment nous collectons, utilisons, conservons et protégeons vos données personnelles. Nous traitons vos données dans le strict respect des lois sur la protection des données applicables.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {principles.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-blue-100 text-sm font-medium text-foreground">
                  {p.icon}
                  {p.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sections détaillées */}
          {[
            {
              icon: <Database className="w-5 h-5 text-primary" />,
              num: "1",
              title: "Quelles données personnelles collectons-nous et pourquoi ?",
              content: [
                {
                  subtitle: "Données d'identité et de contact",
                  text: "Lors de votre inscription, nous collectons votre prénom, nom, numéro de téléphone mobile principal, et le cas échéant votre adresse e-mail. Ces données sont indispensables pour créer votre compte, vous identifier de façon sécurisée et vous permettre de récupérer l'accès en cas d'oubli de code PIN.",
                },
                {
                  subtitle: "Données de transaction",
                  text: "Pour chaque opération effectuée via la Plateforme, nous enregistrons : le montant de la transaction, la date et l'heure d'exécution, le numéro du bénéficiaire, le réseau opérateur (TMoney, Moov Money, etc.), le statut de la transaction (succès, échec, en attente) et les éventuels frais prélevés. Ces données constituent l'historique de vos opérations et sont nécessaires pour vous fournir les preuves de paiement, résoudre les litiges et respecter nos obligations légales.",
                },
                {
                  subtitle: "Données techniques et d'utilisation",
                  text: "Nous collectons automatiquement certaines données techniques lors de l'utilisation de l'application : modèle et système d'exploitation de votre appareil, adresse IP, identifiant unique de l'appareil (Device ID), données de crash et de performance. Ces données nous aident à améliorer la stabilité et les performances de l'application.",
                },
                {
                  subtitle: "Ce que nous ne collectons jamais",
                  text: "Nous ne collectons pas et ne stockons pas : vos coordonnées bancaires, numéros de carte de crédit ou de débit, codes secrets de votre opérateur Mobile Money, ni aucune donnée biométrique. Votre PIN Bloum Cash est chiffré et ne peut pas être consulté, même par nos équipes.",
                },
              ],
            },
            {
              icon: <Eye className="w-5 h-5 text-primary" />,
              num: "2",
              title: "Comment utilisons-nous vos données personnelles ?",
              content: [
                {
                  subtitle: "Exécution des services contractuels",
                  text: "Vos données sont utilisées principalement pour exécuter les transactions que vous initiez, vous envoyer des confirmations et reçus de paiement, maintenir votre historique de transactions et gérer votre compte utilisateur.",
                },
                {
                  subtitle: "Sécurité et prévention de la fraude",
                  text: "Nous analysons les données de transaction pour détecter les activités inhabituelles, prévenir la fraude, le blanchiment d'argent et protéger la sécurité de votre compte. En cas de suspicion de fraude, votre compte peut être temporairement suspendu dans votre propre intérêt.",
                },
                {
                  subtitle: "Obligations légales et réglementaires",
                  text: "Conformément aux réglementations AML/CFT et aux injonctions des autorités compétentes, nous pouvons être amenés à conserver et communiquer certaines données de transaction aux autorités de régulation ou judiciaires lorsque la loi l'exige.",
                },
                {
                  subtitle: "Amélioration des services",
                  text: "Des données anonymisées et agrégées peuvent être analysées pour améliorer nos services, comprendre les habitudes d'utilisation et développer de nouvelles fonctionnalités. Ces analyses ne permettent jamais d'identifier un utilisateur individuel.",
                },
              ],
            },
            {
              icon: <Lock className="w-5 h-5 text-primary" />,
              num: "3",
              title: "Comment protégeons-nous vos données contre les accès non autorisés ?",
              content: [
                {
                  subtitle: "Chiffrement de bout en bout",
                  text: "Toutes les communications entre l'application et nos serveurs sont chiffrées via des protocoles TLS/SSL. Les données sensibles stockées sur nos serveurs sont chiffrées avec l'algorithme AES-256, considéré comme le standard de référence en matière de sécurité des données.",
                },
                {
                  subtitle: "Accès restreint et contrôle interne",
                  text: "L'accès à vos données est strictement limité aux membres de l'équipe de Bloum Cash SAS qui en ont besoin pour accomplir leurs missions (support technique, équipes de sécurité). Chaque accès est tracé et auditable. Nos employés sont formés à la protection des données et soumis à des engagements de confidentialité.",
                },
                {
                  subtitle: "Authentification renforcée",
                  text: "Votre compte est protégé par un code PIN personnel à 4 chiffres, une vérification OTP (One-Time Password) envoyée par SMS, et des mécanismes de détection de connexion suspecte. Après plusieurs tentatives échouées, votre compte est temporairement verrouillé.",
                },
                {
                  subtitle: "Surveillance continue",
                  text: "Nos systèmes font l'objet d'une surveillance continue 24h/24, 7j/7. Des audits de sécurité réguliers sont effectués par des prestataires indépendants pour identifier et corriger toute vulnérabilité potentielle.",
                },
              ],
            },
            {
              icon: <Globe className="w-5 h-5 text-primary" />,
              num: "4",
              title: "Avec qui partageons-nous vos données et dans quelles conditions ?",
              content: [
                {
                  subtitle: "Opérateurs Mobile Money partenaires",
                  text: "Pour traiter vos transactions, nous partageons les informations strictement nécessaires avec les opérateurs Mobile Money concernés (TMoney, Moov Money, etc.) : numéro de l'expéditeur, numéro du bénéficiaire, montant et référence de la transaction. Ces opérateurs sont soumis à leurs propres politiques de confidentialité.",
                },
                {
                  subtitle: "Autorités réglementaires et judiciaires",
                  text: "Nous pouvons être légalement tenus de communiquer certaines données aux autorités compétentes (autorités fiscales, judiciaires, de régulation financière) sur présentation d'une injonction légale valide. Dans ce cas, nous informerons l'utilisateur concerné dans les limites autorisées par la loi.",
                },
                {
                  subtitle: "Prestataires techniques",
                  text: "Certains prestataires techniques (hébergement, envoi de SMS, analyses) peuvent avoir accès à des données limitées dans le cadre de leurs services. Ils sont liés par des contrats de traitement des données strictement conformes à nos exigences de confidentialité.",
                },
                {
                  subtitle: "Ce que nous ne ferons jamais",
                  text: "Nous ne vendons, ne louons et ne cédons jamais vos données personnelles à des tiers à des fins commerciales, publicitaires ou marketing. Aucun partage de données sans obligation légale ou accord explicite de votre part.",
                },
              ],
            },
            {
              icon: <Database className="w-5 h-5 text-primary" />,
              num: "5",
              title: "Durée de conservation de vos données personnelles",
              content: [
                {
                  subtitle: "Données de compte actif",
                  text: "Tant que votre compte est actif, vos données d'identité et d'utilisation sont conservées pour vous permettre d'accéder pleinement à nos services et consulter votre historique.",
                },
                {
                  subtitle: "Données de transaction",
                  text: "Conformément aux réglementations financières et AML/CFT en vigueur, vos données de transaction sont conservées pendant une durée minimale de 5 ans à compter de la date de la dernière opération. Cette conservation est obligatoire et ne peut être écartée même en cas de demande de suppression.",
                },
                {
                  subtitle: "Après clôture du compte",
                  text: "En cas de clôture de compte, vos données d'identité sont anonymisées dans un délai de 90 jours. Seules les données nécessaires au respect de nos obligations légales (transactions, justificatifs) sont conservées pour la durée réglementaire applicable.",
                },
              ],
            },
            {
              icon: <UserCheck className="w-5 h-5 text-primary" />,
              num: "6",
              title: "Vos droits sur vos données personnelles",
              content: [
                {
                  subtitle: "Droit d'accès",
                  text: "Vous avez le droit d'obtenir une copie de l'ensemble des données personnelles que nous détenons vous concernant. Votre demande sera traitée dans un délai de 30 jours ouvrables.",
                },
                {
                  subtitle: "Droit de rectification",
                  text: "Si des données vous concernant sont inexactes ou incomplètes, vous pouvez en demander la correction directement depuis les paramètres de votre profil dans l'application ou en contactant notre équipe.",
                },
                {
                  subtitle: "Droit à l'effacement (« droit à l'oubli »)",
                  text: "Vous pouvez demander la suppression de vos données personnelles, sous réserve de nos obligations légales de conservation (notamment les données de transaction soumises aux règles AML/CFT). Certaines données ne pourront donc pas être supprimées avant l'expiration de leur durée légale de conservation.",
                },
                {
                  subtitle: "Droit à la portabilité",
                  text: "Vous pouvez demander à recevoir vos données dans un format structuré et lisible par machine (CSV, JSON) pour les transférer vers un autre prestataire.",
                },
                {
                  subtitle: "Comment exercer vos droits ?",
                  text: "Pour exercer l'un de ces droits, contactez notre Délégué à la Protection des Données à l'adresse privacy@bloumcash.com en précisant votre identité et la nature de votre demande. Nous vous répondrons dans un délai de 30 jours.",
                },
              ],
            },
            {
              icon: <FileText className="w-5 h-5 text-primary" />,
              num: "7",
              title: "Cookies, technologies de suivi et données d'utilisation",
              content: [
                {
                  subtitle: "Application mobile",
                  text: "L'application mobile Bloum Cash n'utilise pas de cookies tiers à des fins publicitaires. Des données d'utilisation anonymisées peuvent être collectées pour analyser les performances et la stabilité de l'application (crashs, temps de chargement, fréquence d'utilisation des fonctionnalités).",
                },
                {
                  subtitle: "Contrôle utilisateur",
                  text: "Vous pouvez à tout moment désactiver la collecte de données d'utilisation anonymisées depuis les paramètres de l'application (Menu → Paramètres → Confidentialité → Données analytiques).",
                },
              ],
            },
            {
              icon: <FileText className="w-5 h-5 text-primary" />,
              num: "8",
              title: "Modifications de la présente Politique de Confidentialité",
              content: [
                {
                  subtitle: "Notification des changements",
                  text: "Nous nous réservons le droit de modifier la présente Politique de Confidentialité à tout moment afin de refléter les évolutions légales, réglementaires ou techniques. Toute modification substantielle sera communiquée aux utilisateurs actifs via une notification dans l'application et/ou par email au moins 15 jours avant son entrée en vigueur.",
                },
                {
                  subtitle: "Acceptation tacite",
                  text: "La poursuite de l'utilisation de la Plateforme après la date d'entrée en vigueur des modifications vaut acceptation de la nouvelle Politique de Confidentialité. Si vous refusez les nouvelles dispositions, vous devez cesser d'utiliser le service et demander la clôture de votre compte.",
                },
              ],
            },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.03)} className="border-b border-slate-100 pb-10 last:border-0">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Article {s.num}</span>
                  <h2 className="text-lg font-bold text-foreground leading-tight">{s.title}</h2>
                </div>
              </div>
              <div className="space-y-5 pl-12">
                {s.content.map((c, j) => (
                  <div key={j}>
                    <p className="font-semibold text-foreground text-sm mb-1">{c.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">{c.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact DPO */}
          <motion.div {...fadeUp(0)} className="rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-6 md:p-8 text-white text-center">
            <ShieldCheck className="w-10 h-10 text-white/80 mx-auto mb-3" />
            <p className="font-bold text-white text-lg mb-1">Contact — Délégué à la Protection des Données</p>
            <p className="text-blue-100 text-sm mb-4">Pour toute question relative à vos données personnelles ou pour exercer vos droits :</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:privacy@bloumcash.com" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-full px-5 py-2.5 text-sm font-bold">
                <Mail className="w-4 h-4" />
                privacy@bloumcash.com
              </a>
              <a href="/contact" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-full px-5 py-2.5 text-sm font-bold">
                <FileText className="w-4 h-4" />
                Formulaire de contact
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </PageLayout>
  );
}
