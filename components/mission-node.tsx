"use client";

import { CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CharacterBadge } from "@/components/character-badge";
import { useLanguage } from "@/lib/language-context";
import { loc, type Mission } from "@/lib/missions";

interface MissionNodeProps {
  mission:         Mission;
  completed:       boolean;
  active:          boolean;
  onClick:         () => void;
}

export function MissionNode({ mission, completed, active, onClick }: MissionNodeProps) {
  const { lang } = useLanguage();
  const hasStock = !!mission.stockAlert;
  const title       = loc(mission.title,       mission.title_en,       lang);
  const description = loc(mission.description, mission.description_en, lang);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-lg border p-3 transition-all cursor-pointer",
        "bg-slate-900/80 backdrop-blur-md",
        completed
          ? "border-cyan-500/50"
          : "border-slate-700/50 hover:border-cyan-500/40",
        active && "border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.15)]",
        hasStock && !completed && "border-l-2 border-l-red-500"
      )}>
      {hasStock && !completed && (
        <div className="absolute -top-2 left-3 animate-pulse pointer-events-none">
          <span className="flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[9px] font-bold text-white shadow">
            <TrendingUp className="h-2.5 w-2.5" />
            {lang === "en" ? "STOCK" : "BOURSE"}
          </span>
        </div>
      )}

      <div className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all",
        completed
          ? "border-cyan-500 bg-cyan-500 text-white"
          : "border-slate-600 group-hover:border-cyan-500/50"
      )}>
        {completed
          ? <CheckCircle2 className="h-3.5 w-3.5" />
          : <span className="font-mono text-[10px] font-bold text-slate-500 group-hover:text-cyan-400">{mission.id}</span>
        }
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h3 className={cn("text-sm font-semibold leading-tight", completed ? "text-slate-100" : "text-slate-300")}>
            {title}
          </h3>
          <CharacterBadge protagonist={mission.protagonist} />
        </div>
        <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-1 leading-tight">{description}</p>
      </div>
    </div>
  );
}
