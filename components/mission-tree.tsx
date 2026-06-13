"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Gamepad2, Trophy, Star, Package, Smartphone,
  MapPin, Activity, CheckCircle2, Circle, Map, List, TrendingUp, ArrowLeft, X
} from "lucide-react";
import {
  getActs, buildRows, totalMissions, totalSecondary, totalCollectibleItems,
  secondaryMissions, collectibleCategories, ZONES, loc,
  type Mission, type SecondaryMission,
} from "@/lib/missions";
import { activities, totalActivities, getActivityTitle, getActivityDescription, getActivityTip, type Activity as ActivityData } from "@/lib/activities";
import { MissionNode } from "@/components/mission-node";
import { MissionDetail, type DetailTab } from "@/components/mission-detail";
import { SecondaryDetail } from "@/components/secondary-detail";
import { CharacterBadge } from "@/components/character-badge";
import { LangToggle } from "@/components/lang-toggle";
import { SyncModal } from "@/components/sync-modal";
import { Progress } from "@/components/ui/progress";
import { saveToStorage, loadFromStorage, type AppState } from "@/lib/storage";
import { useLanguage } from "@/lib/language-context";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MainTab = "story" | "secondary" | "collectibles" | "activities" | "gta6";
type CollectibleSub = string;

interface MissionTreeProps {
  onBack: () => void;
}

