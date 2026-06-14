"use client";

import { useLanguage } from "@/lib/language-context";

export function GlobalFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-700/50 bg-black/60 backdrop-blur-lg">
      <div className="mx-auto max-w-3xl px-4 py-10 flex flex-col items-center text-center gap-4">
        <p className="text-sm leading-relaxed text-gray-300 max-w-xl">
          {lang === "fr"
            ? "Ce traqueur vous a aidé à ne rien rater ? Soutenez le projet pour le garder 100% gratuit et sans publicité ! ☕"
            : "Did this tracker help you miss nothing? Support the project to keep it 100% free and ad-free! ☕"}
        </p>
        <a
          href="https://buymeacoffee.com/antofr99"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-full transition-colors touch-manipulation"
          style={{ minHeight: "44px", display: "inline-flex", alignItems: "center" }}
        >
          {lang === "fr" ? "Soutenir le projet" : "Support the project"}
        </a>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Game&apos;s Bip
        </p>
      </div>
    </footer>
  );
}
