import type { Lang } from "@/lib/i18n";

export type Protagonist = "michael" | "franklin" | "trevor" | "all";

export const ZONES: Record<string, string> = {
  "north-yankton":   "North Yankton",
  "los-santos-centre": "Los Santos Centre",
  "rockford-hills":  "Rockford Hills & Vinewood",
  "vinewood-hills":  "Vinewood Hills",
  "blaine-county":   "Sandy Shores & Désert de Blaine",
  "paleto-bay":      "Paleto Bay",
  "offshore":        "Port & Offshore",
};

export interface StockAlert {
  before: string;
  after:  string;
  ticker: string;
  action: string;
  before_en?: string;
  after_en?:  string;
}

export interface Mission {
  id:          number;
  title:       string;
  title_en?:   string;
  description: string;
  description_en?: string;
  goldMedals:  string[];
  goldMedals_en?: string[];
  startPoint:  string;
  startPoint_en?: string;
  character:   string;
  protagonist: Protagonist;
  zone:        string;
  walkthrough: string[];
  walkthrough_en?: string[];
  reward?:     string;
  reward_en?:  string;
  stockAlert?: StockAlert;
  prerequisites?: string;
  prerequisites_en?: string;
  howToUnlock?: string;
  howToUnlock_en?: string;
}

export interface Act {
  index:    number;
  title:    string;
  title_en: string;
  missions: Mission[];
}

export interface SecondaryMission {
  id:          string;
  title:       string;
  title_en?:   string;
  description: string;
  description_en?: string;
  type:        string;
  character:   string;
  protagonist: Protagonist;
  zone:        string;
  reward:      string;
  reward_en?:  string;
  steps:       string[];
  steps_en?:   string[];
  stockAlert?: StockAlert;
  tip?:        string;
  tip_en?:     string;
}

export interface CollectibleItem {
  id:       string;
  location: string;
  zone:     string;
}

export interface CollectibleCategory {
  id:          string;
  title:       string;
  title_en?:   string;
  description: string;
  description_en?: string;
  reward:      string;
  reward_en?:  string;
  items:       CollectibleItem[];
}

// ─── Helper to pick the right language ───────────────────────────────────────

export function loc(fr: string, en: string | undefined, lang: Lang): string {
  return lang === "en" && en ? en : fr;
}

export function locArr(fr: string[], en: string[] | undefined, lang: Lang): string[] {
  return lang === "en" && en && en.length ? en : fr;
}

// ─── ACT DATA ────────────────────────────────────────────────────────────────

