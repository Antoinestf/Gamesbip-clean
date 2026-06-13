"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleCheck as CheckCircle2, Sparkles, Eye, Gem, Users, ArrowLeft, Trophy, X, Gamepad2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LangToggle } from "@/components/lang-toggle";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import {
  sts2Characters, sts2Secrets, sts2Relics,
  totalCharacters, totalSecrets, totalRelics, totalSts2,
  type Sts2Item,
} from "@/lib/data/sts2";

const STORAGE_KEY = "gamesbip_sts2_progress";

type ActiveTab = "characters" | "secrets" | "relics";

interface Sts2TrackerProps { onBack: () => void }

// ─── Detail Modal (standardized) ─────────────────────────────────────────────

function Sts2DetailModal({
  item, open, onClose, completed, onToggle, lang,
}: {
  item: Sts2Item | null;
  open: boolean;
  onClose: () => void;
  completed: boolean;
  onToggle: () => void;
  lang: string;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "solution">("details");

  useEffect(() => { if (open) setActiveTab("details"); }, [open]);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open || !item) return null;
  const l = (b: { fr: string; en: string }) => b[lang as "fr" | "en"];

  const icon = item.category === "character" ? "🎮"
    : item.category === "secret" ? "📍" : "💎";

  const tabs = [
    { id: "details" as const, label: lang === "fr" ? "Détails" : "Details", icon: <Trophy className="h-3.5 w-3.5" /> },
    { id: "solution" as const, label: lang === "fr" ? "Solution" : "Walkthrough", icon: <Gamepad2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
        <div className={`pointer-events-auto relative w-full rounded-2xl border bg-slate-900/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden max-h-[calc(100dvh-24px)] md:max-h-[85vh] ${completed ? "border-cyan-500/50" : "border-slate-700/50"}`}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Header */}
          <div className="flex items-start gap-3 p-4 border-b border-slate-700/50 shrink-0">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl border-2 mt-0.5 ${completed ? "border-cyan-500 bg-cyan-500/20" : "border-cyan-500/50 bg-cyan-900/30"}`}>
              {completed ? <CheckCircle2 className="h-5 w-5 text-cyan-400" /> : icon}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <h2 className={`text-base font-bold leading-tight ${completed ? "text-cyan-400" : "text-slate-100"}`}>
                {l(item.title)}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{l(item.description)}</p>
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
                className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors touch-manipulation ${activeTab === tab.id ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>
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
                {item.alertType && item.alertDescription && (
                  <div className={`flex gap-2.5 p-3 rounded-lg text-sm border ${
                    item.alertType === 'quest'
                      ? 'bg-orange-500/10 border-orange-500/20 text-orange-200'
                      : 'bg-red-500/10 border-red-500/20 text-red-200'
                  }`}>
                    <span className="shrink-0 mt-0.5">{item.alertType === 'quest' ? '⚠️' : '💎'}</span>
                    <p className="leading-relaxed">{item.alertDescription}</p>
                  </div>
                )}
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <p className="text-sm text-slate-300 leading-relaxed">{l(item.description)}</p>
                </div>

                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                      {lang === "en" ? "Prerequisites" : "Prérequis"}
                    </p>
                    <p className="text-sm text-slate-300">{l(item.prerequisites)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                      {lang === "en" ? "How to Unlock" : "Comment débloquer"}
                    </p>
                    <p className="text-sm text-slate-300">{l(item.howToUnlock)}</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === "solution" && (
              <>
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gamepad2 className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-slate-100">
                      {lang === "en" ? "Strategy Guide" : "Guide stratégique"}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{l(item.solution)}</p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-700/50 shrink-0">
            <button type="button" onClick={onToggle}
              className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors touch-manipulation ${completed ? "bg-slate-800 text-slate-400 border border-slate-700/50" : "bg-cyan-600 hover:bg-cyan-500 text-white"}`}>
              {completed
                ? (lang === "fr" ? "\u2713 Terminé \u2014 Appuyer pour annuler" : "\u2713 Done \u2014 Tap to undo")
                : (lang === "fr" ? "Marquer comme terminé" : "Mark as Complete")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── CheckTile ────────────────────────────────────────────────────────────────

function CheckTile({
  label, sublabel, isDone, onToggle, onInfo, alertType,
}: {
  label: string; sublabel?: string; isDone: boolean;
  onToggle: () => void; onInfo?: () => void;
  alertType?: 'item' | 'quest';
}) {
  return (
    <div
      onClick={onInfo}
      className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-200 bg-slate-900/80 backdrop-blur-md border ${isDone ? "border-cyan-500/50" : "border-slate-700/50"} ${onInfo ? "cursor-pointer hover:border-cyan-500/40" : ""}`}>
      <button type="button" onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all touch-manipulation border-2 ${isDone ? "border-cyan-500 bg-cyan-500" : "border-slate-600"}`}
        aria-label={isDone ? "Marquer comme non terminé" : "Marquer comme terminé"}>
        {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-100" : "text-slate-300"}`}>{label}</span>
          {alertType === 'item' && (
            <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded font-medium tracking-wide shrink-0">
              Objet unique
            </span>
          )}
          {alertType === 'quest' && (
            <span className="bg-orange-500/20 text-orange-400 text-[9px] px-1.5 py-0.5 rounded font-medium tracking-wide shrink-0">
              Point de non-retour
            </span>
          )}
        </div>
        {sublabel && <p className="text-[11px] mt-0.5 text-slate-400">{sublabel}</p>}
      </div>
    </div>
  );
}

// ─── Main Tracker ─────────────────────────────────────────────────────────────

export function Sts2Tracker({ onBack }: Sts2TrackerProps) {
  const { lang } = useLanguage();
  const [hydrated,   setHydrated]   = useState(false);
  const [completed,  setCompleted]  = useState<Record<string, boolean>>({});
  const [activeTab,  setActiveTab]  = useState<ActiveTab>("characters");
  const [detailItem, setDetailItem] = useState<Sts2Item | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage(STORAGE_KEY);
    setCompleted(saved.completed);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage({ completed, checked: {} }, STORAGE_KEY);
  }, [completed, hydrated]);

  function toggle(id: string) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const l = (b: { fr: string; en: string }) => b[lang as "fr" | "en"];

  const charDone   = useMemo(() => sts2Characters.filter((c) => !!completed[c.id]).length, [completed]);
  const secretDone = useMemo(() => sts2Secrets.filter((s) => !!completed[s.id]).length, [completed]);
  const relicDone  = useMemo(() => sts2Relics.filter((r) => !!completed[r.id]).length, [completed]);
  const totalDone  = charDone + secretDone + relicDone;
  const globalPct  = totalSts2 > 0 ? Math.round((totalDone / totalSts2) * 100) : 0;

  const tabs = [
    { id: "characters" as ActiveTab, labelFr: "Personnages", labelEn: "Characters", icon: <Users className="h-4 w-4" />,
      pct: totalCharacters > 0 ? Math.round((charDone / totalCharacters) * 100) : 0 },
    { id: "secrets" as ActiveTab, labelFr: "Secrets", labelEn: "Secrets", icon: <Eye className="h-4 w-4" />,
      pct: totalSecrets > 0 ? Math.round((secretDone / totalSecrets) * 100) : 0 },
    { id: "relics" as ActiveTab, labelFr: "Reliques", labelEn: "Relics", icon: <Gem className="h-4 w-4" />,
      pct: totalRelics > 0 ? Math.round((relicDone / totalRelics) * 100) : 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <button type="button" onClick={onBack}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 font-bold transition-colors touch-manipulation shrink-0 bg-cyan-600 hover:bg-cyan-500 text-white"
              style={{ minHeight: "44px" }}>
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">Game&apos;s Bip</span>
            </button>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 shrink-0 text-cyan-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] truncate text-slate-100">
                SLAY THE SPIRE 2
              </span>
            </div>
            <LangToggle />
            <span className="font-mono text-sm font-black shrink-0 text-cyan-400">{globalPct}%</span>
          </div>

          <div className="relative h-2.5 w-full rounded-full overflow-hidden bg-slate-700/50">
            <div className="h-full rounded-full transition-all duration-700 bg-cyan-500"
              style={{ width: `${globalPct}%` }} />
          </div>

          <div className="mt-1.5 flex items-center gap-3 text-[10px] flex-wrap text-slate-400">
            <span><span className="text-cyan-400 font-bold">{charDone}</span>/{totalCharacters} {lang === "fr" ? "personnages" : "characters"}</span>
            <span><span className="text-cyan-400 font-bold">{secretDone}</span>/{totalSecrets} secrets</span>
            <span><span className="text-cyan-400 font-bold">{relicDone}</span>/{totalRelics} {lang === "fr" ? "reliques" : "relics"}</span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl overflow-x-auto px-2">
            <ul className="flex w-max items-stretch gap-0.5 py-1.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <li key={tab.id}>
                    <button type="button" onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-all touch-manipulation ${isActive ? "bg-cyan-900/50 text-cyan-400" : "text-slate-500 hover:text-slate-100"}`}>
                      {tab.icon}
                      {lang === "fr" ? tab.labelFr : tab.labelEn}
                      <span className={`rounded-full px-1.5 text-[9px] font-bold leading-5 ${isActive ? "bg-cyan-900/50 text-cyan-400" : "bg-slate-800 text-slate-500"}`}>
                        {tab.pct}%
                      </span>
                      {isActive && <span className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-cyan-400" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-5 relative">

        {/* CHARACTERS TAB */}
        {activeTab === "characters" && (
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide mb-1 text-slate-100">
              {lang === "fr" ? "Personnages" : "Characters"}
            </h2>
            <p className="text-sm mb-5 text-slate-300">
              {lang === "fr"
                ? "Débloquez et maîtrisez chaque personnage jouable."
                : "Unlock and master every playable character."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {sts2Characters.map((item) => (
                <CheckTile key={item.id}
                  label={l(item.title)}
                  sublabel={l(item.description).slice(0, 80) + "\u2026"}
                  isDone={!!completed[item.id]}
                  alertType={item.alertType}
                  onToggle={() => toggle(item.id)}
                  onInfo={() => { setDetailItem(item); setDetailOpen(true); }} />
              ))}
            </div>
          </div>
        )}

        {/* SECRETS TAB */}
        {activeTab === "secrets" && (
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide mb-1 text-slate-100">
              {lang === "fr" ? "Secrets" : "Secrets"}
            </h2>
            <p className="text-sm mb-5 text-slate-300">
              {lang === "fr"
                ? "Événements et salles cachés — cochez quand vous les avez découverts."
                : "Hidden events and rooms — check when discovered."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {sts2Secrets.map((item) => (
                <CheckTile key={item.id}
                  label={l(item.title)}
                  sublabel={l(item.description).slice(0, 80) + "\u2026"}
                  isDone={!!completed[item.id]}
                  alertType={item.alertType}
                  onToggle={() => toggle(item.id)}
                  onInfo={() => { setDetailItem(item); setDetailOpen(true); }} />
              ))}
            </div>
          </div>
        )}

        {/* RELICS TAB */}
        {activeTab === "relics" && (
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide mb-1 text-slate-100">
              {lang === "fr" ? "Combos de Reliques" : "Relic Combos"}
            </h2>
            <p className="text-sm mb-5 text-slate-300">
              {lang === "fr"
                ? "Les synergies qui définissent les meilleures builds — cochez quand maîtrisé."
                : "The synergies that define the strongest builds — check when mastered."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {sts2Relics.map((item) => (
                <CheckTile key={item.id}
                  label={l(item.title)}
                  sublabel={l(item.description).slice(0, 80) + "\u2026"}
                  isDone={!!completed[item.id]}
                  alertType={item.alertType}
                  onToggle={() => toggle(item.id)}
                  onInfo={() => { setDetailItem(item); setDetailOpen(true); }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <Sts2DetailModal
        item={detailItem}
        open={detailOpen}
        onClose={() => { setDetailOpen(false); setDetailItem(null); }}
        completed={detailItem ? !!completed[detailItem.id] : false}
        onToggle={() => { if (detailItem) toggle(detailItem.id); }}
        lang={lang}
      />
    </div>
  );
}
