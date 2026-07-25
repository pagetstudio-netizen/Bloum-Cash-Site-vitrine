import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { LogOut, Phone, Mail, Share2, Download, Check, AlertCircle, ChevronRight, Percent, Trash2, Upload } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import logoUrl from "@assets/LOGO_512x512.jpg_1780861295653.png";

type Tab = "contact" | "social" | "download" | "fees";

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

  const [apk, setApk] = useState({
    apk_enabled: "false",
    apk_url: "",
    apk_label: "Télécharger l'APK (Android)",
    apk_size: "",
  });
  const [apkUploading, setApkUploading] = useState(false);
  const [apkDeleting, setApkDeleting] = useState(false);

  const [fees, setFees] = useState({
    transfer_fee_percent: "3,5",
    min_transfer_amount: "500",
    max_transfer_amount: "500 000",
    fee_notice_days: "15",
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
      setApk({
        apk_enabled: data.apk_enabled || "false",
        apk_url: data.apk_url || "",
        apk_label: data.apk_label || "Télécharger l'APK (Android)",
        apk_size: data.apk_size || "",
      });
      setFees({
        transfer_fee_percent: data.transfer_fee_percent || "3,5",
        min_transfer_amount: data.min_transfer_amount || "500",
        max_transfer_amount: data.max_transfer_amount || "500 000",
        fee_notice_days: data.fee_notice_days || "15",
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

  const handleApkUpload = async (file: File) => {
    setApkUploading(true);
    setSaveStatus("idle");
    const token = getToken();
    const formData = new FormData();
    formData.append("apk", file);
    try {
      const res = await fetch("/api/admin/apk-upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Erreur upload");
      }
      const data = await res.json();
      setApk((a) => ({ ...a, apk_url: data.url, apk_size: data.size }));
      setSaveStatus("success");
      refresh();
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e: any) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setApkUploading(false);
    }
  };

  const handleApkDelete = async () => {
    if (!confirm("Supprimer le fichier APK et désactiver le bouton ?")) return;
    setApkDeleting(true);
    const token = getToken();
    try {
      const res = await fetch("/api/admin/apk", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setApk({ apk_enabled: "false", apk_url: "", apk_label: apk.apk_label, apk_size: "" });
      setSaveStatus("success");
      refresh();
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setApkDeleting(false);
    }
  };

  const logout = () => { localStorage.removeItem("adminToken"); setLocation("/admin"); };

  const tabs = [
    { id: "contact" as Tab, label: "Contact & Emails", icon: <Mail className="w-4 h-4" /> },
    { id: "social" as Tab, label: "Réseaux sociaux", icon: <Share2 className="w-4 h-4" /> },
    { id: "download" as Tab, label: "Téléchargement", icon: <Download className="w-4 h-4" /> },
    { id: "fees" as Tab, label: "Frais & Tarifs", icon: <Percent className="w-4 h-4" /> },
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
          <>
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

          {/* APK direct */}
          <ApkSection
            apk={apk}
            setApk={setApk}
            uploading={apkUploading}
            deleting={apkDeleting}
            onUpload={handleApkUpload}
            onDelete={handleApkDelete}
            onSaveLabel={() => handleSave({ apk_label: apk.apk_label, apk_enabled: apk.apk_enabled })}
            saving={saving}
          />
          </>
        )}

        {/* Frais & Tarifs */}
        {tab === "fees" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Percent className="w-5 h-5 text-[#1a1a5e]" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#1a1a5e] text-lg">Frais & Tarifs</h2>
                <p className="text-slate-500 text-sm">Ces valeurs s'affichent sur toutes les pages : FAQ, CGU, politique…</p>
              </div>
            </div>

            {/* Aperçu live */}
            <div className="mb-6 rounded-2xl border-2 border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Aperçu — tel qu'affiché sur le site</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                Le taux de frais de transfert est actuellement fixé à{" "}
                <span className="font-bold text-[#1a1a5e]">{fees.transfer_fee_percent}%</span> du montant de la transaction.
                Le montant minimum est de <span className="font-bold text-[#1a1a5e]">{fees.min_transfer_amount} FCFA</span> et
                le maximum est de <span className="font-bold text-[#1a1a5e]">{fees.max_transfer_amount} FCFA</span>.
                Toute modification est communiquée avec un préavis de{" "}
                <span className="font-bold text-[#1a1a5e]">{fees.fee_notice_days} jours</span>.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Taux de frais de transfert (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fees.transfer_fee_percent}
                    onChange={(e) => setFees((f) => ({ ...f, transfer_fee_percent: e.target.value }))}
                    placeholder="3,5"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Ex : 3,5 — apparaît dans les CGU article 4 et la FAQ</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Montant minimum de transfert (FCFA)
                </label>
                <input
                  type="text"
                  value={fees.min_transfer_amount}
                  onChange={(e) => setFees((f) => ({ ...f, min_transfer_amount: e.target.value }))}
                  placeholder="500"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">Ex : 500 ou 1 000</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Montant maximum de transfert (FCFA)
                </label>
                <input
                  type="text"
                  value={fees.max_transfer_amount}
                  onChange={(e) => setFees((f) => ({ ...f, max_transfer_amount: e.target.value }))}
                  placeholder="500 000"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">Ex : 500 000 ou 1 000 000</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Délai de préavis en cas de modification des frais (jours)
                </label>
                <input
                  type="text"
                  value={fees.fee_notice_days}
                  onChange={(e) => setFees((f) => ({ ...f, fee_notice_days: e.target.value }))}
                  placeholder="15"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">Ex : 15 — mentionné dans les CGU article 4</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => handleSave(fees)}
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

// ─── Composant section APK ────────────────────────────────────────────────────
function ApkSection({
  apk, setApk, uploading, deleting, onUpload, onDelete, onSaveLabel, saving,
}: {
  apk: { apk_enabled: string; apk_url: string; apk_label: string; apk_size: string };
  setApk: React.Dispatch<React.SetStateAction<typeof apk>>;
  uploading: boolean;
  deleting: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
  onSaveLabel: () => void;
  saving: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const enabled = apk.apk_enabled === "true";
  const hasFile = !!apk.apk_url;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
          <Download className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <h2 className="font-extrabold text-[#1a1a5e] text-lg">APK direct (Android)</h2>
          <p className="text-slate-500 text-sm">Proposez le téléchargement direct du fichier APK sur la page /telecharger</p>
        </div>
      </div>

      {/* Activer / désactiver */}
      <div className={`rounded-2xl border p-4 mb-4 transition ${enabled ? "border-green-100 bg-green-50/30" : "border-slate-100 bg-slate-50"}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold text-sm ${enabled ? "text-green-700" : "text-slate-400"}`}>
              Bouton APK {enabled ? "affiché sur le site" : "masqué"}
            </p>
            {enabled && !hasFile && (
              <p className="text-xs text-amber-600 mt-0.5">⚠ Activé mais aucun APK importé — le bouton ne s'affichera pas</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{enabled ? "Actif" : "Désactivé"}</span>
            <Toggle value={enabled} onChange={(v) => setApk((a) => ({ ...a, apk_enabled: v ? "true" : "false" }))} />
          </div>
        </div>
      </div>

      {/* Libellé du bouton */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Libellé du bouton</label>
        <input
          type="text"
          value={apk.apk_label}
          onChange={(e) => setApk((a) => ({ ...a, apk_label: e.target.value }))}
          placeholder="Télécharger l'APK (Android)"
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1a1a5e]/25 transition text-slate-800 text-sm"
        />
      </div>

      {/* Fichier APK actuel */}
      {hasFile && (
        <div className="mb-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#1a1a5e]">APK importé</p>
            <p className="text-xs text-slate-500">{apk.apk_size && `${apk.apk_size} · `}
              <a href={apk.apk_url} className="underline" target="_blank" rel="noreferrer">Télécharger</a>
            </p>
          </div>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-xs font-semibold bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleting ? "Suppression…" : "Supprimer"}
          </button>
        </div>
      )}

      {/* Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".apk,.aab"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) { onUpload(file); e.target.value = ""; }
        }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-[#1a1a5e] rounded-xl py-4 text-sm font-semibold text-slate-500 hover:text-[#1a1a5e] transition disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Import en cours…" : hasFile ? "Remplacer le fichier APK" : "Importer un fichier APK"}
      </button>
      <p className="text-xs text-slate-400 mt-2 text-center">Formats acceptés : .apk, .aab · Taille max : 200 MB</p>

      <div className="mt-5 flex justify-end">
        <motion.button
          onClick={onSaveLabel}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#1a1a5e] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#14145a] transition disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : <><Check className="w-4 h-4" /> Enregistrer</>}
        </motion.button>
      </div>
    </motion.div>
  );
}
