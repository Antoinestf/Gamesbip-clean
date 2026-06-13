"use client";

import { useState, useEffect } from "react";
import { X, CircleCheck as CheckCircle2, Circle, MapPin, Gamepad2, Trophy, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { loc, locArr, type Mission } from "@/lib/missions";

export type DetailTab = "details" | "solution";

interface MissionDetailProps {
  mission:            Mission | null;
  open:               boolean;
  onOpenChange:       (open: boolean) => void;
  completed:          boolean;
  checkedObjectives:  Record<string, boolean>;
  onToggleObjective:  (objId: string) => void;
  onToggleComplete:   () => void;
  initialTab?:        DetailTab;
}

export function MissionDetail({
  mission, open, onOpenChange, completed,
  checkedObjectives, onToggleObjective, onToggleComplete, initialTab = "details",
}: MissionDetailProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);

  useEffect(() => { if (open) setActiveTab(initialTab); }, [open, initialTab]);

  if (!open || !mission) return null;

  const title       = loc(mission.title,       mission.title_en,       lang);
  const description = loc(mission.description, mission.description_en, lang);
  const startPoint  = loc(mission.startPoint,  mission.startPoint_en,  lang);
  const character   = mission.character;
  const medals      = locArr(mission.goldMedals, mission.goldMedals_en, lang);
  const steps       = locArr(mission.walkthrough, mission.walkthrough_en, lang);
  const reward      = mission.reward ? loc(mission.reward, mission.reward_en, lang) : null;
  const stock       = mission.stockAlert;
  const prerequisites = mission.prerequisites ? loc(mission.prerequisites, mission.prerequisites_en, lang) : null;
  const howToUnlock   = mission.howToUnlock ? loc(mission.howToUnlock, mission.howToUnlock_en, lang) : null;

  const tabs = [
    { id: "details"  as DetailTab, label: t("details"),  icon: <Trophy   className="h-3.5 w-3.5" /> },
    { id: "solution" as DetailTab, label: t("solution"), icon: <Gamepad2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
        <div className={cn(
          "pointer-events-auto relative w-full rounded-2xl border bg-slate-900/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden",
          "max-h-[calc(100dvh-24px)] md:max-h-[85vh]",
          completed ? "border-cyan-500/50" : "border-slate-700/50"
        )}>
          {/* Header */}
          <div className="flex items-start gap-3 p-4 border-b border-slate-700/50 shrink-0">
            <div className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 mt-0.5",
              completed ? "border-cyan-500 bg-cyan-500 text-white" : "border-cyan-500/50"
            )}>
              {completed
                ? <CheckCircle2 className="h-4 w-4" />
                : <span className="font-mono text-sm font-bold text-cyan-400">{mission.id}</span>
              }
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <h2 className={cn("text-base font-bold leading-tight", completed ? "text-cyan-400" : "text-slate-100")}>
                {title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{description}</p>
            </div>
            <button type="button" onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800/50 hover:bg-slate-700/50 transition-colors touch-manipulation">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex shrink-0 border-b border-slate-700/50">
            {tabs.map((tab) => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors touch-manipulation",
                  activeTab === tab.id ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                )}>
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <span className="absolute bottom-0 inset-x-0 h-[2px] rounded-full bg-cyan-400" />}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === "details" && (
              <>
                {stock && (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-red-400 animate-pulse" />
                      <span className="text-sm font-bold text-red-400 uppercase tracking-wide">
                        {lang === "en" ? "Stock Alert" : "Alerte Bourse"} \u2014 {stock.action} ({stock.ticker})
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="rounded-md bg-slate-800/50 border border-slate-700/50 px-2.5 py-2">
                        <p className="font-bold text-cyan-400 mb-0.5">{t("stockAlertBefore")}</p>
                        <p className="text-slate-300">{lang === "en" && stock.before_en ? stock.before_en : stock.before}</p>
                      </div>
                      <div className="rounded-md bg-slate-800/50 border border-slate-700/50 px-2.5 py-2">
                        <p className="font-bold text-cyan-400 mb-0.5">{t("stockAlertAfter")}</p>
                        <p className="text-slate-300">{lang === "en" && stock.after_en ? stock.after_en : stock.after}</p>
                      </div>
                    </div>
                  </div>
                )}

                {(prerequisites || howToUnlock) && (
                  <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5 space-y-3">
                    {prerequisites && (
                      <div>
                        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                          {lang === "en" ? "Prerequisites" : "Pr\u00e9requis"}
                        </p>
                        <p className="text-sm text-slate-300">{prerequisites}</p>
                      </div>
                    )}
                    {howToUnlock && (
                      <div>
                        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                          {lang === "en" ? "How to Unlock" : "Comment d\u00e9bloquer"}
                        </p>
                        <p className="text-sm text-slate-300">{howToUnlock}</p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Trophy className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-slate-100">{t("goldMedals")}</h3>
                    <span className="ml-auto text-xs text-slate-400">
                      {medals.filter((_, i) => !!checkedObjectives[`gold-${mission.id}-${i}`]).length}/{medals.length}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {medals.map((medal, i) => {
                      const objId = `gold-${mission.id}-${i}`;
                      const isChecked = !!checkedObjectives[objId];
                      return (
                        <li key={objId}>
                          <button type="button" onClick={() => onToggleObjective(objId)}
                            className={cn(
                              "flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors touch-manipulation border",
                              isChecked
                                ? "bg-cyan-900/30 text-cyan-400 border-cyan-700/50"
                                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 border-slate-700/50"
                            )}>
                            {isChecked
                              ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                              : <Circle       className="h-4 w-4 shrink-0 mt-0.5" />
                            }
                            <span>{medal}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {reward && (
                  <div className="rounded-lg bg-cyan-900/30 border border-cyan-700/50 px-3 py-2.5">
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-0.5">{t("rewardLabel")}</p>
                    <p className="text-sm text-slate-300">{reward}</p>
                  </div>
                )}
              </>
            )}

            {activeTab === "solution" && (
              <>
                {stock && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-red-400" />
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wide">{t("stockWarn")}</span>
                    </div>
                    <p className="text-xs text-slate-300">{lang === "en" && stock.before_en ? stock.before_en : stock.before}</p>
                  </div>
                )}

                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-700/50">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("startingPoint")}</p>
                      <p className="text-sm text-slate-100 leading-snug">{startPoint}</p>
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cyan-900/50 border border-cyan-700/50 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
                        {character}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Gamepad2 className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-slate-100">{t("stepByStep")}</h3>
                  </div>
                  <ol className="space-y-2.5">
                    {steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 font-mono text-[11px] font-bold text-cyan-400 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate-300 leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-700/50 shrink-0">
            <button type="button" onClick={onToggleComplete}
              className={cn(
                "w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors touch-manipulation",
                completed
                  ? "bg-slate-800 text-slate-400 border border-slate-700/50"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white"
              )}>
              {completed ? t("markUndo") : t("markComplete")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
