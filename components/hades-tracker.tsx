"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleCheck as CheckCircle2, Sparkles, FlameKindling, Scroll, Sword, ArrowLeft, Flame, X, Trophy, Gamepad2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LangToggle } from "@/components/lang-toggle";
import { SupportBanner } from "@/components/support-banner";
import { HadesDetail } from "@/components/hades-detail";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import {
  prophecies, incantations, weapons, bosses, weaponHeats,
  totalProphecies, totalIncantations, totalAspects, totalBosses, totalHeatItems, totalHades,
  type HadesProphecy, type HadesIncantation, type WeaponAspect, type HadesWeapon,
} from "@/lib/data/hades2";

const STORAGE_KEY = "hadesbip_progress";

type ActiveTab = "bosses" | "objectifs" | "armes";
type DetailItem =
  | { kind: "prophecy";    data: HadesProphecy }
  | { kind: "incantation"; data: HadesIncantation }
  | { kind: "aspect";      data: WeaponAspect; weapon: HadesWeapon };

interface HadesTrackerProps { onBack: () => void }

function CheckTile({
  id, label, sublabel, badge, isDone, onToggle, onInfo,
}: {
  id: string; label: string; sublabel?: string; badge?: string;
  isDone: boolean; onToggle: () => void; onInfo?: () => void;
}) {
  return (
    <div
      onClick={onInfo}
      className={`flex items-start gap-2.5 rounded-lg p-3 transition-all duration-200 bg-slate-900/80 backdrop-blur-md border ${isDone ? "border-cyan-500/50" : "border-slate-700/50"} ${onInfo ? "cursor-pointer hover:border-cyan-500/40" : ""}`}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all touch-manipulation border-2 ${isDone ? "border-cyan-500 bg-cyan-500" : "border-slate-600"}`}
        aria-label={isDone ? "Marquer comme non termin\u00e9" : "Marquer comme termin\u00e9"}
      >
        {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
      </button>
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-semibold leading-snug ${isDone ? "text-slate-100" : "text-slate-300"}`}>
          {label}
        </span>
        {sublabel && <p className="text-[11px] mt-0.5 text-slate-400">{sublabel}</p>}
        {badge && (
          <span className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-cyan-900/50 text-cyan-400 border border-cyan-700/50">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function HeatGauge({
  milestones, completed, onToggle,
}: {
  milestones: { level: number; id: string }[];
  completed: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {milestones.map(({ level, id }) => {
        const done = !!completed[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className="flex flex-col items-center gap-0.5 transition-all touch-manipulation"
            title={`Chaleur ${level}`}
          >
            <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all border-2 ${done ? "bg-cyan-900/50 border-cyan-500 text-cyan-400" : "bg-slate-800/50 border-slate-600 text-slate-500"}`}>
              {level}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function HadesTracker({ onBack }: HadesTrackerProps) {
  const { lang } = useLanguage();
  const [hydrated, setHydrated]     = useState(false);
  const [completed, setCompleted]   = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab]   = useState<ActiveTab>("bosses");
  const [detailItem, setDetailItem] = useState<DetailItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [bossDetailOpen, setBossDetailOpen] = useState(false);
  const [bossDetailBoss, setBossDetailBoss] = useState<typeof bosses[number] | null>(null);

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

  function openDetail(item: DetailItem) {
    setDetailItem(item);
    setDetailOpen(true);
  }

  const activeItemId: string | null = !detailItem ? null
    : detailItem.kind === "prophecy"    ? detailItem.data.id
    : detailItem.kind === "incantation" ? detailItem.data.id
    : detailItem.data.id;

  const bossesDone  = useMemo(() => bosses.filter((b) => !!completed[b.id]).length, [completed]);
  const propDone    = useMemo(() => prophecies.filter((p) => !!completed[p.id]).length, [completed]);
  const incantDone  = useMemo(() => incantations.filter((i) => !!completed[i.id]).length, [completed]);
  const aspectsDone = useMemo(() => weapons.flatMap((w) => w.aspects).filter((a) => !!completed[a.id]).length, [completed]);
  const heatDone    = useMemo(() => weaponHeats.flatMap((g) => g.milestones).filter((m) => !!completed[m.id]).length, [completed]);
  const totalDone   = bossesDone + propDone + incantDone + aspectsDone + heatDone;
  const globalPct   = totalHades > 0 ? Math.round((totalDone / totalHades) * 100) : 0;

  const l = (b: { fr: string; en: string }) => b[lang as "fr" | "en"];

  const catLabels: Record<string, { fr: string; en: string }> = {
    main:      { fr: "Principal",  en: "Main"      },
    power:     { fr: "Pouvoir",    en: "Power"     },
    companion: { fr: "Compagnon",  en: "Companion" },
    mastery:   { fr: "Ma\u00eetrise",   en: "Mastery"   },
  };

  const tabs: { id: ActiveTab; labelFr: string; labelEn: string; icon: React.ReactNode; pct: number }[] = [
    {
      id: "bosses", labelFr: "Bosses", labelEn: "Bosses",
      icon: <Sparkles className="h-4 w-4" />,
      pct: totalBosses > 0 ? Math.round((bossesDone / totalBosses) * 100) : 0,
    },
    {
      id: "objectifs", labelFr: "Prophéties Majeures", labelEn: "Major Prophecies",
      icon: <Scroll className="h-4 w-4" />,
      pct: (totalProphecies + totalIncantations) > 0
        ? Math.round(((propDone + incantDone) / (totalProphecies + totalIncantations)) * 100) : 0,
    },
    {
      id: "armes", labelFr: "Armes & Chaleur", labelEn: "Weapons & Heat",
      icon: <Sword className="h-4 w-4" />,
      pct: (totalAspects + totalHeatItems) > 0
        ? Math.round(((aspectsDone + heatDone) / (totalAspects + totalHeatItems)) * 100) : 0,
    },
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
                HADES II
              </span>
            </div>
            <LangToggle />
            <span className="font-mono text-sm font-black shrink-0 text-cyan-400">
              {globalPct}%
            </span>
          </div>

          <div className="relative h-2.5 w-full rounded-full overflow-hidden bg-slate-700/50">
            <div className="h-full rounded-full transition-all duration-700 bg-cyan-500"
              style={{ width: `${globalPct}%` }} />
          </div>

          <div className="mt-1.5 flex items-center gap-3 text-[10px] flex-wrap text-slate-400">
            <span><span className="text-cyan-400 font-bold">{bossesDone}</span>/{totalBosses} {lang === "fr" ? "bosses" : "bosses"}</span>
            <span><span className="text-cyan-400 font-bold">{propDone + incantDone}</span>/{totalProphecies + totalIncantations} {lang === "fr" ? "prophéties" : "prophecies"}</span>
            <span><span className="text-cyan-400 font-bold">{heatDone}</span>/{totalHeatItems} {lang === "fr" ? "chaleur" : "heat"}</span>
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

        {/* BOSSES TAB */}
        {activeTab === "bosses" && (
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide mb-1 text-slate-100">
              {lang === "fr" ? "Bosses Vaincus" : "Bosses Defeated"}
            </h2>
            <p className="text-sm mb-5 text-slate-300">
              {lang === "fr"
                ? "Cochez chaque boss apr\u00e8s l\u2019avoir vaincu au moins une fois."
                : "Check each boss after defeating it at least once."}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {bosses.map((boss) => {
                const isDone = !!completed[boss.id];
                return (
                  <div key={boss.id}
                    onClick={() => { setBossDetailBoss(boss); setBossDetailOpen(true); }}
                    className={`rounded-lg p-3 flex items-center gap-2.5 transition-all duration-200 bg-slate-900/80 backdrop-blur-md border cursor-pointer hover:border-cyan-500/40 ${isDone ? "border-cyan-500/50" : "border-slate-700/50"}`}>
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); toggle(boss.id); }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-all border-2 ${isDone ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-600"}`}>
                      {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="text-base">{boss.emoji}</span>}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm leading-tight ${isDone ? "text-slate-100" : "text-slate-300"}`}>
                        {l(boss.name)}
                      </p>
                      <p className="text-[11px] mt-0.5 leading-tight text-slate-500 line-clamp-1">{l(boss.zone)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-6"><SupportBanner gameId="hades2" /></div>
          </div>
        )}

        {/* OBJECTIFS TAB */}
        {activeTab === "objectifs" && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Scroll className="h-4 w-4 text-cyan-400" />
                <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-100">
                  {lang === "fr" ? "Proph\u00e9ties" : "Fated List"}
                </h2>
                <span className="text-xs font-bold text-slate-400">{propDone}/{totalProphecies}</span>
              </div>
              <p className="text-sm mb-4 text-slate-300">
                {lang === "fr"
                  ? "Accomplissez ces proph\u00e9ties pour la compl\u00e9tion totale."
                  : "Complete these prophecies for full completion."}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {prophecies.map((prop) => (
                  <CheckTile key={prop.id} id={prop.id}
                    label={l(prop.title)}
                    sublabel={`\u2726 ${l(prop.reward)}`}
                    badge={l(catLabels[prop.category])}
                    isDone={!!completed[prop.id]}
                    onToggle={() => toggle(prop.id)}
                    onInfo={() => openDetail({ kind: "prophecy", data: prop })}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <FlameKindling className="h-4 w-4 text-cyan-400" />
                <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-100">
                  {lang === "fr" ? "Incantations du Chaudron" : "Cauldron Incantations"}
                </h2>
                <span className="text-xs font-bold text-slate-400">{incantDone}/{totalIncantations}</span>
              </div>
              <p className="text-sm mb-4 text-slate-300">
                {lang === "fr"
                  ? "Pr\u00e9parez ces incantations pour les am\u00e9liorations permanentes."
                  : "Brew these incantations for permanent Crossroads upgrades."}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {incantations.map((incant) => (
                  <CheckTile key={incant.id} id={incant.id}
                    label={l(incant.title)}
                    sublabel={l(incant.effect)}
                    isDone={!!completed[incant.id]}
                    onToggle={() => toggle(incant.id)}
                    onInfo={() => openDetail({ kind: "incantation", data: incant })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ARMES & CHALEUR TAB */}
        {activeTab === "armes" && (
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide mb-1 text-slate-100">
              {lang === "fr" ? "Armes, Aspects & Chaleur" : "Weapons, Aspects & Heat"}
            </h2>
            <p className="text-sm mb-5 text-slate-300">
              {lang === "fr"
                ? "D\u00e9verrouillez les aspects et atteignez les paliers de Pacte d'\u00c9preuves."
                : "Unlock every aspect and reach Pact of Punishment heat milestones."}
            </p>

            <div className="space-y-2">
              {weapons.map((weapon) => {
                const heatGroup    = weaponHeats.find((g) => g.weaponId === weapon.id)!;
                const aspectsDoneW = weapon.aspects.filter((a) => !!completed[a.id]).length;
                const heatDoneW    = heatGroup.milestones.filter((m) => !!completed[m.id]).length;
                const allAspects   = aspectsDoneW === weapon.aspects.length;

                return (
                  <div key={weapon.id}
                    className={`rounded-lg overflow-hidden bg-slate-900/80 backdrop-blur-md border ${allAspects ? "border-cyan-500/50" : "border-slate-700/50"}`}>
                    <div className={`flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 ${allAspects ? "bg-cyan-900/20" : ""}`}>
                      <span className="text-xl">{weapon.emoji}</span>
                      <h3 className="flex-1 font-black text-sm text-slate-100">{l(weapon.name)}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        <span className="text-cyan-400">Aspects {aspectsDoneW}/{weapon.aspects.length}</span>
                        <span className="text-slate-400">Heat {heatDoneW}/{heatGroup.milestones.length}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5 text-slate-500">
                          {lang === "fr" ? "Aspects" : "Aspects"}
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {weapon.aspects.map((aspect) => {
                            const isDone = !!completed[aspect.id];
                            const isBase = aspect.id.endsWith("-melinoe");
                            return (
                              <CheckTile key={aspect.id} id={aspect.id}
                                label={l(aspect.name)}
                                sublabel={isBase ? (lang === "fr" ? "Aspect de base" : "Base aspect") : aspect.unlockHint ? `\uD83D\uDD13 ${l(aspect.unlockHint)}` : undefined}
                                isDone={isDone}
                                onToggle={() => toggle(aspect.id)}
                                onInfo={() => openDetail({ kind: "aspect", data: aspect, weapon })}
                              />
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-xl p-3 bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Flame className="h-3.5 w-3.5 text-cyan-400" />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {lang === "fr" ? "Pacte d'\u00c9preuves — Niveaux de Chaleur" : "Pact of Punishment — Heat Levels"}
                          </p>
                        </div>
                        <div className="h-1.5 w-full rounded-full mb-3 overflow-hidden bg-slate-700/50">
                          <div className="h-full rounded-full transition-all duration-500 bg-cyan-500"
                            style={{ width: `${heatGroup.milestones.length > 0 ? (heatDoneW / heatGroup.milestones.length) * 100 : 0}%` }} />
                        </div>
                        <HeatGauge milestones={heatGroup.milestones} completed={completed} onToggle={toggle} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <HadesDetail
        item={detailItem}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        completed={!!(activeItemId && completed[activeItemId])}
        onToggleComplete={() => { if (activeItemId) toggle(activeItemId); }}
      />

      {/* Boss detail modal */}
      <BossDetail
        boss={bossDetailBoss}
        open={bossDetailOpen}
        onClose={() => { setBossDetailOpen(false); setBossDetailBoss(null); }}
        completed={bossDetailBoss ? !!completed[bossDetailBoss.id] : false}
        onToggle={() => { if (bossDetailBoss) toggle(bossDetailBoss.id); }}
        lang={lang}
      />
    </div>
  );
}

const BOSS_DETAILS: Record<string, { strategy: { fr: string; en: string } }> = {
  "boss-hecate": {
    strategy: {
      fr: "Combat d'entraînement obligatoire. Hécate est le premier vrai test. Utilisez le Dash pour esquiver ses attaques circulaires et concentrez les dégâts pendant ses phases de repos. Ses patterns sont réguliers — apprenez le timing du triple slash puis punissez pendant le recovery.",
      en: "Mandatory training fight. Hecate is the first real test. Use Dash to dodge her circular attacks and focus damage during her rest phases. Her patterns are regular — learn the triple slash timing then punish during recovery.",
    },
  },
  "boss-scylla": {
    strategy: {
      fr: "Trio de monstres marins. Concentrez vos dégâts sur la chanteuse principale (Scylla) — les sirènes disparaissent quand elle tombe. Esquivez les notes musicales qui traversent l'écran et restez en mouvement.",
      en: "Marine monster trio. Focus your damage on the main singer (Scylla) — the sirens vanish when she falls. Dodge the musical notes crossing the screen and keep moving.",
    },
  },
  "boss-infernal": {
    strategy: {
      fr: "Gardien corrompu — absorbe les dégâts de zone. Frappez-le uniquement en mêlée sur ses flancs. Quand il charge, dashez latéralement et profitez de la fenêtre de stun.",
      en: "Corrupted guardian — absorbs area damage. Only hit him in melee on his flanks. When he charges, dash sideways and exploit the stun window.",
    },
  },
  "boss-chronos": {
    strategy: {
      fr: "Le Titan du Temps manipule le tempo du combat. Il peut ralentir vos mouvements et accélérer les siens. Gardez vos Casts pour les phases où il se téléporte. Utilisez les piliers comme couverture contre ses vagues temporelles.",
      en: "The Titan of Time manipulates combat tempo. He can slow your movements and speed up his own. Save your Casts for phases when he teleports. Use pillars as cover against his time waves.",
    },
  },
  "boss-polyphemus": {
    strategy: {
      fr: "Cyclope colossal qui absorbe les dégâts de zone. Frappez-le uniquement en mêlée sur ses flancs — les attaques frontales sont contrées. Quand il charge, dashez latéralement.",
      en: "Colossal Cyclops that absorbs area damage. Only hit him in melee on his flanks — frontal attacks are countered. When he charges, dash sideways.",
    },
  },
  "boss-eris": {
    strategy: {
      fr: "Déesse de la Discorde — elle retourne vos pouvoirs contre vous. Évitez d'utiliser des attaques chargées car elle les reflète. Privilégiez les coups rapides et les Casts.",
      en: "Goddess of Discord — she turns your powers against you. Avoid charged attacks as she reflects them. Favor quick strikes and Casts.",
    },
  },
  "boss-prometheus": {
    strategy: {
      fr: "Titan de la Clairvoyance — maître des flammes. Il alterne entre phases de corps-à-corps et de feu à distance. Restez mobile et frappez entre ses combos.",
      en: "Titan of Foresight — master of flames. He alternates between melee and ranged fire phases. Stay mobile and strike between his combos.",
    },
  },
  "boss-typhon": {
    strategy: {
      fr: "L'ultime tempête — boss secret. Nécessite des conditions de Chaleur spécifiques. Attaques massives de zone, rester en mouvement permanent est vital.",
      en: "The ultimate storm — secret boss. Requires specific Heat conditions. Massive area attacks, permanent movement is vital.",
    },
  },
};

function BossDetail({
  boss, open, onClose, completed, onToggle, lang,
}: {
  boss: typeof bosses[number] | null;
  open: boolean;
  onClose: () => void;
  completed: boolean;
  onToggle: () => void;
  lang: string;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "solution">("details");

  useEffect(() => { if (open) setActiveTab("details"); }, [open]);

  if (!open || !boss) return null;

  const l = (b: { fr: string; en: string }) => b[lang as "fr" | "en"];
  const details = BOSS_DETAILS[boss.id];

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
              {completed ? <CheckCircle2 className="h-5 w-5 text-cyan-400" /> : boss.emoji}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <h2 className={`text-base font-bold leading-tight ${completed ? "text-cyan-400" : "text-slate-100"}`}>
                {l(boss.name)}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{l(boss.zone)} &middot; {l(boss.description)}</p>
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
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <p className="text-sm text-slate-300 leading-relaxed">{l(boss.description)}</p>
                </div>

                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                      {lang === "en" ? "Prerequisites" : "Pr\u00e9requis"}
                    </p>
                    <p className="text-sm text-slate-300">{l(boss.prerequisites)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                      {lang === "en" ? "Route" : "Route"}
                    </p>
                    <p className="text-sm text-slate-300">{l(boss.route)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                      {lang === "en" ? "Zone" : "Zone"}
                    </p>
                    <p className="text-sm text-slate-300">{l(boss.zone)}</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === "solution" && (
              <>
                {details ? (
                  <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                    <div className="flex items-center gap-2 mb-3">
                      <Gamepad2 className="h-4 w-4 text-cyan-400" />
                      <h3 className="text-sm font-semibold text-slate-100">
                        {lang === "en" ? "Combat Strategy" : "Strat\u00e9gie de combat"}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{details.strategy[lang as "fr" | "en"]}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 text-center py-6">
                    {lang === "en" ? "No detailed walkthrough available yet." : "Aucun guide d\u00e9taill\u00e9 disponible pour le moment."}
                  </p>
                )}
                <SupportBanner gameId="hades2" className="mt-2" />
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-700/50 shrink-0">
            <button type="button" onClick={onToggle}
              className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors touch-manipulation ${completed ? "bg-slate-800 text-slate-400 border border-slate-700/50" : "bg-cyan-600 hover:bg-cyan-500 text-white"}`}>
              {completed
                ? (lang === "fr" ? "\u2713 Vaincu \u2014 Appuyer pour annuler" : "\u2713 Defeated \u2014 Tap to undo")
                : (lang === "fr" ? "Marquer comme vaincu" : "Mark as Defeated")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
