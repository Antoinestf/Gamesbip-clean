"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { t as tFn, UI, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "gamesbip_language";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof UI) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key as string,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "fr" || stored === "en") {
        // Respect existing manual choice
        setLangState(stored);
      } else {
        // Auto-detect: fr only for French browsers, en for everything else
        const browserLang = (navigator.language || navigator.languages?.[0] || "").toLowerCase();
        const detected: Lang = browserLang.startsWith("fr") ? "fr" : "en";
        setLangState(detected);
        // Don't persist auto-detected preference — only persist manual choices
      }
    } catch {
      // SSR or storage unavailable — stay with default "en"
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, l);
      }
    } catch {
      // Storage unavailable — ignore
    }
  }

  function t(key: keyof typeof UI): string {
    return tFn(key, lang);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
