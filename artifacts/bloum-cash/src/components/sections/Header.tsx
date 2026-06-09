import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

const navLinks = [
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Sécurité", href: "/securite" },
  { label: "À propos", href: "/a-propos" },
  { label: "Support", href: "/support" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const, staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20 },
};

function NavLink({ label, href }: { label: string; href: string }) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <motion.span
        className={`relative font-medium cursor-pointer transition-colors ${
          isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
        }`}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {label}
        <motion.span
          className="absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full"
          variants={{
            rest: { width: isActive ? "100%" : "0%" },
            hover: { width: "100%" },
          }}
          transition={{ duration: 0.25, ease: "easeOut" as const }}
        />
      </motion.span>
    </Link>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src={logoUrl} alt="Bloum Cash Logo" className="w-10 h-10 rounded-xl" />
            <span className="text-xl font-bold text-primary tracking-tight whitespace-nowrap">Bloum Cash</span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} label={link.label} href={link.href} />
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/telecharger">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button className="bg-gradient-to-r from-primary to-blue-800 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-shadow">
                Télécharger l'application
              </Button>
            </motion.div>
          </Link>
        </div>

        <motion.button
          className="md:hidden text-foreground p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden bg-white border-b border-border shadow-lg"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={mobileItemVariants}>
                  <Link href={link.href}>
                    <span
                      className="block text-foreground font-medium py-3 px-3 rounded-xl hover:bg-blue-50 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileItemVariants} className="mt-2">
                <Link href="/telecharger">
                  <Button
                    className="bg-gradient-to-r from-primary to-blue-800 text-white rounded-full w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Télécharger l'application
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
