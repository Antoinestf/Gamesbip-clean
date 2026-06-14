"use client";

import { useState, useEffect } from "react";
import { X, CircleCheck as CheckCircle2, MapPin, Gamepad2, Trophy, TrendingUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import type { Lang } from "@/lib/i18n";
import { loc, locArr, ZONES, type SecondaryMission } from "@/lib/missions";
import { getActivityTip, type Activity } from "@/lib/activities";

type DetailTab = "details" | "solution";

interface SecondaryDetailProps {
  mission:    SecondaryMission | null;
  activity:   Activity | null;
  open:       boolean;
  onClose:    () => void;
  completed:  boolean;
  onToggle:   () => void;
  initialTab?: DetailTab;
}

export function SecondaryDetail({
  mission, activity, open, onClose, completed, onToggle, initialTab = "details",
}: SecondaryDetailProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);

  useEffect(() => { if (open) setActiveTab(initialTab); }, [open, initialTab]);

  if (!open || (!mission && !activity)) return null;

  const tabs = [
    { id: "details" as DetailTab, label: t("details"), icon: <Trophy className="h-3.5 w-3.5" /> },
    { id: "solution" as DetailTab, label: t("solution"), icon: <Gamepad2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
        <div className={cn(
          "pointer-events-auto relative w-full rounded-2xl border bg-black/70 backdrop-blur-lg shadow-2xl flex flex-col overflow-hidden",
          "max-h-[calc(100dvh-24px)] md:max-h-[85vh]",
          completed ? "border-cyan-500/50" : "border-slate-700/50"
        )}>
          {mission && <MissionContent mission={mission} tabs={tabs} activeTab={activeTab}
            setActiveTab={setActiveTab} completed={completed} onToggle={onToggle} onClose={onClose} lang={lang} t={t} />}
          {activity && !mission && <ActivityContent activity={activity} tabs={tabs} activeTab={activeTab}
            setActiveTab={setActiveTab} completed={completed} onToggle={onToggle} onClose={onClose} lang={lang} t={t} />}
        </div>
      </div>
    </>
  );
}

function MissionContent({
  mission, tabs, activeTab, setActiveTab, completed, onToggle, onClose, lang, t,
}: {
  mission: SecondaryMission;
  tabs: { id: DetailTab; label: string; icon: React.ReactNode }[];
  activeTab: DetailTab;
  setActiveTab: (tab: DetailTab) => void;
  completed: boolean;
  onToggle: () => void;
  onClose: () => void;
  lang: Lang;
  t: (key: any) => string;
}) {
  const title    = loc(mission.title, mission.title_en, lang);
  const desc     = loc(mission.description, mission.description_en, lang);
  const steps    = locArr(mission.steps, mission.steps_en, lang);
  const reward   = loc(mission.reward, mission.reward_en, lang);
  const tip      = mission.tip ? (lang === "en" && mission.tip_en ? mission.tip_en : mission.tip) : undefined;
  const stock    = mission.stockAlert;
  const isLester = mission.type === "Assassinat de Lester";
  const zone     = ZONES[mission.zone] ?? mission.zone;

  return (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 p-4 border-b border-slate-700/50 shrink-0">
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 mt-0.5",
          completed ? "border-cyan-500 bg-cyan-500 text-white" : "border-cyan-500/50"
        )}>
          {completed
            ? <CheckCircle2 className="h-4 w-4" />
            : <Gamepad2 className="h-4 w-4 text-cyan-400" />
          }
        </div>
        <div className="flex-1 min-w-0 pr-8">
          <h2 className={cn("text-base font-bold leading-tight", completed ? "text-cyan-400" : "text-slate-100")}>
            {title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{desc}</p>
        </div>
        <button type="button" onClick={onClose}
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
            {mission.alertDescription && (
              <div className={cn(
                "rounded-lg border p-3.5",
                mission.alertType === 'quest'
                  ? "bg-orange-500/10 border-orange-500/30"
                  : "bg-red-500/10 border-red-500/30"
              )}>
                <p className={cn("text-xs font-bold uppercase tracking-wide mb-1.5",
                  mission.alertType === 'quest' ? "text-orange-400" : "text-red-400"
                )}>
                  {mission.alertType === 'quest'
                    ? (lang === "en" ? "⚠ Point of No Return" : "⚠ Point de non-retour")
                    : (lang === "en" ? "💎 Unique Item" : "💎 Objet unique")}
                </p>
                <p className="text-sm leading-relaxed text-slate-200">
                  {lang === "en" && mission.alertDescription_en ? mission.alertDescription_en : mission.alertDescription}
                </p>
              </div>
            )}

            {stock && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-red-400 animate-pulse" />
                  <span className="text-sm font-bold text-red-400 uppercase tracking-wide">
                    {lang === "en" ? "Stock Alert" : "Alerte Bourse"} &mdash; {stock.action} ({stock.ticker})
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

            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-700/50">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("zoneLabel")}</p>
                  <p className="text-sm text-slate-100 leading-snug">{zone}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cyan-900/50 border border-cyan-700/50 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
                    {mission.character}
                  </span>
                </div>
              </div>
            </div>

            {tip && (
              <div className="rounded-lg bg-cyan-900/20 border border-cyan-700/30 p-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-700/50">
                    <Lightbulb className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("keyTip")}</p>
                    <p className="text-sm text-slate-200 leading-snug">{tip}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-lg bg-cyan-900/30 border border-cyan-700/50 px-3 py-2.5">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-0.5">{t("rewardLabel")}</p>
              <p className="text-sm text-slate-300">{reward}</p>
            </div>

            {isLester && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-2.5 py-1 text-xs font-semibold text-red-400">
                <TrendingUp className="h-3 w-3" />
                {t("lesterType")}
              </span>
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

            {tip && (
              <div className="rounded-lg bg-cyan-900/20 border border-cyan-700/30 p-3.5">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-cyan-400 font-medium leading-snug">{tip}</p>
                </div>
              </div>
            )}

          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50 shrink-0">
        <button type="button" onClick={onToggle}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors touch-manipulation",
            completed
              ? "bg-slate-800 text-slate-400 border border-slate-700/50"
              : "bg-cyan-600 hover:bg-cyan-500 text-white"
          )}>
          {completed ? t("markUndo") : t("markComplete")}
        </button>
      </div>
    </>
  );
}

function ActivityContent({
  activity, tabs, activeTab, setActiveTab, completed, onToggle, onClose, lang, t,
}: {
  activity: Activity;
  tabs: { id: DetailTab; label: string; icon: React.ReactNode }[];
  activeTab: DetailTab;
  setActiveTab: (tab: DetailTab) => void;
  completed: boolean;
  onToggle: () => void;
  onClose: () => void;
  lang: Lang;
  t: (key: any) => string;
}) {
  const title = lang === "en" && activity.title_en ? activity.title_en : activity.title;
  const desc  = lang === "en" && activity.description_en ? activity.description_en : activity.description;
  const tip   = getActivityTip(activity, lang);
  const zone  = ZONES[activity.zone] ?? activity.zone;
  const alertDesc = lang === "en" && activity.alertDescription_en
    ? activity.alertDescription_en
    : activity.alertDescription;

  return (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 p-4 border-b border-slate-700/50 shrink-0">
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 mt-0.5",
          completed ? "border-cyan-500 bg-cyan-500 text-white" : "border-cyan-500/50"
        )}>
          {completed
            ? <CheckCircle2 className="h-4 w-4" />
            : <Trophy className="h-4 w-4 text-cyan-400" />
          }
        </div>
        <div className="flex-1 min-w-0 pr-8">
          <h2 className={cn("text-base font-bold leading-tight", completed ? "text-cyan-400" : "text-slate-100")}>
            {title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{desc}</p>
        </div>
        <button type="button" onClick={onClose}
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
            {alertDesc && (
              <div className={cn(
                "rounded-lg p-3.5 border text-sm leading-relaxed",
                activity.alertType === 'quest'
                  ? "bg-orange-500/10 border-orange-500/20 text-orange-200"
                  : "bg-red-500/10 border-red-500/20 text-red-200"
              )}>
                <p className={cn("font-bold mb-1 text-xs uppercase tracking-wide",
                  activity.alertType === 'quest' ? "text-orange-400" : "text-red-400"
                )}>
                  {activity.alertType === 'quest' ? '⚠ Point de non-retour' : '💎 Easter Egg / Objet unique'}
                </p>
                <p>{alertDesc}</p>
              </div>
            )}
            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-700/50">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("zoneLabel")}</p>
                  <p className="text-sm text-slate-100 leading-snug">{zone}</p>
                  {activity.character && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cyan-900/50 border border-cyan-700/50 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
                      {activity.character}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                {lang === "en" ? "Category" : "Catégorie"}
              </p>
              <span className="inline-flex items-center rounded-full bg-cyan-900/50 border border-cyan-700/50 px-2.5 py-1 text-xs font-semibold text-cyan-400 capitalize">
                {activity.category === "leisure" ? (lang === "en" ? "Leisure" : "Loisirs") :
                 activity.category === "sport" ? "Sport" :
                 activity.category === "race" ? (lang === "en" ? "Races" : "Courses") :
                 activity.category === "secret" ? "Easter Eggs & Secrets" :
                 "Social"}
              </span>
            </div>

            {tip && (
              <div className="rounded-lg bg-cyan-900/20 border border-cyan-700/30 p-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-700/50">
                    <Lightbulb className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("completionReq")}</p>
                    <p className="text-sm text-slate-200 leading-snug">{tip}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "solution" && (
          <>
            {tip ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gamepad2 className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-slate-100">{t("stepByStep")}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
                </div>

                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-700/50">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("zoneLabel")}</p>
                      <p className="text-sm text-slate-100 leading-snug">{zone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-6">
                {lang === "en" ? "No detailed walkthrough available yet." : "Aucun guide détaillé disponible pour le moment."}
              </p>
            )}

          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50 shrink-0">
        <button type="button" onClick={onToggle}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors touch-manipulation",
            completed
              ? "bg-slate-800 text-slate-400 border border-slate-700/50"
              : "bg-cyan-600 hover:bg-cyan-500 text-white"
          )}>
          {completed ? t("markUndo") : t("markComplete")}
        </button>
      </div>
    </>
  );
}
