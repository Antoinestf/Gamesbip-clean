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
  solution?:   BiText;
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
        solution:    { fr: "🔓 Déblocage : Disponible par défaut.\n\n⚔️ Style : Mi-distance polyvalent.\n⚡ Synergies : Héphaïstos (pour de gros dégâts bruts) ou Apollon (pour agrandir la zone de frappe).\n💡 Mécanique : Vous canalisez vos attaques Oméga beaucoup plus vite. C'est l'aspect parfait pour apprendre à gérer sa Magie sans prendre de risques.",
                       en: "🔓 Unlock: Available by default.\n\n⚔️ Style: Versatile mid-range.\n⚡ Synergies: Hephaestus (for heavy raw damage) or Apollo (to expand the strike zone).\n💡 Mechanic: You channel your Omega attacks much faster. The perfect aspect to learn Magick management without taking risks." },
      },
      {
        id: "sceptre-circe",
        name:        { fr: "Aspect de Circé",     en: "Aspect of Circe"            },
        description: { fr: "Transforme les ennemis proches en créatures inoffensives.",
                       en: "Transforms nearby foes into harmless creatures."        },
        unlockHint:  { fr: "Parler à Hécate + 5 Psy",
                       en: "Speak to Hecate + 5 Psyche"                            },
        solution:    { fr: "🔓 Déblocage : 5 Argent + 5 Lotus\n\n⚔️ Style : Agressif / Vitesse d'attaque.\n⚡ Synergies : Zeus (éclairs sur chaque frappe) ou Aphrodite.\n💡 Mécanique : Après 21 attaques, vous gagnez le buff 'Sérénité' (vitesse et régénération magique accrues). L'objectif est de frapper frénétiquement en attaque de base, puis de vider sa magie en Oméga.",
                       en: "🔓 Unlock: 5 Silver + 5 Lotus\n\n⚔️ Style: Aggressive / Attack speed.\n⚡ Synergies: Zeus (lightning on every hit) or Aphrodite.\n💡 Mechanic: After 21 attacks, you gain the 'Serenity' buff (increased speed and Magick regen). The goal is to attack frantically with basic attacks, then dump all Magick into Omega." },
      },
      {
        id: "sceptre-momus",
        name:        { fr: "Aspect de Momus",     en: "Aspect of Momus"            },
        description: { fr: "Succession de frappes rapides — critique augmentée.",
                       en: "Rapid strike succession — increased critical chance."   },
        unlockHint:  { fr: "Offrir Nectar / Épreuves + 10 Psy",
                       en: "Give Nectar / Trials + 10 Psyche"                      },
        solution:    { fr: "🔓 Déblocage : 2 Calcaire + 1 Perle\n\n⚔️ Style : Distance et Survie.\n⚡ Synergies : Poséidon (dégâts d'éclaboussure) ou Déméter.\n💡 Mécanique : Joue énormément sur le spam du Spécial Oméga. Permet aussi de récupérer de la vie si on absorbe le spécial avec très peu de PV. Très sécurisant pour les hauts niveaux de peur.",
                       en: "🔓 Unlock: 2 Ite + 1 Pearl\n\n⚔️ Style: Ranged and Survival.\n⚡ Synergies: Poseidon (splash damage) or Demeter.\n💡 Mechanic: Heavily relies on spamming Omega Special. Also lets you recover health when absorbing your Special at very low HP. Very safe for high Heat levels." },
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
        solution:    { fr: "🔓 Déblocage : Disponible par défaut.\n\n⚔️ Style : Corps-à-corps assassin.\n⚡ Synergies : Aphrodite (dégâts massifs de près) et Hestia.\n💡 Mécanique : L'aspect récompense le positionnement. Frappez vos ennemis dans le dos pour infliger des dégâts bonus. Utilisez votre Cast (cercle magique) pour les immobiliser et les contourner facilement.",
                       en: "🔓 Unlock: Available by default.\n\n⚔️ Style: Assassin melee.\n⚡ Synergies: Aphrodite (massive close-range damage) and Hestia.\n💡 Mechanic: This aspect rewards positioning. Hit enemies from behind for bonus damage. Use your Cast (magic circle) to immobilize them and flank easily." },
      },
      {
        id: "lames-artemis",
        name:        { fr: "Aspect d'Artémis",    en: "Aspect of Artemis"          },
        description: { fr: "Puissantes frappes critiques — favorise la précision.",
                       en: "Powerful critical strikes — rewards precision."         },
        unlockHint:  { fr: "Parler à Artémis + 5 Psy",
                       en: "Speak to Artemis + 5 Psyche"                           },
        solution:    { fr: "🔓 Déblocage : 15 Argent + 1 Verre-de-Roche\n\n⚔️ Style : Contre-attaque au corps-à-corps.\n⚡ Synergies : Athéna ou Héphaïstos.\n💡 Mécanique : Introduit la mécanique de 'Parade'. En canalisant votre attaque Oméga, vous absorbez le prochain coup ennemi et ripostez avec des dégâts critiques dévastateurs. Exige un excellent timing.",
                       en: "🔓 Unlock: 15 Silver + 1 Rock Glass\n\n⚔️ Style: Melee counter-attack.\n⚡ Synergies: Athena or Hephaestus.\n💡 Mechanic: Introduces the 'Parry' mechanic. While channeling your Omega attack, you absorb the next enemy hit and riposte with devastating critical damage. Requires excellent timing." },
      },
      {
        id: "lames-pan",
        name:        { fr: "Aspect de Pan",       en: "Aspect of Pan"              },
        description: { fr: "Force sauvage de la nature — chaque coup secoue la terre.",
                       en: "Wild nature's force — every hit shakes the ground."     },
        unlockHint:  { fr: "Rencontrer Pan + 6 Psy",
                       en: "Meet Pan + 6 Psyche"                                   },
        solution:    { fr: "🔓 Déblocage : À trouver dans les Champs des Pleurs (composants variables)\n\n⚔️ Style : Mi-distance à tête chercheuse.\n⚡ Synergies : Poséidon (dégâts bruts sur le spécial).\n💡 Mécanique : Le build 'Mitrailleuse'. Lancez votre cercle magique (Cast) sur les ennemis : toutes vos attaques spéciales (les couteaux) vont traquer automatiquement les cibles piégées dans ce cercle.",
                       en: "🔓 Unlock: Found in the Fields of Mourning (variable components)\n\n⚔️ Style: Homing mid-range.\n⚡ Synergies: Poseidon (raw Special damage).\n💡 Mechanic: The 'Machine Gun' build. Cast your magic circle on enemies: all your Special attacks (knives) will automatically track targets trapped in the circle." },
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
        solution:    { fr: "🔓 Déblocage : Disponible par défaut.\n\n⚔️ Style : Distance et Mobilité continue.\n⚡ Synergies : Déméter (pour geler/ralentir) ou Hestia.\n💡 Mécanique : Vos flammes Oméga durent beaucoup plus longtemps. Le gameplay consiste à ne jamais s'arrêter de courir : tournez autour des boss en maintenant le bouton de tir enfoncé.",
                       en: "🔓 Unlock: Available by default.\n\n⚔️ Style: Ranged and Continuous mobility.\n⚡ Synergies: Demeter (to freeze/slow) or Hestia.\n💡 Mechanic: Your Omega flames last much longer. The gameplay is about never stopping: circle around bosses while holding the fire button." },
      },
      {
        id: "flammes-moros",
        name:        { fr: "Aspect de Moros",     en: "Aspect of Moros"            },
        description: { fr: "Traînée de feu du Titan — brûlure prolongée.",
                       en: "Titan's blazing trail — extended burning DoT."         },
        unlockHint:  { fr: "Découvrir Moros + 7 Psy",
                       en: "Discover Moros + 7 Psyche"                             },
        solution:    { fr: "🔓 Déblocage : 6 Bronze + 4 Larmes\n\n⚔️ Style : Poseur de bombes (Dégâts de zone).\n⚡ Synergies : Apollon (pour augmenter la zone d'explosion).\n💡 Mécanique : Vos attaques principales restent en lévitation sur le terrain. Tirez dessus avec votre Spécial pour les faire exploser. C'est lent à mettre en place, mais les dégâts terminaux sont monstrueux.",
                       en: "🔓 Unlock: 6 Bronze + 4 Tears\n\n⚔️ Style: Bomb placer (Area damage).\n⚡ Synergies: Apollo (to increase explosion radius).\n💡 Mechanic: Your main attacks hover on the battlefield. Shoot them with your Special to detonate them. Slow to set up, but the final damage is monstrous." },
      },
      {
        id: "flammes-eos",
        name:        { fr: "Aspect d'Éos",        en: "Aspect of Eos"             },
        description: { fr: "Explosions florales — zone de dégâts à l'impact.",
                       en: "Blooming explosions — area damage on impact."          },
        unlockHint:  { fr: "Conditions spécifiques + 9 Psy",
                       en: "Specific conditions + 9 Psyche"                        },
        solution:    { fr: "🔓 Déblocage : 2 Bois flotté + 2 Pommes Dorées\n\n⚔️ Style : Hit & Run.\n⚡ Synergies : Zeus ou Poséidon.\n💡 Mécanique : Vos attaques grossissent au fil des secondes sur le terrain. Lorsque vous sprintez, elles reviennent toutes vers vous comme un boomerang, ravageant les ennemis sur leur passage.",
                       en: "🔓 Unlock: 2 Driftwood + 2 Golden Apples\n\n⚔️ Style: Hit & Run.\n⚡ Synergies: Zeus or Poseidon.\n💡 Mechanic: Your attacks grow over time on the battlefield. When you sprint, they all boomerang back to you, ravaging enemies in their path." },
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
        solution:    { fr: "🔓 Déblocage : Disponible par défaut.\n\n⚔️ Style : Tanking et dégâts très lourds.\n⚡ Synergies : Aphrodite (bonus de vie et puissance au contact).\n💡 Mécanique : Vous octroie des PV bonus et une récupération d'animation plus rapide. C'est l'arme la plus lente du jeu : compensez en encaissant les petits coups et en détruisant les armures adverses d'un seul coup.",
                       en: "🔓 Unlock: Available by default.\n\n⚔️ Style: Tanking and very heavy damage.\n⚡ Synergies: Aphrodite (health bonus and close-range power).\n💡 Mechanic: Grants bonus HP and faster animation recovery. The slowest weapon in the game: compensate by tanking small hits and destroying enemy armor in one blow." },
      },
      {
        id: "hache-charon",
        name:        { fr: "Aspect de Charon",    en: "Aspect of Charon"           },
        description: { fr: "Infusé de pièces de la mort — gains d'Oboles en combat.",
                       en: "Infused with death coins — earn Obols during combat."   },
        unlockHint:  { fr: "Offrir Or à Charon + 6 Psy",
                       en: "Give Gold to Charon + 6 Psyche"                        },
        solution:    { fr: "🔓 Déblocage : 3 Perles + 3 Oboles\n\n⚔️ Style : Lanceur de sorts massifs (Zone).\n⚡ Synergies : Apollon (agrandissement du cercle) ou Déméter.\n💡 Mécanique : Transforme la hache en arme magique. Votre cercle magique (Cast) dure plus longtemps. Si vous frappez ce cercle avec votre attaque lourde (Oméga), il explose et nettoie la salle entière.",
                       en: "🔓 Unlock: 3 Pearls + 3 Obols\n\n⚔️ Style: Massive spell caster (Area).\n⚡ Synergies: Apollo (circle enlargement) or Demeter.\n💡 Mechanic: Turns the axe into a magic weapon. Your Cast (magic circle) lasts longer. If you hit the circle with your heavy attack (Omega), it explodes and clears the entire room." },
      },
      {
        id: "hache-thanatos",
        name:        { fr: "Aspect de Thanatos",  en: "Aspect of Thanatos"         },
        description: { fr: "Frappes de mort instantanée — exécutions sous seuil de PV.",
                       en: "Instant death strikes — executes below HP threshold."  },
        unlockHint:  { fr: "Rencontrer Thanatos + 8 Psy",
                       en: "Meet Thanatos + 8 Psyche"                              },
        solution:    { fr: "🔓 Déblocage : Lié à l'avancée de l'histoire (fin de jeu)\n\n⚔️ Style : Berserker 'Glass Cannon'.\n⚡ Synergies : Héphaïstos (pour rajouter de l'armure et protéger le buff).\n💡 Mécanique : Vos attaques Oméga augmentent vos chances de coups critiques de façon permanente... jusqu'à ce que vous preniez des dégâts. Il faut jouer à la perfection sans se faire toucher pour maintenir le buff.",
                       en: "🔓 Unlock: Tied to story progression (endgame)\n\n⚔️ Style: Berserker 'Glass Cannon'.\n⚡ Synergies: Hephaestus (to add armor and protect the buff).\n💡 Mechanic: Your Omega attacks permanently increase your critical hit chance... until you take damage. You must play perfectly without getting hit to maintain the buff." },
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
        solution:    { fr: "🔓 Déblocage : Disponible par défaut.\n\n⚔️ Style : Distance agressive.\n⚡ Synergies : Poséidon ou Aphrodite.\n💡 Mécanique : Vos attaques font beaucoup plus mal en fonction du nombre de crânes non ramassés sur le sol. Videz vos munitions de loin, foncez faire des dégâts massifs, et ramassez-les en fuyant.",
                       en: "🔓 Unlock: Available by default.\n\n⚔️ Style: Aggressive ranged.\n⚡ Synergies: Poseidon or Aphrodite.\n💡 Mechanic: Your attacks deal more damage based on how many skulls are left on the ground. Dump ammo from afar, rush in for massive damage, then pick them up while retreating." },
      },
      {
        id: "crane-medee",
        name:        { fr: "Aspect de Médée",     en: "Aspect of Medea"            },
        description: { fr: "Invoque des sbires depuis les morts pour combattre.",
                       en: "Summons minions from the dead to fight for you."        },
        unlockHint:  { fr: "Découvrir Médée + 8 Psy",
                       en: "Discover Medea + 8 Psyche"                             },
        solution:    { fr: "🔓 Déblocage : 4 Fer + 1 Mandragore\n\n⚔️ Style : Corps-à-corps explosif (Kamikaze).\n⚡ Synergies : Hestia ou Aphrodite.\n💡 Mécanique : Change totalement l'arme. Vos attaques restent bloquées sur vous. Vous chargez les ennemis avec votre Dash et les obus accumulés explosent autour de vous dans un délai de 3 secondes.",
                       en: "🔓 Unlock: 4 Iron + 1 Mandrake\n\n⚔️ Style: Explosive melee (Kamikaze).\n⚡ Synergies: Hestia or Aphrodite.\n💡 Mechanic: Completely changes the weapon. Your attacks stay locked on you. Dash-charge into enemies and the accumulated shells explode around you after 3 seconds." },
      },
      {
        id: "crane-persephone",
        name:        { fr: "Aspect de Perséphone", en: "Aspect of Persephone"      },
        description: { fr: "Projectiles en écho — multiple rebonds amplifiés.",
                       en: "Echo projectiles — amplified multiple bounces."         },
        unlockHint:  { fr: "Offrir Ambroisie à Perséphone + 9 Psy",
                       en: "Give Ambrosia to Persephone + 9 Psyche"                },
        solution:    { fr: "🔓 Déblocage : 1 Mousse + 5 Pavots\n\n⚔️ Style : Rafale ininterrompue.\n⚡ Synergies : Zeus (pour un déluge d'éclairs).\n💡 Mécanique : Tous vos dégâts génèrent de la 'Gloire'. Une fois chargée, cette Gloire permet de maintenir votre Spécial Oméga (la glissade) beaucoup plus longtemps pour devenir totalement intouchable.",
                       en: "🔓 Unlock: 1 Moss + 5 Poppies\n\n⚔️ Style: Uninterrupted barrage.\n⚡ Synergies: Zeus (for a lightning deluge).\n💡 Mechanic: All your damage generates 'Glory'. Once charged, this Glory lets you sustain your Omega Special (the slide) much longer, becoming completely untouchable." },
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
    walkthrough: { fr: "La clé du combat est la patience. Ne dashez jamais 'au hasard' car la zone de combat est petite. Équipez un bienfait de Sprint (comme celui d'Apollon ou Hephaïstos) pour fuir facilement ses immenses attaques d'aspiration. Ses attaques de zone (faux) infligent d'énormes dégâts : quand l'écran s'assombrit, trouvez immédiatement la zone de lumière pour survivre.",
                   en: "Patience is the key to this fight. Never dash randomly — the arena is small. Equip a Sprint boon (like Apollo's or Hephaestus's) to escape his massive vacuum attacks. His scythe area attacks deal enormous damage: when the screen darkens, immediately find the light zone to survive." },
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
  {
    id: "prop-reach-surface",
    category: "main",
    title:       { fr: "Atteindre la Surface",                en: "Reach the Surface"                },
    description: { fr: "Briser le sceau et atteindre la surface pour la première fois.",
                   en: "Break the seal and reach the surface for the first time."              },
    reward:      { fr: "Accès à la voie de la Surface",
                   en: "Access to the Surface path"                                            },
    walkthrough: { fr: "Pour survivre à la malédiction de la surface, vous devez accomplir l'incantation spécifique dans le Chaudron. Faites quelques 'runs suicides' à la surface juste pour récolter de la Mousse et du Fer en vitesse, puis mourez. Une fois l'incantation lancée, la voie est libre.",
                   en: "To survive the surface curse, you must complete the specific incantation in the Cauldron. Do a few 'suicide runs' to the surface just to quickly harvest Moss and Iron, then die. Once the incantation is cast, the path is clear." },
  },
  {
    id: "prop-master-nocturnal",
    category: "main",
    title:       { fr: "Maîtriser les Armes Nocturnes",       en: "Master the Nocturnal Arms"        },
    description: { fr: "Compléter une run victorieuse avec chaque Arme Nocturne.",
                   en: "Complete a victorious run with each Nocturnal Arm."                    },
    reward:      { fr: "Aspect secret débloqué",
                   en: "Secret aspect unlocked"                                                },
    walkthrough: { fr: "Pour valider cette prophétie facilement, faites des runs à 0 Chaleur en vous concentrant uniquement sur la survie (bienfaits d'Aphrodite pour la santé, Déméter pour le contrôle). N'hésitez pas à utiliser la carte de Tarot 'L'Amant' pour des boucliers gratuits dans les salles de boss.",
                   en: "To complete this prophecy easily, do 0 Heat runs focusing only on survival (Aphrodite boons for health, Demeter for control). Don't hesitate to use the 'Lover' Arcana card for free shields in boss rooms." },
  },
  {
    id: "prop-defeat-eris",
    category: "main",
    title:       { fr: "Vaincre Éris",                        en: "Defeat Eris"                      },
    description: { fr: "Vaincre Éris, Déesse de la Discorde, pour la première fois.",
                   en: "Defeat Eris, Goddess of Discord, for the first time."                 },
    reward:      { fr: "Progression de la voie de la Surface",
                   en: "Surface path progression"                                              },
    walkthrough: { fr: "Éris utilise des armes à feu à distance. Mettez-vous à l'abri derrière les piliers de la zone lorsqu'elle tire en rafale. Son point faible est son rechargement : dashez au corps-à-corps à ce moment précis pour lui infliger un maximum de dégâts avant de vous remettre à couvert.",
                   en: "Eris uses ranged firearms. Take cover behind the arena pillars when she fires in bursts. Her weak point is her reload: dash into melee at that exact moment to deal maximum damage before getting back to cover." },
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

export interface HeatGuide {
  id:       string;
  title:    BiText;
  solution: BiText;
}

export const heatGuides: HeatGuide[] = [
  {
    id: "heat-guide-low",
    title:    { fr: "Chaleur 1 à 8",  en: "Heat 1 to 8"  },
    solution: { fr: "Pour vos premières montées en chaleur, activez les Vœux qui augmentent légèrement la vie des ennemis ou le coût de la boutique de Charon. Évitez absolument le Vœu qui accélère la vitesse d'attaque des ennemis (Vœu de Fureur), il casse les timings d'esquive.",
               en: "For your first heat increases, activate Vows that slightly raise enemy health or Charon's shop costs. Absolutely avoid the Vow that speeds up enemy attacks (Vow of Fury) — it breaks dodge timings." },
  },
  {
    id: "heat-guide-high",
    title:    { fr: "Chaleur 16 à 24", en: "Heat 16 to 24" },
    solution: { fr: "À ce stade, vous devez avoir un build optimal en tête avant même de commencer. Le Vœu limitant votre Magie maximale est gérable si vous jouez un build centré sur les attaques de base. Utilisez systématiquement vos Refus de la Mort et abusez des cercles d'immobilisation pour contrôler le terrain.",
               en: "At this stage, you must have an optimal build in mind before even starting. The Vow limiting your max Magick is manageable if you play a basic-attack-focused build. Systematically use your Death Defiances and abuse immobilization circles to control the field." },
  },
];

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
