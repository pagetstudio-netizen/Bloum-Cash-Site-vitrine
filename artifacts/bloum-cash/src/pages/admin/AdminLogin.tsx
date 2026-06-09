import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        return;
      }
      sessionStorage.setItem("preAuthToken", data.preAuthToken);
      if (data.requiresTOTPSetup) {
        setLocation("/admin/totp-setup");
      } else {
        setLocation("/admin/totp-verify");
      }
    } catch {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a5e] to-[#0f0f3d] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={logoUrl} alt="Bloum Cash" className="w-16 h-16 rounded-2xl mb-4 shadow-md" />
          <h1 className="text-2xl font-extrabold text-[#1a1a5e]">Espace Administrateur</h1>
          <p className="text-slate-500 text-sm mt-1">Connexion sécurisée</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Adresse email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/30 transition text-slate-800"
              placeholder="admin@bloumcash.tg"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/30 transition text-slate-800"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-[#1a1a5e] text-white font-bold py-3.5 rounded-full shadow-lg hover:bg-[#14145a] transition disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
