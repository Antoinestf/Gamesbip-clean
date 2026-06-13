// ─── Types ────────────────────────────────────────────────────────────────────

export interface BiText { fr: string; en: string }

export interface HadesProphecy {
  id:               string;
  title:            BiText;
  description:      BiText;
  reward:           BiText;
  category:         "main" | "power" | "companion" | "mastery" | "incantation" | "secret";
  walkthrough?:     BiText;
  alertType?:       'item' | 'quest';
  alertDescription?: string;
}

export interface HadesIncantation {
  id:        string;
  title:     BiText;
  effect:    BiText;
  materials: string[];
  how_to?:   BiText;
}

export interface WeaponAspect {
  id:          string;
  name:        BiText;
  description: BiText;
  unlockHint?: BiText;
}

export interface HadesWeapon {
  id:               string;
  name:             BiText;
  emoji:            string;
  description:      BiText;
  aspects:          WeaponAspect[];
  masterGuide?:     BiText;
  alertType?:       'item' | 'quest';
  alertDescription?: string;
}

// ─── Bosses ───────────────────────────────────────────────────────────────────

const BOSS_ALERT_DESC = "Vaincre ce boss vous fait passer au biome suivant. Vous ne pourrez plus revenir en arrière pour farmer des ressources dans cette zone lors de cette nuit.";
const WEAPON_ALERT_DESC = "Cette Arme Nocturne est un déblocage majeur. Elle modifie entièrement votre style de jeu et est requise pour valider plusieurs prophéties importantes.";
const COLLECTIBLE_ALERT_DESC = "Cet élément est unique. Le rater vous privera d'avantages passifs permanents cruciaux pour survivre aux hauts niveaux de Chaleur.";

export interface HadesBoss {
  id:               string;
  name:             BiText;
  emoji:            string;
  zone:             BiText;
  description:      BiText;
  route:            BiText;
  prerequisites:    BiText;
  alertType?:       'item' | 'quest';
  alertDescription?: string;
}

