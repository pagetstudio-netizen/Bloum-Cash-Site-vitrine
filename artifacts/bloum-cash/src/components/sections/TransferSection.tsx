import { motion } from "framer-motion";
import transferImg from "@assets/20260608_153453_1780938183287.png";

const stats = [
  { value: "< 5 sec", label: "Temps de transfert" },
  { value: "0 FCFA", label: "Frais de retrait" },
  { value: "24/7", label: "Disponibilité" },
  { value: "100%", label: "Sécurisé" },
];

export default function TransferSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-blue-50 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            Transfert inter-opérateurs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            TMoney ↔ Moov Money en{" "}
            <span className="text-primary">quelques secondes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Bloum Cash est le pont sécurisé entre les deux principaux réseaux de mobile money au Togo. Transférez sans vous déplacer, sans formulaire, instantanément.
          </motion.p>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-0 bg-blue-100/40 rounded-3xl blur-2xl scale-95" />
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={transferImg}
              alt="Transfert sécurisé TMoney Moov Money"
              className="relative z-10 w-full object-contain drop-shadow-xl rounded-2xl"
            />
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(26,26,219,0.10)" }}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 text-center shadow-sm cursor-default"
            >
              <div className="text-3xl font-extrabold text-primary mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