const acts: Act[] = [
  {
    index: 1,
    title: "Acte I — Ludendorff",
    title_en: "Act I — Ludendorff",
    missions: [
      {
        id: 1,
        title: "Prologue",
        title_en: "Prologue",
        description: "En 2004, Michael Townley et Trevor Philips braquent une banque à North Yankton.",
        description_en: "In 2004, Michael Townley and Trevor Philips rob a bank in North Yankton.",
        goldMedals: ["Finir en moins de 7 minutes", "15 tirs en tête minimum", "Ne pas mourir"],
        goldMedals_en: ["Finish in under 7 minutes", "Get 15 headshots minimum", "Don't die"],
        startPoint: "Lancement automatique — North Yankton (2004)",
        startPoint_en: "Automatic launch — North Yankton (2004)",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "north-yankton",
        prerequisites: "Aucun.",
        prerequisites_en: "None.",
        howToUnlock: "Lancement automatique au début du jeu (Ludendorff).",
        howToUnlock_en: "Automatic launch at the start of the game (Ludendorff).",
        walkthrough: [
          "Suivez la cinématique d'introduction",
          "Braquez la banque: Trevor gère les otages, Michael ouvre le coffre",
          "Visez la tête des gardes (15 kills requis pour la médaille)",
          "Sortez et montez dans le véhicule d'évacuation",
          "Conduisez vers le point de rendez-vous",
          "Atteignez le train en mouvement pour la cinématique"
        ],
        walkthrough_en: [
          "Watch the intro cutscene",
          "Rob the bank: Trevor handles hostages, Michael cracks the safe",
          "Aim for guards' heads (15 headshots required for the medal)",
          "Exit and get into the getaway vehicle",
          "Drive to the rendezvous point",
          "Reach the moving train to trigger the cutscene"
        ],
        reward: "Introduction à l'histoire",
        reward_en: "Story introduction"
      },
      {
        id: 2,
        title: "Franklin et Lamar",
        title_en: "Franklin and Lamar",
        description: "Franklin et Lamar récupèrent deux voitures de sport pour le concessionnaire Simeon.",
        description_en: "Franklin and Lamar repossess two sports cars for dealer Simeon Yetarian.",
        goldMedals: ["Aucun dommage sur le véhicule", "Gagner la course contre Lamar", "Arriver en premier au garage"],
        goldMedals_en: ["No damage to the vehicle", "Win the race against Lamar", "Arrive at the garage first"],
        startPoint: "Lancement automatique après la cinématique",
        startPoint_en: "Automatic launch after the cutscene",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer le Prologue.",
        prerequisites_en: "Complete the Prologue.",
        howToUnlock: "Lancement automatique après la cinématique.",
        howToUnlock_en: "Automatic launch after the cutscene.",
        walkthrough: [
          "Dirigez-vous à l'adresse indiquée et montez dans la 9F Cabrio blanche",
          "Conduisez avec précaution — évitez chaque collision pour la médaille",
          "Rejoignez Lamar à la deuxième voiture",
          "Acceptez la course et prenez les virages en douceur",
          "Garez la voiture dans le marqueur du garage Simeon"
        ],
        walkthrough_en: [
          "Head to the indicated address and get in the white 9F Cabrio",
          "Drive carefully — avoid any collision to keep the medal",
          "Meet up with Lamar at the second car",
          "Accept the race and take corners smoothly",
          "Park the car in Simeon's garage marker"
        ],
        reward: "Réputation auprès de Simeon",
        reward_en: "Reputation with Simeon Yetarian"
      },
      {
        id: 3,
        title: "Saisie",
        title_en: "Repossession",
        description: "Franklin reprend un SUV sur ordre de Simeon pour un client en défaut de paiement.",
        description_en: "Franklin repossesses an SUV on Simeon's orders from a defaulting client.",
        goldMedals: ["Aucun dommage sur le véhicule", "Finir en moins de 5 minutes"],
        goldMedals_en: ["No damage to the vehicle", "Finish in under 5 minutes"],
        startPoint: "Icône S — Concession de Simeon",
        startPoint_en: "S icon — Simeon's dealership",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Franklin et Lamar'.",
        prerequisites_en: "Complete 'Franklin and Lamar'.",
        howToUnlock: "Allez à la concession de Simeon (lettre 'S').",
        howToUnlock_en: "Go to Simeon's dealership ('S' icon).",
        walkthrough: [
          "Allez à la concession de Simeon",
          "Récupérez le SUV depuis le parking du client",
          "Ramenez-le au garage de Simeon sans le moindre dégât",
          "Garez-le dans le marqueur jaune"
        ],
        walkthrough_en: [
          "Go to Simeon's dealership",
          "Pick up the SUV from the client's parking lot",
          "Drive it back to Simeon's garage without any damage",
          "Park it in the yellow marker"
        ]
      },
      {
        id: 4,
        title: "Complications",
        title_en: "Complications",
        description: "Franklin tente une saisie chez un riche propriétaire — et tombe sur Michael.",
        description_en: "Franklin attempts a repossession at a rich man's home — and runs into Michael.",
        goldMedals: ["Tirer au moins 5 tirs en tête", "Finir en moins de 6 minutes", "Ne pas mourir"],
        goldMedals_en: ["Get at least 5 headshots", "Finish in under 6 minutes", "Don't die"],
        startPoint: "Icône S — Concession de Simeon",
        startPoint_en: "S icon — Simeon's dealership",
        character: "Franklin / Michael",
        protagonist: "franklin",
        zone: "rockford-hills",
        prerequisites: "Terminer 'Saisie'.",
        prerequisites_en: "Complete 'Repossession'.",
        howToUnlock: "Allez à la concession de Simeon ('S').",
        howToUnlock_en: "Go to Simeon's dealership ('S').",
        walkthrough: [
          "Allez à la concession de Simeon pour votre prochaine cible",
          "Dirigez-vous à Rockford Hills et entrez dans la propriété",
          "Michael vous surprend dans le garage — poursuite en voiture",
          "Ramenez le véhicule à travers la vitre du concessionnaire"
        ],
        walkthrough_en: [
          "Go to Simeon's dealership for your next target",
          "Drive to Rockford Hills and enter the property",
          "Michael surprises you in the garage — car chase ensues",
          "Drive the vehicle through the dealership window"
        ],
        reward: "Rencontre avec Michael",
        reward_en: "Meeting Michael"
      },
      {
        id: 5,
        title: "Père/Fils",
        title_en: "Father/Son",
        description: "Michael et Franklin sauvent Jimmy, le fils de Michael, pris en otage sur son propre yacht.",
        description_en: "Michael and Franklin save Jimmy, Michael's son, held hostage on his own yacht.",
        goldMedals: ["Aucun dommage sur le yacht", "Finir en moins de 8 minutes"],
        goldMedals_en: ["No damage to the yacht", "Finish in under 8 minutes"],
        startPoint: "Icône M — Maison de Michael",
        startPoint_en: "M icon — Michael's house",
        character: "Michael / Franklin",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Complications'.",
        prerequisites_en: "Complete 'Complications'.",
        howToUnlock: "Allez à la maison de Michael ('M').",
        howToUnlock_en: "Go to Michael's house ('M').",
        walkthrough: [
          "Montez à l'étage rejoindre Jimmy",
          "Conduisez au port et montez dans le petit bateau",
          "Suivez le yacht volé",
          "Rapprochez-vous et grimpez à bord",
          "Neutralisez les voleurs et ramenez le yacht"
        ],
        walkthrough_en: [
          "Go upstairs to find Jimmy",
          "Drive to the port and board the small boat",
          "Follow the stolen yacht",
          "Pull alongside and climb aboard",
          "Take out the thieves and bring the yacht back"
        ],
        reward: "Relation avec Jimmy améliorée",
        reward_en: "Improved relationship with Jimmy"
      },
      {
        id: 6,
        title: "Chop",
        title_en: "Chop",
        description: "Franklin et Lamar poursuivent un membre de gang qui leur doit de l'argent, avec Chop le rottweiler.",
        description_en: "Franklin and Lamar chase down a gang member who owes them money, with Chop the rottweiler.",
        goldMedals: ["Finir en moins de 10 minutes", "Pas de dégâts sur le véhicule"],
        goldMedals_en: ["Finish in under 10 minutes", "No vehicle damage"],
        startPoint: "Icône F — Maison de Franklin",
        startPoint_en: "F icon — Franklin's house",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Saisie'.",
        prerequisites_en: "Complete 'Repossession'.",
        howToUnlock: "Allez voir Lamar près de la maison de Franklin ('F').",
        howToUnlock_en: "Go see Lamar near Franklin's house ('F').",
        walkthrough: [
          "Retrouvez Lamar avec Chop",
          "Poursuivez le fuyard à travers les rails",
          "Utilisez Chop pour le pister",
          "Attrapez-le et ramenez-le"
        ],
        walkthrough_en: [
          "Meet Lamar with Chop",
          "Chase the runner through the train tracks",
          "Use Chop to track him down",
          "Catch him and bring him back"
        ]
      },
      {
        id: 7,
        title: "Conseil conjugal",
        title_en: "Marriage Counseling",
        description: "Michael découvre l'infidélité d'Amanda et détruit la terrasse d'une maison par erreur.",
        description_en: "Michael discovers Amanda's infidelity and accidentally destroys a house's deck.",
        goldMedals: ["Finir en moins de 5 minutes 30", "Ne pas mourir"],
        goldMedals_en: ["Finish in under 5:30", "Don't die"],
        startPoint: "Icône M — Maison de Michael",
        startPoint_en: "M icon — Michael's house",
        character: "Michael / Franklin",
        protagonist: "michael",
        zone: "rockford-hills",
        prerequisites: "Terminer 'Père/Fils'.",
        prerequisites_en: "Complete 'Father/Son'.",
        howToUnlock: "Allez à la maison de Michael ('M').",
        howToUnlock_en: "Go to Michael's house ('M').",
        walkthrough: [
          "Découvrez Amanda avec l'entraîneur de tennis",
          "Poursuivez le fuyard en voiture",
          "Attachez le câble à la terrasse",
          "Tirez avec le camion pour arracher la terrasse",
          "Échappez aux Vagos furieux qui vous poursuivent"
        ],
        walkthrough_en: [
          "Discover Amanda with the tennis coach",
          "Chase the runner by car",
          "Attach the cable to the deck",
          "Pull with the truck to rip the deck off",
          "Escape the angry Vagos chasing you"
        ]
      },
      {
        id: 8,
        title: "La petite fille à son papa",
        title_en: "Daddy's Little Girl",
        description: "Michael emmène Jimmy faire du vélo et du jet-ski pour renouer le lien père-fils.",
        description_en: "Michael takes Jimmy biking and jet-skiing to rebuild their father-son bond.",
        goldMedals: ["Battre Jimmy à vélo", "Battre Jimmy en jet-ski"],
        goldMedals_en: ["Beat Jimmy cycling", "Beat Jimmy jet-skiing"],
        startPoint: "Icône M — Maison de Michael",
        startPoint_en: "M icon — Michael's house",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Père/Fils'.",
        prerequisites_en: "Complete 'Father/Son'.",
        howToUnlock: "Allez à la maison de Michael ('M').",
        howToUnlock_en: "Go to Michael's house ('M').",
        walkthrough: [
          "Montez sur le vélo et battez Jimmy à la plage",
          "Montez sur le jet-ski",
          "Gagnez la course en jet-ski contre Jimmy"
        ],
        walkthrough_en: [
          "Get on the bike and beat Jimmy to the beach",
          "Get on the jet ski",
          "Win the jet-ski race against Jimmy"
        ]
      },
      {
        id: 9,
        title: "Demande d'ami",
        title_en: "Friend Request",
        description: "Michael aide Lester à infiltrer le siège de LifeInvader pour implanter un mouchard explosif.",
        description_en: "Michael helps Lester infiltrate the LifeInvader HQ to plant an explosive bug.",
        goldMedals: ["Finir en moins de 8 minutes 30", "Aucune alerte déclenchée"],
        goldMedals_en: ["Finish in under 8:30", "No alerts triggered"],
        startPoint: "Icône L — Lester, Murrieta Heights",
        startPoint_en: "L icon — Lester, Murrieta Heights",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Conseil conjugal' et 'La petite fille à son papa'.",
        prerequisites_en: "Complete 'Marriage Counseling' and 'Daddy's Little Girl'.",
        howToUnlock: "Allez voir Lester ('L') à Murrieta Heights.",
        howToUnlock_en: "Go see Lester ('L') at Murrieta Heights.",
        walkthrough: [
          "Rendez-vous chez Lester pour le briefing",
          "Allez au siège de LifeInvader déguisé en informaticien",
          "Trouvez le prototype de téléphone dans le bâtiment",
          "Implantez le dispositif",
          "Sortez et déclenchez l'explosion à distance pendant la keynote"
        ],
        walkthrough_en: [
          "Go to Lester's place for the briefing",
          "Go to LifeInvader HQ disguised as IT staff",
          "Find the prototype phone in the building",
          "Plant the device",
          "Exit and trigger the explosion remotely during the keynote"
        ],
        reward: "Alliance avec Lester",
        reward_en: "Alliance with Lester"
      }
    ]
  },
  {
    index: 2,
    title: "Acte II — Le Casse de la Bijouterie",
    title_en: "Act II — The Jewel Store Job",
    missions: [
      {
        id: 10,
        title: "Repérage de la bijouterie",
        title_en: "Casing the Jewel Store",
        description: "Michael et Lester repèrent la bijouterie Vangelico pour préparer le braquage.",
        description_en: "Michael and Lester case the Vangelico jewelry store to plan the heist.",
        goldMedals: ["Finir en moins de 3 minutes", "Prendre toutes les photos"],
        goldMedals_en: ["Finish in under 3 minutes", "Take all photos"],
        startPoint: "Icône L — Usine de confection de Lester",
        startPoint_en: "L icon — Lester's garment factory",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Demande d'ami'.",
        prerequisites_en: "Complete 'Friend Request'.",
        howToUnlock: "Allez à l'usine de confection de Lester ('L').",
        howToUnlock_en: "Go to Lester's garment factory ('L').",
        walkthrough: [
          "Rendez-vous chez Lester",
          "Allez à la bijouterie Vangelico",
          "Prenez des photos de la ventilation, de la porte et de l'alarme",
          "Retournez chez Lester pour choisir l'approche"
        ],
        walkthrough_en: [
          "Go to Lester's place",
          "Go to the Vangelico jewelry store",
          "Take photos of the ventilation, door, and alarm system",
          "Return to Lester to choose the approach"
        ]
      },
      {
        id: 11,
        title: "Fusils d'assaut",
        title_en: "Carbine Rifles",
        description: "Volez un fourgon tactique LSPD pour récupérer des fusils d'assaut.",
        description_en: "Steal an LSPD tactical van to acquire carbine rifles.",
        goldMedals: ["Finir sans étoiles de police", "Pas de dégât au fourgon"],
        goldMedals_en: ["Finish without a wanted level", "No damage to the van"],
        startPoint: "Fourgon LSPD en mouvement",
        startPoint_en: "LSPD van in motion",
        character: "Michael / Franklin",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Repérage de la bijouterie'.",
        prerequisites_en: "Complete 'Casing the Jewel Store'.",
        howToUnlock: "Volez le fourgon tactique du LSPD en mouvement.",
        howToUnlock_en: "Steal the LSPD tactical van in motion.",
        walkthrough: [
          "Trouvez le fourgon LSPD en patrouille",
          "Interceptez-le sans être repéré",
          "Conduisez-le à l'entrepôt de préparation"
        ],
        walkthrough_en: [
          "Find the LSPD van on patrol",
          "Intercept it without being spotted",
          "Drive it to the preparation warehouse"
        ]
      },
      {
        id: 12,
        title: "Équipement Bugstars",
        title_en: "Bugstars Equipment",
        description: "Volez le fourgon Bugstars à l'entrepôt sur le port.",
        description_en: "Steal the Bugstars van from the warehouse at the port.",
        goldMedals: ["Finir sans être repéré"],
        goldMedals_en: ["Finish without being spotted"],
        startPoint: "Entrepôt sur le port",
        startPoint_en: "Warehouse at the port",
        character: "Michael / Franklin",
        protagonist: "all",
        zone: "offshore",
        prerequisites: "Terminer 'Repérage de la bijouterie'.",
        prerequisites_en: "Complete 'Casing the Jewel Store'.",
        howToUnlock: "Volez le fourgon Bugstars à l'entrepôt sur le port.",
        howToUnlock_en: "Steal the Bugstars van from the warehouse at the port.",
        walkthrough: [
          "Allez à l'entrepôt au port",
          "Neutralisez le gardien",
          "Volez le fourgon Bugstars",
          "Ramenez-le au lieu de stockage"
        ],
        walkthrough_en: [
          "Go to the warehouse at the port",
          "Neutralize the guard",
          "Steal the Bugstars van",
          "Bring it to the storage location"
        ]
      },
      {
        id: 13,
        title: "Grenades BZ",
        title_en: "BZ Gas Grenades",
        description: "Volez le fourgon Humane Labs contenant les grenades au gaz BZ.",
        description_en: "Steal the Humane Labs van containing the BZ gas grenades.",
        goldMedals: ["Finir en moins de 5 minutes", "Pas de dégât au fourgon"],
        goldMedals_en: ["Finish in under 5 minutes", "No damage to the van"],
        startPoint: "Fourgon Humane Labs en mouvement",
        startPoint_en: "Humane Labs van in motion",
        character: "Michael / Franklin",
        protagonist: "all",
        zone: "blaine-county",
        prerequisites: "Terminer 'Repérage de la bijouterie'.",
        prerequisites_en: "Complete 'Casing the Jewel Store'.",
        howToUnlock: "Volez le fourgon Humane Labs en mouvement.",
        howToUnlock_en: "Steal the Humane Labs van in motion.",
        walkthrough: [
          "Localisez le fourgon Humane Labs sur la route",
          "Interceptez-le et forcez-le à s'arrêter",
          "Neutralisez le conducteur",
          "Ramenez le fourgon au point de rendez-vous"
        ],
        walkthrough_en: [
          "Locate the Humane Labs van on the road",
          "Intercept it and force it to stop",
          "Neutralize the driver",
          "Bring the van to the meeting point"
        ]
      },
      {
        id: 14,
        title: "Le Casse de la bijouterie",
        title_en: "The Jewel Store Job",
        description: "Premier grand braquage — la bijouterie Vangelico au cœur de Los Santos.",
        description_en: "First major heist — the Vangelico jewelry store in downtown Los Santos.",
        goldMedals: ["Finir en moins de 10 min", "Aucun civil blessé", "Tous les bijoux volés", "Étoiles effacées en moins de 2 min"],
        goldMedals_en: ["Finish in under 10 min", "No civilians injured", "All jewelry stolen", "Lose wanted level within 2 min"],
        startPoint: "Icône H — Usine de confection de Lester",
        startPoint_en: "H icon — Lester's garment factory",
        character: "Michael / Franklin",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer les missions de préparation choisies.",
        prerequisites_en: "Complete the chosen preparation missions.",
        howToUnlock: "Allez à l'usine de confection de Lester ('H').",
        howToUnlock_en: "Go to Lester's garment factory ('H').",
        walkthrough: [
          "Choisissez l'approche: Smart (gaz) ou Loud (armes)",
          "Approche Smart: Franklin pose le gaz, Michael casse les vitrines",
          "Ramassez chaque bijou dans le temps imparti",
          "Fuyez par les égouts en moto",
          "Effacez les étoiles en changeant de tenue"
        ],
        walkthrough_en: [
          "Choose your approach: Smart (gas) or Loud (weapons)",
          "Smart approach: Franklin sets the gas, Michael smashes the cases",
          "Collect every jewel within the time limit",
          "Escape through the sewers on motorcycles",
          "Lose your wanted level by changing clothes"
        ],
        reward: "Premier gros gain",
        reward_en: "First major payout"
      }
    ]
  },
  {
    index: 3,
    title: "Acte III — Trevor entre en scène",
    title_en: "Act III — Enter Trevor",
    missions: [
      {
        id: 15,
        title: "Mr. Philips",
        title_en: "Mr. Philips",
        description: "Trevor apprend que Michael est vivant et règle ses comptes avec les Lost MC.",
        description_en: "Trevor learns Michael is alive and settles scores with the Lost MC.",
        goldMedals: ["Finir en moins de 12 min", "5 Lost MC tués minimum", "3 véhicules détruits"],
        goldMedals_en: ["Finish in under 12 min", "Kill 5 Lost MC minimum", "Destroy 3 vehicles"],
        startPoint: "Lancement automatique",
        startPoint_en: "Automatic launch",
        character: "Trevor",
        protagonist: "trevor",
        zone: "blaine-county",
        prerequisites: "Terminer 'Le Casse de la bijouterie'.",
        prerequisites_en: "Complete 'The Jewel Store Job'.",
        howToUnlock: "Lancement automatique.",
        howToUnlock_en: "Automatic launch.",
        walkthrough: [
          "Trevor voit le braquage aux infos et reconnaît Michael",
          "Affrontez Johnny Klebitz et les Lost MC",
          "Éliminez au moins 5 bikers et détruisez 3 véhicules",
          "Achevez Johnny pour finir la mission"
        ],
        walkthrough_en: [
          "Trevor sees the heist on the news and recognizes Michael",
          "Confront Johnny Klebitz and the Lost MC",
          "Eliminate at least 5 bikers and destroy 3 vehicles",
          "Finish off Johnny to complete the mission"
        ]
      },
      {
        id: 16,
        title: "Casse-couille de Ron",
        title_en: "Nervous Ron",
        description: "Trevor et Ron infiltrent un hangar des Lost MC pour voler un avion cargo.",
        description_en: "Trevor and Ron infiltrate a Lost MC hangar to steal a cargo plane.",
        goldMedals: ["Mode silencieux uniquement", "Finir en moins de 12 min 30", "Atterrir avec l'avion sans dégâts"],
        goldMedals_en: ["Silenced weapons only", "Finish in under 12:30", "Land the plane with no damage"],
        startPoint: "Icône T — Caravane de Trevor",
        startPoint_en: "T icon — Trevor's trailer",
        character: "Trevor",
        protagonist: "trevor",
        zone: "blaine-county",
        prerequisites: "Terminer 'Mr. Philips'.",
        prerequisites_en: "Complete 'Mr. Philips'.",
        howToUnlock: "Allez à la caravane de Trevor ('T').",
        howToUnlock_en: "Go to Trevor's trailer ('T').",
        walkthrough: [
          "Rendez-vous avec Ron à la piste d'atterrissage",
          "Approchez le hangar furtivement",
          "Éliminez les gardes avec des armes silencieuses",
          "Montez dans l'avion cargo et décollez",
          "Atterrissez à la piste de McKenzie sans dégâts"
        ],
        walkthrough_en: [
          "Meet Ron at the airstrip",
          "Approach the hangar stealthily",
          "Eliminate guards with silenced weapons",
          "Board the cargo plane and take off",
          "Land at McKenzie airfield without damage"
        ]
      },
      {
        id: 17,
        title: "Trevor Philips Industries",
        title_en: "Trevor Philips Industries",
        description: "Trevor protège son business de meth contre les Triades chinoises.",
        description_en: "Trevor defends his meth operation against a Chinese Triad assault.",
        goldMedals: ["Tous les ennemis éliminés", "Ron protégé à 100%", "Finir en moins de 5 min"],
        goldMedals_en: ["All enemies eliminated", "Ron protected 100%", "Finish in under 5 min"],
        startPoint: "Icône C — Yellow Jack Inn",
        startPoint_en: "C icon — Yellow Jack Inn",
        character: "Trevor",
        protagonist: "trevor",
        zone: "blaine-county",
        prerequisites: "Terminer 'Mr. Philips'.",
        prerequisites_en: "Complete 'Mr. Philips'.",
        howToUnlock: "Allez à la taverne Yellow Jack Inn ('C').",
        howToUnlock_en: "Go to the Yellow Jack Inn ('C').",
        walkthrough: [
          "Rejoignez Chef et Ron au laboratoire",
          "Prenez position sur le toit avec le sniper",
          "Repoussez les vagues d'attaquants Triades",
          "Protégez Ron en priorité",
          "Nettoyez la zone pour terminer"
        ],
        walkthrough_en: [
          "Meet Chef and Ron at the lab",
          "Take position on the roof with the sniper",
          "Repel waves of Triad attackers",
          "Prioritize protecting Ron",
          "Clear the area to finish"
        ]
      },
      {
        id: 18,
        title: "Le labyrinthe de cristal",
        title_en: "Crystal Maze",
        description: "Trevor attaque un labo de meth rival dans le désert pour les Triades.",
        description_en: "Trevor assaults a rival meth lab in the desert for the Triads.",
        goldMedals: ["Finir en moins de 5 min 30", "100% de précision tir", "Ne pas mourir"],
        goldMedals_en: ["Finish in under 5:30", "100% shooting accuracy", "Don't die"],
        startPoint: "Icône C — Yellow Jack Inn (Tao Cheng)",
        startPoint_en: "C icon — Yellow Jack Inn (Tao Cheng)",
        character: "Trevor",
        protagonist: "trevor",
        zone: "blaine-county",
        prerequisites: "Terminer 'Trevor Philips Industries'.",
        prerequisites_en: "Complete 'Trevor Philips Industries'.",
        howToUnlock: "Allez voir Tao Cheng à la taverne ('C').",
        howToUnlock_en: "Go see Tao Cheng at the inn ('C').",
        walkthrough: [
          "Conduisez jusqu'au labo rival dans le désert",
          "Éliminez tous les gardes avec précision",
          "Détruisez l'équipement de meth",
          "Partez avant que les renforts arrivent"
        ],
        walkthrough_en: [
          "Drive to the rival lab in the desert",
          "Eliminate all guards with precision",
          "Destroy the meth equipment",
          "Leave before reinforcements arrive"
        ]
      },
      {
        id: 19,
        title: "Potes pour la vie",
        title_en: "Friends Reunited",
        description: "Trevor retrouve Michael à Los Santos après des années de séparation.",
        description_en: "Trevor reunites with Michael in Los Santos after years apart.",
        goldMedals: ["Finir en moins de 10 min"],
        goldMedals_en: ["Finish in under 10 min"],
        startPoint: "Icône T — Caravane de Trevor",
        startPoint_en: "T icon — Trevor's trailer",
        character: "Trevor",
        protagonist: "trevor",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Le labyrinthe de cristal' et 'Casse-couille de Ron'.",
        prerequisites_en: "Complete 'Crystal Maze' and 'Nervous Ron'.",
        howToUnlock: "Allez à la caravane de Trevor ('T').",
        howToUnlock_en: "Go to Trevor's trailer ('T').",
        walkthrough: [
          "Trevor décide de retrouver Michael",
          "Conduisez jusqu'à Los Santos",
          "Retrouvez Michael chez lui à Rockford Hills",
          "Cinématique de retrouvailles"
        ],
        walkthrough_en: [
          "Trevor decides to find Michael",
          "Drive to Los Santos",
          "Find Michael at his house in Rockford Hills",
          "Reunion cutscene"
        ]
      },
      {
        id: 20,
        title: "Fame or Shame",
        title_en: "Fame or Shame",
        description: "Michael et Trevor sauvent Tracey d'une humiliation sur un plateau TV.",
        description_en: "Michael and Trevor rescue Tracey from humiliation on a TV show set.",
        goldMedals: ["Finir en moins de 7 min", "Ne pas mourir"],
        goldMedals_en: ["Finish in under 7 min", "Don't die"],
        startPoint: "Icône M — Maison de Michael",
        startPoint_en: "M icon — Michael's house",
        character: "Michael / Trevor",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Potes pour la vie'.",
        prerequisites_en: "Complete 'Friends Reunited'.",
        howToUnlock: "Allez à la maison de Michael ('M').",
        howToUnlock_en: "Go to Michael's house ('M').",
        walkthrough: [
          "Découvrez que Tracey est au Maze Bank Arena",
          "Foncez au studio avec Trevor",
          "Intervenez sur le plateau et sauvez Tracey",
          "Poursuite en voiture pour fuir la sécurité",
          "Semez les poursuivants"
        ],
        walkthrough_en: [
          "Discover that Tracey is at the Maze Bank Arena",
          "Rush to the studio with Trevor",
          "Intervene on set and save Tracey",
          "Car chase to escape security",
          "Lose the pursuers"
        ]
      },
      {
        id: 21,
        title: "Mort au combat",
        title_en: "Dead Man Walking",
        description: "Michael infiltre la morgue de l'IAA pour identifier un corps suspect.",
        description_en: "Michael infiltrates the IAA morgue to identify a suspicious body.",
        goldMedals: ["Finir en moins de 8 min", "15 tirs en tête"],
        goldMedals_en: ["Finish in under 8 min", "15 headshots"],
        startPoint: "Icône B — Rendez-vous IAA à l'Observatoire",
        startPoint_en: "B icon — IAA meeting at the Observatory",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Fame or Shame'.",
        prerequisites_en: "Complete 'Fame or Shame'.",
        howToUnlock: "Rendez-vous de l'IAA à l'Observatoire ('B').",
        howToUnlock_en: "IAA meeting at the Observatory ('B').",
        walkthrough: [
          "Rendez-vous à l'Observatoire pour le briefing",
          "Infiltrez la morgue du coroner",
          "Trouvez et examinez le corps",
          "Fuyez quand l'alarme se déclenche",
          "Éliminez les gardes en visant la tête",
          "Échappez-vous par le toit"
        ],
        walkthrough_en: [
          "Go to the Observatory for the briefing",
          "Infiltrate the coroner's morgue",
          "Find and examine the body",
          "Flee when the alarm triggers",
          "Eliminate guards with headshots",
          "Escape via the roof"
        ]
      },
      {
        id: 22,
        title: "Quelqu'un a dit yoga ?",
        title_en: "Did Somebody Say Yoga?",
        description: "Michael fait du yoga avec Amanda, puis vit une expérience hallucinogène.",
        description_en: "Michael does yoga with Amanda, then has a hallucinogenic experience.",
        goldMedals: ["Obtenir un score de yoga de 80+", "Finir en moins de 15 min"],
        goldMedals_en: ["Get a yoga score of 80+", "Finish in under 15 min"],
        startPoint: "Icône M — Maison de Michael",
        startPoint_en: "M icon — Michael's house",
        character: "Michael",
        protagonist: "michael",
        zone: "rockford-hills",
        prerequisites: "Terminer 'Mort au combat'.",
        prerequisites_en: "Complete 'Dead Man Walking'.",
        howToUnlock: "Allez à la maison de Michael ('M').",
        howToUnlock_en: "Go to Michael's house ('M').",
        walkthrough: [
          "Faites la séance de yoga dans le jardin (suivez les QTE)",
          "Jimmy vous drogue",
          "Traversez la séquence hallucinogène dans le ciel",
          "Réveillez-vous en slip dans un endroit aléatoire"
        ],
        walkthrough_en: [
          "Do the yoga session in the garden (follow QTEs)",
          "Jimmy drugs you",
          "Go through the hallucinogenic sky sequence",
          "Wake up in your underwear in a random location"
        ]
      }
    ]
  },
  {
    index: 4,
    title: "Acte IV — Le FIB et les trois hommes",
    title_en: "Act IV — The FIB & Three's Company",
    missions: [
      {
        id: 23,
        title: "Trois hommes et un ticket",
        title_en: "Three's Company",
        description: "Michael, Franklin et Trevor kidnappent un prisonnier du IAA pour le FIB.",
        description_en: "Michael, Franklin, and Trevor kidnap an IAA prisoner for the FIB.",
        goldMedals: ["Finir en moins de 7 min 30", "Éliminer 12 ennemis", "Ne pas mourir"],
        goldMedals_en: ["Finish in under 7:30", "Eliminate 12 enemies", "Don't die"],
        startPoint: "Icône B — Bâtiment FIB centre-ville",
        startPoint_en: "B icon — FIB building downtown",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Quelqu'un a dit yoga ?'.",
        prerequisites_en: "Complete 'Did Somebody Say Yoga?'.",
        howToUnlock: "Bâtiment du FIB au centre-ville ('B').",
        howToUnlock_en: "FIB building downtown ('B').",
        walkthrough: [
          "Michael, Franklin et Trevor se rencontrent sur le toit",
          "Trevor pilote l'hélicoptère",
          "Michael descend en rappel pour récupérer l'otage",
          "Franklin couvre avec le sniper",
          "Fuyez en hélicoptère avec l'otage"
        ],
        walkthrough_en: [
          "Michael, Franklin, and Trevor meet on the roof",
          "Trevor flies the helicopter",
          "Michael rappels down to grab the hostage",
          "Franklin covers with the sniper",
          "Escape by helicopter with the hostage"
        ]
      },
      {
        id: 24,
        title: "Dans les règles de l'art",
        title_en: "By the Book",
        description: "Trevor interroge un suspect pour le FIB pendant que Michael va éliminer la cible.",
        description_en: "Trevor interrogates a suspect for the FIB while Michael goes to eliminate the target.",
        goldMedals: ["Utiliser les 3 outils d'interrogation", "Finir en moins de 11 min"],
        goldMedals_en: ["Use all 3 interrogation tools", "Finish in under 11 min"],
        startPoint: "Icône B — Entrepôt à Banning",
        startPoint_en: "B icon — Warehouse in Banning",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Trois hommes et un ticket'.",
        prerequisites_en: "Complete 'Three's Company'.",
        howToUnlock: "Entrepôt à Banning ('B').",
        howToUnlock_en: "Warehouse in Banning ('B').",
        walkthrough: [
          "Trevor interroge le prisonnier — utilisez les 3 outils",
          "Michael se rend au lieu indiqué",
          "Éliminez la cible désignée",
          "Trevor ramène le prisonnier vivant à l'aéroport"
        ],
        walkthrough_en: [
          "Trevor interrogates the prisoner — use all 3 tools",
          "Michael goes to the indicated location",
          "Eliminate the designated target",
          "Trevor drives the prisoner alive to the airport"
        ]
      },
      {
        id: 25,
        title: "Safari en ville",
        title_en: "Hood Safari",
        description: "Franklin et Trevor achètent de la drogue dans le quartier de Grove Street.",
        description_en: "Franklin and Trevor buy drugs in the Grove Street neighborhood.",
        goldMedals: ["Finir en moins de 7 min", "Éliminer 15 ennemis"],
        goldMedals_en: ["Finish in under 7 min", "Eliminate 15 enemies"],
        startPoint: "Icône F — Maison de Franklin",
        startPoint_en: "F icon — Franklin's house",
        character: "Franklin / Trevor",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Trois hommes et un ticket'.",
        prerequisites_en: "Complete 'Three's Company'.",
        howToUnlock: "Allez à la maison de Franklin ('F').",
        howToUnlock_en: "Go to Franklin's house ('F').",
        walkthrough: [
          "Accompagnez Lamar et Trevor à Grove Street",
          "L'échange tourne mal — fusillade",
          "Éliminez les Ballas (15 minimum)",
          "Fuyez par les canaux",
          "Échappez aux flics en jet-ski"
        ],
        walkthrough_en: [
          "Accompany Lamar and Trevor to Grove Street",
          "The deal goes wrong — shootout",
          "Eliminate the Ballas (15 minimum)",
          "Escape through the canals",
          "Lose the cops on jet skis"
        ]
      },
      {
        id: 26,
        title: "Repérage au port",
        title_en: "Scouting the Port",
        description: "Trevor repère le port de Los Santos pour préparer le coup Merryweather.",
        description_en: "Trevor scouts the Port of Los Santos to plan the Merryweather heist.",
        goldMedals: ["Finir en moins de 20 min", "Toutes les photos prises"],
        goldMedals_en: ["Finish in under 20 min", "All photos taken"],
        startPoint: "Icône F — Appartement de Floyd, Vespucci",
        startPoint_en: "F icon — Floyd's apartment, Vespucci",
        character: "Trevor",
        protagonist: "trevor",
        zone: "offshore",
        prerequisites: "Terminer 'Trois hommes et un ticket'.",
        prerequisites_en: "Complete 'Three's Company'.",
        howToUnlock: "Appartement de Floyd à Vespucci Beach ('F').",
        howToUnlock_en: "Floyd's apartment at Vespucci Beach ('F').",
        walkthrough: [
          "Habillez-vous en docker",
          "Allez au port et prenez le travail de grutier",
          "Utilisez la grue pour photographier les points stratégiques",
          "Retournez chez Floyd avec les informations"
        ],
        walkthrough_en: [
          "Dress as a dockworker",
          "Go to the port and take the crane operator job",
          "Use the crane to photograph strategic points",
          "Return to Floyd's with the intel"
        ]
      },
      {
        id: 27,
        title: "Mini-sous-marin",
        title_en: "Minisub",
        description: "Volez un mini-sous-marin pour préparer le coup Merryweather.",
        description_en: "Steal a minisub to prepare the Merryweather heist.",
        goldMedals: ["Finir en moins de 8 min 30", "Pas de dégâts au sous-marin"],
        goldMedals_en: ["Finish in under 8:30", "No damage to the sub"],
        startPoint: "Icône Hs — Port de Los Santos",
        startPoint_en: "Hs icon — Port of Los Santos",
        character: "Trevor",
        protagonist: "trevor",
        zone: "offshore",
        prerequisites: "Terminer 'Repérage au port'.",
        prerequisites_en: "Complete 'Scouting the Port'.",
        howToUnlock: "Volez le sous-marin au port de Los Santos ('Hs').",
        howToUnlock_en: "Steal the submarine at the Port of Los Santos ('Hs').",
        walkthrough: [
          "Allez au port de nuit",
          "Neutralisez les gardes",
          "Montez dans le mini-sous-marin",
          "Naviguez-le jusqu'au point de stockage"
        ],
        walkthrough_en: [
          "Go to the port at night",
          "Neutralize the guards",
          "Board the minisub",
          "Navigate it to the storage point"
        ]
      },
      {
        id: 28,
        title: "Cargobob",
        title_en: "Cargobob",
        description: "Volez un hélicoptère militaire Cargobob à Fort Zancudo.",
        description_en: "Steal a Cargobob military helicopter from Fort Zancudo.",
        goldMedals: ["Finir en moins de 5 min 30", "Pas d'étoiles en partant"],
        goldMedals_en: ["Finish in under 5:30", "No wanted level on exit"],
        startPoint: "Icône Hs — Fort Zancudo",
        startPoint_en: "Hs icon — Fort Zancudo",
        character: "Trevor",
        protagonist: "trevor",
        zone: "blaine-county",
        prerequisites: "Terminer 'Repérage au port'.",
        prerequisites_en: "Complete 'Scouting the Port'.",
        howToUnlock: "Volez l'hélicoptère militaire à Fort Zancudo ('Hs').",
        howToUnlock_en: "Steal the military helicopter at Fort Zancudo ('Hs').",
        walkthrough: [
          "Infiltrez Fort Zancudo",
          "Trouvez le Cargobob dans le hangar",
          "Montez dedans et décollez rapidement",
          "Fuyez la base sans vous faire abattre"
        ],
        walkthrough_en: [
          "Infiltrate Fort Zancudo",
          "Find the Cargobob in the hangar",
          "Board it and take off quickly",
          "Flee the base without getting shot down"
        ]
      },
      {
        id: 29,
        title: "Le coup de Merryweather",
        title_en: "The Merryweather Heist",
        description: "Le trio vole un appareil militaire secret sur un cargo Merryweather.",
        description_en: "The trio steals a secret military device from a Merryweather cargo ship.",
        goldMedals: ["Finir en moins de 14 min 30", "Éliminer 12 ennemis", "Aucun dégât au sous-marin"],
        goldMedals_en: ["Finish in under 14:30", "Eliminate 12 enemies", "No damage to the sub"],
        startPoint: "Icône H — Appartement de Floyd",
        startPoint_en: "H icon — Floyd's apartment",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "offshore",
        prerequisites: "Terminer les préparations correspondantes.",
        prerequisites_en: "Complete the corresponding preparations.",
        howToUnlock: "Appartement de Floyd ('H').",
        howToUnlock_en: "Floyd's apartment ('H').",
        walkthrough: [
          "Choisissez l'approche: Sous-marin ou Hélicoptère",
          "Sous-marin: plongez sous le cargo et remontez par en dessous",
          "Éliminez les gardes Merryweather sur le pont",
          "Récupérez le prototype",
          "Fuyez avant que les renforts arrivent"
        ],
        walkthrough_en: [
          "Choose the approach: Submarine or Helicopter",
          "Submarine: dive under the cargo ship and surface underneath",
          "Eliminate the Merryweather guards on deck",
          "Retrieve the prototype",
          "Escape before reinforcements arrive"
        ]
      }
    ]
  },
  {
    index: 5,
    title: "Acte V — Blitz Play & Paleto Bay",
    title_en: "Act V — Blitz Play & Paleto Bay",
    missions: [
      {
        id: 30,
        title: "Camion-poubelle",
        title_en: "Trash Truck",
        description: "Volez un camion-poubelle pour préparer le Blitz Play.",
        description_en: "Steal a trash truck to prepare the Blitz Play.",
        goldMedals: ["Finir en moins de 5 min", "Pas de dégâts au camion"],
        goldMedals_en: ["Finish in under 5 min", "No damage to the truck"],
        startPoint: "Icône Hs — Camion-poubelle en circulation",
        startPoint_en: "Hs icon — Trash truck in traffic",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Dans les règles de l'art'.",
        prerequisites_en: "Complete 'By the Book'.",
        howToUnlock: "Volez un camion-poubelle en circulation ('Hs').",
        howToUnlock_en: "Steal a trash truck in traffic ('Hs').",
        walkthrough: [
          "Trouvez un camion-poubelle en route matinale",
          "Interceptez-le et volez-le",
          "Ramenez-le au point de stockage"
        ],
        walkthrough_en: [
          "Find a trash truck on its morning route",
          "Intercept and steal it",
          "Bring it to the storage point"
        ]
      },
      {
        id: 31,
        title: "Bleus de travail",
        title_en: "Boiler Suits",
        description: "Achetez des bleus de travail comme déguisement pour le Blitz Play.",
        description_en: "Buy boiler suits as a disguise for the Blitz Play.",
        goldMedals: ["Finir en moins de 3 min"],
        goldMedals_en: ["Finish in under 3 min"],
        startPoint: "Icône Hs — Ammu-Nation",
        startPoint_en: "Hs icon — Ammu-Nation",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Dans les règles de l'art'.",
        prerequisites_en: "Complete 'By the Book'.",
        howToUnlock: "Achetez les tenues chez Ammu-Nation ('Hs').",
        howToUnlock_en: "Buy the suits at Ammu-Nation ('Hs').",
        walkthrough: [
          "Allez au magasin Ammu-Nation",
          "Achetez 3 combinaisons de travail",
          "Livrez-les au point de stockage"
        ],
        walkthrough_en: [
          "Go to the Ammu-Nation store",
          "Buy 3 boiler suits",
          "Deliver them to the storage point"
        ]
      },
      {
        id: 32,
        title: "Masques",
        title_en: "Masks",
        description: "Achetez des masques pour le braquage Blitz Play.",
        description_en: "Buy masks for the Blitz Play heist.",
        goldMedals: ["Finir en moins de 3 min"],
        goldMedals_en: ["Finish in under 3 min"],
        startPoint: "Icône Hs — Stand de Vespucci Beach",
        startPoint_en: "Hs icon — Vespucci Beach stand",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Dans les règles de l'art'.",
        prerequisites_en: "Complete 'By the Book'.",
        howToUnlock: "Achetez les masques au stand de Vespucci Beach ('Hs').",
        howToUnlock_en: "Buy masks at the Vespucci Beach stand ('Hs').",
        walkthrough: [
          "Allez au stand de masques sur la plage de Vespucci",
          "Achetez 3 masques",
          "Livrez-les au point de stockage"
        ],
        walkthrough_en: [
          "Go to the mask stand at Vespucci Beach",
          "Buy 3 masks",
          "Deliver them to the storage point"
        ]
      },
      {
        id: 33,
        title: "Dépanneuse",
        title_en: "Tow Truck",
        description: "Volez une dépanneuse pour préparer le Blitz Play.",
        description_en: "Steal a tow truck to prepare the Blitz Play.",
        goldMedals: ["Finir en moins de 5 min"],
        goldMedals_en: ["Finish in under 5 min"],
        startPoint: "Icône Hs — Elysian Island",
        startPoint_en: "Hs icon — Elysian Island",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Dans les règles de l'art'.",
        prerequisites_en: "Complete 'By the Book'.",
        howToUnlock: "Volez la dépanneuse à Elysian Island ('Hs').",
        howToUnlock_en: "Steal the tow truck at Elysian Island ('Hs').",
        walkthrough: [
          "Allez à Elysian Island",
          "Trouvez la dépanneuse dans le parking",
          "Volez-la et ramenez-la au stockage"
        ],
        walkthrough_en: [
          "Go to Elysian Island",
          "Find the tow truck in the parking lot",
          "Steal it and bring it to storage"
        ]
      },
      {
        id: 34,
        title: "Mise à sac",
        title_en: "Blitz Play",
        description: "Le trio braque un fourgon blindé en embuscade avec le camion-poubelle.",
        description_en: "The trio ambushes an armored truck using the trash truck as a roadblock.",
        goldMedals: ["Finir en moins de 12 min", "Moins de 40% de dégâts", "Éliminer 18 ennemis"],
        goldMedals_en: ["Finish in under 12 min", "Less than 40% damage", "Eliminate 18 enemies"],
        startPoint: "Icône H — Point de rendez-vous",
        startPoint_en: "H icon — Meeting point",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir fait les préparations du Blitz Play.",
        prerequisites_en: "Complete the Blitz Play preparations.",
        howToUnlock: "Point de rendez-vous ('H').",
        howToUnlock_en: "Meeting point ('H').",
        walkthrough: [
          "Positionnez le camion-poubelle comme barrage",
          "Bloquez le fourgon blindé quand il arrive",
          "Ouvrez-le avec le chalumeau",
          "Défendez la position contre les vagues de police",
          "Fuyez en dépanneuse puis changez de véhicule"
        ],
        walkthrough_en: [
          "Position the trash truck as a roadblock",
          "Block the armored truck when it arrives",
          "Open it with the blowtorch",
          "Defend the position against waves of police",
          "Escape in the tow truck then switch vehicles"
        ]
      },
      {
        id: 35,
        title: "Mr. Richards",
        title_en: "Mr. Richards",
        description: "Michael aide Solomon Richards au studio de cinéma en intimidant un acteur difficile.",
        description_en: "Michael helps Solomon Richards at the movie studio by intimidating a difficult actor.",
        goldMedals: ["Finir en moins de 10 min", "Ne pas mourir"],
        goldMedals_en: ["Finish in under 10 min", "Don't die"],
        startPoint: "Icône S — Studio Richards Majestic",
        startPoint_en: "S icon — Richards Majestic studio",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Mise à sac'.",
        prerequisites_en: "Complete 'Blitz Play'.",
        howToUnlock: "Studio de cinéma Richards Majestic ('S').",
        howToUnlock_en: "Richards Majestic movie studio ('S').",
        walkthrough: [
          "Rendez-vous au studio",
          "Parlez à Solomon Richards",
          "Trouvez l'acteur rebelle Rocco",
          "Intimidez-le et poursuivez-le à travers le studio",
          "Ramenez-le devant Solomon"
        ],
        walkthrough_en: [
          "Go to the movie studio",
          "Talk to Solomon Richards",
          "Find the rebellious actor Rocco",
          "Intimidate him and chase him through the studio",
          "Bring him back to Solomon"
        ]
      },
      {
        id: 36,
        title: "J'ai combattu la loi...",
        title_en: "I Fought the Law...",
        description: "Le FIB demande au trio de voler deux super-voitures pour identifier une cible.",
        description_en: "The FIB asks the trio to steal two supercars to identify a target.",
        goldMedals: ["Finir en moins de 5 min", "Pas de dégâts aux voitures"],
        goldMedals_en: ["Finish in under 5 min", "No damage to the cars"],
        startPoint: "Icône D — Station-service est de LS",
        startPoint_en: "D icon — Gas station east of LS",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Mr. Richards'.",
        prerequisites_en: "Complete 'Mr. Richards'.",
        howToUnlock: "Station-service à l'est de Los Santos ('D').",
        howToUnlock_en: "Gas station east of Los Santos ('D').",
        walkthrough: [
          "Volez les deux supercars sur la route côtière",
          "Faites une course pour identifier le coureur cible",
          "Gagnez la course sans abîmer les véhicules",
          "Livrez les voitures au FIB"
        ],
        walkthrough_en: [
          "Steal both supercars on the coastal road",
          "Race to identify the target racer",
          "Win the race without damaging the vehicles",
          "Deliver the cars to the FIB"
        ]
      },
      {
        id: 37,
        title: "Vue du ciel",
        title_en: "Eye In The Sky",
        description: "Franklin et Trevor utilisent un hélicoptère de police pour surveiller un suspect.",
        description_en: "Franklin and Trevor use a police helicopter to surveil a suspect.",
        goldMedals: ["Finir en moins de 10 min", "Ne pas perdre le suspect"],
        goldMedals_en: ["Finish in under 10 min", "Don't lose the suspect"],
        startPoint: "Icône D — Commissariat de Mission Row",
        startPoint_en: "D icon — Mission Row police station",
        character: "Franklin / Trevor",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'J'ai combattu la loi...'.",
        prerequisites_en: "Complete 'I Fought the Law...'.",
        howToUnlock: "Commissariat de Mission Row ('D').",
        howToUnlock_en: "Mission Row police station ('D').",
        walkthrough: [
          "Volez l'hélicoptère de police",
          "Utilisez la caméra thermique pour suivre le suspect",
          "Guidez Franklin au sol par radio",
          "Ne perdez jamais le suspect de vue",
          "Identifiez-le quand il entre dans le bâtiment"
        ],
        walkthrough_en: [
          "Steal the police helicopter",
          "Use the thermal camera to track the suspect",
          "Guide Franklin on the ground via radio",
          "Never lose sight of the suspect",
          "Identify him when he enters the building"
        ]
      },
      {
        id: 38,
        title: "Assassinat - Hôtel",
        title_en: "The Hotel Assassination",
        description: "Franklin élimine une cible pour Lester — la seule mission d'assassinat obligatoire.",
        description_en: "Franklin eliminates a target for Lester — the only mandatory assassination mission.",
        goldMedals: ["Éliminer la cible en un seul tir", "Finir en moins de 4 min"],
        goldMedals_en: ["Eliminate target in one shot", "Finish in under 4 min"],
        startPoint: "Icône L — Banc sur le front de mer",
        startPoint_en: "L icon — Bench on the waterfront",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Fame or Shame'.",
        prerequisites_en: "Complete 'Fame or Shame'.",
        howToUnlock: "Banc sur le front de mer ('L').",
        howToUnlock_en: "Bench on the waterfront ('L').",
        stockAlert: {
          before: "Investissez TOUT votre argent (les 3 personnages) dans Betta Pharmaceuticals (BET) sur BAWSAQ",
          after: "Vendre BET dès +50% de gain. Puis racheter Bilkinton Research (BIL sur BAWSAQ) — revendez BIL à +80%.",
          before_en: "Invest ALL your money (all 3 characters) in Betta Pharmaceuticals (BET) on BAWSAQ",
          after_en: "Sell BET at +50% gain. Then buy Bilkinton Research (BIL on BAWSAQ) immediately — sell BIL at +80%.",
          ticker: "BET",
          action: "Betta Pharmaceuticals"
        },
        walkthrough: [
          "Parlez à Lester sur le banc",
          "Prenez position devant l'hôtel (toit ou parking)",
          "Attendez que la cible sorte",
          "Éliminez-la d'un tir propre",
          "Quittez la zone sans étoiles"
        ],
        walkthrough_en: [
          "Talk to Lester on the bench",
          "Take position opposite the hotel (rooftop or parking lot)",
          "Wait for the target to exit",
          "Take a clean one-shot kill",
          "Leave the area without a wanted level"
        ]
      },
      {
        id: 39,
        title: "Caida Libre",
        title_en: "Caida Libre",
        description: "Michael et Trevor abattent un avion pour le compte de Martin Madrazo.",
        description_en: "Michael and Trevor shoot down a plane on behalf of Martin Madrazo.",
        goldMedals: ["Finir en moins de 7 min 45", "Éliminer 3 cibles en un seul passage"],
        goldMedals_en: ["Finish in under 7:45", "Eliminate 3 targets in a single pass"],
        startPoint: "Icône Mz — Propriété de Madrazo",
        startPoint_en: "Mz icon — Madrazo's property",
        character: "Michael / Trevor",
        protagonist: "michael",
        zone: "blaine-county",
        prerequisites: "Terminer 'Vue du ciel' et 'Assassinat - Hôtel'.",
        prerequisites_en: "Complete 'Eye In The Sky' and 'The Hotel Assassination'.",
        howToUnlock: "Propriété de Martin Madrazo ('Mz').",
        howToUnlock_en: "Martin Madrazo's property ('Mz').",
        walkthrough: [
          "Rendez-vous chez Madrazo",
          "Prenez le fusil et montez dans l'hélicoptère avec Trevor",
          "Suivez l'avion cible",
          "Tirez sur les moteurs pour le forcer à atterrir",
          "Récupérez le dossier dans l'épave"
        ],
        walkthrough_en: [
          "Go to Madrazo's place",
          "Grab the rifle and board the helicopter with Trevor",
          "Follow the target plane",
          "Shoot the engines to force it down",
          "Retrieve the folder from the wreckage"
        ]
      },
      {
        id: 40,
        title: "En immersion",
        title_en: "Deep Inside",
        description: "Franklin vole une voiture de collection sur un tournage de film pour Devin Weston.",
        description_en: "Franklin steals a collectible car from a movie set for Devin Weston.",
        goldMedals: ["Finir en moins de 10 min", "Aucun dégât à la voiture"],
        goldMedals_en: ["Finish in under 10 min", "No damage to the car"],
        startPoint: "Icône D — Studio Richards Majestic",
        startPoint_en: "D icon — Richards Majestic studio",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Terminer 'Caida Libre'.",
        prerequisites_en: "Complete 'Caida Libre'.",
        howToUnlock: "Studio de cinéma Richards Majestic ('D').",
        howToUnlock_en: "Richards Majestic movie studio ('D').",
        walkthrough: [
          "Allez au studio de cinéma",
          "Repérez la voiture Z-Type sur le plateau",
          "Volez-la pendant le tournage",
          "Fuyez les gardes du studio",
          "Livrez-la au garage de Devin Weston"
        ],
        walkthrough_en: [
          "Go to the movie studio",
          "Spot the Z-Type car on the set",
          "Steal it during filming",
          "Escape the studio guards",
          "Deliver it to Devin Weston's garage"
        ]
      },
      {
        id: 41,
        title: "Turbulence légère",
        title_en: "Minor Turbulence",
        description: "Trevor détourne un avion cargo de Merryweather en plein vol.",
        description_en: "Trevor hijacks a Merryweather cargo plane mid-flight.",
        goldMedals: ["Éliminer 5 ennemis en chute libre", "Finir en moins de 12 min"],
        goldMedals_en: ["Kill 5 enemies during freefall", "Finish in under 12 min"],
        startPoint: "Icône M — Piste de McKenzie Field",
        startPoint_en: "M icon — McKenzie Field airstrip",
        character: "Trevor",
        protagonist: "trevor",
        zone: "blaine-county",
        prerequisites: "Terminer 'Caida Libre'.",
        prerequisites_en: "Complete 'Caida Libre'.",
        howToUnlock: "Piste de McKenzie Field ('M').",
        howToUnlock_en: "McKenzie Field airstrip ('M').",
        walkthrough: [
          "Décollez de McKenzie Field avec votre avion",
          "Rattrapez le cargo Merryweather en altitude",
          "Entrez dans la soute par l'arrière",
          "Neutralisez les gardes à l'intérieur",
          "Prenez le contrôle du cockpit",
          "Parachutez-vous quand les jets de chasse arrivent"
        ],
        walkthrough_en: [
          "Take off from McKenzie Field in your plane",
          "Catch up to the Merryweather cargo plane",
          "Enter the cargo hold from the rear",
          "Neutralize guards inside",
          "Take control of the cockpit",
          "Parachute out when the fighter jets arrive"
        ]
      },
      {
        id: 42,
        title: "Préparation de l'attaque de Paleto",
        title_en: "Paleto Score Setup",
        description: "Michael et Trevor repèrent la banque de Paleto Bay et planifient le braquage.",
        description_en: "Michael and Trevor case the Paleto Bay bank and plan the heist.",
        goldMedals: ["Finir en moins de 5 min"],
        goldMedals_en: ["Finish in under 5 min"],
        startPoint: "Icône B — Labo de meth de Trevor",
        startPoint_en: "B icon — Trevor's meth lab",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "paleto-bay",
        prerequisites: "Terminer 'Turbulence légère'.",
        prerequisites_en: "Complete 'Minor Turbulence'.",
        howToUnlock: "Labo de meth de Trevor ('B').",
        howToUnlock_en: "Trevor's meth lab ('B').",
        walkthrough: [
          "Rendez-vous au labo de Trevor",
          "Conduisez jusqu'à Paleto Bay",
          "Repérez la banque et ses entrées/sorties",
          "Retournez au labo pour finaliser le plan"
        ],
        walkthrough_en: [
          "Go to Trevor's lab",
          "Drive to Paleto Bay",
          "Case the bank and its entry/exit points",
          "Return to the lab to finalize the plan"
        ]
      },
      {
        id: 43,
        title: "Matériel militaire",
        title_en: "Military Hardware",
        description: "Volez des blindages militaires pour le braquage de Paleto Bay.",
        description_en: "Steal military armor for the Paleto Bay heist.",
        goldMedals: ["Finir en moins de 5 min", "Aucune étoile de police"],
        goldMedals_en: ["Finish in under 5 min", "No wanted level"],
        startPoint: "Icône Hs — Convoi militaire",
        startPoint_en: "Hs icon — Military convoy",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "blaine-county",
        prerequisites: "Terminer 'Préparation de l'attaque de Paleto'.",
        prerequisites_en: "Complete 'Paleto Score Setup'.",
        howToUnlock: "Attaquez le convoi militaire de l'armée ('Hs').",
        howToUnlock_en: "Ambush the army's military convoy ('Hs').",
        walkthrough: [
          "Interceptez le convoi militaire",
          "Neutralisez l'escorte",
          "Volez les caisses d'armement",
          "Ramenez-les au stockage"
        ],
        walkthrough_en: [
          "Intercept the military convoy",
          "Neutralize the escort",
          "Steal the weapon crates",
          "Bring them to storage"
        ]
      },
      {
        id: 44,
        title: "Le coup de Paleto Bay",
        title_en: "The Paleto Score",
        description: "Braquage massif de la banque de Paleto Bay — blindage complet contre l'armée.",
        description_en: "Massive Paleto Bay bank heist — full armor against the army.",
        goldMedals: ["Finir en moins de 16 min", "Moins de 30% de dégâts au blindage", "Tout l'argent (8M$)"],
        goldMedals_en: ["Finish in under 16 min", "Less than 30% armor damage", "Full take ($8M)"],
        startPoint: "Icône H — Point de départ Paleto Bay",
        startPoint_en: "H icon — Starting point, Paleto Bay",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "paleto-bay",
        prerequisites: "Terminer 'Matériel militaire'.",
        prerequisites_en: "Complete 'Military Hardware'.",
        howToUnlock: "Point de départ à Paleto Bay ('H').",
        howToUnlock_en: "Starting point at Paleto Bay ('H').",
        walkthrough: [
          "L'équipe entre avec les blindages Jugular équipés",
          "Michael couvre la caissière, Trevor pose les charges",
          "Récupérez tout l'argent",
          "Sortez et affrontez NOOSE + armée — utilisez les RPG",
          "Avancez lentement en formation, le blindage absorbe les balles",
          "Rejoignez le train de marchandises",
          "Dividez les gains"
        ],
        walkthrough_en: [
          "The crew enters with Jugular armor equipped",
          "Michael covers the cashier, Trevor sets the charges",
          "Collect all the money",
          "Exit and face NOOSE + army — use RPGs",
          "Advance slowly in formation — armor absorbs bullets",
          "Board the freight train",
          "Split the earnings"
        ],
        reward: "8M$ (réduit selon les pertes)",
        reward_en: "$8M (reduced based on losses)"
      }
    ]
  },
  {
    index: 6,
    title: "Chapitre 6 : L'Escalade",
    title_en: "Chapter 6: The Escalation",
    missions: [
      {
        id: 45,
        title: "Déraillement",
        title_en: "Derailed",
        description: "Trevor détourne un train blindé depuis sa Sanchez tandis que Michael le couvre en hélicoptère.",
        description_en: "Trevor hijacks an armored train on his Sanchez while Michael provides helicopter cover.",
        goldMedals: ["Temps : Terminer en moins de 11:30", "Vitesse de pointe : Atteindre la vitesse maximale sur la Sanchez", "Meilleur saut : Réussir le saut sur le train du premier coup"],
        goldMedals_en: ["Time: Complete in under 11:30", "Top speed: Reach maximum speed on the Sanchez", "Best jump: Land the train jump on the first try"],
        startPoint: "Mission automatique après le chapitre 5",
        startPoint_en: "Automatic mission after chapter 5",
        character: "Trevor / Michael",
        protagonist: "all",
        zone: "blaine-county",
        prerequisites: "Avoir terminé 'Le coup de Paleto Bay'.",
        prerequisites_en: "Complete 'The Paleto Score'.",
        howToUnlock: "Lancement automatique après le braquage de Paleto Bay.",
        howToUnlock_en: "Automatic launch after the Paleto Bay heist.",
        walkthrough: [
          "Prenez de l'élan sur la colline à droite des voies avec la Sanchez",
          "Alignez bien la moto avec le toit des wagons pour le saut",
          "Réussissez le saut sur le train du premier coup",
          "Passez en Michael dans l'hélicoptère",
          "Utilisez la caméra thermique pour repérer les tireurs d'élite sur le pont",
          "Éliminez-les avant qu'ils n'endommagent l'hélicoptère"
        ],
        walkthrough_en: [
          "Build speed on the hill to the right of the tracks with the Sanchez",
          "Align the bike with the wagon rooftop for the jump",
          "Land the train jump on the first attempt",
          "Switch to Michael in the helicopter",
          "Use thermal camera to spot snipers on the bridge",
          "Eliminate them before they damage the helicopter"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 46,
        title: "Magouilles",
        title_en: "Monkey Business",
        description: "Infiltration furtive d'un complexe chimique puis extraction en hélicoptère avec un conteneur.",
        description_en: "Stealth infiltration of a chemical complex followed by helicopter extraction with a container.",
        goldMedals: ["Tirs à la tête : Tuer 15 ennemis d'un tir à la tête", "Précision : Terminer avec une précision de tir d'au moins 70%", "Infiltration : Ne pas se faire repérer avant d'atteindre le laboratoire", "Temps : Terminer en moins de 16:00"],
        goldMedals_en: ["Headshots: Kill 15 enemies with headshots", "Accuracy: Finish with at least 70% accuracy", "Stealth: Don't get spotted before reaching the lab", "Time: Complete in under 16:00"],
        startPoint: "Point de rendez-vous près du complexe",
        startPoint_en: "Rendezvous point near the complex",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "blaine-county",
        prerequisites: "Avoir terminé 'Déraillement'.",
        prerequisites_en: "Complete 'Derailed'.",
        howToUnlock: "Après la cinématique de briefing.",
        howToUnlock_en: "After the briefing cutscene.",
        walkthrough: [
          "Progressez discrètement à l'intérieur du complexe",
          "Utilisez le pistolet paralysant sur les scientifiques et gardes isolés",
          "Atteignez le laboratoire sans vous faire repérer",
          "Phase de fuite : passez en Trevor dans l'hélicoptère",
          "Stabilisez l'appareil au-dessus du conteneur",
          "Soulevez-le rapidement avec l'électroaimant"
        ],
        walkthrough_en: [
          "Progress stealthily inside the complex",
          "Use the stun gun on isolated scientists and guards",
          "Reach the lab without being spotted",
          "Escape phase: switch to Trevor in the helicopter",
          "Stabilize the chopper above the container",
          "Lift it quickly with the electromagnet"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 47,
        title: "Après l'effort",
        title_en: "Hang Ten",
        description: "Mission narrative au club de strip-tease le Vanilla Unicorn.",
        description_en: "Narrative mission at the Vanilla Unicorn strip club.",
        goldMedals: ["Temps : Terminer en moins de 07:00"],
        goldMedals_en: ["Time: Complete in under 07:00"],
        startPoint: "Appartement de Floyd",
        startPoint_en: "Floyd's apartment",
        character: "Trevor",
        protagonist: "trevor",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Magouilles'.",
        prerequisites_en: "Complete 'Monkey Business'.",
        howToUnlock: "Rendez-vous à l'appartement de Floyd.",
        howToUnlock_en: "Go to Floyd's apartment.",
        walkthrough: [
          "Prenez un véhicule rapide à l'appartement de Floyd",
          "Conduisez prudemment mais rapidement jusqu'au Vanilla Unicorn",
          "Arrivez en moins de 07:00 pour valider l'or"
        ],
        walkthrough_en: [
          "Grab a fast vehicle at Floyd's apartment",
          "Drive carefully but quickly to the Vanilla Unicorn",
          "Arrive in under 07:00 to earn gold"
        ],
        reward: "Le Vanilla Unicorn devient propriété de Trevor",
        reward_en: "The Vanilla Unicorn becomes Trevor's property"
      },
      {
        id: 48,
        title: "Reconnaissance",
        title_en: "Surveying the Score",
        description: "Filature en hélicoptère des camionnettes de la banque et repérage des points d'accès.",
        description_en: "Helicopter tail of the bank vans and access point recon.",
        goldMedals: ["Distance parfaite : Suivre la camionnette sans se faire repérer", "Fouille approfondie : Trouver le trou de chantier en moins de 20 secondes", "Sous le pont : Passer sous le pont pendant la filature en hélicoptère"],
        goldMedals_en: ["Perfect distance: Follow the van without being spotted", "Thorough search: Find the construction hole in under 20 seconds", "Under the bridge: Fly under the bridge during the helicopter tail"],
        startPoint: "Héliport de la mission",
        startPoint_en: "Mission heliport",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Après l'effort'.",
        prerequisites_en: "Complete 'Hang Ten'.",
        howToUnlock: "Cinématique automatique après la prise du Vanilla Unicorn.",
        howToUnlock_en: "Automatic cutscene after taking over the Vanilla Unicorn.",
        walkthrough: [
          "En hélicoptère, gardez une distance constante avec les camions",
          "Passez sous le pont pour la médaille bonus",
          "Repérez le grand trou de chantier à l'arrière du bâtiment bancaire",
          "Validez-le en moins de 20 secondes pour l'objectif chrono"
        ],
        walkthrough_en: [
          "In the helicopter, maintain a constant distance from the vans",
          "Fly under the bridge for the bonus medal",
          "Spot the large construction hole at the back of the bank building",
          "Validate it in under 20 seconds for the time objective"
        ],
        reward: "Débloque les préparatifs du Coup du Siècle",
        reward_en: "Unlocks the Big Score heist prep"
      },
      {
        id: 49,
        title: "Tête d'enterrement",
        title_en: "Bury the Hatchet",
        description: "Michael retourne au cimetière de North Yankton pour une confrontation avec Trevor.",
        description_en: "Michael returns to the North Yankton cemetery for a confrontation with Trevor.",
        goldMedals: ["Tirs à la tête : Tuer 20 ennemis d'un tir à la tête", "Précision : Terminer avec une précision d'au moins 80%", "Temps : Terminer en moins de 11:00"],
        goldMedals_en: ["Headshots: Kill 20 enemies with headshots", "Accuracy: Finish with at least 80% accuracy", "Time: Complete in under 11:00"],
        startPoint: "Maison de Michael",
        startPoint_en: "Michael's house",
        character: "Michael",
        protagonist: "michael",
        zone: "north-yankton",
        prerequisites: "Avoir terminé 'Reconnaissance'.",
        prerequisites_en: "Complete 'Surveying the Score'.",
        howToUnlock: "Icône M à la maison de Michael.",
        howToUnlock_en: "M icon at Michael's house.",
        walkthrough: [
          "Prenez l'avion pour North Yankton",
          "Au cimetière, utilisez la compétence spéciale de Michael",
          "Alignez les tirs à la tête à travers les pierres tombales",
          "Restez à couvert — les ennemis arrivent par vagues",
          "Éliminez les 20 ennemis en visant la tête pour la médaille"
        ],
        walkthrough_en: [
          "Fly to North Yankton",
          "At the cemetery, use Michael's special ability",
          "Line up headshots through the tombstones",
          "Stay in cover — enemies come in waves",
          "Eliminate 20 enemies with headshots for the medal"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 50,
        title: "Convoi dangereux",
        title_en: "Pack Man",
        description: "Franklin et Trevor volent un convoi de transport et échappent à la police en JB 700.",
        description_en: "Franklin and Trevor steal a transport convoy and escape police in the JB 700.",
        goldMedals: ["Tirs à la tête : Éliminer 15 ennemis d'un tir à la tête", "Précision : Terminer avec une précision d'au moins 75%", "Temps : Terminer en moins de 12:00"],
        goldMedals_en: ["Headshots: Kill 15 enemies with headshots", "Accuracy: Finish with at least 75% accuracy", "Time: Complete in under 12:00"],
        startPoint: "Point de rendez-vous autoroute",
        startPoint_en: "Highway rendezvous point",
        character: "Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Tête d'enterrement'.",
        prerequisites_en: "Complete 'Bury the Hatchet'.",
        howToUnlock: "Déclenchement automatique après le retour de North Yankton.",
        howToUnlock_en: "Auto-triggered after returning from North Yankton.",
        walkthrough: [
          "Trevor utilise son lance-grenades sur les voitures de police",
          "Éliminez rapidement les véhicules en approche",
          "Franklin monte sur la JB 700",
          "Utilisez les pointes rétractables et mitrailleuses intégrées",
          "Neutralisez les poursuivants sans gâcher de munitions"
        ],
        walkthrough_en: [
          "Trevor uses his grenade launcher on police cars",
          "Quickly eliminate approaching vehicles",
          "Franklin gets on the JB 700",
          "Use the retractable spikes and built-in machine guns",
          "Neutralize pursuers without wasting ammo"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 51,
        title: "Viande fraîche",
        title_en: "Fresh Meat",
        description: "Franklin doit retrouver et sauver Michael kidnappé dans un abattoir.",
        description_en: "Franklin must find and rescue Michael who's been kidnapped in a slaughterhouse.",
        goldMedals: ["Tirs à la tête : Éliminer 10 ennemis d'un tir à la tête", "Précision : Terminer avec une précision d'au moins 70%", "Temps : Terminer en moins de 11:00", "Santé : Ne pas subir de dégâts lourds"],
        goldMedals_en: ["Headshots: Kill 10 enemies with headshots", "Accuracy: Finish with at least 70% accuracy", "Time: Complete in under 11:00", "Health: Don't take heavy damage"],
        startPoint: "Icône F — Franklin chez lui",
        startPoint_en: "F icon — Franklin's house",
        character: "Franklin / Michael",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Convoi dangereux'.",
        prerequisites_en: "Complete 'Pack Man'.",
        howToUnlock: "Icône F chez Franklin après la cinématique.",
        howToUnlock_en: "F icon at Franklin's house after the cutscene.",
        walkthrough: [
          "Utilisez l'application Trackify sur le téléphone de Franklin",
          "Localisez Michael dans l'abattoir",
          "Infiltrez l'abattoir et éliminez les gardes",
          "Quand vous reprenez le contrôle de Michael suspendu à l'envers",
          "Activez immédiatement sa compétence de bullet-time",
          "Tuez ses agresseurs avant d'être touché"
        ],
        walkthrough_en: [
          "Use the Trackify app on Franklin's phone",
          "Locate Michael in the slaughterhouse",
          "Infiltrate the slaughterhouse and eliminate the guards",
          "When you regain control of Michael hanging upside down",
          "Immediately activate his bullet-time ability",
          "Kill his attackers before taking damage"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 52,
        title: "La ballade de Rocco",
        title_en: "The Ballad of Rocco",
        description: "Michael règle son compte à Rocco au studio de cinéma de Vinewood.",
        description_en: "Michael settles the score with Rocco at the Vinewood film studio.",
        goldMedals: ["Temps : Terminer en moins de 03:00"],
        goldMedals_en: ["Time: Complete in under 03:00"],
        startPoint: "Studio de cinéma — Icône M",
        startPoint_en: "Film studio — M icon",
        character: "Michael",
        protagonist: "michael",
        zone: "rockford-hills",
        prerequisites: "Avoir terminé 'Viande fraîche'.",
        prerequisites_en: "Complete 'Fresh Meat'.",
        howToUnlock: "Icône M au studio de cinéma.",
        howToUnlock_en: "M icon at the film studio.",
        walkthrough: [
          "Montez dans une voiture rapide dès la fin de la cinématique",
          "Poursuivez Rocco dans le quartier de Vinewood",
          "Tuez-le avant qu'il ne quitte le quartier",
          "Fuyez la zone pour perdre l'indice de recherche"
        ],
        walkthrough_en: [
          "Get in a fast car as soon as the cutscene ends",
          "Chase Rocco through the Vinewood area",
          "Kill him before he leaves the neighborhood",
          "Flee the area to lose the wanted level"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 53,
        title: "Nettoyage de bureau",
        title_en: "Cleaning Out the Bureau",
        description: "Michael s'infiltre dans les bureaux du FIB déguisé en agent d'entretien.",
        description_en: "Michael infiltrates the FIB offices disguised as a janitor.",
        goldMedals: ["Inspection : Vérifier toutes les plaques d'immatriculation", "Nettoyage parfait : Nettoyer les sols sans laisser de traces", "Temps : Terminer en moins de 09:00"],
        goldMedals_en: ["Inspection: Check all license plates", "Perfect cleanup: Clean floors without leaving marks", "Time: Complete in under 09:00"],
        startPoint: "Bâtiment du FIB — Centre-ville",
        startPoint_en: "FIB building — Downtown",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'La ballade de Rocco'.",
        prerequisites_en: "Complete 'The Ballad of Rocco'.",
        howToUnlock: "Icône M au bâtiment du FIB.",
        howToUnlock_en: "M icon at the FIB building.",
        walkthrough: [
          "Suivez les consignes de nettoyage du concierge",
          "Ne courez pas dans les couloirs",
          "Évitez d'éveiller les soupçons des agents",
          "Nettoyez les sols proprement",
          "Vérifiez toutes les plaques d'immatriculation",
          "Sortez discrètement"
        ],
        walkthrough_en: [
          "Follow the janitor's cleaning instructions",
          "Don't run in the hallways",
          "Avoid arousing suspicion from agents",
          "Clean the floors properly",
          "Check all license plates",
          "Exit discreetly"
        ],
        reward: "Plans du bâtiment FIB pour le braquage",
        reward_en: "FIB building blueprints for the heist"
      }
    ]
  },
  {
    index: 7,
    title: "Chapitre 7 : Le Coup du Siècle",
    title_en: "Chapter 7: The Big Score",
    missions: [
      {
        id: 54,
        title: "Réunion de famille",
        title_en: "Reuniting the Family",
        description: "Michael réunit sa famille dispersée à travers Los Santos.",
        description_en: "Michael reunites his scattered family across Los Santos.",
        goldMedals: ["Temps : Terminer en moins de 10:30"],
        goldMedals_en: ["Time: Complete in under 10:30"],
        startPoint: "Maison de Michael",
        startPoint_en: "Michael's house",
        character: "Michael",
        protagonist: "michael",
        zone: "rockford-hills",
        prerequisites: "Avoir terminé 'Nettoyage de bureau'.",
        prerequisites_en: "Complete 'Cleaning Out the Bureau'.",
        howToUnlock: "Icône M à la maison.",
        howToUnlock_en: "M icon at the house.",
        walkthrough: [
          "Conduisez aux différents points de rendez-vous",
          "Le cabinet de thérapie, le salon de tatouage et le fast-food",
          "Utilisez des raccourcis dans les ruelles",
          "Ne traînez pas sur la route pour valider l'or"
        ],
        walkthrough_en: [
          "Drive to the various meeting points",
          "The therapy office, tattoo parlor, and fast-food joint",
          "Use shortcuts through alleys",
          "Don't waste time on the road to earn gold"
        ],
        reward: "Famille réunie",
        reward_en: "Family reunited"
      },
      {
        id: 55,
        title: "Plans de l'architecte",
        title_en: "Architect's Plans",
        description: "Récupérez les plans de construction de la Union Depository auprès d'un architecte.",
        description_en: "Retrieve the Union Depository construction plans from an architect.",
        goldMedals: ["Fuite discrète : Quitter le chantier sans alerter les ouvriers ni la sécurité en moins de 45 secondes"],
        goldMedals_en: ["Clean escape: Leave the construction site without alerting workers or security in under 45 seconds"],
        startPoint: "Chantier de construction",
        startPoint_en: "Construction site",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Réunion de famille'.",
        prerequisites_en: "Complete 'Reuniting the Family'.",
        howToUnlock: "Icône F près du chantier.",
        howToUnlock_en: "F icon near the construction site.",
        walkthrough: [
          "Suivez l'architecte sur le chantier de construction",
          "Attendez qu'il s'isole à l'étage",
          "Assommez-le discrètement par-derrière",
          "Récupérez sa mallette",
          "Redescendez par les escaliers sans courir",
          "Quittez la zone en moins de 45 secondes"
        ],
        walkthrough_en: [
          "Follow the architect through the construction site",
          "Wait for him to be alone on the upper floor",
          "Knock him out from behind discreetly",
          "Grab his briefcase",
          "Walk down the stairs without running",
          "Leave the area in under 45 seconds"
        ],
        reward: "Plans de la Union Depository",
        reward_en: "Union Depository blueprints"
      },
      {
        id: 56,
        title: "Démêlés judiciaires",
        title_en: "Legal Trouble",
        description: "Michael poursuit Molly à l'aéroport pour récupérer une bobine de film.",
        description_en: "Michael chases Molly at the airport to recover a film reel.",
        goldMedals: ["Temps : Terminer en moins de 05:30", "Plein gaz : Atteindre la vitesse maximale dans n'importe quel véhicule", "Perte d'indice : Semer les flics en moins de 2 minutes"],
        goldMedals_en: ["Time: Complete in under 05:30", "Flooring it: Reach top speed in any vehicle", "Heat lost: Lose the cops in under 2 minutes"],
        startPoint: "Studio de cinéma",
        startPoint_en: "Film studio",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Plans de l'architecte'.",
        prerequisites_en: "Complete 'Architect's Plans'.",
        howToUnlock: "Icône M au studio.",
        howToUnlock_en: "M icon at the studio.",
        walkthrough: [
          "Foncez à l'aéroport pour intercepter Molly",
          "Après sa mort accidentelle dans le réacteur, récupérez la bobine",
          "Montez dans la voiture de police sur le tarmac",
          "Cachez-vous dans les hangars de l'aéroport",
          "Perdez les étoiles de recherche en moins de 2 minutes"
        ],
        walkthrough_en: [
          "Race to the airport to intercept Molly",
          "After her accidental death in the jet engine, grab the reel",
          "Get in the police car on the tarmac",
          "Hide in the airport hangars",
          "Lose the wanted stars in under 2 minutes"
        ],
        reward: "Bobine de film récupérée",
        reward_en: "Film reel recovered"
      },
      {
        id: 57,
        title: "L'attaque du FIB",
        title_en: "The Bureau Raid",
        description: "Assaut du siège du FIB pour détruire des preuves compromettantes.",
        description_en: "Assault on FIB headquarters to destroy compromising evidence.",
        goldMedals: ["Temps : Terminer en moins de 18:00", "Tirs à la tête : 20 ennemis éliminés d'un tir à la tête", "Précision : Maintenir au moins 70% de précision", "Évacuation : S'échapper en hélicoptère sans subir de dégâts lourds"],
        goldMedals_en: ["Time: Complete in under 18:00", "Headshots: 20 enemies killed with headshots", "Accuracy: Maintain at least 70% accuracy", "Evacuation: Escape by helicopter without taking heavy damage"],
        startPoint: "Point de rendez-vous selon l'approche choisie",
        startPoint_en: "Rendezvous based on chosen approach",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé 'Démêlés judiciaires' et choisi l'approche.",
        prerequisites_en: "Complete 'Legal Trouble' and choose the approach.",
        howToUnlock: "Icône H — choix de l'approche automatique.",
        howToUnlock_en: "H icon — approach choice triggered automatically.",
        walkthrough: [
          "Selon l'approche (airs ou pompiers), infiltrez le bâtiment",
          "Utilisez l'habileté de Michael pour nettoyer les couloirs enfumés",
          "Montez jusqu'à l'étage des preuves",
          "Détruisez les serveurs",
          "Lors de la descente en rappel à l'extérieur",
          "Descendez par grands bonds réguliers pour éviter les tirs d'hélicoptères"
        ],
        walkthrough_en: [
          "Based on approach (rooftop or fire crew), infiltrate the building",
          "Use Michael's ability to clear the smoke-filled corridors",
          "Reach the evidence floor",
          "Destroy the servers",
          "During the exterior rappel descent",
          "Descend in large regular hops to avoid helicopter fire"
        ],
        reward: "Preuves détruites",
        reward_en: "Evidence destroyed"
      },
      {
        id: 58,
        title: "On remballe",
        title_en: "The Wrap Up",
        description: "Combat massif au Kortz Center entre le FIB, l'IAA et Merryweather.",
        description_en: "Massive firefight at the Kortz Center between FIB, IAA, and Merryweather.",
        goldMedals: ["Temps : Terminer en moins de 12:00", "Tirs à la tête : 15 ennemis éliminés d'un tir à la tête", "Chasseur d'hélico : Abattre l'hélicoptère de la section d'assaut"],
        goldMedals_en: ["Time: Complete in under 12:00", "Headshots: 15 enemies killed with headshots", "Helicopter hunter: Shoot down the assault chopper"],
        startPoint: "Kortz Center — Icône mission",
        startPoint_en: "Kortz Center — Mission icon",
        character: "Michael / Trevor",
        protagonist: "all",
        zone: "rockford-hills",
        prerequisites: "Avoir terminé 'L'attaque du FIB'.",
        prerequisites_en: "Complete 'The Bureau Raid'.",
        howToUnlock: "Icône mission au Kortz Center.",
        howToUnlock_en: "Mission icon at the Kortz Center.",
        walkthrough: [
          "Restez à l'abri derrière les piliers du balcon",
          "Survivez au feu croisé entre FIB, IAA et Merryweather",
          "Dès que l'hélicoptère apparaît",
          "Passez sur Trevor avec son fusil lourd ou lance-roquettes",
          "Détruisez l'hélicoptère instantanément",
          "Nettoyez les derniers ennemis et quittez la zone"
        ],
        walkthrough_en: [
          "Stay behind the balcony pillars for cover",
          "Survive the crossfire between FIB, IAA, and Merryweather",
          "As soon as the helicopter appears",
          "Switch to Trevor with his heavy rifle or rocket launcher",
          "Destroy the helicopter instantly",
          "Clean up remaining enemies and leave the area"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 59,
        title: "Lamar est dans la merde",
        title_en: "Lamar Down",
        description: "Les trois protagonistes s'unissent pour sauver Lamar dans une scierie.",
        description_en: "All three protagonists team up to rescue Lamar at a sawmill.",
        goldMedals: ["Temps : Terminer en moins de 13:30", "Tirs à la tête : 18 ennemis éliminés d'un tir à la tête", "Précision : Au moins 70% de précision globale"],
        goldMedals_en: ["Time: Complete in under 13:30", "Headshots: 18 enemies killed with headshots", "Accuracy: At least 70% overall accuracy"],
        startPoint: "Scierie — Blaine County",
        startPoint_en: "Sawmill — Blaine County",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "blaine-county",
        prerequisites: "Avoir terminé 'On remballe'.",
        prerequisites_en: "Complete 'The Wrap Up'.",
        howToUnlock: "Déclenchement automatique après 'On remballe'.",
        howToUnlock_en: "Auto-triggered after 'The Wrap Up'.",
        walkthrough: [
          "Positionnez Trevor sur les hauteurs avec un fusil d'assaut",
          "Michael en sniper de couverture",
          "Franklin au cœur de l'action",
          "Switchez régulièrement pour éliminer les vagues d'ennemis",
          "Sauvez Lamar à l'intérieur de la scierie"
        ],
        walkthrough_en: [
          "Position Trevor on the high ground with an assault rifle",
          "Michael as cover sniper",
          "Franklin in the thick of the action",
          "Switch regularly to handle enemy waves",
          "Rescue Lamar inside the sawmill"
        ],
        reward: "Lamar sauvé",
        reward_en: "Lamar rescued"
      },
      {
        id: 60,
        title: "Pétage de plomb",
        title_en: "Meltdown",
        description: "Michael défend sa maison contre les commandos de Merryweather.",
        description_en: "Michael defends his house against Merryweather commandos.",
        goldMedals: ["Temps : Terminer en moins de 06:30", "Plein gaz : Atteindre la vitesse maximale sur la moto de sport"],
        goldMedals_en: ["Time: Complete in under 06:30", "Flooring it: Reach top speed on the sport bike"],
        startPoint: "Maison de Michael",
        startPoint_en: "Michael's house",
        character: "Michael",
        protagonist: "michael",
        zone: "rockford-hills",
        prerequisites: "Avoir terminé 'Lamar est dans la merde'.",
        prerequisites_en: "Complete 'Lamar Down'.",
        howToUnlock: "Icône M à la maison.",
        howToUnlock_en: "M icon at the house.",
        walkthrough: [
          "Foncez vers la maison de Michael",
          "Lancez des grenades sur les véhicules garés devant l'entrée",
          "Nettoyez la cour instantanément",
          "Sécurisez l'intérieur pièce par pièce",
          "Protégez la famille"
        ],
        walkthrough_en: [
          "Race to Michael's house",
          "Throw grenades at vehicles parked at the entrance",
          "Clear the yard instantly",
          "Secure the interior room by room",
          "Protect the family"
        ],
        reward: "Famille en sécurité",
        reward_en: "Family safe"
      },
      {
        id: 61,
        title: "Difficulté d'être père",
        title_en: "Parenting 101",
        description: "Mission optionnelle : sauver Jimmy d'une situation de chantage.",
        description_en: "Optional mission: save Jimmy from a blackmail situation.",
        goldMedals: ["Sauvetage express : Récupérer Jimmy en moins de 2 minutes"],
        goldMedals_en: ["Quick rescue: Retrieve Jimmy in under 2 minutes"],
        startPoint: "Appel téléphonique de Jimmy",
        startPoint_en: "Phone call from Jimmy",
        character: "Michael",
        protagonist: "michael",
        zone: "los-santos-centre",
        prerequisites: "Mission optionnelle déclenchée par un appel de Jimmy.",
        prerequisites_en: "Optional mission triggered by a phone call from Jimmy.",
        howToUnlock: "Répondez à l'appel de Jimmy.",
        howToUnlock_en: "Answer Jimmy's phone call.",
        walkthrough: [
          "Dès l'appel de Jimmy, localisez-le sur le GPS",
          "Foncez vers le point sans faire d'accident",
          "Éliminez ses maîtres-chanteurs d'une rafale de pistolet-mitrailleur",
          "Ramenez Jimmy en sécurité"
        ],
        walkthrough_en: [
          "As soon as Jimmy calls, locate him on GPS",
          "Race to the point without crashing",
          "Eliminate his blackmailers with a burst from an SMG",
          "Bring Jimmy back to safety"
        ],
        reward: "Progression de l'histoire",
        reward_en: "Story progression"
      },
      {
        id: 62,
        title: "Préparatifs : La Foreuse",
        title_en: "Setup: The Drill",
        description: "Voler une foreuse industrielle pour le braquage final (approche forte).",
        description_en: "Steal an industrial drill for the final heist (obvious approach).",
        goldMedals: ["Vol discret : Voler la foreuse sans jamais déclencher l'alarme du dépôt"],
        goldMedals_en: ["Silent theft: Steal the drill without triggering the depot alarm"],
        startPoint: "Dépôt de chantiers",
        startPoint_en: "Construction depot",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Requis pour l'approche forte du Coup du Siècle.",
        prerequisites_en: "Required for the Big Score's obvious approach.",
        howToUnlock: "Icône de préparatif sur la carte.",
        howToUnlock_en: "Prep icon on the map.",
        walkthrough: [
          "Infiltrez le dépôt de chantiers par l'arrière",
          "Utilisez un pistolet équipé d'un silencieux",
          "Éliminez le gardien près du camion de transport",
          "Montez à bord du camion",
          "Quittez calmement la zone industrielle"
        ],
        walkthrough_en: [
          "Infiltrate the construction depot from the back",
          "Use a silenced pistol",
          "Eliminate the guard near the transport truck",
          "Board the truck",
          "Calmly leave the industrial area"
        ],
        reward: "Foreuse obtenue pour le braquage",
        reward_en: "Drill acquired for the heist"
      },
      {
        id: 63,
        title: "Préparatifs : Les Pointes",
        title_en: "Setup: Stingers",
        description: "Voler un fourgon de police pour l'approche tactique du braquage final.",
        description_en: "Steal a police van for the final heist's subtle approach.",
        goldMedals: ["Infiltration propre : Voler le fourgon de police sans vous faire repérer"],
        goldMedals_en: ["Clean infiltration: Steal the police van without being spotted"],
        startPoint: "Commissariat — arrière-cour",
        startPoint_en: "Police station — back yard",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Requis pour l'approche tactique du Coup du Siècle.",
        prerequisites_en: "Required for the Big Score's subtle approach.",
        howToUnlock: "Icône de préparatif sur la carte.",
        howToUnlock_en: "Prep icon on the map.",
        walkthrough: [
          "Escaladez le mur du fond du commissariat à pied",
          "Le fourgon est garé dans l'arrière-cour",
          "Montez directement dedans",
          "Sortez rapidement avant que les policiers ne vous voient"
        ],
        walkthrough_en: [
          "Climb over the back wall of the police station on foot",
          "The van is parked in the back yard",
          "Get in immediately",
          "Leave quickly before the officers notice"
        ],
        reward: "Fourgon obtenu pour le braquage",
        reward_en: "Van acquired for the heist"
      },
      {
        id: 64,
        title: "Gauntlet",
        title_en: "Gauntlet",
        description: "Récupérer et modifier 3 muscle cars pour la fuite du Coup du Siècle.",
        description_en: "Retrieve and modify 3 muscle cars for the Big Score getaway.",
        goldMedals: ["Livraison parfaite : Livrer les 3 voitures sans la moindre éraflure", "Modification : Dépenser au moins 15 000$ en modifications de fuite sur chaque véhicule"],
        goldMedals_en: ["Perfect delivery: Deliver all 3 cars without a scratch", "Mods: Spend at least $15,000 in getaway mods on each vehicle"],
        startPoint: "Mail de Lester — emplacements des muscle cars",
        startPoint_en: "Lester's email — muscle car locations",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir reçu le mail des emplacements des muscle cars.",
        prerequisites_en: "Receive Lester's email with the muscle car locations.",
        howToUnlock: "Consultez le mail de Lester sur votre téléphone.",
        howToUnlock_en: "Check Lester's email on your phone.",
        walkthrough: [
          "Localisez les 3 Gauntlet dans Los Santos",
          "Conduisez chaque voiture prudemment vers Los Santos Customs",
          "Si vous touchez un trottoir, réparez immédiatement au garage",
          "Dépensez au moins 15 000$ en modifications sur chacune",
          "Livrez les voitures au hangar de dépose sans éraflure"
        ],
        walkthrough_en: [
          "Locate the 3 Gauntlets in Los Santos",
          "Drive each car carefully to Los Santos Customs",
          "If you hit a curb, repair immediately at the garage",
          "Spend at least $15,000 in mods on each one",
          "Deliver the cars to the drop-off hangar scratch-free"
        ],
        reward: "Véhicules de fuite prêts",
        reward_en: "Getaway vehicles ready"
      },
      {
        id: 65,
        title: "Le coup du siècle",
        title_en: "The Big Score",
        description: "Le braquage final de la Union Depository — le plus gros casse de l'histoire de LS.",
        description_en: "The Union Depository final heist — the biggest score in LS history.",
        goldMedals: ["Temps : Terminer en moins de 16:00", "Précision : Au moins 60% de précision au tir", "Butin maximal : Récupérer la totalité des lingots d'or (201 millions $)"],
        goldMedals_en: ["Time: Complete in under 16:00", "Accuracy: At least 60% shooting accuracy", "Maximum take: Collect all gold bars ($201 million)"],
        startPoint: "Icône H — Point de rendez-vous final",
        startPoint_en: "H icon — Final rendezvous",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Tous les préparatifs terminés.",
        prerequisites_en: "All prep missions completed.",
        howToUnlock: "Icône H après les préparatifs.",
        howToUnlock_en: "H icon after all prep work.",
        walkthrough: [
          "Selon l'approche choisie, exécutez le plan",
          "Pour l'approche aérienne : stabilisez l'hélicoptère pour charger les palettes d'or",
          "Pendant la fuite en voitures modifiées dans les tunnels",
          "Utilisez la compétence spéciale de Franklin pour les virages serrés",
          "Négociez les angles droits sans détruire la carrosserie",
          "Rejoignez le point de largage et divisez le butin"
        ],
        walkthrough_en: [
          "Execute the plan based on chosen approach",
          "For the aerial approach: stabilize the helicopter to load gold pallets",
          "During the modified car chase through the tunnels",
          "Use Franklin's special ability for tight turns",
          "Navigate right angles without wrecking the car",
          "Reach the drop point and split the take"
        ],
        reward: "201 millions $ (répartis entre l'équipe)",
        reward_en: "$201 million (split between the crew)"
      }
    ]
  },
  {
    index: 8,
    title: "Fin du jeu",
    title_en: "Endgame",
    missions: [
      {
        id: 66,
        title: "La voix de la raison (Option A)",
        title_en: "Something Sensible (Option A)",
        description: "Franklin choisit de tuer Trevor — la fin tragique.",
        description_en: "Franklin chooses to kill Trevor — the tragic ending.",
        goldMedals: ["Destin tragique : Éliminer Trevor en moins de 06:00"],
        goldMedals_en: ["Tragic fate: Eliminate Trevor in under 06:00"],
        startPoint: "Choix final de Franklin",
        startPoint_en: "Franklin's final choice",
        character: "Franklin / Michael",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Choisir de tuer Trevor lors du choix final de Franklin.",
        prerequisites_en: "Choose to kill Trevor during Franklin's final choice.",
        howToUnlock: "Sélectionnez l'Option A dans le menu de choix.",
        howToUnlock_en: "Select Option A in the choice menu.",
        walkthrough: [
          "Poursuivez Trevor dans la zone industrielle de l'usine d'huile",
          "Attendez que Michael le percute avec sa voiture",
          "Trevor est envoyé dans la citerne d'essence",
          "Tirez une seule balle dans le carburant au sol",
          "Déclenchez la cinématique finale"
        ],
        walkthrough_en: [
          "Chase Trevor into the oil plant industrial zone",
          "Wait for Michael to ram him with his car",
          "Trevor crashes into the fuel tank",
          "Shoot one bullet into the fuel on the ground",
          "Trigger the final cutscene"
        ],
        reward: "Fin A — Trevor est mort",
        reward_en: "Ending A — Trevor is dead"
      },
      {
        id: 67,
        title: "Règlement de comptes (Option B)",
        title_en: "The Time's Come (Option B)",
        description: "Franklin choisit de tuer Michael — la fin amère.",
        description_en: "Franklin chooses to kill Michael — the bitter ending.",
        goldMedals: ["Chute fatale : Éliminer Michael en moins de 07:00"],
        goldMedals_en: ["Fatal fall: Eliminate Michael in under 07:00"],
        startPoint: "Choix final de Franklin",
        startPoint_en: "Franklin's final choice",
        character: "Franklin",
        protagonist: "franklin",
        zone: "los-santos-centre",
        prerequisites: "Choisir de tuer Michael lors du choix final de Franklin.",
        prerequisites_en: "Choose to kill Michael during Franklin's final choice.",
        howToUnlock: "Sélectionnez l'Option B dans le menu de choix.",
        howToUnlock_en: "Select Option B in the choice menu.",
        walkthrough: [
          "Suivez Michael en haut de la tour de la raffinerie",
          "Montez la passerelle jusqu'au sommet",
          "Confrontation verbale au sommet",
          "Complétez le Quick Time Event final",
          "Scellez le destin de Michael"
        ],
        walkthrough_en: [
          "Follow Michael up the refinery tower",
          "Climb the catwalk to the top",
          "Verbal confrontation at the summit",
          "Complete the final Quick Time Event",
          "Seal Michael's fate"
        ],
        reward: "Fin B — Michael est mort",
        reward_en: "Ending B — Michael is dead"
      },
      {
        id: 68,
        title: "La troisième option (Option C)",
        title_en: "The Third Way (Option C)",
        description: "Le choix canonique : sauver tout le monde et éliminer tous les antagonistes.",
        description_en: "The canonical choice: save everyone and eliminate all antagonists.",
        goldMedals: ["Temps : Terminer en moins de 21:30", "Tirs à la tête : 20 ennemis éliminés d'un tir à la tête", "Précision : Au moins 70% de précision", "Épuration totale : Éliminer Haines, Stretch, Wei Cheng et Devin Weston du premier coup"],
        goldMedals_en: ["Time: Complete in under 21:30", "Headshots: 20 enemies killed with headshots", "Accuracy: At least 70% accuracy", "Total cleanup: Eliminate Haines, Stretch, Wei Cheng, and Devin Weston on first try"],
        startPoint: "Choix final de Franklin",
        startPoint_en: "Franklin's final choice",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Le choix canonique : sauver tout le monde.",
        prerequisites_en: "The canonical choice: save everyone.",
        howToUnlock: "Sélectionnez l'Option C (Deathwish) dans le menu de choix.",
        howToUnlock_en: "Select Option C (Deathwish) in the choice menu.",
        walkthrough: [
          "Repoussez Merryweather et le FIB à la fonderie",
          "Répartissez vos forces entre les trois personnages",
          "Trevor au sniper pour Haines sur la grande roue",
          "Michael pour Stretch dans son quartier",
          "Franklin avec une bombe collante sur la voiture de Wei Cheng",
          "Poussez la voiture de Devin Weston du haut de la falaise avec les trois protagonistes"
        ],
        walkthrough_en: [
          "Repel Merryweather and FIB at the foundry",
          "Split your forces between all three characters",
          "Trevor as sniper for Haines on the Ferris wheel",
          "Michael for Stretch in his neighborhood",
          "Franklin with a sticky bomb on Wei Cheng's car",
          "Push Devin Weston's car off the cliff with all three protagonists"
        ],
        reward: "Fin C — Tous les héros survivent",
        reward_en: "Ending C — All heroes survive"
      },
      {
        id: 69,
        title: "Épilogue : Le Grand Score",
        title_en: "Epilogue: The Big Score",
        description: "Les crédits défilent et chaque personnage reçoit sa part finale du braquage.",
        description_en: "Credits roll and each character receives their final heist cut.",
        goldMedals: ["Complétion : Atteindre l'écran de fin et débloquer la répartition finale des gains du braquage"],
        goldMedals_en: ["Completion: Reach the ending screen and unlock the final heist earnings split"],
        startPoint: "Automatique après l'Option C",
        startPoint_en: "Automatic after Option C",
        character: "Michael / Franklin / Trevor",
        protagonist: "all",
        zone: "los-santos-centre",
        prerequisites: "Avoir terminé l'Option C.",
        prerequisites_en: "Complete Option C.",
        howToUnlock: "Cinématique automatique après la fin de l'Option C.",
        howToUnlock_en: "Automatic cutscene after finishing Option C.",
        walkthrough: [
          "Savourez la fin du jeu et les crédits",
          "Chaque personnage reçoit sa part du Coup du Siècle",
          "Environ 25 à 30 millions de dollars selon les braqueurs choisis",
          "Commencez les investissements massifs à la bourse de Los Santos"
        ],
        walkthrough_en: [
          "Enjoy the ending and credits",
          "Each character receives their Big Score cut",
          "Approximately $25-30 million depending on crew choices",
          "Start massive investments on the Los Santos stock market"
        ],
        reward: "25-30M$ par personnage + fin du mode histoire",
        reward_en: "$25-30M per character + story mode complete"
      }
    ]
  }
];

// ─── SECONDARY MISSIONS ──────────────────────────────────────────────────────

export const secondaryMissions: SecondaryMission[] = [
  {
    id: "lester-2",
    title: "Assassination Multi-Cibles",
    title_en: "The Multi Target Assassination",
    description: "Liquidez 4 directeurs d'une société de tabac pour provoquer la chute de leurs concurrents.",
    description_en: "Liquidate 4 tobacco company executives to cause their competitors to rise.",
    type: "Assassinat de Lester",
    character: "Franklin",
    protagonist: "franklin",
    zone: "los-santos-centre",
    reward: "Gains boursiers massifs",
    reward_en: "Massive stock market gains",
    steps: [
      "AVANT la mission : investissez TOUT l'argent des 3 personnages dans l'action [DEB] (Debonaire) sur le site LCN.",
      "Lancez la mission : récupérez une moto rapide, localisez et éliminez les 4 directeurs avant la limite de temps.",
      "Terminez la mission. Allez dormir plusieurs fois avec Franklin. Attendez que l'action DEB atteigne son pic EXACT de 80% (environ 3-4 cycles de sommeil). Vérifiez l'onglet Mon Portefeuille. Vendez TOUT.",
      "Immédiatement après, achetez l'action [RED] (Redwood) qui a chuté à son plus bas (-300%).",
      "Allez dormir plusieurs fois. Attendez que Redwood remonte et fasse un bond de 300% de profit exact. Vendez tout.",
      "ATTENTION : Ne déclenchez aucun événement aléatoire pendant cette période — cela bloquerait les courbes boursières."
    ],
    steps_en: [
      "BEFORE the mission: invest ALL capital from all 3 characters into [DEB] (Debonaire) on the LCN market.",
      "Start the mission: grab a fast motorcycle and eliminate all 4 tobacco executives before the time limit.",
      "Finish the mission. Sleep as Franklin repeatedly until DEB hits its exact 80% peak (approx. 3-4 sleep cycles). Check My Portfolio tab. Sell EVERYTHING.",
      "Immediately reinvest all cash into [RED] (Redwood) which crashed to its floor (-300%).",
      "Sleep repeatedly until Redwood rebounds for a massive 300% profit. Sell everything.",
      "WARNING: Do not trigger any random events during this window or the stock tickers will freeze permanently."
    ],
    stockAlert: {
      before: "🚨 Investissez TOUT l'argent des 3 personnages dans [DEB] (Debonaire) sur LCN AVANT la mission.",
      after: "Vendre DEB exactement à +80% (3-4 nuits de sommeil). Acheter immédiatement [RED] (Redwood). Revendre à +300% exact.",
      before_en: "🚨 Invest ALL capital from all 3 characters into [DEB] (Debonaire) on the LCN market BEFORE the mission.",
      after_en: "Sell DEB at exactly +80% peak (3-4 sleep cycles). Immediately buy [RED] (Redwood). Sell at exactly +300% profit.",
      ticker: "DEB",
      action: "Debonaire Cigarettes"
    },
    tip: "Double investissement : vendez DEB au pic exact de +80%, puis rachetez immédiatement Redwood à son plancher pour +300%.",
    tip_en: "Double investment: sell DEB at the exact +80% peak, then immediately buy Redwood at its floor for +300%."
  },
  {
    id: "lester-3",
    title: "Assassination du Vice",
    title_en: "The Vice Assassination",
    description: "Éliminez le PDG d'une entreprise technologique concurrente de Fruit Computers.",
    description_en: "Eliminate the CEO of a tech company, a competitor to Fruit Computers.",
    type: "Assassinat de Lester",
    character: "Franklin",
    protagonist: "franklin",
    zone: "los-santos-centre",
    reward: "Gains boursiers massifs",
    reward_en: "Massive stock market gains",
    steps: [
      "Equipez-vous d'une bombe proximité",
      "Repérez le bateau de la cible dans le port",
      "Placez la bombe sous le véhicule et attendez la cible",
      "Déclenchez la bombe à distance et fuyez"
    ],
    steps_en: [
      "Equip a proximity mine",
      "Locate the target's boat at the port",
      "Plant the bomb under the vehicle and wait for the target",
      "Detonate remotely and flee"
    ],
    stockAlert: {
      before: "Acheter Fruit Computers (FRT) sur LCN avec tout votre argent",
      after: "Vendre FRT à +50% de gain — surveille le cours deux jours en jeu.",
      before_en: "Buy Fruit Computers (FRT) on LCN with all your money",
      after_en: "Sell FRT at +50% gain — monitor the stock for two in-game days.",
      ticker: "FRT",
      action: "Fruit Computers"
    },
    tip: "Utilisez une bombe de proximité sous le bateau pour un kill propre et une médaille d'or automatique.",
    tip_en: "Use a proximity mine under the boat for a clean kill and an automatic gold medal."
  },
  {
    id: "lester-4",
    title: "Assassination du Bus",
    title_en: "The Bus Assassination",
    description: "Détruisez un bus contenant un dirigeant de Vapid. Pas de buy avant — achetez après.",
    description_en: "Destroy a bus carrying a Vapid executive. No buy before — invest after.",
    type: "Assassinat de Lester",
    character: "Franklin",
    protagonist: "franklin",
    zone: "los-santos-centre",
    reward: "Gains boursiers massifs",
    reward_en: "Massive stock market gains",
    steps: [
      "Récupérez un lance-RPG ou des explosifs",
      "Localisez le bus sur l'itinéraire indiqué",
      "Détruisez le bus",
      "Fuyez rapidement"
    ],
    steps_en: [
      "Grab an RPG launcher or explosives",
      "Locate the bus on the indicated route",
      "Destroy the bus",
      "Flee quickly"
    ],
    stockAlert: {
      before: "Aucun achat avant cette mission",
      after: "Acheter IMMÉDIATEMENT Vapid (VAP sur BAWSAQ) après la mission — vendre à +100%.",
      before_en: "No purchase before this mission",
      after_en: "Buy Vapid (VAP on BAWSAQ) IMMEDIATELY after the mission — sell at +100%.",
      ticker: "VAP",
      action: "Vapid"
    },
    tip: "Exception : N'investissez PAS avant, seulement APRÈS. Achetez VAP immédiatement au plus bas puis revendez à +100%.",
    tip_en: "Exception: Do NOT invest before, only AFTER. Buy VAP immediately at its lowest then sell at +100%."
  },
  {
    id: "lester-5",
    title: "Assassination de la Construction",
    title_en: "The Construction Assassination",
    description: "Éliminez un promoteur immobilier corrompu au sommet de son chantier.",
    description_en: "Eliminate a corrupt real estate developer at the top of his construction site.",
    type: "Assassinat de Lester",
    character: "Franklin",
    protagonist: "franklin",
    zone: "los-santos-centre",
    reward: "Gains boursiers massifs",
    reward_en: "Massive stock market gains",
    steps: [
      "Rendez-vous au chantier indiqué",
      "Grimpez jusqu'au sommet de la grue",
      "Snipez la cible depuis la hauteur",
      "Descendez rapidement et fuyez avant les renforts"
    ],
    steps_en: [
      "Head to the indicated construction site",
      "Climb to the top of the crane",
      "Snipe the target from height",
      "Get down quickly and flee before reinforcements arrive"
    ],
    stockAlert: {
      before: "Acheter GoldCoast Development (GCD) sur LCN avec tout votre argent",
      after: "Vendre GCD à +80% de gain — c'est le meilleur retour sur investissement du jeu.",
      before_en: "Buy GoldCoast Development (GCD) on LCN with all your money",
      after_en: "Sell GCD at +80% gain — the best ROI in the entire game.",
      ticker: "GCD",
      action: "GoldCoast Development"
    },
    tip: "Meilleur ROI du jeu (+80%). Gardez cette mission pour la fin quand vos 3 personnages ont des millions après le braquage final.",
    tip_en: "Best ROI in the game (+80%). Save this mission for last when all 3 characters have millions after the final heist."
  },
  {
    id: "sm-omega",
    title: "Morceaux de Vaisseau (Omega)",
    title_en: "Spaceship Parts (Omega)",
    description: "Omega vous envoie collecter 50 morceaux de vaisseau spatial dans Los Santos.",
    description_en: "Omega sends you to collect 50 spaceship parts scattered across Los Santos.",
    type: "Inconnus & Détraqués",
    character: "Franklin",
    protagonist: "franklin",
    zone: "blaine-county",
    reward: "50 000$ + Buggy Space Docker unique",
    reward_en: "$50,000 + unique Space Docker Buggy",
    steps: [
      "Trouvez Omega dans le désert près de Sandy Shores",
      "Collectez les 50 pièces de vaisseau (voir onglet Collectibles)",
      "Retournez voir Omega une fois toutes les pièces collectées",
      "Regardez la cinématique et récupérez le Space Docker"
    ],
    steps_en: [
      "Find Omega in the desert near Sandy Shores",
      "Collect all 50 spaceship parts (see Collectibles tab)",
      "Return to Omega once all parts are collected",
      "Watch the cutscene and claim the Space Docker"
    ],
    tip: "Commencez dès le début du jeu — les pièces ne sont visibles qu'avec Franklin. Utilisez un hélicoptère pour les pièces en hauteur.",
    tip_en: "Start early — parts are only visible as Franklin. Use a helicopter for elevated pieces."
  },
  {
    id: "sm-beverly",
    title: "Paparazzi (Beverly)",
    title_en: "Paparazzo (Beverly)",
    description: "Beverly Felton engage Franklin pour photographier des célébrités compromises.",
    description_en: "Beverly Felton hires Franklin to photograph celebrities in compromising situations.",
    type: "Inconnus & Détraqués",
    character: "Franklin",
    protagonist: "franklin",
    zone: "vinewood-hills",
    reward: "Argent + véhicule de mission unique",
    reward_en: "Cash + unique mission vehicle",
    steps: [
      "Trouvez Beverly sur le bord de la route à Vinewood Hills",
      "Suivez la cible en moto sans vous faire repérer",
      "Photographiez les moments compromettants depuis une distance discrète",
      "Completez les 5 missions Beverly pour le 100%"
    ],
    steps_en: [
      "Find Beverly on the roadside in Vinewood Hills",
      "Follow the target by motorcycle without being spotted",
      "Photograph compromising moments from a discreet distance",
      "Complete all 5 Beverly missions for 100%"
    ],
    tip: "5 missions au total. Après la 1ère, attendez un appel de Beverly — il faut décrocher pour débloquer la suivante.",
    tip_en: "5 missions total. After the 1st, wait for Beverly's call — you must answer to unlock the next one."
  },
  {
    id: "sm-mary-ann",
    title: "Mary-Ann (Triathlon)",
    title_en: "Mary-Ann (Triathlon)",
    description: "Battez Mary-Ann dans 3 épreuves sportives différentes.",
    description_en: "Beat Mary-Ann in 3 different sporting events.",
    type: "Inconnus & Détraqués",
    character: "Franklin / Michael / Trevor",
    protagonist: "all",
    zone: "los-santos-centre",
    reward: "100% complétion sportive",
    reward_en: "100% sports completion",
    steps: [
      "Trouvez Mary-Ann (icône rose) pour la première course vélo",
      "Battez-la au triathlon sur Vespucci Beach",
      "Battez-la à la course à pied dans le parc",
      "3 victoires = cinématique comique de conclusion"
    ],
    steps_en: [
      "Find Mary-Ann (pink icon) for the first cycling race",
      "Beat her in the triathlon on Vespucci Beach",
      "Beat her in the footrace in the park",
      "3 wins = comical ending cutscene"
    ],
    tip: "Chaque épreuve est avec un personnage différent : vélo (Franklin), triathlon (Michael), course à pied (Trevor). Montez vos stats endurance avant.",
    tip_en: "Each event requires a different character: cycling (Franklin), triathlon (Michael), footrace (Trevor). Max out stamina stat first."
  },
  {
    id: "sm-dom",
    title: "Saut en Chute Libre (Dom)",
    title_en: "Skydiving (Dom)",
    description: "Dom vous convie à des missions extrêmes de saut en parachute.",
    description_en: "Dom invites you to extreme parachute jump missions.",
    type: "Inconnus & Détraqués",
    character: "Franklin",
    protagonist: "franklin",
    zone: "vinewood-hills",
    reward: "Trophée + missions de parachute débloquées",
    reward_en: "Trophy + parachute missions unlocked",
    steps: [
      "Complétez les 12 sauts en parachute requis dans tout Los Santos.",
      "Si l'icône 'D' n'apparaît PAS au barrage de Land Act après les 12 sauts : passez sur Michael, faites une sauvegarde rapide depuis votre téléphone, puis rechargez immédiatement cette sauvegarde.",
      "Revenez sur Franklin — l'icône va forcer son apparition (correctif du softlock).",
      "⚠️ NE LANCEZ JAMAIS cette mission sous la pluie — la météo pluvieuse désactive définitivement le spawn de Dom.",
      "⚠️ BUG CRITIQUE : La mission 'Risque Incalculable' disparaît si vous complétez le dernier saut en parachute pendant qu'une autre quête d'Inconnus & Détraqués est active. Terminez toutes les autres quêtes d'abord."
    ],
    steps_en: [
      "Complete all 12 required parachute jumps across Los Santos.",
      "If the 'D' icon does NOT appear at the Land Act Dam after all 12 jumps: switch to Michael, create a quick-save on your phone, and reload it immediately.",
      "Switch back to Franklin — the icon will override the softlock and force-spawn.",
      "⚠️ NEVER launch this mission during rainy weather — rain permanently disables Dom's spawn flag.",
      "⚠️ CRITICAL BUG: 'Uncalculated Risk' vanishes permanently if you clear the last parachute jump while another Strangers & Freaks sub-quest is still active. Finish all others first."
    ],
    tip: "Complétez les 12 sauts AVANT de chercher Dom. Ne lancez JAMAIS par temps de pluie — bug permanent. Terminez toutes les autres quêtes I&D d'abord.",
    tip_en: "Complete all 12 jumps BEFORE looking for Dom. NEVER start in rainy weather — permanent bug. Finish all other S&F quests first."
  },
  {
    id: "sm-rampage",
    title: "Crises de Rage (Trevor × 5)",
    title_en: "Rampages (Trevor × 5)",
    description: "Trevor pète les plombs à 5 reprises — éliminez le maximum d'ennemis.",
    description_en: "Trevor goes berserk 5 times — eliminate as many enemies as possible.",
    type: "Inconnus & Détraqués",
    character: "Trevor",
    protagonist: "trevor",
    zone: "blaine-county",
    reward: "Succès + fin alternative de Trevor",
    reward_en: "Achievement + Trevor's alternate ending",
    steps: [
      "Trouvez les icônes bleues T sur la carte",
      "Chaque rampage a une vague d'ennemis spécifique",
      "Utilisez grenades et armes lourdes pour maximiser les kills",
      "5 rampages total pour le 100%"
    ],
    steps_en: [
      "Find the blue T icons on the map",
      "Each rampage has a specific enemy wave to eliminate",
      "Use grenades and heavy weapons to maximize kills",
      "5 rampages total for 100%"
    ],
    tip: "Activez la compétence spéciale de Trevor (rage) dès le début de chaque rampage — elle dure assez pour tout nettoyer sans mourir.",
    tip_en: "Activate Trevor's special ability (rage) at the start of each rampage — it lasts long enough to clear everything without dying."
  },
  {
    id: "sm-maude",
    title: "Chasseurs de Primes (Maude)",
    title_en: "Bail Bond Targets (Maude)",
    description: "Maude donne à Trevor 5 cibles à capturer vivantes ou mortes.",
    description_en: "Maude gives Trevor 5 bail bond targets to bring in alive or dead.",
    type: "Inconnus & Détraqués",
    character: "Trevor",
    protagonist: "trevor",
    zone: "blaine-county",
    reward: "1 000$ (vivant) ou 500$ (mort) par cible",
    reward_en: "$1,000 (alive) or $500 (dead) per target",
    steps: [
      "Recevez les e-mails de Maude indiquant chaque cible",
      "Localisez et capturez/éliminez les 5 fugitifs",
      "Ramenez-les vivants pour le bonus",
      "5 cibles complètes = récompense finale de Maude"
    ],
    steps_en: [
      "Receive Maude's emails about each target",
      "Locate and capture/eliminate all 5 fugitives",
      "Bring them in alive for the bonus payout",
      "5 targets complete = Maude's final reward"
    ],
    tip: "Approchez chaque cible à pied, sans arme. Criez-leur dessus (visée sans tirer) pour qu'ils se rendent vivants = double récompense.",
    tip_en: "Approach each target on foot, unarmed. Aim without shooting to make them surrender alive = double payout."
  }
];

// ─── COLLECTIBLES ─────────────────────────────────────────────────────────────

export const collectibleCategories: CollectibleCategory[] = [
  {
    id: "spaceship",
    title: "Pièces de Vaisseau Spatial",
    title_en: "Spaceship Parts",
    description: "50 pièces disseminées partout — souvent en hauteur ou sous l'eau.",
    description_en: "50 parts scattered everywhere — often at height or underwater.",
    reward: "50 000$ + Space Docker (pour Franklin via Omega)",
    reward_en: "$50,000 + Space Docker (Franklin via Omega)",
    items: [
      { id: "sp-01", location: "Sandy Shores Airfield — sur le toit de la tour de contrôle", zone: "blaine-county" },
      { id: "sp-02", location: "Mount Chiliad — sentier à mi-hauteur côté ouest, après le virage en épingle", zone: "blaine-county" },
      { id: "sp-03", location: "Paleto Bay — fond marin près du ponton de pêche (plonger)", zone: "paleto-bay" },
      { id: "sp-04", location: "Maze Bank Arena — toit du parking extérieur niveau 3", zone: "los-santos-centre" },
      { id: "sp-05", location: "Vinewood Hills — jardin de la villa abandonnée sur Baxter Street", zone: "vinewood-hills" },
      { id: "sp-06", location: "LSIA (aéroport) — sur l'aile d'un avion de cargo garé hangar C", zone: "los-santos-centre" },
      { id: "sp-07", location: "Alamo Sea — fond du lac, côté nord-est (sous-marin requis)", zone: "blaine-county" },
      { id: "sp-08", location: "Fort Zancudo — toit du hangar principal (attention aux gardes)", zone: "blaine-county" },
      { id: "sp-09", location: "Del Perro Pier — sous le manège, accessible à marée basse", zone: "los-santos-centre" },
      { id: "sp-10", location: "Grand Senora Desert — entre les deux pylônes d'antenne au nord de la route 68", zone: "blaine-county" },
      { id: "sp-11", location: "Vinewood Park Drive — sommet de la colline derrière la pancarte VINEWOOD", zone: "vinewood-hills" },
      { id: "sp-12", location: "Pacific Ocean — épave sous-marine à l'ouest du port (50m de fond)", zone: "offshore" },
      { id: "sp-13", location: "NOOSE HQ — parking toit, coin nord-ouest", zone: "los-santos-centre" },
      { id: "sp-14", location: "Blaine County Savings Bank — toit en Paleto Bay", zone: "paleto-bay" },
      { id: "sp-15", location: "Raton Canyon — sur un rocher en surplomb au-dessus de la rivière", zone: "blaine-county" }
    ]
  },
  {
    id: "letter",
    title: "Lettres au Vent (Leonora)",
    title_en: "Letter Scraps (Leonora Johnson)",
    description: "50 lettres manuscrites éparpillées — uniquement collectables par Franklin.",
    description_en: "50 handwritten letter scraps scattered around — only collectible by Franklin.",
    reward: "50 000$ + mission bonus Michael débloquée",
    reward_en: "$50,000 + Michael's bonus mission unlocked",
    items: [
      { id: "lt-01", location: "Kortz Center — sur le toit de la villa, bord de la falaise côté mer", zone: "vinewood-hills" },
      { id: "lt-02", location: "Alamo Sea — sous l'ancien ponton de pêche, planches du quai", zone: "blaine-county" },
      { id: "lt-03", location: "Vinewood Hills — derrière la piscine de la villa bleue sur Rockford Drive", zone: "vinewood-hills" },
      { id: "lt-04", location: "Pacific Bluffs — falaise au-dessus de la plage, chemin de randonnée", zone: "los-santos-centre" },
      { id: "lt-05", location: "Chumash — plage, entre deux rochers proéminents au nord", zone: "los-santos-centre" },
      { id: "lt-06", location: "Sandy Shores — toit de la station service sur la Rt68", zone: "blaine-county" },
      { id: "lt-07", location: "Paleto Bay — cimetière, sur une tombe au fond à gauche", zone: "paleto-bay" },
      { id: "lt-08", location: "Rockford Hills — toit du parking Pillbox Medical à 2e niveau", zone: "rockford-hills" },
      { id: "lt-09", location: "Maze Bank Tower — terrasse au 20e étage (hélico ou parachute)", zone: "los-santos-centre" },
      { id: "lt-10", location: "Elysian Island — entre les containers du terminal portuaire bloc E", zone: "offshore" },
      { id: "lt-11", location: "Mirror Park — sur le quai du lac artificiel, bord est", zone: "los-santos-centre" },
      { id: "lt-12", location: "La Mesa — toit de l'entrepôt industriel rouge coin Innocence Blvd", zone: "los-santos-centre" },
      { id: "lt-13", location: "Mount Gordo — sommet, sous la croix de pierre au crépuscule", zone: "blaine-county" },
      { id: "lt-14", location: "Vespucci Canals — sous le pont de la marina, dans les herbes", zone: "los-santos-centre" },
      { id: "lt-15", location: "Grapeseed — silo agricole, plateforme à mi-hauteur de l'échelle est", zone: "blaine-county" }
    ]
  },
  {
    id: "stunt",
    title: "Sauts Uniques",
    title_en: "Stunt Jumps",
    description: "50 rampes ou sauts spectaculaires à compléter parfaitement à travers LS. ⚠️ RÈGLE CACHÉE : Pour valider un saut, les 4 roues doivent toucher le sol en même temps, vous devez atterrir dans la zone invisible du jeu, et aucun pare-choc ne doit heurter le sol à l'impact. Véhicule conseillé : Pegassi Bati 801.",
    description_en: "50 spectacular ramps or jumps to complete perfectly across LS. ⚠️ HIDDEN RULE: For a jump to count, all 4 wheels must land simultaneously, you must touch the game's invisible landing grid, and no bumper can scrape the ground on impact. Recommended vehicle: Pegassi Bati 801.",
    reward: "Trophée 100% (pas de récompense argent directe)",
    reward_en: "100% Trophy (no direct cash reward)",
    items: [
      { id: "sj-01", location: "Del Perro Freeway — rampe en bois sous le pont côté plage", zone: "los-santos-centre" },
      { id: "sj-02", location: "Vinewood Hills — résidence avec tremplin au bord de la falaise", zone: "vinewood-hills" },
      { id: "sj-03", location: "Sandy Shores — dépôt de matériel, rampe inclinée contre l'entrepôt jaune", zone: "blaine-county" },
      { id: "sj-04", location: "Port de LS — rampe de quai entre les deux grues portuaires", zone: "offshore" },
      { id: "sj-05", location: "La Mesa — autoroute I-5, rampe de béton cassé après la sortie 12", zone: "los-santos-centre" },
      { id: "sj-06", location: "Pillbox Hill — escalier de secours du parking, 3e niveau", zone: "los-santos-centre" },
      { id: "sj-07", location: "Elysian Island — entre deux entrepôts industriels, rampe en acier", zone: "offshore" },
      { id: "sj-08", location: "Paleto Bay — descente de montagne, rocher en plateforme naturelle", zone: "paleto-bay" },
      { id: "sj-09", location: "Vespucci Beach — promenade, escalier accès plage transformé en tremplin", zone: "los-santos-centre" },
      { id: "sj-10", location: "Rockford Hills — résidence Stark Street, boîte aux lettres + trottoir", zone: "rockford-hills" },
      { id: "sj-11", location: "LSIA — bretelle d'entrée aéroport, béton surélevé cassé", zone: "los-santos-centre" },
      { id: "sj-12", location: "East LS — pont ferroviaire, passage surplombant l'autoroute", zone: "los-santos-centre" },
      { id: "sj-13", location: "Chumash — bord de falaise, rocher en saut naturel vers l'océan", zone: "los-santos-centre" },
      { id: "sj-14", location: "Cypress Flats — entrepôt chimique, rampe de chargement externe", zone: "los-santos-centre" },
      { id: "sj-15", location: "Grand Senora — dune de sable en forme de rampe, côté route 68 est", zone: "blaine-county" }
    ]
  }
];

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const totalMissions = acts.reduce((sum, act) => sum + act.missions.length, 0);
export const totalSecondary = secondaryMissions.length;
export const totalCollectibleItems = collectibleCategories.reduce((s, c) => s + c.items.length, 0);

export function getActs(): Act[] {
  return acts;
}

export function buildRows(missions: Mission[]): Mission[][] {
  const rows: Mission[][] = [];
  const rowSize = missions.length <= 3 ? 1 : Math.ceil(missions.length / 3);
  for (let i = 0; i < missions.length; i += rowSize) {
    rows.push(missions.slice(i, i + rowSize));
  }
  if (rows.length === 0 && missions.length > 0) {
    rows.push(missions);
  }
  return rows;
}
