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

function detectBrowserLang(): Lang {
  if (typeof window === "undefined") return "en";

  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ]
    .filter(Boolean)
    .map((code) => code.toLowerCase());

  return candidates.some((code) => code.startsWith("fr")) ? "fr" : "en";
}

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en";

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "fr" || stored === "en") return stored;
  } catch {
    // Storage unavailable — fall through to browser detection
  }

  return detectBrowserLang();
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
