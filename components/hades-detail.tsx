"use client";

import { useEffect, useState } from "react";
import { X, CircleCheck as CheckCircle2, Scroll, FlameKindling, Sword, Trophy, Gamepad2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { SupportBanner } from "@/components/support-banner";
import type { HadesProphecy, HadesIncantation, HadesWeapon, WeaponAspect } from "@/lib/data/hades2";

type HadesDetailItem =
  | { kind: "prophecy";   data: HadesProphecy }
  | { kind: "incantation"; data: HadesIncantation }
  | { kind: "aspect";     data: WeaponAspect; weapon: HadesWeapon };

type DrawerTab = "details" | "solution";

interface HadesDetailProps {
  item:            HadesDetailItem | null;
  open:            boolean;
  onOpenChange:    (open: boolean) => void;
  completed:       boolean;
  onToggleComplete: () => void;
}

const categoryLabels: Record<string, { fr: string; en: string }> = {
  main:      { fr: "Qu\u00eate principale", en: "Main Quest"  },
  power:     { fr: "Puissance",        en: "Power"       },
  companion: { fr: "Compagnon",        en: "Companion"   },
  mastery:   { fr: "Ma\u00eetrise",         en: "Mastery"     },
};

export function HadesDetail({ item, open, onOpenChange, completed, onToggleComplete }: HadesDetailProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<DrawerTab>("details");

  useEffect(() => { if (open) setActiveTab("details"); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open || !item) return null;

  const l = (b: { fr: string; en: string }) => b[lang as "fr" | "en"];

  const title = item.kind === "prophecy" ? l(item.data.title)
    : item.kind === "incantation" ? l(item.data.title)
    : l(item.data.name);

  const subtitle = item.kind === "prophecy" ? l(item.data.description)
    : item.kind === "incantation" ? l(item.data.effect)
    : l(item.data.description);

  const kindIcon = item.kind === "prophecy"
    ? <Scroll className="h-5 w-5 text-cyan-400" />
    : item.kind === "incantation"
    ? <FlameKindling className="h-5 w-5 text-cyan-400" />
    : <Sword className="h-5 w-5 text-cyan-400" />;

  const hasSolution =
    (item.kind === "prophecy"    && !!item.data.walkthrough) ||
    (item.kind === "incantation" && !!item.data.how_to)      ||
    (item.kind === "aspect"      && (!!item.data.unlockHint || !!item.weapon.masterGuide));

  const tabs: { id: DrawerTab; labelFr: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: "details",  labelFr: "D\u00e9tails",  labelEn: "Details",     icon: <Trophy   className="h-3.5 w-3.5" /> },
    { id: "solution", labelFr: "Solution", labelEn: "Walkthrough", icon: <Gamepad2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
        <div className="pointer-events-auto relative w-full flex flex-col overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-2xl"
          style={{ maxHeight: "calc(100dvh - 24px)" }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Header */}
          <div className="flex items-start gap-3 p-4 shrink-0 border-b border-slate-700/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-0.5 border-2 border-cyan-500/50 bg-cyan-900/30">
              {completed ? <CheckCircle2 className="h-5 w-5 text-cyan-400" /> : kindIcon}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <h2 className={`text-base font-black leading-tight ${completed ? "text-cyan-400" : "text-slate-100"}`}>
                {title}
              </h2>
              <p className="text-xs mt-0.5 line-clamp-2 text-slate-400">{subtitle}</p>
            </div>
            <button type="button" onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 rounded-lg p-1.5 transition-colors touch-manipulation text-slate-400 hover:text-slate-100 bg-slate-800/50 hover:bg-slate-700/50">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex shrink-0 border-b border-slate-700/50">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-all touch-manipulation ${isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>
                  {tab.icon}
                  {lang === "fr" ? tab.labelFr : tab.labelEn}
                  {isActive && <span className="absolute bottom-0 inset-x-0 h-[2px] rounded-full bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === "details" && (
              <>
                {(() => {
                  const alertType = item.kind === "prophecy" ? item.data.alertType
                    : item.kind === "aspect" ? item.weapon.alertType
                    : undefined;
                  const alertDesc = item.kind === "prophecy" ? item.data.alertDescription
                    : item.kind === "aspect" ? item.weapon.alertDescription
                    : undefined;
                  if (!alertType || !alertDesc) return null;
                  return (
                    <div className={`flex gap-2.5 p-3 rounded-lg text-sm border ${
                      alertType === 'quest'
                        ? 'bg-orange-500/10 border-orange-500/20 text-orange-200'
                        : 'bg-red-500/10 border-red-500/20 text-red-200'
                    }`}>
                      <span className="shrink-0 mt-0.5">{alertType === 'quest' ? '⚠️' : '💎'}</span>
                      <p className="leading-relaxed">{alertDesc}</p>
                    </div>
                  );
                })()}
                {item.kind === "prophecy" && (
                  <>
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide bg-cyan-900/50 text-cyan-400 border border-cyan-700/50">
                      {categoryLabels[item.data.category][lang as "fr" | "en"]}
                    </span>
                    <div className="rounded-xl p-3.5 bg-slate-800/50 border border-slate-700/50">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-cyan-400">
                        \u2726 {lang === "fr" ? "R\u00e9compense" : "Reward"}
                      </p>
                      <p className="text-sm font-semibold text-slate-100">{l(item.data.reward)}</p>
                    </div>
                    <div className="rounded-xl p-3.5 bg-slate-800/50 border border-slate-700/50">
                      <p className="text-xs leading-relaxed text-slate-300">{l(item.data.description)}</p>
                    </div>
                  </>
                )}
                {item.kind === "incantation" && (
                  <>
                    <div className="rounded-xl p-3.5 bg-slate-800/50 border border-slate-700/50">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5 text-cyan-400">
                        {lang === "fr" ? "Ingr\u00e9dients requis" : "Required Materials"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.data.materials.map((mat) => (
                          <span key={mat} className="rounded-lg px-2.5 py-1 text-xs font-semibold bg-cyan-900/50 text-cyan-400 border border-cyan-700/50">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl p-3.5 bg-slate-800/50 border border-slate-700/50">
                      <p className="text-xs leading-relaxed text-slate-300">{l(item.data.effect)}</p>
                    </div>
                  </>
                )}
                {item.kind === "aspect" && (
                  <>
                    <div className="rounded-xl p-3 bg-slate-800/50 border border-slate-700/50">
                      <span className="text-xl mr-2">{item.weapon.emoji}</span>
                      <span className="text-sm font-semibold text-slate-100">{l(item.weapon.name)}</span>
                      {item.weapon.description && (
                        <p className="text-xs text-slate-400 mt-1.5">{l(item.weapon.description)}</p>
                      )}
                    </div>
                    <div className="rounded-xl p-3.5 bg-slate-800/50 border border-slate-700/50">
                      <p className="text-xs leading-relaxed text-slate-300">{l(item.data.description)}</p>
                    </div>
                    <div className="rounded-xl p-3.5 bg-slate-800/50 border border-slate-700/50">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5 text-cyan-400">
                        {lang === "fr" ? "Tous les aspects" : "All Aspects"}
                      </p>
                      <ul className="space-y-2">
                        {item.weapon.aspects.map((asp) => (
                          <li key={asp.id} className={`flex items-start gap-2 text-sm ${asp.id === item.data.id ? "text-cyan-400 font-semibold" : "text-slate-300"}`}>
                            <span className="shrink-0 mt-0.5">{asp.id === item.data.id ? "\u25C6" : "\u25C7"}</span>
                            <div>
                              <span>{l(asp.name)}</span>
                              {asp.unlockHint && (
                                <p className="text-[11px] text-slate-500 mt-0.5">{l(asp.unlockHint)}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "solution" && (
              <>
                {!hasSolution && (
                  <div className="rounded-xl p-4 text-center bg-slate-800/50 border border-slate-700/50">
                    <p className="text-sm text-slate-400">
                      {lang === "fr" ? "Pas encore de guide disponible." : "No guide available yet."}
                    </p>
                  </div>
                )}
                {item.kind === "prophecy" && item.data.walkthrough && (
                  <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs font-black uppercase tracking-widest mb-3 text-cyan-400">
                      \uD83C\uDFAE {lang === "fr" ? "Guide & Solution" : "Guide & Solution"}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-300">{l(item.data.walkthrough)}</p>
                  </div>
                )}
                {item.kind === "incantation" && item.data.how_to && (
                  <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs font-black uppercase tracking-widest mb-3 text-cyan-400">
                      \uD83C\uDFAE {lang === "fr" ? "Comment obtenir" : "How to obtain"}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-300">{l(item.data.how_to)}</p>
                  </div>
                )}
                {item.kind === "aspect" && (
                  <>
                    {item.data.unlockHint && (
                      <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                        <p className="text-xs font-black uppercase tracking-widest mb-2 text-cyan-400">
                          \uD83D\uDD13 {lang === "fr" ? "Comment d\u00e9bloquer" : "How to unlock"}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-300">{l(item.data.unlockHint)}</p>
                      </div>
                    )}
                    {item.weapon.masterGuide && (
                      <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                        <p className="text-xs font-black uppercase tracking-widest mb-3 text-cyan-400">
                          \u2694\uFE0F {lang === "fr" ? "Algorithme de D\u00e9blocage" : "Unlock Algorithm"}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-300">{l(item.weapon.masterGuide)}</p>
                      </div>
                    )}
                  </>
                )}
                <SupportBanner gameId="hades2" className="mt-2" />
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 shrink-0 border-t border-slate-700/50">
            <button type="button" onClick={onToggleComplete}
              className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors touch-manipulation ${completed ? "bg-slate-800 text-slate-400 border border-slate-700/50" : "bg-cyan-600 hover:bg-cyan-500 text-white"}`}>
              {completed
                ? (lang === "fr" ? "\u2713 Termin\u00e9 \u2014 Appuyer pour annuler" : "\u2713 Done \u2014 Tap to undo")
                : (lang === "fr" ? "Marquer comme termin\u00e9" : "Mark as Complete")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
