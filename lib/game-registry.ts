export interface GameMeta {
  id:         string;
  title:      string;
  subtitle:   string;
  year:       string;
  platform:   string;
  storageKey: string;
  status:     "active" | "soon";
  tagline:    { fr: string; en: string };
  badge:      { fr: string; en: string };
}

export const GAME_REGISTRY: GameMeta[] = [
  {
    id:         "gta5",
    title:      "GTA V",
    subtitle:   "Grand Theft Auto V",
    year:       "2013",
    platform:   "PS4 / PS5 / Xbox / PC",
    storageKey: "gtabip_progress",
    status:     "active",
    tagline: { fr: "Guide de compl\u00e9tion \u00e0 100%",    en: "100% Completion Guide"         },
    badge:   { fr: "Actif",                         en: "Active"                        },
  },
  {
    id:         "hades2",
    title:      "Hades II",
    subtitle:   "Hades II",
    year:       "2024",
    platform:   "PC / Mac",
    storageKey: "hadesbip_progress",
    status:     "active",
    tagline: { fr: "Proph\u00e9ties & Guide complet",    en: "Fated List & Full Guide"       },
    badge:   { fr: "Actif",                         en: "Active"                        },
  },
  {
    id:         "sts2",
    title:      "Slay the Spire 2",
    subtitle:   "Slay the Spire 2",
    year:       "2025",
    platform:   "PC / Mac",
    storageKey: "gamesbip_sts2_progress",
    status:     "active",
    tagline: { fr: "Guides & Combos de Reliques",  en: "Guides & Relic Combos"    },
    badge:   { fr: "Actif",                        en: "Active"                   },
  },
  {
    id:         "eldenring",
    title:      "Elden Ring",
    subtitle:   "Elden Ring",
    year:       "2022",
    platform:   "PS5 / Xbox / PC",
    storageKey: "eldenringbip_progress",
    status:     "active",
    tagline: { fr: "Terres Interm\u00e9diaires \u2014 Guide Complet", en: "Lands Between \u2014 Full Guide" },
    badge:   { fr: "Actif",                                      en: "Active"                    },
  },
  {
 
    id:         "re-requiem",
    title:      "Resident Evil Requiem",
    subtitle:   "Resident Evil Requiem",
    year:       "2025",
    platform:   "PS5 / Xbox / PC",
    storageKey: "gamesbip_rerequiem_progress",
    status:     "active",
    tagline: { fr: "Guide de survie complet",  en: "Full Survival Guide"  },
    badge:   { fr: "Nouveau",                  en: "New"                  },
  },

    id: "re-requiem",
    title: "Resident Evil Requiem",
    coverImage: "/resident.webp",//
    progress: 0,
    isNew: true,
    status: "active",
    tagline: {
      fr: "Survivre à l'horreur",
      en: "Survive the horror"
    },
    badge: {
      fr: "Nouveau",
      en: "New"
    }
  }
main
];

export function getGameMeta(id: string): GameMeta | undefined {
  return GAME_REGISTRY.find((g) => g.id === id);
}