export const bosses: HadesBoss[] = [
  {
    id: "boss-hecate",
    emoji: "🌙",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Hécate",                   en: "Hecate"                     },
    zone:          { fr: "Érèbe",                    en: "Erebus"                     },
    description:   { fr: "Gardienne des Carrefours — combat d'entraînement obligatoire.",
                     en: "Keeper of the Crossroads — mandatory training fight."        },
    route:         { fr: "Enfers",                   en: "Underworld"                 },
    prerequisites: { fr: "Fin de la zone initiale (Érèbe).",
                     en: "Complete the initial zone (Erebus)."                         },
  },
  {
    id: "boss-scylla",
    emoji: "🎵",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Scylla & les Sirènes",     en: "Scylla & the Sirens"        },
    zone:          { fr: "Océanus",                  en: "Oceanus"                    },
    description:   { fr: "Trio de monstres marins — phases de chant et attaques à distance.",
                     en: "Marine monster trio — singing phases and ranged attacks."    },
    route:         { fr: "Enfers",                   en: "Underworld"                 },
    prerequisites: { fr: "Fin de la zone Océanus.",
                     en: "Complete Oceanus zone."                                      },
  },
  {
    id: "boss-infernal",
    emoji: "🐕",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Bête Infernale (Cerbère)", en: "Infernal Beast (Cerberus)"  },
    zone:          { fr: "Champs des Lamentations",  en: "Fields of Mourning"         },
    description:   { fr: "Gardien des Enfers corrompu — attaques de zone massives.",
                     en: "Corrupted Underworld guardian — massive area attacks."       },
    route:         { fr: "Enfers",                   en: "Underworld"                 },
    prerequisites: { fr: "Fin des Champs des Lamentations.",
                     en: "Complete the Fields of Mourning."                            },
  },
  {
    id: "boss-chronos",
    emoji: "⏳",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Chronos",                  en: "Chronos"                    },
    zone:          { fr: "Tartare",                  en: "Tartarus"                   },
    description:   { fr: "Le Titan du Temps — boss final de la voie des Enfers.",
                     en: "The Titan of Time — final boss of the Underworld path."      },
    route:         { fr: "Enfers",                   en: "Underworld"                 },
    prerequisites: { fr: "Atteindre la fin du Tartare.",
                     en: "Reach the end of Tartarus."                                  },
  },
  {
    id: "boss-polyphemus",
    emoji: "👁️",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Polyphème",                en: "Polyphemus"                 },
    zone:          { fr: "Cité d'Éphyra",            en: "City of Ephyra"             },
    description:   { fr: "Cyclope colossal — absorbe les dégâts de zone et riposte massivement.",
                     en: "Colossal Cyclops — absorbs area damage and retaliates hard." },
    route:         { fr: "Surface",                  en: "Surface"                    },
    prerequisites: { fr: "Briser le Sceau de la Surface et traverser la Cité d'Éphyra.",
                     en: "Break the Surface Seal and cross the City of Ephyra."        },
  },
  {
    id: "boss-eris",
    emoji: "🌑",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Éris",                     en: "Eris"                       },
    zone:          { fr: "Faille de Thessalie",      en: "Thessaly Rift"              },
    description:   { fr: "Déesse de la Discorde — attaques à l'arme à feu et bonus de dégâts.",
                     en: "Goddess of Discord — gunfire attacks and damage bonuses."    },
    route:         { fr: "Surface",                  en: "Surface"                    },
    prerequisites: { fr: "Survivre à la Faille de Thessalie.",
                     en: "Survive the Thessaly Rift."                                  },
  },
  {
    id: "boss-prometheus",
    emoji: "🔥",
    alertType: "quest",
    alertDescription: BOSS_ALERT_DESC,
    name:          { fr: "Prométhée",                en: "Prometheus"                 },
    zone:          { fr: "Mont Olympe",              en: "Mount Olympus"              },
    description:   { fr: "Titan de la Clairvoyance — maître des flammes et du combat au corps-à-corps.",
                     en: "Titan of Foresight — master of flames and close combat."     },
    route:         { fr: "Surface",                  en: "Surface"                    },
    prerequisites: { fr: "Atteindre les hauteurs du Mont Olympe.",
                     en: "Reach the heights of Mount Olympus."                         },
  },
  {
    id: "boss-typhon",
    emoji: "🌪️",
    name:          { fr: "Typhon",                   en: "Typhon"                     },
    zone:          { fr: "Sommet de l'Olympe",       en: "Summit of Olympus"          },
    description:   { fr: "L'ultime tempête — boss final secret de la voie de la Surface.",
                     en: "The ultimate storm — secret final boss of the Surface path." },
    route:         { fr: "Surface",                  en: "Surface"                    },
    prerequisites: { fr: "Vaincre Prométhée sous certaines conditions de Chaleur.",
                     en: "Defeat Prometheus under certain Heat conditions."            },
  },
];

// ─── Weapon Aspects ───────────────────────────────────────────────────────────

