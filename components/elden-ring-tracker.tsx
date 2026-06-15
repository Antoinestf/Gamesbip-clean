"use client";

import { useEffect, useState } from "react";
import { X, Trophy, Gamepad2, ArrowLeft, Sparkles, CircleCheck as CheckCircle2 } from "lucide-react";
import { LangToggle } from "@/components/lang-toggle";
import { useLanguage } from "@/lib/language-context";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

const STORAGE_KEY = "eldenringbip_progress";

interface Quest {
  id:            string;
  category:      string;
  name:          string;
  name_en:       string;
  region:        string;
  region_en:     string;
  level:         string;
  duration:      string;
  difficulty:    string;
  difficulty_en: string;
  alertType?:    "item" | "quest";
  alertMessage?: string;
  alertMessage_en?: string;
  description:   string;
  description_en: string;
  steps:         string[];
  steps_en:      string[];
  reward:        string;
  reward_en:     string;
  prereq:        string;
  prereq_en:     string;
}

export const ELDEN_RING_DATA: Quest[] = [
  // --- ENTRE-TERRE (Boss Majeurs) ---
  {
    id: "margit", category: "entre_terre",
    name: "Margit le Déchu",           name_en: "Margit, the Fell Omen",
    region: "Nécrolimbe",              region_en: "Limgrave",
    level: "15-25", duration: "20 min",
    difficulty: "Moyen",               difficulty_en: "Medium",
    description: "Le premier grand verrou du jeu.",
    description_en: "The first major gatekeeper of the game.",
    steps:    ["Achetez les Entraves de Margit chez Patches.", "Invoquez le Sorcier Rogier.", "Utilisez les Loups Solitaires."],
    steps_en: ["Purchase Margit's Shackle from Patches.", "Summon Sorcerer Rogier.", "Use the Lone Wolf Ashes."],
    reward: "Sacoche à talisman", reward_en: "Talisman Pouch",
    prereq: "Aucun",                   prereq_en: "None",
  },
  {
    id: "godrick", category: "entre_terre",
    name: "Godrick le Greffé",         name_en: "Godrick the Grafted",
    region: "Nécrolimbe",              region_en: "Limgrave",
    level: "20-30", duration: "30 min",
    difficulty: "Moyen",               difficulty_en: "Medium",
    description: "Le Seigneur du Château de Voilorage.",
    description_en: "Lord of Stormveil Castle.",
    steps:    ["Explorez le château.", "Invoquez Nepheli Loux.", "Esquivez ses attaques de zone."],
    steps_en: ["Explore the castle.", "Summon Nepheli Loux.", "Dodge his AoE attacks."],
    reward: "Rune majeure", reward_en: "Great Rune",
    prereq: "Margit vaincu",           prereq_en: "Margit defeated",
  },
  {
    id: "radahn", category: "entre_terre",
    name: "Général Radahn",            name_en: "General Radahn",
    region: "Caelid",                  region_en: "Caelid",
    level: "60-70", duration: "45 min",
    difficulty: "Difficile",           difficulty_en: "Hard",
    description: "Le fléau des astres.",
    description_en: "The Scourge of the Stars.",
    steps:    ["Activez le festival au Château du Lion rouge.", "Invoquez tous les PNJ sur l'arène.", "Restez à distance lors de la phase 2."],
    steps_en: ["Activate the festival at Redmane Castle.", "Summon all NPCs in the arena.", "Stay at range during phase 2."],
    reward: "Rune majeure", reward_en: "Great Rune",
    prereq: "Accès Plateau Altus",     prereq_en: "Altus Plateau access",
  },
  {
    id: "morgott", category: "entre_terre",
    name: "Morgott, Roi des Présages", name_en: "Morgott, the Omen King",
    region: "Leyndell",                region_en: "Leyndell",
    level: "80-90", duration: "40 min",
    difficulty: "Difficile",           difficulty_en: "Hard",
    description: "Le roi de la capitale.",
    description_en: "King of the Capital.",
    steps:    ["Traversez Leyndell.", "Invoquez Melina.", "Gérez ses combos rapides."],
    steps_en: ["Traverse Leyndell.", "Summon Melina.", "Manage his rapid combos."],
    reward: "Rune majeure", reward_en: "Great Rune",
    prereq: "2 Runes majeures activées", prereq_en: "2 activated Great Runes",
  },

  // --- DESTINS LIÉS (Quêtes PNJ) ---
  {
    id: "ranni", category: "destins",
    name: "Quête de Ranni",            name_en: "Ranni's Quest",
    region: "Liurnia",                 region_en: "Liurnia",
    level: "50-60", duration: "3h",
    difficulty: "Difficile",           difficulty_en: "Hard",
    alertType: "quest",
    alertMessage: "La quête de Ranni devient inaccessible après avoir activé l'Arbre-Monde.",
    alertMessage_en: "Ranni's quest becomes inaccessible after activating the Erdtree.",
    description: "Débloquez la fin secrète des étoiles.",
    description_en: "Unlock the secret stars ending.",
    steps:    ["Rencontrez-la à sa tour.", "Battez Radahn.", "Récupérez la Lame digicide à Nokron.", "Traversez le Lac de putréfaction."],
    steps_en: ["Meet her at her tower.", "Defeat Radahn.", "Retrieve the Fingerslayer Blade in Nokron.", "Cross the Lake of Rot."],
    reward: "Espadon de la Lune",      reward_en: "Dark Moon Greatsword",
    prereq: "Manoir de Caria",         prereq_en: "Caria Manor",
  },
  {
    id: "alexander", category: "destins",
    name: "Alexander le Pot",          name_en: "Iron Fist Alexander",
    region: "Multiple",                region_en: "Multiple",
    level: "30-40", duration: "2h",
    difficulty: "Moyen",               difficulty_en: "Medium",
    alertType: "quest",
    alertMessage: "Le duel final à Farum Azula est manquable si vous progressez trop loin dans la fin du jeu.",
    alertMessage_en: "The final duel at Farum Azula is missable if you progress too far into the endgame.",
    description: "Le guerrier en terre cuite.",
    description_en: "The warrior in a pot.",
    steps:    ["Libérez-le en Nécrolimbe.", "Tunnel de Gael.", "Festival Radahn.", "Mont Gelmir.", "Duel à Farum Azula."],
    steps_en: ["Free him in Limgrave.", "Gael Tunnel.", "Radahn Festival.", "Mt. Gelmir.", "Duel at Farum Azula."],
    reward: "Fragment d'Alexander",    reward_en: "Alexander's Innards",
    prereq: "Aucun",                   prereq_en: "None",
  },
  {
    id: "millicent", category: "destins",
    name: "Quête de Millicent",        name_en: "Millicent's Quest",
    region: "Caelid",                  region_en: "Caelid",
    level: "60-80", duration: "2h 30min",
    difficulty: "Moyen",               difficulty_en: "Medium",
    alertType: "quest",
    alertMessage: "Millicent disparaît si vous battez Malenia avant de terminer sa quête.",
    alertMessage_en: "Millicent disappears if you defeat Malenia before completing her quest.",
    description: "Soignez la putréfaction écarlate.",
    description_en: "Heal the Scarlet Rot.",
    steps:    ["Parlez à Gowry.", "Récupérez l'Aiguille en or pur.", "Donnez la prothèse à Millicent.", "Combattez ses sœurs."],
    steps_en: ["Talk to Gowry.", "Retrieve the Unalloyed Gold Needle.", "Give the prosthesis to Millicent.", "Fight her sisters."],
    reward: "Insigne ailée putréfiée", reward_en: "Miquella's Needle",
    prereq: "Altus",                   prereq_en: "Altus Plateau",
  },
  {
    id: "fia", category: "destins",
    name: "Quête de Fia",              name_en: "Fia's Quest",
    region: "Deeproot",                region_en: "Deeproot Depths",
    level: "70-90", duration: "1h 30min",
    difficulty: "Difficile",           difficulty_en: "Hard",
    alertType: "quest",
    alertMessage: "La quête de Fia se bloque si vous activez l'Arbre-Monde sans avoir récupéré la Rune de restauration.",
    alertMessage_en: "Fia's quest locks if you activate the Erdtree without recovering the Mending Rune.",
    description: "Le secret du Prince de la Mort.",
    description_en: "The secret of the Prince of Death.",
    steps:    ["Enlacez-la à la Table Ronde.", "Donnez la dague à D.", "Battez les champions à Fonderacine.", "Défiez Fortissax."],
    steps_en: ["Embrace her at the Roundtable Hold.", "Give the Weathered Dagger to D.", "Defeat the champions at Deeproot Depths.", "Challenge Fortissax."],
    reward: "Rune de restauration",    reward_en: "Mending Rune",
    prereq: "Table Ronde",             prereq_en: "Roundtable Hold",
  },

  // --- ARMURERIE (Collectibles Légendaires) ---
  {
    id: "talisman_arbre", category: "armurerie",
    name: "Faveur de l'Arbre-Monde +2", name_en: "Erdtree's Favor +2",
    region: "Leyndell",                  region_en: "Leyndell",
    level: "90+", duration: "15 min",
    difficulty: "Facile",                difficulty_en: "Easy",
    description: "Augmente PV, Endurance, Charge.",
    description_en: "Boosts HP, Stamina, and Equip Load.",
    steps:    ["Accédez à Leyndell cendrée.", "Ramassez sur le cadavre géant."],
    steps_en: ["Access Ashen Leyndell.", "Pick up from the giant corpse."],
    reward: "Talisman",                  reward_en: "Talisman",
    prereq: "Fin de jeu",                prereq_en: "Endgame",
  },
  {
    id: "lune_obscure", category: "armurerie",
    name: "Espadon de la Lune Obscure", name_en: "Dark Moon Greatsword",
    region: "Liurnia",                  region_en: "Liurnia",
    level: "60+", duration: "10 min",
    difficulty: "Facile",               difficulty_en: "Easy",
    alertType: "item",
    alertMessage: "EASTER EGG / OBJET UNIQUE : L'arme signature de FromSoftware (Moonlight Greatsword), présente dans presque tous leurs jeux. S'obtient en terminant l'interminable et complexe quête de Ranni la Sorcière.",
    alertMessage_en: "EASTER EGG / UNIQUE ITEM: FromSoftware's signature weapon (Moonlight Greatsword), present in almost all their games. Obtained by completing the lengthy and complex quest of Ranni the Witch.",
    description: "Arme légendaire d'intelligence.",
    description_en: "Legendary intelligence weapon.",
    steps:    ["Finissez la quête de Ranni.", "Récupérez sous la Cathédrale."],
    steps_en: ["Finish Ranni's quest.", "Retrieve from beneath the Cathedral."],
    reward: "Espadon",                  reward_en: "Greatsword",
    prereq: "Quête Ranni",              prereq_en: "Ranni's Quest",
  },
  {
    id: "croc_limier", category: "armurerie",
    name: "Croc du Limier",             name_en: "Bloodhound's Fang",
    region: "Nécrolimbe",               region_en: "Limgrave",
    level: "20+", duration: "10 min",
    difficulty: "Moyen",                difficulty_en: "Medium",
    description: "Katana courbe très puissant.",
    description_en: "Highly powerful curved greatsword.",
    steps:    ["Battez Darriwil dans la Geôle éternelle."],
    steps_en: ["Defeat Bloodhound Knight Darriwil in the Forlorn Hound Evergaol."],
    reward: "Arme",                     reward_en: "Weapon",
    prereq: "Aucun",                    prereq_en: "None",
  },
  {
    id: "lame_digicide", category: "armurerie",
    name: "Lame Digicide",              name_en: "Fingerslayer Blade",
    region: "Nokron",                   region_en: "Nokron",
    level: "50+", duration: "20 min",
    difficulty: "Moyen",                difficulty_en: "Medium",
    alertType: "item",
    alertMessage: "Objet unique récupérable uniquement dans Nokron, accessible après avoir vaincu Radahn.",
    alertMessage_en: "Unique item recoverable only in Nokron, accessible after defeating Radahn.",
    description: "Trésor de Nokron.",
    description_en: "Treasure of Nokron.",
    steps:    ["Entrez dans Nokron via le cratère.", "Ouvrez le coffre dans l'église."],
    steps_en: ["Enter Nokron through the crater.", "Open the chest in the church."],
    reward: "Objet clé",                reward_en: "Key Item",
    prereq: "Battez Radahn",            prereq_en: "Defeat Radahn",
  },

  // --- DÉFIS (Exploration / Donjons optionnels) ---
  {
    id: "mur_illusoire", category: "defis",
    name: "Le Mur Illusoire aux 50 Coups (Manoir du Volcan)", name_en: "The 50-Hit Illusory Wall (Volcano Manor)",
    region: "Mt. Gelmir",               region_en: "Mt. Gelmir",
    level: "70+", duration: "5 min",
    difficulty: "Facile",               difficulty_en: "Easy",
    alertType: "item",
    alertMessage: "EASTER EGG : Dans les couloirs du Manoir du Volcan, un mur illusoire spécifique ne disparaît pas au premier coup, mais demande de le frapper exactement 50 fois pour s'effondrer !",
    alertMessage_en: "EASTER EGG: In the corridors of Volcano Manor, a specific illusory wall doesn't disappear on the first hit — you must strike it exactly 50 times for it to collapse!",
    description: "Un mur illusoire qui résiste — il faut le frapper 50 fois pour le détruire.",
    description_en: "An illusory wall that resists — you must hit it 50 times to destroy it.",
    steps: [
      "Entrez dans le Manoir du Volcan (Mt. Gelmir, Acte 2).",
      "Naviguez jusqu'aux couloirs intérieurs du premier étage.",
      "Cherchez le mur au fond du couloir après la salle de repos.",
      "Frappez ce mur 50 fois consécutives — il finira par s'effondrer.",
      "Récupérez les objets dans la salle secrète derrière.",
    ],
    steps_en: [
      "Enter Volcano Manor (Mt. Gelmir, Act 2).",
      "Navigate to the interior corridors of the first floor.",
      "Look for the wall at the end of the hallway past the rest room.",
      "Strike this wall 50 consecutive times — it will eventually collapse.",
      "Loot the items in the secret room behind.",
    ],
    reward: "Accès salle secrète (Rune Arc + objets)", reward_en: "Access to secret room (Rune Arc + items)",
    prereq: "Accès Manoir du Volcan",   prereq_en: "Volcano Manor access",
  },
  {
    id: "tunnel_gael", category: "defis",
    name: "Tunnel de Gael",             name_en: "Gael Tunnel",
    region: "Caelid",                   region_en: "Caelid",
    level: "30-40", duration: "25 min",
    difficulty: "Difficile",            difficulty_en: "Hard",
    description: "Donjon optionnel corsé.",
    description_en: "Challenging optional dungeon.",
    steps:    ["Traversez la zone de putréfaction.", "Battez le Wyrm de magma."],
    steps_en: ["Cross the rot zone.", "Defeat the Magma Wyrm."],
    reward: "Katana Éclat lunaire",     reward_en: "Moonveil Katana",
    prereq: "Aucun",                    prereq_en: "None",
  },
  {
    id: "catacombes_noires", category: "defis",
    name: "Catacombes de la Mort",      name_en: "Deathtouched Catacombs",
    region: "Nécrolimbe",               region_en: "Limgrave",
    level: "15+", duration: "15 min",
    difficulty: "Facile",               difficulty_en: "Easy",
    description: "Donjon d'initiation.",
    description_en: "Introductory dungeon.",
    steps:    ["Trouvez le levier.", "Éliminez l'Assassin."],
    steps_en: ["Find the lever.", "Eliminate the Black Knife Assassin."],
    reward: "Couteau noir",             reward_en: "Black Knife",
    prereq: "Aucun",                    prereq_en: "None",
  },
  {
    id: "lac_putrefaction", category: "defis",
    name: "Lac de Putréfaction",        name_en: "Lake of Rot",
    region: "Ainsel",                   region_en: "Ainsel",
    level: "80+", duration: "30 min",
    difficulty: "Très difficile",       difficulty_en: "Very Hard",
    description: "Zone de danger extrême.",
    description_en: "Extreme danger zone.",
    steps:    ["Traversez le lac avec des fioles.", "Battez Astel."],
    steps_en: ["Cross the lake using Preserving Boluses.", "Defeat Astel."],
    reward: "Accès fin de quête",       reward_en: "Access to quest ending",
    prereq: "Quête Ranni",              prereq_en: "Ranni's Quest",
  },
  {
    id: "geole_dargit", category: "defis",
    name: "Geôle de Ringlead",          name_en: "Ringleader's Evergaol",
    region: "Liurnia",                  region_en: "Liurnia",
    level: "40+", duration: "20 min",
    difficulty: "Difficile",            difficulty_en: "Hard",
    description: "Boss optionnel puissant.",
    description_en: "Powerful optional boss.",
    steps:    ["Trouvez la clé-épée.", "Entrez dans la geôle.", "Battez Ringlead."],
    steps_en: ["Find the Sword Key.", "Enter the Evergaol.", "Defeat the Ringleader."],
    reward: "Talisman de Graine",       reward_en: "Talisman Seed",
    prereq: "Clé-épée",                 prereq_en: "Sword Key",
  },
];

