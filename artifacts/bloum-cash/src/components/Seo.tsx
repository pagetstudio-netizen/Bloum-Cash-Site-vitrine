import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
}

const BASE_TITLE = "Bloum Cash | Transfert d'argent entre TMoney et Moov Money au Togo";
const BASE_DESC = "Bloum Cash est une application de transfert d'argent au Togo permettant d'envoyer rapidement des fonds entre TMoney et Moov Money de manière simple et sécurisée.";

export function Seo({ title, description, canonical }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description ?? BASE_DESC);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description ?? BASE_DESC);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && canonical) ogUrl.setAttribute("content", canonical);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && canonical) canonicalLink.setAttribute("href", canonical);
    return () => {
      document.title = BASE_TITLE;
      if (metaDesc) metaDesc.setAttribute("content", BASE_DESC);
    };
  }, [title, description, canonical]);
  return null;
}
