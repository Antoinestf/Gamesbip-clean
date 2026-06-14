"use client";

import { useEffect, useState } from "react";
import { HomeScreen } from "@/components/home-screen";
import { MissionTree } from "@/components/mission-tree";
import { HadesTracker } from "@/components/hades-tracker";
import { Sts2Tracker } from "@/components/sts2-tracker";
import EldenRingTracker from "@/components/elden-ring-tracker";
import { Dashboard } from "@/components/dashboard";
import { AdPlaceholder } from "@/components/ad-placeholder";

type GameView = "home" | "gta5" | "hades2" | "sts2" | "eldenring" | "re-requiem" | "dashboard";

export default function Page() {
  const [view, setView] = useState<GameView>("home");

  useEffect(() => {
    console.log("Vue actuelle:", view);
  }, [view]);

  function handleChangeView(gameId: GameView) {
    console.log("Changement de vue vers:", gameId);
    console.log("setView appelé avec:", gameId);
    setView(gameId);
  }

  return (
    <>
      {view === "home"       && <HomeScreen       onSelectGame={handleChangeView} />}
      {view === "gta5"       && <MissionTree      onBack={() => handleChangeView("home")} />}
      {view === "hades2"     && <HadesTracker     onBack={() => handleChangeView("home")} />}
      {view === "sts2"       && <Sts2Tracker      onBack={() => handleChangeView("home")} />}
      {view === "eldenring" && <EldenRingTracker onBack={() => handleChangeView("home")} />}
      {view === "re-requiem" && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-8">
          <h1 className="text-4xl font-black tracking-tight mb-3">Resident Evil Requiem</h1>
          <p className="text-slate-400 mb-6">Contenu en cours de cr\u00e9ation — revenez bient\u00f4t !</p>
          <button type="button" onClick={() => handleChangeView("home")}
            className="rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2 text-sm font-bold text-cyan-400 hover:bg-slate-700/70 hover:border-cyan-500/50 transition-colors">
            \u2190 Retour
          </button>
        </div>
      )}
      {view === "dashboard" && <Dashboard onBack={() => handleChangeView("home")} />}
      <AdPlaceholder />
    </>
  );
}
