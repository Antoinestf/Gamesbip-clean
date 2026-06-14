"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, Gamepad2, Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface Gta6ViewProps {
  onBack: () => void;
}

const RELEASE_DATE = new Date("2026-10-15T00:00:00");

interface TimeLeft {
  days:    number;
  hours:   number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const seconds = Math.floor(diff / 1000);
  return {
    days:    Math.floor(seconds / 86400),
    hours:   Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

const TEASER_MISSIONS_FR = [
  { title: "Intro — Lucia & Jason",   desc: "L'ouverture de GTA VI — Vice City, 2026." },
  { title: "Everglades Heist",        desc: "Le premier braquage dans les marécages de Floride." },
  { title: "Vice City Arrival",       desc: "Exploration des néons de Vice City pour la première fois." },
  { title: "The Leonida Connection",  desc: "Rencontres avec les factions locales." },
  { title: "Offshore Run",            desc: "Fuite en jet-ski dans la baie de Vice City." },
];

const TEASER_MISSIONS_EN = [
  { title: "Intro — Lucia & Jason",   desc: "The GTA VI opening — Vice City, 2026." },
  { title: "Everglades Heist",        desc: "The first heist deep in the Florida swamps." },
  { title: "Vice City Arrival",       desc: "First exploration of Vice City's neon streets." },
  { title: "The Leonida Connection",  desc: "Meeting the local factions of Leonida." },
  { title: "Offshore Run",            desc: "Jet-ski escape across Vice City Bay." },
];

export function Gta6View({ onBack }: Gta6ViewProps) {
  const { lang } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const missions = lang === "fr" ? TEASER_MISSIONS_FR : TEASER_MISSIONS_EN;

  const isReleased = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Vice City atmospheric background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background: "radial-gradient(ellipse at top, rgba(20,40,80,0.4) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(80,20,60,0.3) 0%, transparent 55%)",
        }}
      />

      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/92 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors touch-manipulation shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{lang === "fr" ? "Accueil" : "Home"}</span>
          </button>
          <div className="flex-1" />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 pb-28 pt-8">

        {/* Hero */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400/60 mb-2">
            {lang === "fr" ? "Grand Theft Auto" : "Grand Theft Auto"}
          </p>
          <h1
            className="text-6xl font-black tracking-tighter sm:text-8xl"
            style={{
              background: "linear-gradient(135deg, #67e8f9 0%, #e879f9 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(103,232,249,0.4))",
            }}
          >
            VI
          </h1>
          <p className="mt-3 text-sm font-semibold text-muted-foreground">
            {lang === "fr" ? "Vice City — Leonida" : "Vice City — Leonida"}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground/50 max-w-xs mx-auto">
            {lang === "fr"
              ? "Le guide GTAbip pour GTA VI sera disponible à la sortie du jeu."
              : "The GTAbip guide for GTA VI will be available on release."}
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/50 text-center mb-5">
            {lang === "fr" ? "Guide disponible dans" : "Guide available in"}
          </h2>
          {isReleased ? (
            <div className="text-center py-8">
              <p className="text-2xl font-extrabold text-cyan-400">
                {lang === "fr" ? "🎮 Le guide est disponible !" : "🎮 The guide is live!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {([
                { value: timeLeft.days,    label: lang === "fr" ? "Jours"    : "Days"    },
                { value: timeLeft.hours,   label: lang === "fr" ? "Heures"   : "Hours"   },
                { value: timeLeft.minutes, label: lang === "fr" ? "Minutes"  : "Minutes" },
                { value: timeLeft.seconds, label: lang === "fr" ? "Secondes" : "Seconds" },
              ] as const).map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-xl border border-cyan-500/20 bg-cyan-500/5 py-4 px-2"
                >
                  <span
                    className="font-mono text-2xl font-black sm:text-3xl"
                    style={{ color: "#67e8f9", textShadow: "0 0 20px rgba(103,232,249,0.6)" }}
                  >
                    {mounted ? String(value).padStart(2, "0") : "--"}
                  </span>
                  <span className="mt-1 text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teaser mission list */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/50 mb-4 flex items-center gap-2">
            <Gamepad2 className="h-3.5 w-3.5" />
            {lang === "fr" ? "Missions annoncées" : "Announced Missions"}
          </h2>
          <div className="space-y-2">
            {missions.map((mission, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-3 opacity-70"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 font-mono text-[11px] font-bold"
                  style={{ color: "#67e8f9" }}
                >
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground/60">{mission.title}</h3>
                    <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-wide">
                      {lang === "fr" ? "Non confirmé" : "Unconfirmed"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/40 mt-0.5">{mission.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teaser features */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { icon: <MapPin className="h-4 w-4" />, label: "Vice City" },
            { icon: <Star   className="h-4 w-4" />, label: "Lucia & Jason" },
            { icon: <Clock  className="h-4 w-4" />, label: lang === "fr" ? "2 Personnages" : "2 Protagonists" },
          ].map((feat) => (
            <div key={feat.label} className="flex items-center gap-2 rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-3 py-2.5">
              <span className="text-cyan-400/50">{feat.icon}</span>
              <span className="text-xs font-semibold text-muted-foreground/50">{feat.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
