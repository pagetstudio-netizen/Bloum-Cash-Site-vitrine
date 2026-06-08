import { motion } from "framer-motion";
import { Link } from "wouter";
import heroImage from "@assets/Image_fx_1780861320599.png";
import banner1 from "@assets/20260607_084736_1780938066058.jpg";
import banner2 from "@assets/20260607_090625_1780938066105.jpg";
import StoreButtons from "@/components/StoreButtons";

function AnimatedDashedLines() {
  const paths = [
    "M -100 180 C 150 80, 400 280, 650 160 S 950 60, 1200 180 S 1500 300, 1800 160",
    "M -100 260 C 200 140, 450 360, 700 220 S 1000 100, 1280 260 S 1550 360, 1800 220",
    "M -100 340 C 180 200, 430 400, 720 280 S 1050 140, 1350 320 S 1600 420, 1800 300",
    "M -100 100 C 250 20, 500 200, 780 120 S 1100 20, 1400 140 S 1650 240, 1800 80",
    "M -100 420 C 220 300, 480 480, 760 360 S 1080 240, 1380 400 S 1630 500, 1800 380",
  ];

  const colors = [
    "rgba(59,130,246,0.35)",
    "rgba(99,102,241,0.25)",
    "rgba(37,99,235,0.3)",
    "rgba(147,197,253,0.4)",
    "rgba(79,70,229,0.2)",
  ];

  const durations = [6, 8, 7, 9, 5];
  const dashArrays = ["12 18", "8 20", "16 12", "6 22", "20 10"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <svg
        className="absolute top-0 left-0 w-full"
        style={{ height: "520px" }}
        viewBox="0 0 1800 520"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={colors[i]}
            strokeWidth={i === 3 ? 1.5 : 2}
            strokeDasharray={dashArrays[i]}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: durations[i],
              repeat: Infinity,
              repeatDelay: i * 0.6,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          />
        ))}

        {/* Moving dots along paths */}
        {[0, 2, 4].map((pathIdx) => (
          <motion.circle
            key={`dot-${pathIdx}`}
            r={3.5}
            fill={colors[pathIdx]}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: durations[pathIdx],
              repeat: Infinity,
              repeatDelay: pathIdx * 0.6,
              ease: "easeInOut",
            }}
          >
            <animateMotion
              dur={`${durations[pathIdx]}s`}
              repeatCount="indefinite"
              path={paths[pathIdx]}
            />
          </motion.circle>
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Animated dashed lines background */}
      <AnimatedDashedLines />

      {/* Soft blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[80px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Floating banners */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-3 justify-center"
          >
            <div className="relative w-full flex flex-col gap-4">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="rounded-2xl overflow-hidden shadow-xl border border-blue-100"
              >
                <img src={banner1} alt="Bloum Cash - Transfert TMoney Moov" className="w-full object-cover" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-xl border border-blue-100"
              >
                <img src={banner2} alt="Bloum Cash - TMoney Flooz" className="w-full object-cover" />
              </motion.div>
            </div>
          </motion.div>

          {/* Center Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6 w-fit mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Disponible sur iOS & Android
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              BLOUM CASH : Votre Argent, Partout au{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Togo
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Envoyez de l'argent instantanément entre TMoney et Moov Money, gérez vos transferts et profitez d'une expérience simple, rapide et sécurisée depuis votre téléphone.
            </p>
            <StoreButtons size="lg" />
          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block lg:col-span-4"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
              <img
                src={heroImage}
                alt="Person using phone in market"
                className="w-full h-full object-cover object-center aspect-[4/5] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
