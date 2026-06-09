import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

export default function AdminTOTPVerify() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const preAuthToken = sessionStorage.getItem("preAuthToken");
    if (!preAuthToken) { setLocation("/admin"); return; }
    try {
      const res = await fetch("/api/admin/totp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${preAuthToken}` },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Code invalide"); setLoading(false); return; }
      sessionStorage.removeItem("preAuthToken");
      localStorage.setItem("adminToken", data.token);
      setLocation("/admin/dashboard");
    } catch { setError("Erreur réseau."); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a5e] to-[#0f0f3d] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={logoUrl} alt="Bloum Cash" className="w-14 h-14 rounded-2xl mb-3 shadow-md" />
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-[#1a1a5e]" />
          </div>
          <h1 className="text-xl font-extrabold text-[#1a1a5e]">Vérification 2FA</h1>
          <p className="text-slate-500 text-sm mt-1 text-center">
            Ouvrez Google Authenticator et entrez le code à 6 chiffres
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-4 text-center text-3xl font-mono tracking-[0.6em] focus:outline-none focus:border-[#1a1a5e] transition"
            placeholder="000000"
            maxLength={6}
            autoFocus
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading || code.length !== 6}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1a1a5e] text-white font-bold py-4 rounded-full shadow-lg hover:bg-[#14145a] transition disabled:opacity-50"
          >
            {loading ? "Vérification…" : "Accéder au panel"}
          </motion.button>

          <button
            type="button"
            onClick={() => setLocation("/admin")}
            className="w-full text-slate-400 text-sm hover:text-slate-600 transition"
          >
            ← Retour à la connexion
          </button>
        </form>
      </motion.div>
    </div>
  );
}