export const totalEldenRing = ELDEN_RING_DATA.length;

const CATEGORIES = [
  { id: "entre_terre", label: "L'Entre-Terre", label_en: "The Lands Between" },
  { id: "destins",     label: "Destins liés",   label_en: "Fated Encounters"  },
  { id: "armurerie",   label: "Armurerie",       label_en: "Armory"            },
  { id: "defis",       label: "Défis",           label_en: "Challenges"        },
];

export default function EldenRingTracker({ onBack }: { onBack: () => void }) {
  const { lang } = useLanguage();
  const [hydrated, setHydrated]             = useState(false);
  const [completed, setCompleted]           = useState<Record<string, boolean>>({});
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("destins");
  const [activeTab, setActiveTab]           = useState<"details" | "solution">("details");

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

  const isFr = lang === "fr";

  const activeQuest   = ELDEN_RING_DATA.find((q) => q.id === selectedQuestId);
  const filteredItems = ELDEN_RING_DATA.filter((item) => item.category === activeCategory);

  const totalAll  = ELDEN_RING_DATA.length;
  const totalDone = ELDEN_RING_DATA.filter((item) => !!completed[item.id]).length;
  const globalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#05070a" }}>

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 backdrop-blur-lg bg-black/60 border-b border-slate-700/50">
        <div className="mx-auto max-w-6xl px-4 py-3">

          {/* Top row */}
          <div className="flex items-center gap-3 mb-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-bold transition-all duration-200 touch-manipulation shrink-0"
              style={{ minHeight: "44px", backgroundColor: "#00d0f4", color: "#05070a" }}
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-tighter">Game&apos;s Bip</span>
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 shrink-0" style={{ color: "#00d0f4" }} />
              <span className="text-xs font-black uppercase tracking-tighter truncate text-slate-100">
                Elden Ring
              </span>
            </div>

            <LangToggle />

            <span className="font-mono text-sm font-black shrink-0" style={{ color: "#00d0f4" }}>
              {globalPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "#1e293b" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${globalPct}%`, backgroundColor: "#00d0f4" }}
            />
          </div>

          {/* Counter */}
          <p className="mt-1.5 text-[10px]" style={{ color: "#64748b" }}>
            <span className="font-mono font-bold" style={{ color: "#00d0f4" }}>{totalDone}</span>
            <span>/{totalAll} {isFr ? "terminées" : "completed"}</span>
          </p>
        </div>

        {/* Category tabs */}
        <div className="border-t" style={{ borderColor: "#1e293b" }}>
          <div className="mx-auto max-w-6xl overflow-x-auto px-2">
            <ul className="flex w-max items-stretch gap-0.5 py-1.5">
              {CATEGORIES.map((cat) => {
                const count    = ELDEN_RING_DATA.filter((i) => i.category === cat.id).length;
                const done     = ELDEN_RING_DATA.filter((i) => i.category === cat.id && !!completed[i.id]).length;
                const isActive = activeCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className="relative flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200 touch-manipulation"
                      style={{
                        color: isActive ? "#00d0f4" : "#64748b",
                        backgroundColor: isActive ? "rgba(0,208,244,0.08)" : "transparent",
                      }}
                    >
                      {isFr ? cat.label : cat.label_en}
                      <span
                        className="rounded-full px-1.5 font-mono text-[9px] font-bold leading-5"
                        style={{
                          color: isActive ? "#00d0f4" : "#64748b",
                          backgroundColor: isActive ? "rgba(0,208,244,0.12)" : "#1e293b",
                        }}
                      >
                        {done}/{count}
                      </span>
                      {isActive && (
                        <span
                          className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full"
                          style={{ backgroundColor: "#00d0f4" }}
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
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isDone = !!completed[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => { setSelectedQuestId(item.id); setActiveTab("details"); }}
                  className={`flex items-start gap-3 rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:scale-[1.01] bg-black/60 backdrop-blur-lg ${isDone ? "border-cyan-500/50" : "border-slate-700/50"}`}
                >
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleComplete(item.id); }}
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 touch-manipulation border-2"
                    style={{
                      borderColor: isDone ? "#00d0f4" : "#334155",
                      backgroundColor: isDone ? "#00d0f4" : "transparent",
                    }}
                  >
                    {isDone && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#05070a" }} />}
                  </button>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm font-semibold uppercase tracking-tighter leading-snug"
                        style={{ color: isDone ? "#e2e8f0" : "#cbd5e1" }}
                      >
                        {isFr ? item.name : item.name_en}
                      </span>
                      {item.alertType === "item" && (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-bold border"
                          style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}
                        >
                          {isFr ? "⚠ Objet unique" : "⚠ Unique Item"}
                        </span>
                      )}
                      {item.alertType === "quest" && (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-bold border"
                          style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", borderColor: "rgba(245,158,11,0.3)" }}
                        >
                          {isFr ? "⚠ Point de non-retour" : "⚠ Point of No Return"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                      {isFr ? item.description : item.description_en}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm italic" style={{ color: "#475569" }}>
              {isFr ? "Aucune quête dans cette catégorie pour le moment." : "No items in this category yet."}
            </p>
          )}
        </div>
      </div>

      {/* ── Quest detail modal ── */}
      {activeQuest && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(5,7,10,0.85)" }}
            onClick={() => setSelectedQuestId(null)}
          />
          <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex items-center justify-center pointer-events-none md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md">
            <div
              className={`pointer-events-auto relative w-full flex flex-col overflow-hidden rounded-2xl backdrop-blur-lg bg-black/70 border shadow-2xl ${completed[activeQuest.id] ? "border-cyan-500/50" : "border-slate-700/50"}`}
              style={{ maxHeight: "calc(100dvh - 24px)" }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, #00d0f4, transparent)" }}
              />

              {/* Header */}
              <div className="flex items-start gap-3 p-4 shrink-0 border-b" style={{ borderColor: "#1e293b" }}>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-0.5 border-2"
                  style={{
                    borderColor: completed[activeQuest.id] ? "#00d0f4" : "rgba(0,208,244,0.4)",
                    backgroundColor: completed[activeQuest.id] ? "rgba(0,208,244,0.15)" : "rgba(0,208,244,0.05)",
                  }}
                >
                  {completed[activeQuest.id]
                    ? <CheckCircle2 className="h-5 w-5" style={{ color: "#00d0f4" }} />
                    : <span className="text-lg">⚔️</span>
                  }
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <h2
                    className="text-base font-black uppercase tracking-tighter leading-tight"
                    style={{ color: completed[activeQuest.id] ? "#00d0f4" : "#f1f5f9" }}
                  >
                    {isFr ? activeQuest.name : activeQuest.name_en}
                  </h2>
                  <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "#64748b" }}>
                    {isFr ? activeQuest.description : activeQuest.description_en}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedQuestId(null)}
                  className="absolute right-3 top-3 rounded-lg p-1.5 transition-colors duration-200 touch-manipulation"
                  style={{ color: "#64748b", backgroundColor: "rgba(30,41,59,0.5)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Tab bar */}
              <div className="flex shrink-0 border-b" style={{ borderColor: "#1e293b" }}>
                {([
                  { id: "details"  as const, label: isFr ? "Détails"  : "Details",     icon: <Trophy   className="h-3.5 w-3.5" /> },
                  { id: "solution" as const, label: isFr ? "Solution" : "Walkthrough", icon: <Gamepad2 className="h-3.5 w-3.5" /> },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-tighter transition-all duration-200 touch-manipulation"
                    style={{ color: activeTab === tab.id ? "#00d0f4" : "#475569" }}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                      <span
                        className="absolute bottom-0 inset-x-0 h-[2px] rounded-full"
                        style={{ backgroundColor: "#00d0f4" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeTab === "details" ? (
                  <>
                    {/* Duration / Difficulty */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg p-3.5 border" style={{ backgroundColor: "#05070a", borderColor: "#1e293b" }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#00d0f4" }}>
                          {isFr ? "Durée estimée" : "Est. Duration"}
                        </p>
                        <p className="text-sm font-mono font-medium text-white">{activeQuest.duration}</p>
                      </div>
                      <div className="rounded-lg p-3.5 border" style={{ backgroundColor: "#05070a", borderColor: "#1e293b" }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#00d0f4" }}>
                          {isFr ? "Difficulté" : "Difficulty"}
                        </p>
                        <p className="text-sm font-medium text-white">
                          {isFr ? activeQuest.difficulty : activeQuest.difficulty_en}
                        </p>
                      </div>
                    </div>

                    {/* Alert dynamique */}
                    {activeQuest.alertType && (
                      <div
                        className="rounded-lg p-4 border"
                        style={
                          activeQuest.alertType === "item"
                            ? { backgroundColor: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)" }
                            : { backgroundColor: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }
                        }
                      >
                        <p
                          className="font-bold text-sm mb-1"
                          style={{ color: activeQuest.alertType === "item" ? "#ef4444" : "#f59e0b" }}
                        >
                          {activeQuest.alertType === "item"
                            ? (isFr ? "⚠ Objet unique" : "⚠ Unique Item")
                            : (isFr ? "⚠ Point de non-retour" : "⚠ Point of No Return")}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {isFr ? activeQuest.alertMessage : (activeQuest.alertMessage_en ?? activeQuest.alertMessage)}
                        </p>
                      </div>
                    )}

                    {/* Info cards */}
                    {[
                      {
                        label:    isFr ? "Zone"               : "Zone",
                        value:    isFr ? activeQuest.region   : activeQuest.region_en,
                      },
                      {
                        label:    isFr ? "Niveau recommandé"  : "Recommended Level",
                        value:    activeQuest.level,
                      },
                      {
                        label:    isFr ? "Prérequis"          : "Prerequisites",
                        value:    isFr ? activeQuest.prereq   : activeQuest.prereq_en,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg p-3.5 border" style={{ backgroundColor: "#05070a", borderColor: "#1e293b" }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#00d0f4" }}>{label}</p>
                        <p className="text-sm text-white">{value}</p>
                      </div>
                    ))}

                    {/* Reward */}
                    <div
                      className="rounded-lg p-3.5 border"
                      style={{ backgroundColor: "rgba(0,208,244,0.06)", borderColor: "rgba(0,208,244,0.25)" }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#00d0f4" }}>
                        {isFr ? "✦ Récompense" : "✦ Reward"}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {isFr ? activeQuest.reward : activeQuest.reward_en}
                      </p>
                    </div>
                  </>
                ) : (
                  <ol className="space-y-2.5">
                    {(isFr ? activeQuest.steps : activeQuest.steps_en).map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold mt-0.5"
                          style={{ backgroundColor: "rgba(0,208,244,0.1)", color: "#00d0f4" }}
                        >
                          {idx + 1}
                        </span>
                        <span className="leading-snug" style={{ color: "#cbd5e1" }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 shrink-0 border-t" style={{ borderColor: "#1e293b" }}>
                <button
                  type="button"
                  onClick={() => { toggleComplete(activeQuest.id); setSelectedQuestId(null); }}
                  className="w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-tighter transition-all duration-200 touch-manipulation"
                  style={
                    completed[activeQuest.id]
                      ? { backgroundColor: "#1e293b", color: "#64748b", border: "1px solid #334155" }
                      : { backgroundColor: "#00d0f4", color: "#05070a" }
                  }
                >
                  {completed[activeQuest.id]
                    ? (isFr ? "✓ Terminée — Appuyer pour annuler" : "✓ Complete — Tap to undo")
                    : (isFr ? "Marquer comme terminée" : "Mark as Complete")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
