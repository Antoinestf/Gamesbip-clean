"use client";

import { useLanguage } from "@/lib/language-context";

export function AdPlaceholder() {
  const { lang } = useLanguage();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-20 border-t border-slate-700/50 bg-black/60 backdrop-blur-lg"
      style={{ height: "44px" }}
      aria-label="Advertisement placeholder"
    >
      <div className="flex h-full items-center justify-center gap-3 px-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          {lang === "fr" ? "[Espace Partenaire — Game's Bip]" : "[Partner Space — Game's Bip]"}
        </span>
      </div>
    </div>
  );
}
