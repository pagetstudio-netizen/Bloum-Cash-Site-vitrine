import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface SiteConfig {
  whatsapp_number: string;
  support_email: string;
  contact_email: string;
  legal_email: string;
  privacy_email: string;
  facebook_url: string;
  facebook_enabled: string;
  instagram_url: string;
  instagram_enabled: string;
  twitter_url: string;
  twitter_enabled: string;
  linkedin_url: string;
  linkedin_enabled: string;
  youtube_url: string;
  youtube_enabled: string;
  appstore_url: string;
  appstore_label: string;
  appstore_state: string;
  playstore_url: string;
  playstore_label: string;
  playstore_state: string;
  transfer_fee_percent: string;
  min_transfer_amount: string;
  max_transfer_amount: string;
  fee_notice_days: string;
}

const DEFAULTS: SiteConfig = {
  whatsapp_number: "+228 XX XX XX XX",
  support_email: "support@bloumcash.tg",
  contact_email: "contact@bloumcash.tg",
  legal_email: "legal@bloumcash.tg",
  privacy_email: "privacy@bloumcash.com",
  facebook_url: "#",
  facebook_enabled: "true",
  instagram_url: "#",
  instagram_enabled: "true",
  twitter_url: "#",
  twitter_enabled: "true",
  linkedin_url: "#",
  linkedin_enabled: "true",
  youtube_url: "#",
  youtube_enabled: "true",
  appstore_url: "#",
  appstore_label: "App Store",
  appstore_state: "active",
  playstore_url: "#",
  playstore_label: "Google Play",
  playstore_state: "active",
  transfer_fee_percent: "3,5",
  min_transfer_amount: "500",
  max_transfer_amount: "500 000",
  fee_notice_days: "15",
};

interface SiteConfigContextType {
  config: SiteConfig;
  loading: boolean;
  refresh: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: DEFAULTS,
  loading: true,
  refresh: () => {},
});

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        setConfig({ ...DEFAULTS, ...data });
      }
    } catch {
      // use defaults if API is unavailable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading, refresh: fetchConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
