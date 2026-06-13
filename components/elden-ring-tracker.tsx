"use client";

import { useEffect, useState } from "react";
import { X, Trophy, Gamepad2, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { LangToggle } from "@/components/lang-toggle";

const STORAGE_KEY = "eldenringbip_progress";

interface Quest {
  id: string;
  category: string;
  name: string;
  region: string;
  level: string;
  duration: string;
  difficulty: string;
  alertType?: 'item' | 'quest';
  alertMessage?: string;
  description: string;
  steps: string[];
  reward: string;
  prereq: string;
}

const ELDEN_RING_DATA: Quest[] = [
  // --- ENTRE-TERRE (Boss Majeurs) ---
  {
    id: 'margit', category: 'entre_terre', name: 'Margit le Déchu',
    region: 'Nécrolimbe', level: '15-25', duration: '20 min', difficulty: 'Moyen',
    description: 'Le premier grand verrou du jeu.',
    steps: ["Achetez les Entraves de Margit chez Pat.", "Invoquez le Sorcier Rogier.", "Utilisez les Loups Solitaires."],
    reward: 'Sacoche à talisman', prereq: 'Aucun'
  },
  {
    id: 'godrick', category: 'entre_terre', name: 'Godrick le Greffé',
    region: 'Nécrolimbe', level: '20-30', duration: '30 min', difficulty: 'Moyen',
    description: 'Le Seigneur du Château de Voilorage.',
    steps: ["Explorez le château.", "Invoquez Nepheli Loux.", "Esquivez ses attaques de zone."],
    reward: 'Rune majeure', prereq: 'Margit vaincu'
  },
  {
    id: 'radahn', category: 'entre_terre', name: 'Général Radahn',
    region: 'Caelid', level: '60-70', duration: '45 min', difficulty: 'Difficile',
    description: 'Le fléau des astres.',
    steps: ["Activez le festival au Château du Lion rouge.", "Invoquez tous les PNJ sur l'arène.", "Restez à distance lors de la phase 2."],
    reward: 'Rune majeure', prereq: 'Accès Plateau Altus'
  },
  {
    id: 'morgott', category: 'entre_terre', name: 'Morgott, Roi des Présages',
    region: 'Leyndell', level: '80-90', duration: '40 min', difficulty: 'Difficile',
    description: 'Le roi de la capitale.',
    steps: ["Traversez Leyndell.", "Invoquez Melina.", "Gérez ses combos rapides."],
    reward: 'Rune majeure', prereq: '2 Runes majeures activées'
  },

  // --- DESTINS LIÉS (Quêtes PNJ) ---
  {
    id: 'ranni', category: 'destins', name: 'Quête de Ranni',
    region: 'Liurnia', level: '50-60', duration: '3h', difficulty: 'Difficile',
    alertType: 'quest',
    alertMessage: "La quête de Ranni devient inaccessible après avoir activé l'Arbre-Monde.",
    description: 'Débloquez la fin secrète des étoiles.',
    steps: ["Rencontrez-la à sa tour.", "Battez Radahn.", "Récupérez la Lame digicide à Nokron.", "Traversez le Lac de putréfaction."],
    reward: 'Espadon de la Lune', prereq: 'Manoir de Caria'
  },
  {
    id: 'alexander', category: 'destins', name: 'Alexander le Pot',
    region: 'Multiple', level: '30-40', duration: '2h', difficulty: 'Moyen',
    alertType: 'quest',
    alertMessage: "Le duel final à Farum Azula est manquable si vous progressez trop loin dans la fin du jeu.",
    description: 'Le guerrier en terre cuite.',
    steps: ["Libérez-le en Nécrolimbe.", "Tunnel de Gael.", "Festival Radahn.", "Mont Gelmir.", "Duel à Farum Azula."],
    reward: "Fragment d'Alexander", prereq: 'Aucun'
  },
  {
    id: 'millicent', category: 'destins', name: 'Quête de Millicent',
    region: 'Caelid', level: '60-80', duration: '2h 30min', difficulty: 'Moyen',
    alertType: 'quest',
    alertMessage: "Millicent disparaît si vous battez Malenia avant de terminer sa quête.",
    description: 'Soignez la putréfaction écarlate.',
    steps: ["Parlez à Gowry.", "Récupérez l'Aiguille en or pur.", "Donnez la prothèse à Millicent.", "Combattez ses sœurs."],
    reward: 'Insigne ailée putréfiée', prereq: 'Altus'
  },
  {
    id: 'fia', category: 'destins', name: 'Quête de Fia',
    region: 'Deeproot', level: '70-90', duration: '1h 30min', difficulty: 'Difficile',
    alertType: 'quest',
    alertMessage: "La quête de Fia se bloque si vous activez l'Arbre-Monde sans avoir récupéré la Rune de restauration.",
    description: 'Le secret du Prince de la Mort.',
    steps: ["Enlacez-la à la Table Ronde.", "Donnez la dague à D.", "Battez les champions à Fonderacine.", "Défiez Fortissax."],
    reward: 'Rune de restauration', prereq: 'Table Ronde'
  },

  // --- ARMURERIE (Collectibles Légendaires) ---
  {
    id: 'talisman_arbre', category: 'armurerie', name: "Faveur de l'Arbre-Monde +2",
    region: 'Leyndell', level: '90+', duration: '15 min', difficulty: 'Facile',
    description: 'Augmente PV, Endurance, Charge.',
    steps: ["Accédez à Leyndell cendrée.", "Ramassez sur le cadavre géant."],
    reward: 'Talisman', prereq: 'Fin de jeu'
  },
  {
    id: 'lune_obscure', category: 'armurerie', name: 'Espadon de la Lune Obscure',
    region: 'Liurnia', level: '60+', duration: '10 min', difficulty: 'Facile',
    alertType: 'item',
    alertMessage: "Cet objet unique est accessible uniquement après avoir terminé la quête de Ranni. Il ne peut pas être obtenu autrement.",
    description: "Arme légendaire d'intelligence.",
    steps: ["Finissez la quête de Ranni.", "Récupérez sous la Cathédrale."],
    reward: 'Espadon', prereq: 'Quête Ranni'
  },
  {
    id: 'croc_limier', category: 'armurerie', name: 'Croc du Limier',
    region: 'Nécrolimbe', level: '20+', duration: '10 min', difficulty: 'Moyen',
    description: 'Katana courbe très puissant.',
    steps: ["Battez Darriwil dans la Geôle éternelle."],
    reward: 'Arme', prereq: 'Aucun'
  },
  {
    id: 'lame_digicide', category: 'armurerie', name: 'Lame Digicide',
    region: 'Nokron', level: '50+', duration: '20 min', difficulty: 'Moyen',
    alertType: 'item',
    alertMessage: "Objet unique récupérable uniquement dans Nokron, accessible après avoir vaincu Radahn.",
    description: 'Trésor de Nokron.',
    steps: ["Entrez dans Nokron via le cratère.", "Ouvrez le coffre dans l'église."],
    reward: 'Objet clé', prereq: 'Battez Radahn'
  },

  // --- DÉFIS (Exploration / Donjons optionnels) ---
  {
    id: 'tunnel_gael', category: 'defis', name: 'Tunnel de Gael',
    region: 'Caelid', level: '30-40', duration: '25 min', difficulty: 'Difficile',
    description: 'Donjon optionnel corsé.',
    steps: ["Traversez la zone de putréfaction.", "Battez le Wyrm de magma."],
    reward: 'Katana Éclat lunaire', prereq: 'Aucun'
  },
  {
    id: 'catacombes_noires', category: 'defis', name: 'Catacombes de la Mort',
    region: 'Nécrolimbe', level: '15+', duration: '15 min', difficulty: 'Facile',
    description: "Donjon d'initiation.",
    steps: ["Trouvez le levier.", "Éliminez l'Assassin."],
    reward: 'Couteau noir', prereq: 'Aucun'
  },
  {
    id: 'lac_putrefaction', category: 'defis', name: 'Lac de Putréfaction',
    region: 'Ainsel', level: '80+', duration: '30 min', difficulty: 'Très difficile',
    description: 'Zone de danger extrême.',
    steps: ["Traversez le lac avec des fioles.", "Battez Astel."],
    reward: 'Accès fin de quête', prereq: 'Quête Ranni'
  },
  {
    id: 'geole_dargit', category: 'defis', name: 'Geôle de Ringlead',
    region: 'Liurnia', level: '40+', duration: '20 min', difficulty: 'Difficile',
    description: 'Boss optionnel puissant.',
    steps: ["Trouvez la clé-épée.", "Entrez dans la geôle.", "Battez Ringlead."],
    reward: 'Talisman de Graine', prereq: 'Clé-épée'
  }
];

const CATEGORIES = [
  { id: 'entre_terre', label: "L'Entre-Terre" },
  { id: 'destins', label: 'Destins liés' },
  { id: 'armurerie', label: 'Armurerie' },
  { id: 'defis', label: 'Défis' }
];

export default function EldenRingTracker({ onBack }: { onBack: () => void }) {
  const [hydrated, setHydrated] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('destins');
  const [activeTab, setActiveTab] = useState<'details' | 'solution'>('details');

  useEffect(() => {
    const saved = loadFromStorage(STORAGE_KEY);
    setCompleted(saved.completed);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage({ completed, checked: {} }, STORAGE_KEY);
  }, [completed, hydrated]);

  function toggleComplete(id: string) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const activeQuest = ELDEN_RING_DATA.find(q => q.id === selectedQuestId);
  const filteredItems = ELDEN_RING_DATA.filter(item => item.category === activeCategory);

  const totalAll = ELDEN_RING_DATA.length;
  const totalDone = ELDEN_RING_DATA.filter(item => !!completed[item.id]).length;
  const globalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#05070a' }}>

      {/* ── Sticky header ── */}
      <div
        className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(15,23,42,0.85)', borderColor: '#1e293b' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3">

          {/* Top row */}
          <div className="flex items-center gap-3 mb-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-bold transition-all duration-200 touch-manipulation shrink-0 text-white"
              style={{ minHeight: '44px', backgroundColor: '#00d0f4', color: '#05070a' }}
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-tighter">Game&apos;s Bip</span>
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 shrink-0" style={{ color: '#00d0f4' }} />
              <span className="text-xs font-black uppercase tracking-tighter truncate text-slate-100">
                Elden Ring
              </span>
            </div>

            <LangToggle />

            <span className="font-mono text-sm font-black shrink-0" style={{ color: '#00d0f4' }}>
              {globalPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${globalPct}%`, backgroundColor: '#00d0f4' }}
            />
          </div>

          {/* Counter */}
          <p className="mt-1.5 text-[10px]" style={{ color: '#64748b' }}>
            <span className="font-mono font-bold" style={{ color: '#00d0f4' }}>{totalDone}</span>
            <span>/{totalAll} terminées</span>
          </p>
        </div>

        {/* Category tabs */}
        <div className="border-t" style={{ borderColor: '#1e293b' }}>
          <div className="mx-auto max-w-6xl overflow-x-auto px-2">
            <ul className="flex w-max items-stretch gap-0.5 py-1.5">
              {CATEGORIES.map(cat => {
                const count = ELDEN_RING_DATA.filter(i => i.category === cat.id).length;
                const done  = ELDEN_RING_DATA.filter(i => i.category === cat.id && !!completed[i.id]).length;
                const isActive = activeCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className="relative flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200 touch-manipulation"
                      style={{
                        color: isActive ? '#00d0f4' : '#64748b',
                        backgroundColor: isActive ? 'rgba(0,208,244,0.08)' : 'transparent',
                      }}
                    >
                      {cat.label}
                      <span
                        className="rounded-full px-1.5 font-mono text-[9px] font-bold leading-5"
                        style={{
                          color: isActive ? '#00d0f4' : '#64748b',
                          backgroundColor: isActive ? 'rgba(0,208,244,0.12)' : '#1e293b',
                        }}
                      >
                        {done}/{count}
                      </span>
                      {isActive && (
                        <span
                          className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full"
                          style={{ backgroundColor: '#00d0f4' }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Quest list ── */}
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-5">
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => {
              const isDone = !!completed[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => { setSelectedQuestId(item.id); setActiveTab('details'); }}
                  className="flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    backgroundColor: '#0f172a',
                    borderColor: isDone ? 'rgba(0,208,244,0.4)' : '#1e293b',
                  }}
                >
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); toggleComplete(item.id); }}
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 touch-manipulation border-2"
                    style={{
                      borderColor: isDone ? '#00d0f4' : '#334155',
                      backgroundColor: isDone ? '#00d0f4' : 'transparent',
                    }}
                  >
                    {isDone && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#05070a' }} />}
                  </button>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm font-semibold uppercase tracking-tighter leading-snug"
                        style={{ color: isDone ? '#e2e8f0' : '#cbd5e1' }}
                      >
                        {item.name}
                      </span>
                      {item.alertType === 'item' && (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-bold border"
                          style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                        >
                          ⚠ Objet unique
                        </span>
                      )}
                      {item.alertType === 'quest' && (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-bold border"
                          style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)' }}
                        >
                          ⚠ Point de non-retour
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{item.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm italic" style={{ color: '#475569' }}>Aucune quête dans cette catégorie pour le moment.</p>
          )}
        </div>
      </div>

      {/* ── Quest detail modal ── */}
      {activeQuest && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(5,7,10,0.85)' }}
            onClick={() => setSelectedQuestId(null)}
          />
          <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
            <div
              className="pointer-events-auto relative w-full flex flex-col overflow-hidden rounded-2xl backdrop-blur-md border shadow-2xl"
              style={{
                maxHeight: 'calc(100dvh - 24px)',
                backgroundColor: 'rgba(15,23,42,0.97)',
                borderColor: completed[activeQuest.id] ? 'rgba(0,208,244,0.4)' : '#1e293b',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, #00d0f4, transparent)' }}
              />

              {/* Header */}
              <div className="flex items-start gap-3 p-4 shrink-0 border-b" style={{ borderColor: '#1e293b' }}>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-0.5 border-2"
                  style={{
                    borderColor: completed[activeQuest.id] ? '#00d0f4' : 'rgba(0,208,244,0.4)',
                    backgroundColor: completed[activeQuest.id] ? 'rgba(0,208,244,0.15)' : 'rgba(0,208,244,0.05)',
                  }}
                >
                  {completed[activeQuest.id]
                    ? <CheckCircle2 className="h-5 w-5" style={{ color: '#00d0f4' }} />
                    : <span className="text-lg">⚔️</span>
                  }
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <h2
                    className="text-base font-black uppercase tracking-tighter leading-tight"
                    style={{ color: completed[activeQuest.id] ? '#00d0f4' : '#f1f5f9' }}
                  >
                    {activeQuest.name}
                  </h2>
                  <p className="text-xs mt-0.5 line-clamp-2" style={{ color: '#64748b' }}>{activeQuest.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedQuestId(null)}
                  className="absolute right-3 top-3 rounded-lg p-1.5 transition-colors duration-200 touch-manipulation"
                  style={{ color: '#64748b', backgroundColor: 'rgba(30,41,59,0.5)' }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Tab bar */}
              <div className="flex shrink-0 border-b" style={{ borderColor: '#1e293b' }}>
                {([
                  { id: 'details' as const, label: 'Détails', icon: <Trophy className="h-3.5 w-3.5" /> },
                  { id: 'solution' as const, label: 'Solution', icon: <Gamepad2 className="h-3.5 w-3.5" /> },
                ]).map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-tighter transition-all duration-200 touch-manipulation"
                    style={{ color: activeTab === tab.id ? '#00d0f4' : '#475569' }}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                      <span
                        className="absolute bottom-0 inset-x-0 h-[2px] rounded-full"
                        style={{ backgroundColor: '#00d0f4' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeTab === 'details' ? (
                  <>
                    {/* Durée / Difficulté */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg p-3.5 border" style={{ backgroundColor: '#05070a', borderColor: '#1e293b' }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#00d0f4' }}>Durée estimée</p>
                        <p className="text-sm font-mono font-medium text-white">{activeQuest.duration}</p>
                      </div>
                      <div className="rounded-lg p-3.5 border" style={{ backgroundColor: '#05070a', borderColor: '#1e293b' }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#00d0f4' }}>Difficulté</p>
                        <p className="text-sm font-medium text-white">{activeQuest.difficulty}</p>
                      </div>
                    </div>

                    {/* Alert dynamique */}
                    {activeQuest.alertType && (
                      <div
                        className="rounded-lg p-4 border"
                        style={
                          activeQuest.alertType === 'item'
                            ? { backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.3)' }
                            : { backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.3)' }
                        }
                      >
                        <p
                          className="font-bold text-sm mb-1"
                          style={{ color: activeQuest.alertType === 'item' ? '#ef4444' : '#f59e0b' }}
                        >
                          {activeQuest.alertType === 'item' ? '⚠ Objet unique' : '⚠ Point de non-retour'}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {activeQuest.alertMessage}
                        </p>
                      </div>
                    )}

                    {/* Info cards */}
                    {[
                      { label: 'Zone', value: activeQuest.region },
                      { label: 'Niveau recommandé', value: activeQuest.level },
                      { label: 'Prérequis', value: activeQuest.prereq },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg p-3.5 border" style={{ backgroundColor: '#05070a', borderColor: '#1e293b' }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#00d0f4' }}>{label}</p>
                        <p className="text-sm text-white">{value}</p>
                      </div>
                    ))}

                    {/* Reward */}
                    <div
                      className="rounded-lg p-3.5 border"
                      style={{ backgroundColor: 'rgba(0,208,244,0.06)', borderColor: 'rgba(0,208,244,0.25)' }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#00d0f4' }}>✦ Récompense</p>
                      <p className="text-sm font-semibold text-white">{activeQuest.reward}</p>
                    </div>
                  </>
                ) : (
                  <ol className="space-y-2.5">
                    {activeQuest.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold mt-0.5"
                          style={{ backgroundColor: 'rgba(0,208,244,0.1)', color: '#00d0f4' }}
                        >
                          {idx + 1}
                        </span>
                        <span className="leading-snug" style={{ color: '#cbd5e1' }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 shrink-0 border-t" style={{ borderColor: '#1e293b' }}>
                <button
                  type="button"
                  onClick={() => { toggleComplete(activeQuest.id); setSelectedQuestId(null); }}
                  className="w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-tighter transition-all duration-200 touch-manipulation"
                  style={
                    completed[activeQuest.id]
                      ? { backgroundColor: '#1e293b', color: '#64748b', border: '1px solid #334155' }
                      : { backgroundColor: '#00d0f4', color: '#05070a' }
                  }
                >
                  {completed[activeQuest.id] ? '✓ Terminée — Appuyer pour annuler' : 'Marquer comme terminée'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