export function MissionTree({ onBack }: MissionTreeProps) {
  const { lang, t } = useLanguage();
  const [hydrated, setHydrated]         = useState(false);
  const [completed, setCompleted]       = useState<Record<string, boolean>>({});
  const [checked, setChecked]           = useState<Record<string, boolean>>({});
  const [activeId, setActiveId]         = useState<number | null>(null);
  const [detailOpen, setDetailOpen]     = useState(false);
  const [initialTab, setInitialTab]     = useState<DetailTab>("details");
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [mainTab, setMainTab]           = useState<MainTab>("story");
  const [zoneView, setZoneView]         = useState(false);
  const [syncOpen, setSyncOpen]         = useState(false);
  const [collectibleSub, setCollectibleSub] = useState<CollectibleSub>("spaceship");
  const [secDetailMission, setSecDetailMission] = useState<SecondaryMission | null>(null);
  const [secDetailActivity, setSecDetailActivity] = useState<ActivityData | null>(null);
  const [secDetailOpen, setSecDetailOpen] = useState(false);
  const [secDetailTab, setSecDetailTab]   = useState<DetailTab>("details");
  const [collectibleDetailOpen, setCollectibleDetailOpen] = useState(false);
  const [collectibleDetailItem, setCollectibleDetailItem] = useState<{ id: string; location: string; zone: string } | null>(null);

  const actGroups  = useMemo(() => getActs(), []);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    const saved = loadFromStorage("gtabip_progress");
    setCompleted(saved.completed);
    setChecked(saved.checked);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage({ completed, checked }, "gtabip_progress");
  }, [completed, checked, hydrated]);

  const storyDone = useMemo(
    () => actGroups.flatMap((a) => a.missions).filter((m) => !!completed[m.id]).length,
    [actGroups, completed]
  );
  const secondaryDone = useMemo(
    () => secondaryMissions.filter((sm) => !!completed[`sm-${sm.id}`]).length,
    [completed]
  );
  const collectiblesDone = useMemo(
    () => collectibleCategories.flatMap((c) => c.items).filter((it) => !!completed[`ci-${it.id}`]).length,
    [completed]
  );
  const activitiesDone = useMemo(
    () => activities.filter((a) => !!completed[`act-${a.id}`]).length,
    [completed]
  );

  const totalTrackable = totalMissions + totalSecondary + totalCollectibleItems + totalActivities;
  const totalDone      = storyDone + secondaryDone + collectiblesDone + activitiesDone;
  const globalPct      = totalTrackable > 0 ? Math.round((totalDone / totalTrackable) * 100) : 0;
  const storyPct       = Math.round((storyDone / totalMissions) * 100);

  const activeMission = useMemo<Mission | null>(
    () => actGroups.flatMap((a) => a.missions).find((m) => m.id === activeId) ?? null,
    [actGroups, activeId]
  );

  const zoneGroups = useMemo(() => {
    const all = actGroups.flatMap((a) => a.missions);
    const map: Record<string, Mission[]> = {};
    for (const z of Object.keys(ZONES)) map[z] = [];
    for (const m of all) {
      const zone = m.zone ?? "los-santos-centre";
      if (!map[zone]) map[zone] = [];
      map[zone].push(m);
    }
    return Object.entries(map)
      .filter(([, ms]) => ms.length > 0)
      .map(([zoneId, missions]) => ({ zoneId, label: ZONES[zoneId] ?? zoneId, missions }));
  }, [actGroups]);

  useEffect(() => {
    if (mainTab !== "story" || zoneView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number((visible.target as HTMLElement).dataset.chapter);
          if (idx) setActiveChapter(idx);
        }
      },
      { rootMargin: "-180px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [actGroups, mainTab, zoneView]);

  function scrollToChapter(index: number) {
    const el = sectionRefs.current[index];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveChapter(index);
    }
  }

  function openDetail(id: number, tab: DetailTab = "details") {
    setActiveId(id);
    setInitialTab(tab);
    setDetailOpen(true);
  }

  function toggleObjective(objId: string) {
    setChecked((prev) => ({ ...prev, [objId]: !prev[objId] }));
  }

  function toggleMissionComplete() {
    if (!activeMission) return;
    setCompleted((prev) => ({ ...prev, [activeMission.id]: !prev[activeMission.id] }));
  }

  function handleImport(state: AppState) {
    setCompleted(state.completed);
    setChecked(state.checked);
  }

  const mainTabs: { id: MainTab; label: string; count: number; done: number }[] = [
    { id: "story",       label: t("tabStory"),        count: totalMissions,         done: storyDone },
    { id: "secondary",   label: t("tabSecondary"),    count: totalSecondary,        done: secondaryDone },
    { id: "collectibles",label: t("tabCollectibles"), count: totalCollectibleItems, done: collectiblesDone },
    { id: "activities",  label: t("tabActivities"),   count: totalActivities,       done: activitiesDone },
    { id: "gta6",        label: t("tabGta6"),         count: 0,                     done: 0 },
  ];

  const activityCategoryLabels: Record<string, string> = {
    leisure: t("catLeisure"),
    sport:   t("catSport"),
    race:    t("catRace"),
    social:  t("catSocial"),
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-30 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <button type="button" onClick={onBack} title={lang === "fr" ? "Retour" : "Back"}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-colors touch-manipulation shrink-0 bg-cyan-600 hover:bg-cyan-500 text-white"
              style={{ minHeight: "44px" }}>
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">Game&apos;s Bip</span>
            </button>
            <Trophy className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400 flex-1 min-w-0 truncate">
              {t("progressLabel")}
            </span>
            <LangToggle />
            <span className="font-mono text-sm font-bold text-cyan-400 shrink-0">{globalPct}%</span>
            <button type="button" onClick={() => setSyncOpen(true)} title={t("syncTitle")}
              className="flex items-center gap-1 rounded-md border border-slate-700/50 px-2 py-1 text-[10px] font-semibold text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors touch-manipulation shrink-0">
              <Smartphone className="h-3 w-3" />
              <span className="hidden sm:inline">{t("syncBtn")}</span>
            </button>
          </div>
          <Progress value={globalPct} className="h-3 rounded-full" />
          <div className="mt-1.5 flex items-center gap-3 text-[10px] text-slate-400 flex-wrap">
            <span><span className="text-cyan-400 font-semibold">{storyDone}</span>/{totalMissions} {t("statStory")}</span>
            <span><span className="text-cyan-400 font-semibold">{secondaryDone}</span>/{totalSecondary} {t("statSide")}</span>
            <span><span className="text-cyan-400 font-semibold">{collectiblesDone}</span>/{totalCollectibleItems} {t("statCollec")}</span>
            <span><span className="text-cyan-400 font-semibold">{activitiesDone}</span>/{totalActivities} {t("statActiv")}</span>
          </div>
        </div>

        {/* Main category tabs */}
        <nav aria-label="Categories" className="border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl overflow-x-auto px-2">
            <ul className="flex w-max items-stretch gap-0.5 py-1.5">
              {mainTabs.map((tab) => {
                const isActive = mainTab === tab.id;
                return (
                  <li key={tab.id}>
                    <button type="button" onClick={() => setMainTab(tab.id)}
                      className={cn(
                        "relative flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-colors touch-manipulation",
                        isActive ? "bg-cyan-900/50 text-cyan-400" : "text-slate-500 hover:text-slate-100"
                      )}>
                      {tab.label}
                      {tab.count > 0 && (
                        <span className={cn(
                          "rounded-full px-1.5 text-[9px] font-bold leading-5",
                          isActive ? "bg-cyan-900/50 text-cyan-400" : "bg-slate-800 text-slate-500"
                        )}>
                          {tab.done}/{tab.count}
                        </span>
                      )}
                      {isActive && <span className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-cyan-400" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Chapter tabs (story only) */}
        {mainTab === "story" && (
          <nav aria-label="Chapters" className="border-t border-slate-700/30">
            <div className="mx-auto max-w-6xl overflow-x-auto px-2 flex items-center gap-2">
              <ul className="flex flex-1 w-max items-stretch gap-0.5 py-1.5">
                {actGroups.map((act) => {
                  const isActive = activeChapter === act.index && !zoneView;
                  return (
                    <li key={act.index}>
                      <button type="button"
                        onClick={() => { setZoneView(false); scrollToChapter(act.index); }}
                        className={cn(
                          "relative whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-colors touch-manipulation",
                          isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-100"
                        )}>
                        {t("chapterPrefix")}{act.index}
                        <span className={cn(
                          "absolute inset-x-1 -bottom-[1px] h-[2px] rounded-full transition-all",
                          isActive ? "bg-cyan-400" : "bg-transparent"
                        )} />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button type="button" onClick={() => setZoneView((v) => !v)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-all mr-2 touch-manipulation",
                  zoneView
                    ? "border-cyan-500/50 bg-cyan-900/50 text-cyan-400"
                    : "border-slate-700/50 text-slate-400 hover:border-cyan-500/30 hover:text-slate-100"
                )}>
                {zoneView ? <List className="h-3.5 w-3.5" /> : <Map className="h-3.5 w-3.5" />}
                {zoneView ? t("chaptersToggle") : t("zoneToggle")}
              </button>
            </div>
          </nav>
        )}

        {/* Collectible sub-tabs */}
        {mainTab === "collectibles" && (
          <nav aria-label="Collectible categories" className="border-t border-slate-700/30">
            <div className="mx-auto max-w-6xl overflow-x-auto px-2">
              <ul className="flex w-max items-stretch gap-0.5 py-1.5">
                {collectibleCategories.map((cat) => {
                  const catDone   = cat.items.filter((it) => !!completed[`ci-${it.id}`]).length;
                  const isActive  = collectibleSub === cat.id;
                  const catTitle  = loc(cat.title, cat.title_en, lang);
                  return (
                    <li key={cat.id}>
                      <button type="button" onClick={() => setCollectibleSub(cat.id)}
                        className={cn(
                          "relative flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors touch-manipulation",
                          isActive ? "bg-cyan-900/50 text-cyan-400" : "text-slate-500 hover:text-slate-100"
                        )}>
                        {catTitle.split(" ").slice(0, 2).join(" ")}
                        <span className="text-[9px] font-bold">{catDone}/{cat.items.length}</span>
                        {isActive && <span className="absolute inset-x-1 -bottom-[1px] h-[2px] rounded-full bg-cyan-400" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-5">

        {/* STORY: Chapter view */}
        {mainTab === "story" && !zoneView && (
          <>
            {actGroups.map((act, actIdx) => {
              const rows    = buildRows(act.missions);
              const actDone = act.missions.filter((m) => !!completed[m.id]).length;
              const actTitle = loc(act.title, act.title_en, lang)
                .replace(/^Act(?:e)? [IVX]+ — /i, "")
                .toUpperCase();
              return (
                <section key={act.index} data-chapter={act.index}
                  ref={(el) => { sectionRefs.current[act.index] = el; }}
                  className="relative scroll-mt-56">
                  <div className="flex items-center gap-3 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-cyan-500/50 bg-cyan-900/30 font-mono text-sm font-extrabold text-cyan-400">
                      {act.index}
                    </span>
                    <h2 className="flex-1 text-base font-extrabold uppercase leading-tight tracking-wide text-slate-100 sm:text-lg">
                      {t("chapterLabel")} {act.index}{t("colon")}{actTitle}
                    </h2>
                    <span className="font-mono text-xs text-slate-400 shrink-0">{actDone}/{act.missions.length}</span>
                  </div>
                  <div className="-mt-2 mb-3 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-400/70 via-cyan-400/20 to-transparent" />
                  <div className="flex flex-col">
                    {rows.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex flex-col items-center">
                        <div className={row.length > 1 ? "grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-3" : "w-full"}>
                          {row.map((mission) => (
                            <MissionNode key={mission.id} mission={mission}
                              completed={!!completed[mission.id]}
                              active={activeId === mission.id && detailOpen}
                              onClick={() => openDetail(mission.id, "details")} />
                          ))}
                        </div>
                        {rowIdx < rows.length - 1 && (
                          <div className="flex items-center justify-center py-1.5">
                            <span className="h-5 w-px bg-slate-700/50" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {actIdx < actGroups.length - 1 && (
                    <div className="flex justify-center py-2">
                      <span className="h-5 w-px bg-slate-700/50" />
                    </div>
                  )}
                </section>
              );
            })}
            <div className="mt-8 flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-900/80 backdrop-blur-md px-4 py-3">
              <Trophy className="h-4 w-4 text-cyan-400 shrink-0" />
              <Progress value={storyPct} className="h-2 flex-1" />
              <span className="font-mono text-sm font-bold text-cyan-400 shrink-0">
                {storyDone}<span className="text-slate-400">/{totalMissions}</span>
              </span>
            </div>
          </>
        )}

        {/* STORY: Zone view */}
        {mainTab === "story" && zoneView && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Map className="h-4 w-4 text-cyan-400" />
              <h2 className="text-lg font-extrabold uppercase tracking-wide text-slate-100">{t("zoneTitle")}</h2>
            </div>
            {zoneGroups.map(({ zoneId, label, missions }) => {
              const zoneDone = missions.filter((m) => !!completed[m.id]).length;
              return (
                <section key={zoneId}>
                  <div className="flex items-center gap-3 py-3 border-b border-slate-700/50 mb-3">
                    <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                    <h3 className="flex-1 font-bold text-slate-100">{label}</h3>
                    <span className="font-mono text-xs text-slate-400">{zoneDone}/{missions.length}</span>
                  </div>
                  <div className="space-y-4">
                    {missions.map((mission) => (
                      <MissionNode key={mission.id} mission={mission}
                        completed={!!completed[mission.id]}
                        active={activeId === mission.id && detailOpen}
                        onClick={() => openDetail(mission.id, "details")} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* SECONDARY MISSIONS */}
        {mainTab === "secondary" && (
          <div className="space-y-3">
            <SectionHeader icon={<Star className="h-5 w-5 text-cyan-400" />}
              title={t("strangersTitle")} subtitle={t("strangersDesc")}
              done={secondaryDone} total={totalSecondary} />

            {/* Lester Assassinations first */}
            {(() => {
              const lesterMissions = secondaryMissions.filter((sm) => sm.type === "Assassinat de Lester");
              if (lesterMissions.length === 0) return null;
              return (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {lang === "en" ? "Lester Assassinations" : "Assassinats de Lester"}
                  </h3>
                  <div className="space-y-4">
                    {lesterMissions.map((sm) => (
                      <SecondaryMissionCard key={sm.id} sm={sm} completed={completed}
                        setCompleted={setCompleted} lang={lang} t={t}
                        onOpen={(m, tab) => { setSecDetailMission(m); setSecDetailActivity(null); setSecDetailTab(tab); setSecDetailOpen(true); }} />
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Strangers & Freaks grouped by protagonist */}
            {(["franklin", "michael", "trevor"] as const).map((prot) => {
              const protMissions = secondaryMissions.filter(
                (sm) => sm.type !== "Assassinat de Lester" && sm.protagonist === prot
              );
              if (protMissions.length === 0) return null;
              const protLabel = prot.charAt(0).toUpperCase() + prot.slice(1);
              return (
                <div key={prot} className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <Gamepad2 className="h-3.5 w-3.5 text-cyan-400" />
                    {protLabel}
                  </h3>
                  <div className="space-y-4">
                    {protMissions.map((sm) => (
                      <SecondaryMissionCard key={sm.id} sm={sm} completed={completed}
                        setCompleted={setCompleted} lang={lang} t={t}
                        onOpen={(m, tab) => { setSecDetailMission(m); setSecDetailActivity(null); setSecDetailTab(tab); setSecDetailOpen(true); }} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Missions with protagonist "all" that aren't Lester */}
            {(() => {
              const allMissions = secondaryMissions.filter(
                (sm) => sm.type !== "Assassinat de Lester" && sm.protagonist === "all"
              );
              if (allMissions.length === 0) return null;
              return (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <Gamepad2 className="h-3.5 w-3.5 text-cyan-400" />
                    {lang === "en" ? "All Characters" : "Tous les personnages"}
                  </h3>
                  <div className="space-y-4">
                    {allMissions.map((sm) => (
                      <SecondaryMissionCard key={sm.id} sm={sm} completed={completed}
                        setCompleted={setCompleted} lang={lang} t={t}
                        onOpen={(m, tab) => { setSecDetailMission(m); setSecDetailActivity(null); setSecDetailTab(tab); setSecDetailOpen(true); }} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* COLLECTIBLES */}
        {mainTab === "collectibles" && (
          <div className="space-y-3">
            {collectibleCategories.filter((c) => c.id === collectibleSub).map((cat) => {
              const catDone  = cat.items.filter((it) => !!completed[`ci-${it.id}`]).length;
              const catTitle = loc(cat.title, cat.title_en, lang);
              const catDesc  = loc(cat.description, cat.description_en, lang);
              const catReward = loc(cat.reward, cat.reward_en, lang);
              return (
                <div key={cat.id}>
                  <SectionHeader icon={<Package className="h-5 w-5 text-cyan-400" />}
                    title={catTitle} subtitle={catDesc}
                    done={catDone} total={cat.items.length} />
                  <div className="rounded-lg border border-cyan-700/30 bg-cyan-900/20 px-3 py-2 mb-3">
                    <p className="text-xs text-cyan-400 font-medium">
                      {lang === "en" ? "Reward: " : "R\u00e9compense: "}{catReward}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {cat.items.map((item) => {
                      const key    = `ci-${item.id}`;
                      const isDone = !!completed[key];
                      return (
                        <div key={item.id}
                          onClick={() => { setCollectibleDetailItem(item); setCollectibleDetailOpen(true); }}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all bg-slate-900/80 backdrop-blur-md cursor-pointer hover:border-cyan-500/40",
                            isDone ? "border-cyan-500/50" : "border-slate-700/50"
                          )}>
                          <button type="button"
                            onClick={(e) => { e.stopPropagation(); setCompleted((p) => ({ ...p, [key]: !p[key] })); }}
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all mt-0.5 touch-manipulation",
                              isDone ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-600"
                            )}>
                            {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-slate-500">
                                {item.id.split("-").pop()?.padStart(2, "0")}
                              </span>
                              <span className={cn("text-sm font-medium leading-snug", isDone ? "text-slate-100" : "text-slate-300")}>
                                {item.location}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500">{ZONES[item.zone] ?? item.zone}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {cat.items.length < 50 && (
                    <p className="mt-3 text-center text-xs text-slate-500">
                      {t("moreLocations").replace("%d", String(50 - cat.items.length))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ACTIVITIES */}
        {mainTab === "activities" && (
          <div className="space-y-3">
            <SectionHeader icon={<Activity className="h-5 w-5 text-cyan-400" />}
              title={t("activitiesTitle")} subtitle={t("activitiesDesc")}
              done={activitiesDone} total={totalActivities} />
            {(["leisure", "sport", "race", "social"] as const).map((cat) => {
              const catActivities = activities.filter((a) => a.category === cat);
              return (
                <div key={cat}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 mt-4 first:mt-0">
                    {activityCategoryLabels[cat]}
                  </h3>
                  <div className="space-y-4">
                    {catActivities.map((activity) => {
                      const key    = `act-${activity.id}`;
                      const isDone = !!completed[key];
                      const tip    = getActivityTip(activity, lang);
                      return (
                        <div key={activity.id}
                          onClick={() => { setSecDetailActivity(activity); setSecDetailMission(null); setSecDetailTab("details"); setSecDetailOpen(true); }}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all bg-slate-900/80 backdrop-blur-md cursor-pointer hover:border-cyan-500/40",
                            isDone ? "border-cyan-500/50" : "border-slate-700/50"
                          )}>
                          <button type="button"
                            onClick={(e) => { e.stopPropagation(); setCompleted((p) => ({ ...p, [key]: !p[key] })); }}
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all mt-0.5 touch-manipulation",
                              isDone ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-600"
                            )}>
                            {isDone
                              ? <CheckCircle2 className="h-4 w-4" />
                              : <Circle className="h-4 w-4 text-slate-600" />
                            }
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={cn("text-sm font-semibold", isDone ? "text-slate-100" : "text-slate-300")}>
                                {getActivityTitle(activity, lang)}
                              </span>
                              {activity.character && activity.character !== "Tous" && activity.character !== "All" && (
                                <span className="text-[10px] font-semibold rounded-full bg-slate-800 border border-slate-700/50 px-1.5 py-0.5 text-slate-400">
                                  {activity.character}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{getActivityDescription(activity, lang)}</p>
                            {tip && (
                              <div className="mt-1.5 flex items-start gap-2">
                                <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-cyan-900/50">
                                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                </span>
                                <span className="text-[11px] text-cyan-400 font-medium leading-snug">{tip}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* GTA VI */}
        {mainTab === "gta6" && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-cyan-500/30 bg-cyan-900/20">
                <MapPin className="h-12 w-12 text-cyan-400/40" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-wider text-cyan-400">{t("tabGta6")}</h2>
              <p className="text-sm text-slate-300 mt-2 max-w-xs">{t("gta6Desc")}</p>
              <p className="mt-4 text-xs text-slate-500 font-mono uppercase tracking-widest">{t("gta6Soon")}</p>
            </div>
          </div>
        )}
      </div>

      {/* PANELS */}
      <MissionDetail mission={activeMission} open={detailOpen} onOpenChange={setDetailOpen}
        completed={activeMission ? !!completed[activeMission.id] : false}
        checkedObjectives={checked} onToggleObjective={toggleObjective}
        onToggleComplete={toggleMissionComplete} initialTab={initialTab} />

      <SyncModal open={syncOpen} onClose={() => setSyncOpen(false)}
        state={{ completed, checked }} onImport={handleImport} />

      <SecondaryDetail
        mission={secDetailMission} activity={secDetailActivity}
        open={secDetailOpen}
        onClose={() => { setSecDetailOpen(false); setSecDetailMission(null); setSecDetailActivity(null); }}
        completed={
          secDetailMission ? !!completed[`sm-${secDetailMission.id}`] :
          secDetailActivity ? !!completed[`act-${secDetailActivity.id}`] : false
        }
        onToggle={() => {
          if (secDetailMission) {
            const key = `sm-${secDetailMission.id}`;
            setCompleted((p) => ({ ...p, [key]: !p[key] }));
          } else if (secDetailActivity) {
            const key = `act-${secDetailActivity.id}`;
            setCompleted((p) => ({ ...p, [key]: !p[key] }));
          }
        }}
        initialTab={secDetailTab}
      />

      <CollectibleDetail
        item={collectibleDetailItem}
        category={collectibleCategories.find((c) => c.id === collectibleSub) ?? null}
        open={collectibleDetailOpen}
        onClose={() => { setCollectibleDetailOpen(false); setCollectibleDetailItem(null); }}
        completed={collectibleDetailItem ? !!completed[`ci-${collectibleDetailItem.id}`] : false}
        onToggle={() => {
          if (collectibleDetailItem) {
            const key = `ci-${collectibleDetailItem.id}`;
            setCompleted((p) => ({ ...p, [key]: !p[key] }));
          }
        }}
        lang={lang}
        t={t}
      />
    </main>
  );
}

function SectionHeader({
  icon, title, subtitle, done, total,
}: {
  icon: React.ReactNode; title: string; subtitle: string; done: number; total: number;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-extrabold uppercase tracking-wide text-slate-100">{title}</h2>
      </div>
      <p className="text-sm text-slate-300 mt-1">{subtitle}</p>
      <div className="mt-3 flex items-center gap-3">
        {icon}
        <Progress value={pct} className="h-2 flex-1" />
        <span className="font-mono text-sm font-bold shrink-0 text-cyan-400">
          {done}<span className="text-slate-400">/{total}</span>
        </span>
      </div>
    </div>
  );
}

function SecondaryMissionCard({
  sm, completed, setCompleted, lang, t, onOpen,
}: {
  sm: SecondaryMission;
  completed: Record<string, boolean>;
  setCompleted: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  lang: Lang;
  t: (key: any) => string;
  onOpen: (sm: SecondaryMission, tab: DetailTab) => void;
}) {
  const key      = `sm-${sm.id}`;
  const isDone   = !!completed[key];
  const isLester = sm.type === "Assassinat de Lester";
  const smTitle  = loc(sm.title, sm.title_en, lang);
  const smDesc   = loc(sm.description, sm.description_en, lang);
  const smTip    = sm.tip ? (lang === "en" && sm.tip_en ? sm.tip_en : sm.tip) : undefined;
  const stock    = sm.stockAlert;

  return (
    <div
      onClick={() => onOpen(sm, "details")}
      className={cn(
        "rounded-lg border p-4 transition-all bg-slate-900/80 backdrop-blur-md cursor-pointer hover:border-cyan-500/40",
        isDone ? "border-cyan-500/50" : "border-slate-700/50",
        isLester && !isDone && "border-l-2 border-l-red-500"
      )}>
      {isLester && stock && !isDone && (
        <div className="mb-3 flex items-center gap-2 rounded-md bg-red-500/10 border border-red-500/30 px-2.5 py-1.5">
          <TrendingUp className="h-3 w-3 text-red-400 shrink-0 animate-pulse" />
          <span className="text-[10px] font-bold text-red-400">
            {lang === "en" ? "STOCK" : "BOURSE"} &mdash; {stock.ticker} &middot; {stock.action}
          </span>
        </div>
      )}
      <div className="flex items-start gap-3">
        <button type="button" onClick={(e) => { e.stopPropagation(); setCompleted((p) => ({ ...p, [key]: !p[key] })); }}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all mt-0.5 touch-manipulation",
            isDone ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-600 hover:border-cyan-500/60"
          )}>
          {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={cn("font-semibold text-sm", isDone ? "text-slate-100" : "text-slate-300")}>{smTitle}</h3>
              <CharacterBadge protagonist={sm.protagonist} />
            </div>
            <span className="shrink-0 rounded-full bg-slate-800 border border-slate-700/50 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
              {isLester ? t("lesterType") : t("strangersType")}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{smDesc}</p>

          {smTip && (
            <div className="mt-2 flex items-start gap-2">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-cyan-900/50">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <p className="text-xs text-cyan-400 font-medium leading-snug">{smTip}</p>
            </div>
          )}

          {stock && (
            <div className="mt-2 space-y-1.5 rounded-md bg-slate-800/50 p-2.5 border border-slate-700/50">
              <div className="flex items-start gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase shrink-0 mt-0.5">
                  {lang === "en" ? "Before:" : "Avant:"}
                </span>
                <span className="text-[10px] text-slate-300">{lang === "en" && stock.before_en ? stock.before_en : stock.before}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase shrink-0 mt-0.5">
                  {lang === "en" ? "After:" : "Après:"}
                </span>
                <span className="text-[10px] text-slate-300">{lang === "en" && stock.after_en ? stock.after_en : stock.after}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const COLLECTIBLE_DETAILS: Record<string, { prereq: { fr: string; en: string }; howTo: { fr: string; en: string } }> = {
  spaceship: {
    prereq: { fr: "Mission \"Far Out\" avec Franklin", en: "\"Far Out\" mission with Franklin" },
    howTo: {
      fr: "50 pièces de vaisseau spatial disséminées dans tout Los Santos et Blaine County. Elles émettent un halo lumineux violet la nuit. Utilisez un hélicoptère pour accéder aux toits et zones isolées. Une fois les 50 récupérées, retournez voir Omega pour assembler le vaisseau.",
      en: "50 spaceship parts scattered across Los Santos and Blaine County. They emit a purple luminous halo at night. Use a helicopter to reach rooftops and isolated areas. Once all 50 are collected, return to Omega to assemble the spacecraft.",
    },
  },
  letter: {
    prereq: { fr: "Aucun prérequis", en: "No prerequisites" },
    howTo: {
      fr: "50 morceaux de lettre éparpillés sur la carte. Chaque morceau brille légèrement au sol. Récupérez les 50 pour débloquer la mission \"A Mystery, Solved\" qui révèle l'identité du tueur. Consultez la carte interactive du Rockstar Social Club pour les emplacements exacts.",
      en: "50 letter scraps scattered across the map. Each piece glows slightly on the ground. Collect all 50 to unlock the \"A Mystery, Solved\" mission revealing the killer's identity. Check the Rockstar Social Club interactive map for exact locations.",
    },
  },
  stunt: {
    prereq: { fr: "Aucun prérequis — disponible dès le début", en: "No prerequisites — available from the start" },
    howTo: {
      fr: "50 sauts en cascade répartis sur toute la carte. Approchez à grande vitesse pour déclencher le ralenti cinématique. Utilisez une moto rapide (Bati 801) pour les sauts courts et une voiture rapide (Adder) pour les longs sauts. L'atterrissage compte autant que la distance.",
      en: "50 stunt jumps spread across the entire map. Approach at high speed to trigger the cinematic slow-motion. Use a fast motorcycle (Bati 801) for short jumps and a fast car (Adder) for long jumps. Landing matters as much as distance.",
    },
  },
};

function CollectibleDetail({
  item, category, open, onClose, completed, onToggle, lang, t,
}: {
  item: { id: string; location: string; zone: string } | null;
  category: { id: string; title: string; title_en?: string; description: string; description_en?: string; reward: string; reward_en?: string } | null;
  open: boolean;
  onClose: () => void;
  completed: boolean;
  onToggle: () => void;
  lang: Lang;
  t: (key: any) => string;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "solution">("details");

  useEffect(() => { if (open) setActiveTab("details"); }, [open]);

  if (!open || !item || !category) return null;

  const catTitle = loc(category.title, category.title_en, lang);
  const catDesc = loc(category.description, category.description_en, lang);
  const reward = loc(category.reward, category.reward_en, lang);
  const details = COLLECTIBLE_DETAILS[category.id];
  const zone = ZONES[item.zone] ?? item.zone;

  const tabs = [
    { id: "details" as const, label: t("details"), icon: <Trophy className="h-3.5 w-3.5" /> },
    { id: "solution" as const, label: t("solution"), icon: <Gamepad2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
        <div className={cn(
          "pointer-events-auto relative w-full rounded-2xl border bg-slate-900/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden",
          "max-h-[calc(100dvh-24px)] md:max-h-[85vh]",
          completed ? "border-cyan-500/50" : "border-slate-700/50"
        )}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Header */}
          <div className="flex items-start gap-3 p-4 border-b border-slate-700/50 shrink-0">
            <div className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 mt-0.5",
              completed ? "border-cyan-500 bg-cyan-500 text-white" : "border-cyan-500/50"
            )}>
              {completed ? <CheckCircle2 className="h-4 w-4" /> : <Package className="h-4 w-4 text-cyan-400" />}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <h2 className={cn("text-base font-bold leading-tight", completed ? "text-cyan-400" : "text-slate-100")}>
                {item.location}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{catTitle} &middot; {zone}</p>
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
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <p className="text-xs text-slate-300 leading-relaxed">{catDesc}</p>
                </div>

                {details && (
                  <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                        {lang === "en" ? "Prerequisites" : "Pr\u00e9requis"}
                      </p>
                      <p className="text-sm text-slate-300">{details.prereq[lang]}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">
                        {lang === "en" ? "How to Find" : "Comment trouver"}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{details.howTo[lang]}</p>
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-cyan-900/30 border border-cyan-700/50 px-3 py-2.5">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-0.5">{t("rewardLabel")}</p>
                  <p className="text-sm text-slate-300">{reward}</p>
                </div>

                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3.5">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">{t("zoneLabel")}</p>
                  <p className="text-sm text-slate-100">{zone}</p>
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
                        {lang === "en" ? "Collection Guide" : "Guide de collecte"}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{details.howTo[lang]}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 text-center py-6">
                    {lang === "en" ? "No detailed walkthrough available yet." : "Aucun guide d\u00e9taill\u00e9 disponible pour le moment."}
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
        </div>
      </div>
    </>
  );
}