export const weapons: HadesWeapon[] = [
  {
    id: "sceptre",
    name:        { fr: "Sceptre des Sorcières (Descura)", en: "Witch's Staff (Descura)"       },
    emoji: "🪄",
    description: { fr: "Arme à distance équilibrée — tirs magiques et attaques de zone.",
                   en: "Balanced ranged weapon — magic shots and area attacks."                },
    aspects: [
      {
        id: "sceptre-melinoe",
        name:        { fr: "Aspect de Mélinoé",   en: "Aspect of Melinoë"          },
        description: { fr: "Forme de base.",       en: "Base form."                 },
      },
      {
        id: "sceptre-circe",
        name:        { fr: "Aspect de Circé",     en: "Aspect of Circe"            },
        description: { fr: "Transforme les ennemis proches en créatures inoffensives.",
                       en: "Transforms nearby foes into harmless creatures."        },
        unlockHint:  { fr: "Parler à Hécate + 5 Psy",
                       en: "Speak to Hecate + 5 Psyche"                            },
      },
      {
        id: "sceptre-momus",
        name:        { fr: "Aspect de Momus",     en: "Aspect of Momus"            },
        description: { fr: "Succession de frappes rapides — critique augmentée.",
                       en: "Rapid strike succession — increased critical chance."   },
        unlockHint:  { fr: "Offrir Nectar / Épreuves + 10 Psy",
                       en: "Give Nectar / Trials + 10 Psyche"                      },
      },
    ],
  },
  {
    id: "lames",
    name:        { fr: "Lames des Sœurs (Lim et Oros)", en: "Sister Blades (Lim & Oros)"     },
    emoji: "⚔️",
    alertType: "item",
    alertDescription: WEAPON_ALERT_DESC,
    description: { fr: "Armes de corps-à-corps rapides — idéales pour le backstab et l'esquive.",
                   en: "Fast melee weapons — ideal for backstabs and dodging."                },
    aspects: [
      {
        id: "lames-melinoe",
        name:        { fr: "Aspect de Mélinoé",   en: "Aspect of Melinoë"          },
        description: { fr: "Forme de base.",       en: "Base form."                 },
      },
      {
        id: "lames-artemis",
        name:        { fr: "Aspect d'Artémis",    en: "Aspect of Artemis"          },
        description: { fr: "Puissantes frappes critiques — favorise la précision.",
                       en: "Powerful critical strikes — rewards precision."         },
        unlockHint:  { fr: "Parler à Artémis + 5 Psy",
                       en: "Speak to Artemis + 5 Psyche"                           },
      },
      {
        id: "lames-pan",
        name:        { fr: "Aspect de Pan",       en: "Aspect of Pan"              },
        description: { fr: "Force sauvage de la nature — chaque coup secoue la terre.",
                       en: "Wild nature's force — every hit shakes the ground."     },
        unlockHint:  { fr: "Rencontrer Pan + 6 Psy",
                       en: "Meet Pan + 6 Psyche"                                   },
      },
    ],
  },
  {
    id: "flammes",
    name:        { fr: "Flammes Ombrées (Ygnium)", en: "Umbral Flames (Ygnium)"          },
    emoji: "🔥",
    alertType: "item",
    alertDescription: WEAPON_ALERT_DESC,
    description: { fr: "Projectiles flottants et explosions à retardement.",
                   en: "Floating projectiles and delayed explosions."                     },
    aspects: [
      {
        id: "flammes-melinoe",
        name:        { fr: "Aspect de Mélinoé",   en: "Aspect of Melinoë"          },
        description: { fr: "Forme de base.",       en: "Base form."                 },
      },
      {
        id: "flammes-moros",
        name:        { fr: "Aspect de Moros",     en: "Aspect of Moros"            },
        description: { fr: "Traînée de feu du Titan — brûlure prolongée.",
                       en: "Titan's blazing trail — extended burning DoT."         },
        unlockHint:  { fr: "Découvrir Moros + 7 Psy",
                       en: "Discover Moros + 7 Psyche"                             },
      },
      {
        id: "flammes-eos",
        name:        { fr: "Aspect d'Éos",        en: "Aspect of Eos"             },
        description: { fr: "Explosions florales — zone de dégâts à l'impact.",
                       en: "Blooming explosions — area damage on impact."          },
        unlockHint:  { fr: "Conditions spécifiques + 9 Psy",
                       en: "Specific conditions + 9 Psyche"                        },
      },
    ],
  },
  {
    id: "hache",
    name:        { fr: "Hache de Pierre Lunaire (Zorephet)", en: "Moonstone Axe (Zorephet)"   },
    emoji: "🪓",
    alertType: "item",
    alertDescription: WEAPON_ALERT_DESC,
    description: { fr: "Arme lourde et lente — balayages dévastateurs et parade.",
                   en: "Slow heavy weapon — devastating sweeps and parry."                    },
    aspects: [
      {
        id: "hache-melinoe",
        name:        { fr: "Aspect de Mélinoé",   en: "Aspect of Melinoë"          },
        description: { fr: "Forme de base.",       en: "Base form."                 },
      },
      {
        id: "hache-charon",
        name:        { fr: "Aspect de Charon",    en: "Aspect of Charon"           },
        description: { fr: "Infusé de pièces de la mort — gains d'Oboles en combat.",
                       en: "Infused with death coins — earn Obols during combat."   },
        unlockHint:  { fr: "Offrir Or à Charon + 6 Psy",
                       en: "Give Gold to Charon + 6 Psyche"                        },
      },
      {
        id: "hache-thanatos",
        name:        { fr: "Aspect de Thanatos",  en: "Aspect of Thanatos"         },
        description: { fr: "Frappes de mort instantanée — exécutions sous seuil de PV.",
                       en: "Instant death strikes — executes below HP threshold."  },
        unlockHint:  { fr: "Rencontrer Thanatos + 8 Psy",
                       en: "Meet Thanatos + 8 Psyche"                              },
      },
    ],
  },
  {
    id: "crane",
    name:        { fr: "Crâne Dentelé (Revaal)", en: "Serrated Skull (Revaal)"            },
    emoji: "💀",
    alertType: "item",
    alertDescription: WEAPON_ALERT_DESC,
    description: { fr: "Munitions à récupérer sur le terrain et ruées destructrices.",
                   en: "Field-recoverable ammo and destructive rushes."                    },
    aspects: [
      {
        id: "crane-melinoe",
        name:        { fr: "Aspect de Mélinoé",   en: "Aspect of Melinoë"          },
        description: { fr: "Forme de base.",       en: "Base form."                 },
      },
      {
        id: "crane-medee",
        name:        { fr: "Aspect de Médée",     en: "Aspect of Medea"            },
        description: { fr: "Invoque des sbires depuis les morts pour combattre.",
                       en: "Summons minions from the dead to fight for you."        },
        unlockHint:  { fr: "Découvrir Médée + 8 Psy",
                       en: "Discover Medea + 8 Psyche"                             },
      },
      {
        id: "crane-persephone",
        name:        { fr: "Aspect de Perséphone", en: "Aspect of Persephone"      },
        description: { fr: "Projectiles en écho — multiple rebonds amplifiés.",
                       en: "Echo projectiles — amplified multiple bounces."         },
        unlockHint:  { fr: "Offrir Ambroisie à Perséphone + 9 Psy",
                       en: "Give Ambrosia to Persephone + 9 Psyche"                },
      },
    ],
  },
  {
    id: "manteau",
    name:        { fr: "Manteau Noir (Xinth)", en: "Black Coat (Xinth)"                   },
    emoji: "🧥",
    description: { fr: "Dernière arme secrète du jeu — mobilité extrême et frappes ombragées.",
                   en: "Last secret weapon — extreme mobility and shadow strikes."         },
    aspects: [
      {
        id: "manteau-melinoe",
        name:        { fr: "Aspect de Mélinoé",   en: "Aspect of Melinoë"          },
        description: { fr: "Forme de base.",       en: "Base form."                 },
      },
      {
        id: "manteau-selene",
        name:        { fr: "Aspect de Séléné",    en: "Aspect of Selene"           },
        description: { fr: "Maîtrise des Bienfaits de la Lune — puissance lunaire amplifiée.",
                       en: "Mastery of Moon Boons — amplified lunar power."         },
        unlockHint:  { fr: "Maîtriser les Bienfaits de la Lune + 10 Psy",
                       en: "Master Moon Boons + 10 Psyche"                         },
      },
      {
        id: "manteau-nyx",
        name:        { fr: "Aspect de Nyx",       en: "Aspect of Nyx"             },
        description: { fr: "Restauration de la Nuit — frappes invisibles dévastatrices.",
                       en: "Night restoration — devastating invisible strikes."    },
        unlockHint:  { fr: "Restaurer la Nuit + 12 Psy",
                       en: "Restore the Night + 12 Psyche"                         },
      },
    ],
  },
];

