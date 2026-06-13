"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Award } from "lucide-react";
import { GAME_REGISTRY, type GameMeta } from "@/lib/game-registry";
import { loadFromStorage } from "@/lib/storage";
import { totalMissions, totalSecondary, totalCollectibleItems } from "@/lib/missions";
import { totalActivities } from "@/lib/activities";
import { totalHades } from "@/lib/data/hades2";
import { totalSts2 } from "@/lib/data/sts2";
import { totalEldenRing } from "@/components/elden-ring-tracker";
import { useLanguage } from "@/lib/language-context";
import { LangToggle } from "@/components/lang-toggle";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const GAME_TOTALS: Record<string, number> = {
  gta5: totalMissions + totalSecondary + totalCollectibleItems + totalActivities,
  hades2: totalHades,
  sts2: totalSts2,
  eldenring: totalEldenRing,
};

const GAME_COVERS: Record<string, string> = {
  gta5: "/gta.webp",
  hades2: "/hades.avif",
  sts2: "/sts.webp",
  eldenring: "/eldenring.webp",
};

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(215 20% 25%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={clamped >= 100 ? "#22d3ee" : "#06b6d4"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

interface GameProgress {
  game: GameMeta;
  done: number;
  total: number;
  pct: number;
}

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  const { lang } = useLanguage();
  const [games, setGames] = useState<GameProgress[]>([]);

  useEffect(() => {
    const result: GameProgress[] = [];
    for (const game of GAME_REGISTRY) {
      if (game.status !== "active") continue;
      const total = GAME_TOTALS[game.id];
      if (!total) continue;
      const saved = loadFromStorage(game.storageKey);
      const done = Object.values(saved.completed).filter(Boolean).length;
      const pct = Math.round((done / total) * 100);
      result.push({ game, done, total, pct });
    }
    setGames(result);
  }, []);

  const globalPct =
    games.length > 0
      ? Math.round(games.reduce((sum, g) => sum + g.pct, 0) / games.length)
      : 0;

  const hasCompetitor = games.some((g) => g.pct > 50);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="mx-auto w-full max-w-5xl px-4 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {lang === "fr" ? "Accueil" : "Home"}
          </button>
          <LangToggle />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">
              {lang === "fr" ? "Tableau de bord" : "Dashboard"}
            </span>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {lang === "fr" ? "Ma Progression" : "My Progress"}
            </h1>
          </div>

          {/* Compétiteur badge */}
          {hasCompetitor && (
            <div className="flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-2">
              <Award className="h-5 w-5 text-gold" />
              <span className="text-sm font-bold text-gold">
                {lang === "fr" ? "Compétiteur" : "Competitor"}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-24">
        {/* Global progress */}
        <section className="mb-10 rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {lang === "fr" ? "Progression globale" : "Overall Progress"}
            </h2>
            <span className="text-sm font-bold font-mono text-cyan-400">
              {globalPct}%
            </span>
          </div>
          <Progress value={globalPct} className="h-3" />
          <p className="mt-2 text-[11px] text-slate-500">
            {lang === "fr"
              ? `Moyenne de ${games.length} jeu${games.length > 1 ? "x" : ""} suivis`
              : `Average across ${games.length} tracked game${games.length !== 1 ? "s" : ""}`}
          </p>
        </section>

        {/* Per-game progress rings */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-slate-400">
            {lang === "fr" ? "Détail par jeu" : "Per-Game Detail"}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {games.map(({ game, done, total, pct }) => {
              const isComplete = pct >= 100;
              const isCompetitor = pct > 50;

              return (
                <div
                  key={game.id}
                  className="relative flex flex-col items-center rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md p-6 overflow-hidden"
                >
                  {/* Background cover (subtle) */}
                  {GAME_COVERS[game.id] && (
                    <div className="absolute inset-0 opacity-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={GAME_COVERS[game.id]}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <ProgressRing value={pct} size={110} strokeWidth={7}>
                      <span
                        className={cn(
                          "text-xl font-black font-mono",
                          isComplete ? "text-cyan-400" : "text-slate-100"
                        )}
                      >
                        {pct}%
                      </span>
                    </ProgressRing>

                    <h3 className="mt-4 text-base font-bold tracking-tight text-center">
                      {game.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-slate-400 font-mono">
                      {done} / {total}
                    </p>

                    {isCompetitor && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                        <Award className="h-3 w-3" />
                        {lang === "fr" ? "Compétiteur" : "Competitor"}
                      </span>
                    )}

                    {isComplete && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-cyan-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {lang === "fr" ? "Complété" : "Completed"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
