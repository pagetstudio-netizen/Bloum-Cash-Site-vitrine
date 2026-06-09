import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { LogOut, Phone, Mail, Share2, Download, Check, AlertCircle, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

type Tab = "contact" | "social" | "download";

const SOCIAL_NETWORKS = [
  { key: "facebook", label: "Facebook", icon: FaFacebook },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "twitter", label: "Twitter / X", icon: FaTwitter },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin },
  { key: "youtube", label: "YouTube", icon: FaYoutube },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-[#1a1a5e]" : "bg-slate-300"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { refresh } = useSiteConfig();
  const [tab, setTab] = useState<Tab>("contact");
  const [adminEmail, setAdminEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const [contact, setContact] = useState({
    whatsapp_number: "",
    support_email: "",
    contact_email: "",
    legal_email: "",
    privacy_email: "",
  });

  const [social, setSocial] = useState<Record<string, string>>({
    facebook_url: "#", facebook_enabled: "true",
    instagram_url: "#", instagram_enabled: "true",
    twitter_url: "#", twitter_enabled: "true",
    linkedin_url: "#", linkedin_enabled: "true",
    youtube_url: "#", youtube_enabled: "true",
  });

  const [download, setDownload] = useState({
    appstore_url: "#", appstore_label: "App Store", appstore_state: "active",
    playstore_url: "#", playstore_label: "Google Play", playstore_state: "active",
  });

  const getToken = () => localStorage.getItem("adminToken");

  const checkAuth = useCallback(async () => {
    const token = getToken();
    if (!token) { setLocation("/admin"); return; }
    try {
      const res = await fetch("/api/admin/me", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) { localStorage.removeItem("adminToken"); setLocation("/admin"); return; }
      const data = await res.json();
      setAdminEmail(data.email);
    } catch { setLocation("/admin"); }
  }, [setLocation]);

  const loadConfig = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch("/api/admin/config", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const data = await res.json();
      setContact({
        whatsapp_number: data.whatsapp_number || "",
        support_email: data.support_email || "",
        contact_email: data.contact_email || "",
        legal_email: data.legal_email || "",
        privacy_email: data.privacy_email || "",
      });
      setSocial({
        facebook_url: data.facebook_url || "#", facebook_enabled: data.facebook_enabled ?? "true",
        instagram_url: data.instagram_url || "#", instagram_enabled: data.instagram_enabled ?? "true",
        twitter_url: data.twitter_url || "#", twitter_enabled: data.twitter_enabled ?? "true",
        linkedin_url: data.linkedin_url || "#", linkedin_enabled: data.linkedin_enabled ?? "true",
        youtube_url: data.youtube_url || "#", youtube_enabled: data.youtube_enabled ?? "true",
      });
      setDownload({
        appstore_url: data.appstore_url || "#",
        appstore_label: data.appstore_label || "App Store",
        appstore_state: data.appstore_state || "active",
        playstore_url: data.playstore_url || "#",
        playstore_label: data.playstore_label || "Google Play",
        playstore_state: data.playstore_state || "active",
      });
    } catch {}
  }, []);

  useEffect(() => { checkAuth(); loadConfig(); }, [checkAuth, loadConfig]);

  const handleSave = async (updates: Record<string, string>) => {
    setSaving(true);
    setSaveStatus("idle");
    const token = getToken();
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("success");
      refresh();
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally { setSaving(false); }
  };

  const logout = () => { localStorage.removeItem("adminToken"); setLocation("/admin"); };

  const tabs = [
    { id: "contact" as Tab, label: "Contact & Emails", icon: <Mail className="w-4 h-4" /> },
    { id: "social" as Tab, label: "Réseaux sociaux", icon: <Share2 className="w-4 h-4" /> },
    { id: "download" as Tab, label: "Téléchargement", icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#1a1a5e] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Bloum Cash" className="w-9 h-9 rounded-xl" />
          <div>
            <p className="font-extrabold text-lg leading-none">Bloum Cash</p>
            <p className="text-blue-300 text-xs">Panel Administrateur</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm hidden sm:block">{adminEmail}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-3 py-2 rounded-xl text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Save status banner */}
        {saveStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold ${saveStatus === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}
          >
            {saveStatus === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {saveStatus === "success" ? "Modifications enregistrées et appliquées sur tout le site." : "Erreur lors de l'enregistrement. Veuillez réessayer."}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition ${tab === t.id ? "bg-[#1a1a5e] text-white shadow" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Contact & Emails */}
        {tab === "contact" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#1a1a5e]" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#1a1a5e] text-lg">Contact & Emails</h2>
                <p className="text-slate-500 text-sm">Ces informations s'affichent sur toutes les pages du site</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { key: "whatsapp_number", label: "Numéro WhatsApp", placeholder: "+228 XX XX XX XX", type: "text" },
                { key: "support_email", label: "Email support", placeholder: "support@bloumcash.tg", type: "email" },
                { key: "contact_email", label: "Email contact (mentions légales)", placeholder: "contact@bloumcash.tg", type: "email" },
                { key: "legal_email", label: "Email légal (CGU)", placeholder: "legal@bloumcash.tg", type: "email" },
                { key: "privacy_email", label: "Email confidentialité", placeholder: "privacy@bloumcash.com", type: "email" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={contact[key as keyof typeof contact]}
                    onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => handleSave(contact)}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#1a1a5e] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#14145a] transition disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : <><Check className="w-4 h-4" /> Enregistrer</>}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Réseaux sociaux */}
        {tab === "social" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-[#1a1a5e]" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#1a1a5e] text-lg">Réseaux sociaux</h2>
                <p className="text-slate-500 text-sm">Activez ou désactivez chaque réseau et configurez les liens</p>
              </div>
            </div>

            <div className="space-y-4">
              {SOCIAL_NETWORKS.map(({ key, label, icon: Icon }) => {
                const enabled = social[`${key}_enabled`] === "true";
                const url = social[`${key}_url`] || "";
                return (
                  <div key={key} className={`rounded-2xl border p-4 transition ${enabled ? "border-blue-100 bg-blue-50/30" : "border-slate-100 bg-slate-50"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${enabled ? "text-[#1a1a5e]" : "text-slate-400"}`} />
                        <span className={`font-semibold text-sm ${enabled ? "text-[#1a1a5e]" : "text-slate-400"}`}>{label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{enabled ? "Actif" : "Désactivé"}</span>
                        <Toggle
                          value={enabled}
                          onChange={(v) => setSocial((s) => ({ ...s, [`${key}_enabled`]: v ? "true" : "false" }))}
                        />
                      </div>
                    </div>
                    {enabled && (
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setSocial((s) => ({ ...s, [`${key}_url`]: e.target.value }))}
                        placeholder={`https://${key}.com/bloumcash`}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => handleSave(social)}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#1a1a5e] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#14145a] transition disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : <><Check className="w-4 h-4" /> Enregistrer</>}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Téléchargement */}
        {tab === "download" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Download className="w-5 h-5 text-[#1a1a5e]" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#1a1a5e] text-lg">Boutons de téléchargement</h2>
                <p className="text-slate-500 text-sm">Configurez les liens App Store et Google Play sur tout le site</p>
              </div>
            </div>

            <div className="space-y-8">
              {[
                { prefix: "appstore", icon: "🍎", title: "App Store (iOS)" },
                { prefix: "playstore", icon: "🤖", title: "Google Play (Android)" },
              ].map(({ prefix, icon, title }) => {
                const url = download[`${prefix}_url` as keyof typeof download];
                const label = download[`${prefix}_label` as keyof typeof download];
                const state = download[`${prefix}_state` as keyof typeof download];
                return (
                  <div key={prefix} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{icon}</span>
                      <h3 className="font-bold text-[#1a1a5e]">{title}</h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">État du bouton</label>
                        <div className="flex gap-3">
                          {[
                            { value: "active", label: "✓ Actif" },
                            { value: "soon", label: "⏳ Bientôt disponible" },
                            { value: "disabled", label: "✕ Désactivé" },
                          ].map(({ value, label: stateLabel }) => (
                            <label key={value} className={`flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-xl border-2 text-sm font-semibold transition ${state === value ? "border-[#1a1a5e] bg-blue-50 text-[#1a1a5e]" : "border-slate-200 bg-white text-slate-500"}`}>
                              <input
                                type="radio"
                                name={`${prefix}_state`}
                                value={value}
                                checked={state === value}
                                onChange={() => setDownload((d) => ({ ...d, [`${prefix}_state`]: value }))}
                                className="sr-only"
                              />
                              {stateLabel}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom du bouton</label>
                        <input
                          type="text"
                          value={label}
                          onChange={(e) => setDownload((d) => ({ ...d, [`${prefix}_label`]: e.target.value }))}
                          placeholder={prefix === "appstore" ? "App Store" : "Google Play"}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Lien de téléchargement</label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setDownload((d) => ({ ...d, [`${prefix}_url`]: e.target.value }))}
                          placeholder={prefix === "appstore" ? "https://apps.apple.com/..." : "https://play.google.com/..."}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => handleSave(download)}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#1a1a5e] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#14145a] transition disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : <><Check className="w-4 h-4" /> Enregistrer</>}
              </motion.button>
            </div>
          </motion.div>
        )}

        <div className="mt-4 text-center">
          <a href="/" className="text-slate-400 text-sm hover:text-slate-600 transition flex items-center justify-center gap-1">
            <ChevronRight className="w-3 h-3 rotate-180" /> Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