// ─── Prophecies (Fated List / Prophéties Majeures) ───────────────────────────

export const prophecies: HadesProphecy[] = [
  {
    id: "prop-seek-us",
    category: "main",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    title:       { fr: "Mélinoé, Cherche-Nous",           en: "Melinoë, Seek Us"              },
    description: { fr: "L'exigence absolue pour déclencher la rencontre avec les Moires d'Oceanus.",
                   en: "The strict requirement to trigger the Fates encounter in Oceanus." },
    reward:      { fr: "3 Star Dust + Accès aux Épreuves",
                   en: "3 Star Dust + Trials access"                                       },
  },
  {
    id: "prop-combined-might",
    category: "power",
    title:       { fr: "Force Combinée",                  en: "Combined Might"                 },
    description: { fr: "Débloquer et utiliser plusieurs attaques Oméga en une seule run.",
                   en: "Unlock and use multiple Omega attacks in a single run."              },
    reward:      { fr: "5 Star Dust",                     en: "5 Star Dust"                    },
  },
  {
    id: "prop-gifts-moon",
    category: "power",
    title:       { fr: "Dons de la Lune",                 en: "Gifts of the Moon"              },
    description: { fr: "Renforcer votre lien avec Séléné au maximum.",
                   en: "Strengthen your bond with Selene to the maximum."                    },
    reward:      { fr: "10 Star Dust + Aspect débloqué",
                   en: "10 Star Dust + Aspect unlock"                                        },
  },
  {
    id: "prop-deeper-understanding",
    category: "companion",
    title:       { fr: "Compréhension Plus Profonde",     en: "Deeper Understanding"           },
    description: { fr: "Améliorer les familiers au Carrefour.",
                   en: "Upgrade familiars at the Crossroads."                                },
    reward:      { fr: "1 Ambroisie + dialogue exclusif",
                   en: "1 Ambrosia + exclusive dialogue"                                     },
  },
  {
    id: "prop-taste-victory",
    category: "main",
    title:       { fr: "Un Avant-Goût de la Victoire",   en: "A Taste of Victory"             },
    description: { fr: "Vaincre Chronos pour la première fois.",
                   en: "Defeat Chronos for the first time."                                  },
    reward:      { fr: "20 Gold + trophée de parcours",
                   en: "20 Gold + run trophy"                                                },
  },
  {
    id: "prop-narrateur",
    category: "secret",
    alertType: "item",
    alertDescription: "EASTER EGG : Lors de certaines runs très avancées, il est possible d'atteindre une salle spéciale où Mélinoé s'adresse directement à la voix off qui commente le jeu depuis le premier opus, brisant ainsi le quatrième mur.",
    title:       { fr: "La Rencontre avec le Narrateur (Homère)", en: "The Narrator Encounter (Homer)" },
    description: { fr: "Brisure du 4e mur : Mélinoé s'adresse directement à la voix off qui commente ses actions depuis Hades I.",
                   en: "4th wall break: Melinoë directly addresses the narrator who has been commenting on events since Hades I." },
    reward:      { fr: "Dialogue exclusif + Scène narrative unique", en: "Exclusive dialogue + Unique narrative scene" },
    walkthrough: { fr: "Conditions exactes non confirmées (Early Access). Continuez à progresser dans le jeu et explorez toutes les salles spéciales de type 'chambre narratrice'.",
                   en: "Exact conditions unconfirmed (Early Access). Continue progressing and explore all special 'narrator chamber' rooms." },
  },
  {
    id: "prop-portrait",
    category: "secret",
    alertType: "item",
    alertDescription: "EASTER EGG : Dans le domaine de Chronos (Tartare), fouillez bien les décors pour trouver le tableau de famille d'Hadès, Zagreus et Perséphone, lâchement vandalisé par le Titan du Temps.",
    title:       { fr: "Le Portrait de Famille Déchiré",          en: "The Torn Family Portrait"     },
    description: { fr: "Un tableau de famille d'Hadès, Zagreus et Perséphone vandalisé par Chronos, caché dans les décors du Tartare.",
                   en: "A family portrait of Hades, Zagreus and Persephone vandalized by Chronos, hidden in Tartarus scenery." },
    reward:      { fr: "Lore World-building exclusif", en: "Exclusive world-building lore" },
    walkthrough: { fr: "Explorez minutieusement les salles du Tartare (domaine de Chronos). Regardez les murs et le décor en arrière-plan — le tableau n'est pas interactif mais visible dans certaines chambres.",
                   en: "Carefully explore Tartarus rooms (Chronos's domain). Examine walls and background scenery — the painting isn't interactive but is visible in certain chambers." },
  },
];

