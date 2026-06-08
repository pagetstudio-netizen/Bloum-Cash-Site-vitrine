import { motion } from "framer-motion";
import { Link } from "wouter";
import appStoreBadge from "@assets/IMG_20260608_153519_245_1780938221870.jpg";
import googlePlayBadge from "@assets/IMG_20260608_153516_042_1780938221932.jpg";

interface StoreButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  center?: boolean;
}

export default function StoreButtons({ className = "", size = "md", center = false }: StoreButtonsProps) {
  const heights: Record<string, string> = {
    sm: "h-11",
    md: "h-14",
    lg: "h-16",
  };
  const h = heights[size];

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${center ? "items-center justify-center" : "items-center"} ${className}`}>
      <Link href="/telecharger">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="cursor-pointer block"
        >
          <img
            src={appStoreBadge}
            alt="Télécharger sur l'App Store"
            className={`${h} w-auto object-contain rounded-xl shadow-md hover:shadow-lg transition-shadow`}
          />
        </motion.a>
      </Link>
      <Link href="/telecharger">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="cursor-pointer block"
        >
          <img
            src={googlePlayBadge}
            alt="Disponible sur Google Play"
            className={`${h} w-auto object-contain rounded-xl shadow-md hover:shadow-lg transition-shadow`}
          />
        </motion.a>
      </Link>
    </div>
  );
}
