"use client";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center rounded-lg border border-slate-700/50 bg-black/60 backdrop-blur-lg p-0.5 shrink-0"
      role="group"
      aria-label="Sélection de langue / Language selection"
    >
      {(["fr", "en"] as const).map((l) => {
        const isActive = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={isActive}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest transition-all touch-manipulation select-none",
              isActive
                ? "bg-cyan-900/50 text-cyan-400 border border-cyan-700/50"
                : "text-slate-400 hover:text-slate-100 border border-transparent"
            )}
          >
            <span className="text-sm leading-none" aria-hidden>
              {l === "fr" ? "\u{1F1EB}\u{1F1F7}" : "\u{1F1EC}\u{1F1E7}"}
            </span>
            <span>{l.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