export const incantations: HadesIncantation[] = [
  {
    id: "incant-abyssal",
    title:     { fr: "Vision Abyssale",                 en: "Abyssal Insight"               },
    effect:    { fr: "Active les Épreuves des Ténèbres",
                 en: "Unlocks Trials of the Underworld"                                     },
    materials: ["2 × Fate Fabric", "2 × Pearl", "2 × Moly"],
  },
  {
    id: "incant-vapor",
    title:     { fr: "Rite de Purification par la Vapeur", en: "Rite of Vapor-Cleansing"    },
    effect:    { fr: "Répare les Sources Chaudes",
                 en: "Restores Hot Springs"                                                 },
    materials: ["2 × Moly", "2 × Lotus"],
  },
  {
    id: "incant-oceanus",
    title:     { fr: "Aspect d'Océanos",                en: "Oceanus's Aspect"              },
    effect:    { fr: "Débloque la Pêche",
                 en: "Unlocks Fishing"                                                      },
    materials: ["1 × Wool", "1 × Fish", "1 × Lotus"],
  },
  {
    id: "incant-shadow",
    title:     { fr: "Incantation de l'Ombre Voilée",   en: "Shadow-Shrouding Incantation"  },
    effect:    { fr: "Ouvre le Marché Nocturne",
                 en: "Opens the Night Market"                                               },
    materials: ["3 × Shiny Things", "2 × Pearl"],
  },
  {
    id: "incant-thread",
    title:     { fr: "Fil Défait d'Ariane",             en: "Unraveled Thread of Ariadne"   },
    effect:    { fr: "Accélère la progression",
                 en: "Accelerates progression"                                              },
    materials: ["2 × Loom Fabric", "3 × Wool"],
  },
];

