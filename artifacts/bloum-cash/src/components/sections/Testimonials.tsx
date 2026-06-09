import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import avatarIcon from "@assets/icon-avator-33519d44_1780861412971.png";

const testimonials = [
  {
    name: "Kofi A.",
    city: "Lomé",
    text: "Bloum Cash a révolutionné la façon dont j'envoie de l'argent à ma famille. Simple et rapide !",
  },
  {
    name: "Ama D.",
    city: "Kpalimé",
    text: "Plus besoin de faire la queue ! Je transfère entre TMoney et Moov en quelques secondes.",
  },
  {
    name: "Yao M.",
    city: "Sokodé",
    text: "L'application est vraiment sécurisée. J'ai confiance pour mes transactions quotidiennes.",
  },
  {
    name: "Akosua B.",
    city: "Atakpamé",
    text: "Le support client est excellent. Ils répondent rapidement à toutes mes questions.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Ce que disent nos utilisateurs
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-[2rem] p-10 md:p-14 w-full shadow-sm text-center relative"
            >
              <Quote className="w-12 h-12 text-blue-100 absolute top-8 left-8" />
              
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-xl md:text-2xl text-foreground font-medium mb-10 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex flex-col items-center">
                <img
                  src={avatarIcon}
                  alt={testimonials[currentIndex].name}
                  loading="lazy"
                  width="64"
                  height="64"
                  className="w-16 h-16 rounded-full mb-3 bg-white p-1 shadow-sm"
                />
                <h4 className="font-bold text-foreground text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].city}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? "bg-primary w-8" : "bg-slate-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}