"use client";

import { useLanguage } from "@/lib/language-context";

export function AdPlaceholder() {
  const { lang } = useLanguage();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-20 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-md"
      style={{ height: "44px" }}
      aria-label="Advertisement placeholder"
    >
      <div className="flex h-full items-center justify-center gap-3 px-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        [Espace Partenaire — Game's Bip]
        </span>
      </div>
    </div>
  );
}
