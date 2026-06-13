"use client";

import { QUIL_QUESTS } from "@/data/quests";

interface EldenRingTrackerProps {
  onBack: () => void;
}

export default function EldenRingTracker({ onBack }: EldenRingTrackerProps) {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 p-8">
      {/* En-tête (Bouton exact et Titre) */}
      <div className="flex items-center gap-6 mb-12 border-b border-[#1e293b] pb-6">
        {/* Bouton retour (Pillule Cyan) */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2 bg-[#00d0f4] hover:bg-cyan-400 text-[#070b14] rounded-full font-bold text-sm tracking-wide transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          GAME'S BIP
        </button>

        {/* Titre Section */}
        <div className="flex items-center gap-3 text-[#00d0f4]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
          </svg>
          <h1 className="text-xl font-bold tracking-wider text-slate-200">100% COMPLETION PROGRESS</h1>
        </div>
      </div>

      {/* Liste des Quêtes (Design GTA) */}
      <div className="space-y-4 max-w-5xl">
        {QUIL_QUESTS.map((quest, index) => (
          <div key={quest.id} className="flex border border-[#1e293b] rounded-lg bg-[#0f172a] overflow-hidden hover:border-[#334155] transition-colors">
            {/* Colonne Numéro (Cercle) */}
            <div className="flex items-center justify-center w-20 border-r border-[#1e293b] bg-[#0f172a]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-600 text-slate-400 text-sm">
                {index + 1}
              </span>
            </div>
            
            {/* Contenu principal */}
            <div className="flex-1 p-5">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-base font-bold text-slate-200">{quest.name}</h2>
                {/* Petit badge F/M de GTA adapté */}
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00d0f4] text-[#070b14] text-[10px] font-extrabold">
                  Q
                </span>
              </div>
              <p className="text-sm text-slate-400">{quest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
