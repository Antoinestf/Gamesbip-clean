export interface BiText { fr: string; en: string }

// ─── Standardized Item (same modal schema as other games) ─────────────────────

export interface Sts2Item {
  id:            string;
  title:         BiText;
  description:   BiText;
  prerequisites: BiText;
  howToUnlock:   BiText;
  solution:      BiText;
  category:      "character" | "secret" | "relic";
}

// ─── Characters ───────────────────────────────────────────────────────────────

export const sts2Characters: Sts2Item[] = [
  {
    id: "char-ironclad",
    category: "character",
    title:         { fr: "L'Ironclad",  en: "The Ironclad" },
    description:   { fr: "Classe de base, spécialisée dans la force brute et la mécanique d'épuisement des cartes.",
                     en: "Base class, specializing in brute strength and card exhaust mechanics." },
    prerequisites: { fr: "Aucun.",      en: "None." },
    howToUnlock:   { fr: "Personnage de départ (disponible dès le lancement).",
                     en: "Starting character (available from launch)." },
    solution:      { fr: "Archétype conseillé : Cherchez à cumuler de la Force avec 'Démonisation' ou jouez sur l'épuisement avec 'Branche Morte'.",
                     en: "Recommended archetype: Stack Strength with 'Demon Form' or play around exhaust with 'Dead Branch'." },
  },
  {
    id: "char-silent",
    category: "character",
    title:         { fr: "La Silent",   en: "The Silent" },
    description:   { fr: "Spécialisée dans les attaques multiples, les poisons mortels et la défausse.",
                     en: "Specializes in multi-attacks, deadly poisons, and discards." },
    prerequisites: { fr: "Terminer une tentative (Victoire ou défaite).",
                     en: "Complete one attempt (win or loss)." },
    howToUnlock:   { fr: "Débloqué après votre première partie avec L'Ironclad.",
                     en: "Unlocked after your first game with The Ironclad." },
    solution:      { fr: "Archétype conseillé : Les decks Poison sont les plus sûrs pour monter en Ascension. Multipliez les 'Catalyseurs'.",
                     en: "Recommended archetype: Poison decks are the safest for climbing Ascension. Stack 'Catalysts'." },
  },
  {
    id: "char-defect",
    category: "character",
    title:         { fr: "Le Defect",   en: "The Defect" },
    description:   { fr: "Gère des orbes élémentaires (Foudre, Glace, Ténèbres) déclenchant des effets passifs.",
                     en: "Manages elemental orbs (Lightning, Frost, Dark) that trigger passive effects." },
    prerequisites: { fr: "Terminer une tentative avec La Silent.",
                     en: "Complete one attempt with The Silent." },
    howToUnlock:   { fr: "Débloqué après votre première partie avec La Silent.",
                     en: "Unlocked after your first game with The Silent." },
    solution:      { fr: "Archétype conseillé : La génération de concentration est vitale. Les orbes de glace couplés à 'Blizzard' offrent une excellente survie.",
                     en: "Recommended archetype: Focus generation is vital. Frost orbs paired with 'Blizzard' offer excellent survivability." },
  },
  {
    id: "char-necrobinder",
    category: "character",
    title:         { fr: "Le Necrobinder", en: "The Necrobinder" },
    description:   { fr: "Invoque le familier Osty pour tanker et utilise la mécanique de 'Doom' pour infliger des dégâts massifs à retardement.",
                     en: "Summons the familiar Osty to tank and uses the 'Doom' mechanic to deal massive delayed damage." },
    prerequisites: { fr: "Terminer une tentative avec le Defect.",
                     en: "Complete one attempt with The Defect." },
    howToUnlock:   { fr: "Débloqué après votre première partie avec Le Defect.",
                     en: "Unlocked after your first game with The Defect." },
    solution:      { fr: "Archétype conseillé : Laissez Osty encaisser les coups pendant que vous accumulez les marqueurs de Doom sur les boss.",
                     en: "Recommended archetype: Let Osty absorb hits while you stack Doom markers on bosses." },
  },
  {
    id: "char-regent",
    category: "character",
    title:         { fr: "Le Régent",   en: "The Regent" },
    description:   { fr: "Manipule le temps et les astres pour repousser la limite des tours et déclencher de puissantes synergies cosmiques.",
                     en: "Manipulates time and stars to push turn limits and trigger powerful cosmic synergies." },
    prerequisites: { fr: "Atteindre l'Acte II avec Le Necrobinder.",
                     en: "Reach Act II with The Necrobinder." },
    howToUnlock:   { fr: "Débloqué en progressant avec Le Necrobinder.",
                     en: "Unlocked by progressing with The Necrobinder." },
    solution:      { fr: "Archétype conseillé : Priorisez les cartes qui accélèrent le cycle stellaire pour déclencher vos pouvoirs passifs plus tôt.",
                     en: "Recommended archetype: Prioritize cards that accelerate the stellar cycle to trigger your passives earlier." },
  },
];

// ─── Secrets ──────────────────────────────────────────────────────────────────