// ─── Heat / Pact of Punishment milestones ─────────────────────────────────────

const HEAT_LEVELS = [1, 4, 8, 16, 24] as const;

export interface WeaponHeatGroup {
  weaponId:   string;
  weaponName: BiText;
  emoji:      string;
  milestones: { level: number; id: string }[];
}

export const weaponHeats: WeaponHeatGroup[] = weapons.map((w) => ({
  weaponId:   w.id,
  weaponName: w.name,
  emoji:      w.emoji,
  milestones: HEAT_LEVELS.map((level) => ({ level, id: `heat-${w.id}-${level}` })),
}));

// ─── Familiars ───────────────────────────────────────────────────────────────

export interface HadesFamiliar {
  id:               string;
  name:             BiText;
  emoji:            string;
  how_to:           BiText;
  alertType?:       'item' | 'quest';
  alertDescription?: string;
}

export const familiars: HadesFamiliar[] = [
  {
    id: "familiar-frinos",
    emoji: "🐸",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    name:    { fr: "Frinos (Le Crapaud)",                 en: "Frinos (The Toad)"                  },
    how_to:  { fr: "Offrir du Nectar à Hécate au Carrefour.",
               en: "Give Nectar to Hecate at the Crossroads."                                      },
  },
  {
    id: "familiar-toula",
    emoji: "🐱",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    name:    { fr: "Toula (Le Chat — Nécessite la Canne à Pêche)", en: "Toula (The Cat — Requires Fishing Rod)" },
    how_to:  { fr: "Débloquer la pêche via l'Incantation d'Océanos, puis pêcher plusieurs fois.",
               en: "Unlock fishing via Oceanus Incantation, then fish multiple times."             },
  },
  {
    id: "familiar-raki",
    emoji: "🐦‍⬛",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    name:    { fr: "Raki (Le Corbeau — Déblocable dans l'Érèbe)", en: "Raki (The Crow — Unlockable in Erebus)" },
    how_to:  { fr: "Trouver et nourrir le corbeau dans la zone d'Érèbe.",
               en: "Find and feed the crow in the Erebus zone."                                    },
  },
];

// ─── Souvenirs ────────────────────────────────────────────────────────────────

export interface HadesSouvenir {
  id:               string;
  name:             BiText;
  emoji:            string;
  source:           BiText;
  alertType?:       'item' | 'quest';
  alertDescription?: string;
}

export const souvenirs: HadesSouvenir[] = [
  {
    id: "souvenir-pomme",
    emoji: "🍎",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    name:    { fr: "Pomme Bijou",          en: "Jewel Apple"        },
    source:  { fr: "Donné par Hadès.",     en: "Given by Hades."    },
  },
  {
    id: "souvenir-carte",
    emoji: "📇",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    name:    { fr: "Carte de Visite",      en: "Calling Card"       },
    source:  { fr: "Donné par Zagreus.",   en: "Given by Zagreus."  },
  },
  {
    id: "souvenir-sablier",
    emoji: "⌛",
    alertType: "item",
    alertDescription: COLLECTIBLE_ALERT_DESC,
    name:    { fr: "Sablier",              en: "Hourglass"          },
    source:  { fr: "Donné par Chronos.",   en: "Given by Chronos."  },
  },
];

// ─── Totals ───────────────────────────────────────────────────────────────────

export const totalProphecies   = prophecies.length;
export const totalIncantations = incantations.length;
export const totalAspects      = weapons.reduce((s, w) => s + w.aspects.length, 0);
export const totalBosses       = bosses.length;
export const totalHeatItems    = weaponHeats.reduce((s, g) => s + g.milestones.length, 0);
export const totalFamiliars    = familiars.length;
export const totalSouvenirs    = souvenirs.length;
export const totalHades        =
  totalProphecies + totalIncantations + totalAspects + totalBosses + totalHeatItems +
  totalFamiliars + totalSouvenirs;
