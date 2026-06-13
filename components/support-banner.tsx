"use client";

import { useLanguage } from "@/lib/language-context";

interface SupportBannerProps {
  gameId: "gta5" | "hades2" | "sts2";
  className?: string;
}

const TEXTS = {
  gta5: {
    fr: "Ce traqueur t'a \u00e9vit\u00e9 de tourner en rond pendant des heures pour trouver une pi\u00e8ce de vaisseau ou un morceau de lettre ? Soutiens le site en offrant un caf\u00e9 (2\u20ac) !",
    en: "Did this tracker save you hours of aimless searching for spaceship parts or letter scraps? Support the site with a coffee (\u20ac2)!",
  },
  hades2: {
    fr: "Ce traqueur t'a \u00e9vit\u00e9 de rater ta proph\u00e9tie \u00e0 la 40\u00e8me minute de ta run ? Soutiens le site en offrant un caf\u00e9 (2\u20ac) !",
    en: "Did this tracker save your prophecy on that 40-minute run? Support the site with a coffee (\u20ac2)!",
  },
  sts2: {
    fr: "Ce guide t'a aid\u00e9 \u00e0 d\u00e9bloquer ce combo de reliques ou \u00e0 \u00e9viter ce softlock de l'Acte II ? Soutiens le site en offrant un caf\u00e9 (2\u20ac) !",
    en: "Did this guide help you nail that relic combo or dodge the Act II softlock? Support the site with a coffee (\u20ac2)!",
  },
};

export function SupportBanner({ gameId, className }: SupportBannerProps) {
  const { lang } = useLanguage();
  const text = TEXTS[gameId][lang as "fr" | "en"];

  return (
    <div className={`rounded-xl p-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 ${className ?? ""}`}>
      <p className="text-sm text-center leading-relaxed font-medium text-slate-300">
        ☕ {text}
      </p>
      <div className="flex justify-center mt-3">
        <a
          href="https://buymeacoffee.com/antofr99"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors touch-manipulation bg-cyan-600 hover:bg-cyan-500 text-white"
          style={{ minHeight: "44px" }}
        >
          ☕ {lang === "fr" ? "Soutenir le projet" : "Support the project"}
        </a>
      </div>
    </div>
  );
}
