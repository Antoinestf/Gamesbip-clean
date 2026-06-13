"use client";

import { useEffect, useState } from "react";
import { HomeScreen } from "@/components/home-screen";
import { MissionTree } from "@/components/mission-tree";
import { HadesTracker } from "@/components/hades-tracker";
import { Sts2Tracker } from "@/components/sts2-tracker";
import EldenRingTracker from "@/components/elden-ring-tracker";
import { Dashboard } from "@/components/dashboard";
import { AdPlaceholder } from "@/components/ad-placeholder";

type GameView = "home" | "gta5" | "hades2" | "sts2" | "eldenring" | "dashboard";

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
      {view === "dashboard" && <Dashboard onBack={() => handleChangeView("home")} />}
      <AdPlaceholder />
    </>
  );
}
