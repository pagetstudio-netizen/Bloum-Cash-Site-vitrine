import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

export default function AdminTOTPSetup() {
  const [, setLocation] = useLocation();
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const preAuthToken = sessionStorage.getItem("preAuthToken");
    if (!preAuthToken) { setLocation("/admin"); return; }
    fetch("/api/admin/totp-setup", {
      headers: { Authorization: `Bearer ${preAuthToken}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.qrCode) { setQrCode(data.qrCode); setSecret(data.secret); }
        else setError("Impossible de charger le QR code.");
      })
      .catch(() => setError("Erreur réseau."))
      .finally(() => setFetching(false));
  }, []);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const preAuthToken = sessionStorage.getItem("preAuthToken");
    try {
      const res = await fetch("/api/admin/totp-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${preAuthToken}` },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Code invalide"); return; }
      sessionStorage.removeItem("preAuthToken");
      localStorage.setItem("adminToken", data.token);
      setLocation("/admin/dashboard");
    } catch { setError("Erreur réseau."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a5e] to-[#0f0f3d] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logoUrl} alt="Bloum Cash" className="w-14 h-14 rounded-2xl mb-3 shadow-md" />
          <h1 className="text-xl font-extrabold text-[#1a1a5e]">Configuration Google Authenticator</h1>
          <p className="text-slate-500 text-sm mt-1 text-center">
            Scannez ce QR code avec l'application Google Authenticator
          </p>
        </div>

        {fetching ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-[#1a1a5e] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {qrCode && (
              <div className="flex flex-col items-center mb-6">
                <div className="border-4 border-[#1a1a5e]/20 rounded-2xl p-3 bg-white shadow">
                  <img src={qrCode} alt="QR Code TOTP" className="w-48 h-48" />
                </div>
                <div className="mt-3 bg-slate-50 rounded-xl px-4 py-2 text-center">
                  <p className="text-xs text-slate-500 mb-1">Code secret manuel :</p>
                  <p className="font-mono text-sm font-bold text-[#1a1a5e] tracking-widest break-all">{secret}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Entrez le code à 6 chiffres affiché dans Google Authenticator
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/30 transition"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading || code.length !== 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#1a1a5e] text-white font-bold py-3.5 rounded-full shadow-lg hover:bg-[#14145a] transition disabled:opacity-50"
              >
                {loading ? "Vérification…" : "Activer l'authentification à deux facteurs"}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
