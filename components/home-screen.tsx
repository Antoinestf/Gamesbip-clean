"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import { GAME_REGISTRY, type GameMeta } from "@/lib/game-registry";
import { loadFromStorage } from "@/lib/storage";
import { totalMissions, totalSecondary, totalCollectibleItems } from "@/lib/missions";
import { totalActivities } from "@/lib/activities";
import { totalHades } from "@/lib/data/hades2";
import { totalSts2 } from "@/lib/data/sts2";
import { useLanguage } from "@/lib/language-context";
import { LangToggle } from "@/components/lang-toggle";
import { cn } from "@/lib/utils";

type GameView = "home" | "gta5" | "hades2" | "sts2" | "eldenring";

interface HomeScreenProps {
  onSelectGame: (view: GameView) => void;
}

const GAME_TOTALS: Record<string, number> = {
  gta5:   totalMissions + totalSecondary + totalCollectibleItems + totalActivities,
  hades2: totalHades,
  sts2:   totalSts2,
};

const GAME_COVERS: Record<string, string> = {
  gta5:   "/gta.webp",
  hades2: "/hades.avif",
  sts2:   "/sts.webp",
  eldenring: "/eldenring.webp",
};

export function HomeScreen({ onSelectGame }: HomeScreenProps) {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const result: Record<string, number> = {};
    for (const game of GAME_REGISTRY) {
      if (game.status !== "active") continue;
      const total = GAME_TOTALS[game.id];
      if (!total) continue;
      try {
        const saved = loadFromStorage(game.storageKey);
        const done  = Object.values(saved.completed).filter(Boolean).length;
        result[game.id] = Math.round((done / total) * 100);
      } catch {
        result[game.id] = 0;
      }
    }
    setProgress(result);
  }, []);

  function handleSelect(game: GameMeta) {
    if (game.status === "soon") return;
    console.log('Test click');
    console.log('Changement demandé vers:', game.id, game);
    onSelectGame(game.id as GameView);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Triptych fixed background */}
      <div
        aria-hidden
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: -10 }}
      >
        <div className="flex h-full w-full">
          <div className="w-1/3 h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gta.webp" alt="" loading="eager" className="w-full h-full object-cover object-center" draggable={false} />
          </div>
          <div className="w-1/3 h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hades.avif" alt="" loading="eager" className="w-full h-full object-cover object-top" draggable={false} />
          </div>
          <div className="w-1/3 h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sts.webp" alt="" loading="eager" className="w-full h-full object-cover object-left" draggable={false} />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <header className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-2 z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">
                {lang === "fr" ? "Votre Hub de Compl\u00e9tion" : "Your Completion Hub"}
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter sm:text-6xl text-slate-100">
              Game&apos;s{" "}
              <span className="text-cyan-400">Bip</span>
            </h1>
            <p className="mt-2 text-sm font-medium max-w-xs text-slate-300">
              {lang === "fr"
                ? "Atteignez les 100% sur tous vos jeux favoris."
                : "Reach 100% completion on all your favorite games."}
            </p>
          </div>
          <div className="pt-2 shrink-0">
            <LangToggle />
          </div>
        </div>
      </header>

      {/* Game grid */}
      <main className="relative flex-1 mx-auto w-full max-w-6xl px-4 pb-28 pt-6 z-10">
        {/* Welcome banner */}
        <div className="mb-6 rounded-2xl px-5 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
          <p className="text-sm sm:text-base font-medium leading-relaxed text-center text-slate-300">
            {lang === "fr"
              ? "Bienvenue sur Game\u2019s Bip ! Vos trackers de compl\u00e9tion et tutoriels de A \u00e0 Z pour poncer vos jeux pr\u00e9f\u00e9r\u00e9s \u00e0 100%, sans pubs invasives."
              : "Welcome to Game\u2019s Bip! Your A-to-Z completion trackers and walkthroughs to 100% your favorite games, with zero invasive ads."}
          </p>
        </div>

        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-slate-400">
          {lang === "fr" ? "S\u00e9lectionner un jeu" : "Select a game"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_REGISTRY.map((game) => {
            const displayGame = game.id === "eldenring"
              ? {
                  ...game,
                  status: "active" as const,
                  badge: { fr: "Actif", en: "Active" },
                }
              : game;
            const isLocked    = displayGame.status === "soon";
            const pct         = progress[displayGame.id] ?? 0;
            const hasProgress = displayGame.id in GAME_TOTALS;
            const isComplete  = pct >= 100;
            const tagline     = displayGame.tagline[lang as "fr" | "en"];
            const badge       = displayGame.badge[lang as "fr" | "en"];

            return (
              <button
                key={displayGame.id}
                type="button"
                onClick={() => handleSelect(displayGame)}
                disabled={isLocked}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 min-h-[200px] sm:min-h-[220px]",
                  "border border-slate-700/50",
                  !isLocked && "hover:scale-[1.02] hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_8px_32px_rgba(6,182,212,0.15)]",
                  isLocked && "cursor-not-allowed opacity-50"
                )}
              >
                {/* Background cover image */}
                {GAME_COVERS[game.id] && (
                  <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={GAME_COVERS[game.id]} alt="" loading="lazy" className="w-full h-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                )}
                {!GAME_COVERS[game.id] && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                )}

                {/* Card content */}
                <div className="relative flex flex-col flex-1 p-5">
                  {/* Year + badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">{game.year}</span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-cyan-900/50 text-cyan-400 border border-cyan-700/50">
                      {badge}
                    </span>
                  </div>

                  {/* Game title */}
                  <div className="mt-5">
                    <h3 className="text-3xl font-black tracking-tight leading-none text-slate-100">
                      {game.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium leading-snug text-slate-300">
                      {tagline}
                    </p>
                  </div>

                  {/* Progress / completion */}
                  {hasProgress && !isLocked && (
                    <div className="mt-4">
                      {isComplete ? (
                        <div className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-cyan-600 text-white">
                          <span className="text-[11px] font-black uppercase tracking-widest">
                            {lang === "fr" ? "Compl\u00e9t\u00e9" : "Completed"} — 100%
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-slate-400">
                              {lang === "fr" ? "Progression" : "Progress"}
                            </span>
                            <span className="text-[10px] font-bold font-mono text-cyan-400">
                              {pct}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-700/50">
                            <div
                              className="h-full rounded-full transition-all duration-700 bg-cyan-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400/70">
                      {game.platform}
                    </span>
                    {!isLocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold transition-transform duration-200 group-hover:translate-x-0.5 text-cyan-400">
                        {lang === "fr" ? "Ouvrir" : "Open"}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        {lang === "fr" ? "Bient\u00f4t" : "Soon"}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <span className="text-[11px] tracking-widest uppercase text-slate-500">
            {lang === "fr" ? "Plus de jeux \u00e0 venir" : "More games coming soon"}
          </span>
        </div>
      </main>
    </div>
  );
}
