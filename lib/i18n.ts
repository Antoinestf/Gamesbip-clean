export type Lang = "fr" | "en";

export const UI = {
  // Header / progress
  progressLabel:   { fr: "Progression vers les 100%",      en: "100% Completion Progress" },
  syncBtn:         { fr: "Sync",                            en: "Sync" },
  syncTitle:       { fr: "Synchroniser ma Progression",     en: "Sync My Progress" },

  // Main tabs
  tabStory:        { fr: "Histoire",                        en: "Main Story" },
  tabSecondary:    { fr: "Inconnus",                        en: "Strangers" },
  tabCollectibles: { fr: "Collectibles",                    en: "Collectibles" },
  tabActivities:   { fr: "Activités",                       en: "Activities" },
  tabGta6:         { fr: "GTA VI",                          en: "GTA VI" },

  // Mission node / detail
  solution:        { fr: "Solution",                        en: "Walkthrough" },
  details:         { fr: "Détails",                         en: "Details" },
  goldMedals:      { fr: "Médailles d'or",                  en: "Gold Medals" },
  rewardLabel:     { fr: "Récompense",                      en: "Reward" },
  startingPoint:   { fr: "📍 Point de départ",              en: "📍 Starting Point" },
  stepByStep:      { fr: "🎮 Guide Pas-à-Pas",              en: "🎮 Step-by-Step Guide" },
  markComplete:    { fr: "Marquer comme terminée",           en: "Mark as Complete" },
  markUndo:        { fr: "✓ Terminée — Appuyer pour annuler", en: "✓ Complete — Tap to undo" },

  // Stock alert
  stockAlertBefore: { fr: "AVANT la mission :",             en: "BEFORE the mission:" },
  stockAlertAfter:  { fr: "APRÈS la mission :",             en: "AFTER the mission:" },
  stockWarn:        { fr: "⚠ Préparez la Bourse AVANT",     en: "⚠ Prepare the Stock Market FIRST" },

  // Chapter nav
  chapterPrefix:   { fr: "CH.",                             en: "CH." },
  chapterLabel:    { fr: "CHAPITRE",                        en: "CHAPTER" },
  colon:           { fr: " : ",                             en: ": " },

  // Zone / area
  zoneToggle:      { fr: "Zones",                           en: "Areas" },
  chaptersToggle:  { fr: "Chapitres",                       en: "Chapters" },
  zoneTitle:       { fr: "Vue par Zone",                    en: "Area View" },

  // Strangers & Freaks
  strangersTitle:  { fr: "Inconnus & Détraqués",            en: "Strangers & Freaks" },
  strangersDesc:   { fr: "Quêtes uniques déclenchées en explorant le monde ouvert.", en: "Unique quests triggered by exploring the open world." },
  strangersType:   { fr: "Inconnus & Détraqués",            en: "Strangers & Freaks" },
  lesterType:      { fr: "Assassinat de Lester",            en: "Lester's Assassination" },
  stepsBtn:        { fr: "Étapes →",                        en: "Steps →" },

  // Collectibles
  collectiblesTitle: { fr: "Collectibles",                  en: "Collectibles" },
  collectiblesDesc:  { fr: "Objets à trouver dans tout Los Santos pour atteindre les 100%.", en: "Items to find across Los Santos to reach 100% completion." },
  moreLocations:     { fr: "+ %d autres emplacements — utilisez le Rockstar Social Club pour la carte complète", en: "+ %d more locations — use Rockstar Social Club for the full map" },

  // Activities
  activitiesTitle:  { fr: "Activités Diverses",             en: "Miscellaneous Activities" },
  activitiesDesc:   { fr: "Activités obligatoires pour atteindre les 100% de complétion.", en: "Mandatory activities to reach 100% completion." },
  catLeisure:       { fr: "Loisirs",                        en: "Leisure" },
  catSport:         { fr: "Sport",                          en: "Sport" },
  catRace:          { fr: "Courses",                        en: "Races" },
  catSocial:        { fr: "Social",                         en: "Social" },
  catSecret:        { fr: "Easter Eggs & Secrets",          en: "Easter Eggs & Secrets" },

  // Secondary/Activity detail modal
  keyTip:           { fr: "Astuce clé",                     en: "Key Tip" },
  completionReq:    { fr: "Condition de complétion",        en: "Completion Requirement" },
  zoneLabel:        { fr: "Zone",                           en: "Zone" },
  characterLabel:   { fr: "Personnage",                     en: "Character" },

  // GTA VI placeholder
  gta6Desc:  { fr: "Le guide des missions de GTA VI sera disponible dès la sortie du jeu.", en: "The GTA VI mission guide will be available upon the game's release." },
  gta6Soon:  { fr: "Bientôt disponible",                    en: "Coming Soon" },

  // Stats row
  statStory:        { fr: "hist.",                          en: "story" },
  statSide:         { fr: "second.",                        en: "side" },
  statCollec:       { fr: "collec.",                        en: "collec." },
  statActiv:        { fr: "activ.",                         en: "activ." },

  // Sync modal
  exportLabel:   { fr: "Exporter (copier ce code)",         en: "Export (copy this code)" },
  importLabel:   { fr: "Importer (coller un code)",         en: "Import (paste a code)" },
  copyBtn:       { fr: "Copier",                            en: "Copy" },
  copiedBtn:     { fr: "Copié !",                           en: "Copied!" },
  importBtn:     { fr: "Importer la progression",           en: "Import Progress" },
  importSuccess: { fr: "Progression importée avec succès !", en: "Progress imported successfully!" },
  importError:   { fr: "Code invalide — vérifiez que vous avez copié le code complet commençant par GTABIP-", en: "Invalid code — make sure you copied the full code starting with GTABIP-" },
  exportHint:    { fr: "Collez ce code sur votre téléphone pour retrouver votre progression.", en: "Paste this code on your phone to restore your progress." },
  importPlaceholder: { fr: "Collez votre code GTABIP-... ici", en: "Paste your GTABIP-... code here" },
} satisfies Record<string, Record<Lang, string>>;

export function t(key: keyof typeof UI, lang: Lang): string {
  return UI[key]?.[lang] ?? key;
}
