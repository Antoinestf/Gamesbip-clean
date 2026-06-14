import { cn } from "@/lib/utils";
import type { Protagonist } from "@/lib/missions";

const CONFIG: Record<Protagonist, { label: string; className: string; title: string }> = {
  michael:  { label: "M", className: "bg-cyan-900/50 text-cyan-400 border border-cyan-700/50", title: "Michael" },
  franklin: { label: "F", className: "bg-cyan-900/50 text-cyan-400 border border-cyan-700/50", title: "Franklin" },
  trevor:   { label: "T", className: "bg-cyan-900/50 text-cyan-400 border border-cyan-700/50", title: "Trevor" },
  all:      { label: "\u2605", className: "bg-slate-700/50 text-slate-300 border border-slate-600/50", title: "Tous les personnages" },
};

interface CharacterBadgeProps {
  protagonist: Protagonist;
  className?: string;
}

export function CharacterBadge({ protagonist, className }: CharacterBadgeProps) {
  const cfg = CONFIG[protagonist];
  return (
    <span
      title={cfg.title}
      className={cn(
        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold leading-none",
        cfg.className,
        className
      )}
    >
      {cfg.label}
    </span>
  );
}
