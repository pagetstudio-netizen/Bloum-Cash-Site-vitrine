import { motion } from "framer-motion";
import appStoreBadge from "@assets/IMG_20260608_153519_245_1780938221870.jpg";
import googlePlayBadge from "@assets/IMG_20260608_153516_042_1780938221932.jpg";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

interface StoreButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  center?: boolean;
}

function StoreButton({
  href,
  label,
  state,
  badge,
  alt,
  h,
}: {
  href: string;
  label: string;
  state: string;
  badge: string;
  alt: string;
  h: string;
}) {
  if (state === "disabled") return null;

  if (state === "soon") {
    return (
      <div className="relative cursor-not-allowed">
        <img src={badge} alt={alt} className={`${h} w-auto object-contain rounded-xl shadow-md opacity-50 grayscale`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-lg">Bientôt</span>
        </div>
      </div>
    );
  }

  const isExternal = href && href !== "#";
  return (
    <motion.a
      href={isExternal ? href : undefined}
      target={isExternal ? "_blank" : undefined}
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="cursor-pointer block"
      title={label}
    >
      <img
        src={badge}
        alt={alt}
        className={`${h} w-auto object-contain rounded-xl shadow-md hover:shadow-lg transition-shadow`}
      />
    </motion.a>
  );
}

export default function StoreButtons({ className = "", size = "md", center = false }: StoreButtonsProps) {
  const { config } = useSiteConfig();

  const heights: Record<string, string> = { sm: "h-11", md: "h-14", lg: "h-16" };
  const h = heights[size];

  const appStoreVisible = config.appstore_state !== "disabled";
  const playStoreVisible = config.playstore_state !== "disabled";

  if (!appStoreVisible && !playStoreVisible) return null;

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${center ? "items-center justify-center" : "items-center"} ${className}`}>
      <StoreButton
        href={config.appstore_url}
        label={config.appstore_label}
        state={config.appstore_state}
        badge={appStoreBadge}
        alt={`Télécharger sur ${config.appstore_label}`}
        h={h}
      />
      <StoreButton
        href={config.playstore_url}
        label={config.playstore_label}
        state={config.playstore_state}
        badge={googlePlayBadge}
        alt={`Disponible sur ${config.playstore_label}`}
        h={h}
      />
    </div>
  );
}