export const sts2Secrets: Sts2Item[] = [
  {
    id: "secret-ghost-merchant",
    category: "secret",
    title:         { fr: "Le Marchand Fantôme",   en: "The Phantom Merchant" },
    description:   { fr: "La boutique cachée qui vend des reliques légendaires en échange de PV Max.",
                     en: "The hidden shop that sells legendary relics in exchange for Max HP." },
    prerequisites: { fr: "Avoir moins de 50 d'Or dans son inventaire.",
                     en: "Have less than 50 Gold in your inventory." },
    howToUnlock:   { fr: "Case Événement '?' à partir du 3ème étage (Acte I).",
                     en: "Event node '?' from floor 3 onwards (Act I)." },
    solution:      { fr: "Choix recommandé : Sacrifiez toujours 10 PV pour la relique du 'Miroir' si elle est disponible, c'est indispensable pour la survie à haut niveau d'Ascension.",
                     en: "Recommended choice: Always sacrifice 10 HP for the 'Mirror' relic if available — it's essential for high Ascension survival." },
  },
  {
    id: "secret-left-eye",
    category: "secret",
    title:         { fr: "L'Oeil Gauche",         en: "The Left Eye" },
    description:   { fr: "Une salle sacrificielle permettant d'obtenir une vision sur les intentions secrètes du Boss final.",
                     en: "A sacrificial room granting insight into the final Boss's hidden intentions." },
    prerequisites: { fr: "Avoir conservé la 'Pierre Étrange' obtenue à l'Acte I sans la vendre.",
                     en: "Keep the 'Strange Stone' obtained in Act I without selling it." },
    howToUnlock:   { fr: "Case Événement '?' apparaissant avant le dernier feu de camp (Acte III).",
                     en: "Event node '?' appearing before the last campfire (Act III)." },
    solution:      { fr: "Ne prenez ce chemin que si vous avez suffisamment de PV (plus de 50%). Le sacrifice exigé est lourd, mais le buff obtenu trivialise le boss final.",
                     en: "Only take this path if you have enough HP (above 50%). The sacrifice is heavy, but the buff trivializes the final boss." },
  },
  {
    id: "secret-corruption-altar",
    category: "secret",
    title:         { fr: "L'Autel de la Corruption", en: "The Corruption Altar" },
    description:   { fr: "Un autel mystique permettant de détruire une relique pour obtenir le buff le plus fort du jeu.",
                     en: "A mystical altar that destroys a relic to grant the strongest buff in the game." },
    prerequisites: { fr: "Aucun (mais fortement conseillé pour les decks Force).",
                     en: "None (but strongly recommended for Strength decks)." },
    howToUnlock:   { fr: "Case Événement '?' (Acte II).",
                     en: "Event node '?' (Act II)." },
    solution:      { fr: "Choix 1 : Perdez 15 PV Max. Choix 2 : Combattez une Élite avec une relique maudite. Prenez toujours le Combat d'Élite si vous jouez l'Ironclad avec un deck agressif.",
                     en: "Choice 1: Lose 15 Max HP. Choice 2: Fight an Elite with a cursed relic. Always take the Elite fight if you're playing Ironclad with an aggressive deck." },
  },
];

// ─── Relic Combos ─────────────────────────────────────────────────────────────

export const sts2Relics: Sts2Item[] = [
  {
    id: "relic-bone-specter",
    category: "relic",
    title:         { fr: "Synergie Urne d'Ossements + Lame de Spectre",
                     en: "Bone Urn + Specter Blade Synergy" },
    description:   { fr: "Le combo de survie absolu (Sustain + Mitigation des dégâts).",
                     en: "The ultimate survival combo (Sustain + Damage mitigation)." },
    prerequisites: { fr: "Posséder les reliques : Urne d'Ossements ET Lame de Spectre.",
                     en: "Own both relics: Bone Urn AND Specter Blade." },
    howToUnlock:   { fr: "S'obtient aléatoirement via les combats d'Élites, les Boss ou le Marchand.",
                     en: "Obtained randomly from Elite fights, Bosses, or the Merchant." },
    solution:      { fr: "MÉCANIQUE : L'Urne vous soigne de 2 PV pour chaque carte Pouvoir jouée. La Lame de Spectre applique l'état Intangible (réduisant les dégâts subis à 1). Vous annulez les dégâts massifs tout en vous soignant.\nATTENTION : Évitez ce combo contre le Boss L'Éveillé (Acte III), qui gagne de la Force à chaque Pouvoir joué.",
                     en: "MECHANIC: The Urn heals 2 HP for each Power card played. Specter Blade applies Intangible (reducing damage taken to 1). You negate massive damage while healing.\nWARNING: Avoid this combo against The Awakened One (Act III), which gains Strength for each Power played." },
  },
  {
    id: "relic-dead-branch-corruption",
    category: "relic",
    title:         { fr: "Synergie Branche Morte + Corruption",
                     en: "Dead Branch + Corruption Synergy" },
    description:   { fr: "La boucle infinie indispensable de L'Ironclad.",
                     en: "The Ironclad's essential infinite loop." },
    prerequisites: { fr: "Posséder la relique 'Branche Morte' et la carte 'Corruption'.",
                     en: "Own the 'Dead Branch' relic and the 'Corruption' card." },
    howToUnlock:   { fr: "S'obtient aléatoirement via les combats d'Élites, les Boss ou le Marchand.",
                     en: "Obtained randomly from Elite fights, Bosses, or the Merchant." },
    solution:      { fr: "MÉCANIQUE : La Branche Morte ajoute une carte aléatoire à votre main chaque fois qu'une carte est Épuisée. La carte 'Corruption' rend toutes vos compétences gratuites mais les épuise après usage. Résultat : chaque compétence jouée = 1 carte gratuite dans votre main. Boucle infinie de valeur.",
                     en: "MECHANIC: Dead Branch adds a random card to your hand every time a card is Exhausted. 'Corruption' makes all Skills cost 0 but Exhausts them on use. Result: every Skill played = 1 free card in your hand. Infinite value loop." },
  },
];

// ─── Totals ───────────────────────────────────────────────────────────────────

export const totalCharacters  = sts2Characters.length;
export const totalSecrets     = sts2Secrets.length;
export const totalRelics      = sts2Relics.length;
export const totalSts2        = totalCharacters + totalSecrets + totalRelics;
