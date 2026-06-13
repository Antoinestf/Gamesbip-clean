import type { Lang } from "@/lib/i18n";

export type ActivityCategory = "leisure" | "sport" | "race" | "social" | "secret";

export interface Activity {
  id:           string;
  title:        string;
  title_en?:    string;
  description:  string;
  description_en?: string;
  category:     ActivityCategory;
  zone:         string;
  character?:   string;
  completionTip?: string;
  completionTip_en?: string;
  alertType?:   "item" | "quest";
  alertDescription?: string;
  alertDescription_en?: string;
}

export const activities: Activity[] = [
  {
    id: "act-golf", title: "Golf", title_en: "Golf",
    description: "Jouer 1 partie complète au Los Santos Golf Club",
    description_en: "Play 1 full round at the Los Santos Golf Club",
    category: "sport", zone: "rockford-hills", character: "Tous",
    completionTip: "9 trous suffisent. Visez un score de -1 ou mieux pour la médaille d'or. Utilisez la jauge de vent avant chaque swing.",
    completionTip_en: "9 holes is enough. Aim for -1 or better for the gold medal. Use the wind gauge before each swing.",
  },
  {
    id: "act-tennis", title: "Tennis", title_en: "Tennis",
    description: "Jouer 1 partie de tennis (Michael uniquement dans sa villa)",
    description_en: "Play 1 tennis match (Michael only at his villa)",
    category: "sport", zone: "rockford-hills", character: "Michael",
    completionTip: "Uniquement avec Michael à sa villa. Gagnez un set complet (6 jeux). Le revers lifté est presque imbattable contre l'IA.",
    completionTip_en: "Michael only at his villa. Win a full set (6 games). The topspin backhand is almost unbeatable against the AI.",
  },
  {
    id: "act-darts", title: "Fléchettes", title_en: "Darts",
    description: "Gagner 1 partie de fléchettes dans un bar de LS",
    description_en: "Win 1 game of darts at a LS bar",
    category: "leisure", zone: "los-santos-centre",
    completionTip: "Visez triple 20 en continu. Quand il reste <60, visez le double exact pour fermer. Stabilisez le curseur 2 secondes avant de lancer.",
    completionTip_en: "Aim for triple 20 continuously. When under 60 remaining, aim the exact double to close. Stabilize the cursor 2 seconds before throwing.",
  },
  {
    id: "act-armwrestle", title: "Bras de Fer", title_en: "Arm Wrestling",
    description: "Gagner 1 combat de bras de fer dans le désert",
    description_en: "Win 1 arm wrestling match in the desert",
    category: "sport", zone: "blaine-county",
    completionTip: "Alternez les boutons rapidement SANS rythme constant — le jeu pénalise les patterns répétitifs. Utilisez Trevor pour un bonus de force.",
    completionTip_en: "Alternate buttons quickly WITHOUT a constant rhythm — the game penalizes repetitive patterns. Use Trevor for a strength bonus.",
  },
  {
    id: "act-cinema1", title: "Cinéma — Film 1", title_en: "Cinema — Movie 1",
    description: "Voir un film au cinéma Doppler sur Vinewood Blvd",
    description_en: "Watch a movie at the Doppler Cinema on Vinewood Blvd",
    category: "leisure", zone: "vinewood-hills",
    completionTip: "3 films distincts requis au total. Le cinéma est sur Vinewood Blvd (icône caméra sur la carte). Les films changent à chaque visite.",
    completionTip_en: "3 distinct films required total. The cinema is on Vinewood Blvd (camera icon on map). Movies change with each visit.",
  },
  {
    id: "act-cinema2", title: "Cinéma — Film 2", title_en: "Cinema — Movie 2",
    description: "Voir un 2e film au cinéma (titre différent du premier)",
    description_en: "Watch a 2nd movie (different title from the first)",
    category: "leisure", zone: "vinewood-hills",
    completionTip: "Attendez 6h en jeu entre chaque visite pour avoir un film différent. Le titre s'affiche sur le panneau d'entrée.",
    completionTip_en: "Wait 6 in-game hours between visits for a different film. The title is displayed on the entrance sign.",
  },
  {
    id: "act-cinema3", title: "Cinéma — Film 3", title_en: "Cinema — Movie 3",
    description: "Voir un 3e film (3 films distincts requis pour le 100%)",
    description_en: "Watch a 3rd movie (3 distinct films required for 100%)",
    category: "leisure", zone: "vinewood-hills",
    completionTip: "Dormez chez Michael pour avancer le temps rapidement entre les films. Pas besoin de regarder le film en entier — 2 min suffisent.",
    completionTip_en: "Sleep at Michael's to advance time quickly between films. No need to watch the full movie — 2 minutes is enough.",
  },
  {
    id: "act-strip", title: "Strip-Club", title_en: "Strip Club",
    description: "Recevoir un lap dance au Vanilla Unicorn (Strawberry)",
    description_en: "Get a lap dance at the Vanilla Unicorn (Strawberry)",
    category: "social", zone: "los-santos-centre",
    completionTip: "Entrez au Vanilla Unicorn, payez un lap dance (40$). Restez jusqu'à la fin de la danse. 1 seule séance suffit pour le 100%.",
    completionTip_en: "Enter the Vanilla Unicorn, pay for a lap dance ($40). Stay until the dance ends. 1 session is enough for 100%.",
  },
  {
    id: "act-yoga1", title: "Yoga — Séance 1/3", title_en: "Yoga — Session 1/3",
    description: "Faire la première séance de yoga avec Amanda",
    description_en: "Complete the first yoga session with Amanda",
    category: "sport", zone: "rockford-hills", character: "Michael",
    completionTip: "Disponible après la mission 'Did Somebody Say Yoga?'. Allez au point de yoga chez Michael le matin (6h-12h). Suivez les QTE lentement.",
    completionTip_en: "Available after the 'Did Somebody Say Yoga?' mission. Go to the yoga spot at Michael's in the morning (6am-12pm). Follow QTEs slowly.",
  },
  {
    id: "act-yoga2", title: "Yoga — Séance 2/3", title_en: "Yoga — Session 2/3",
    description: "Faire la deuxième séance de yoga",
    description_en: "Complete the second yoga session",
    category: "sport", zone: "rockford-hills", character: "Michael",
    completionTip: "Attendez 24h en jeu après la 1ère séance. La difficulté augmente : les mouvements de stick sont plus précis. Ne bougez qu'en zone verte.",
    completionTip_en: "Wait 24 in-game hours after the 1st session. Difficulty increases: stick movements must be more precise. Only move in the green zone.",
  },
  {
    id: "act-yoga3", title: "Yoga — Séance 3/3", title_en: "Yoga — Session 3/3",
    description: "Compléter la troisième séance de yoga pour la médaille",
    description_en: "Complete the third yoga session for the medal",
    category: "sport", zone: "rockford-hills", character: "Michael",
    completionTip: "Dernière séance = la plus dure. Relâchez les sticks entre chaque pose pour réinitialiser. La médaille se valide automatiquement après.",
    completionTip_en: "Last session = hardest. Release sticks between each pose to reset. The medal validates automatically after completion.",
  },
  {
    id: "act-jetski", title: "Course de Jet-Ski", title_en: "Jet Ski Race",
    description: "Finir une course de jet-ski à Vespucci Beach",
    description_en: "Finish a jet ski race at Vespucci Beach",
    category: "race", zone: "los-santos-centre",
    completionTip: "Disponible à la plage de Vespucci (icône drapeau). Coupez les virages au plus court. Une 1ère place n'est pas requise — finir suffit.",
    completionTip_en: "Available at Vespucci Beach (flag icon). Cut turns as short as possible. 1st place is not required — just finish.",
  },
  {
    id: "act-parachute", title: "Saut en Parachute", title_en: "Parachute Jump",
    description: "Compléter 1 saut en parachute guidé parfaitement",
    description_en: "Complete 1 guided parachute jump perfectly",
    category: "race", zone: "vinewood-hills",
    completionTip: "13 sauts disponibles sur la carte (icône parachute). Atterrissez dans la zone cible pour le score parfait. Maintenez RT/R2 pour freiner à 50m du sol.",
    completionTip_en: "13 jumps available on the map (parachute icon). Land in the target zone for a perfect score. Hold RT/R2 to brake at 50m from the ground.",
  },
  {
    id: "act-shooting", title: "Stand de Tir", title_en: "Shooting Range",
    description: "Passer toutes les épreuves du stand de tir (Silver requis)",
    description_en: "Pass all shooting range challenges (Silver required)",
    category: "sport", zone: "los-santos-centre",
    completionTip: "Obtenez au moins une médaille de bronze dans chaque défi (pistolet, SMG, fusil d'assaut, fusil de chasse, arme lourde). Le bronze suffit pour le 100%.",
    completionTip_en: "Get at least a bronze medal in each challenge (pistol, SMG, assault rifle, shotgun, heavy weapon). Bronze is enough for 100%.",
  },
  {
    id: "act-triathlon", title: "Triathlon", title_en: "Triathlon",
    description: "Finir le triathlon sur la plage de Vespucci",
    description_en: "Finish the triathlon on Vespucci Beach",
    category: "race", zone: "los-santos-centre",
    completionTip: "3 triathlons disponibles (Vespucci, Alamo Sea, Coyote Cross). Montez la stat endurance au max AVANT de tenter. Alternez rapidement A/X sans surchauffer.",
    completionTip_en: "3 triathlons available (Vespucci, Alamo Sea, Coyote Cross). Max out stamina stat BEFORE attempting. Alternate A/X quickly without overheating.",
  },
  {
    id: "act-offroad", title: "Course Hors-Route", title_en: "Off-Road Race",
    description: "Gagner une course de rally tout-terrain dans Blaine County",
    description_en: "Win an off-road rally race in Blaine County",
    category: "race", zone: "blaine-county",
    completionTip: "Utilisez un véhicule 4x4 (Sandking, BF Injection). Les courses apparaissent en blanc sur la carte de Blaine County. Coupez par les collines en ligne droite.",
    completionTip_en: "Use a 4x4 vehicle (Sandking, BF Injection). Races show as white icons on the Blaine County map. Cut through hills in a straight line.",
  },
];

export function getActivityTitle(a: Activity, lang: Lang): string {
  return lang === "en" && a.title_en ? a.title_en : a.title;
}
export function getActivityDescription(a: Activity, lang: Lang): string {
  return lang === "en" && a.description_en ? a.description_en : a.description;
}
export function getActivityTip(a: Activity, lang: Lang): string | undefined {
  if (lang === "en") return a.completionTip_en ?? a.completionTip;
  return a.completionTip;
}

export const totalActivities = activities.length;

export const easterEggActivities: Activity[] = [
  {
    id: "egg-alien",
    title: "L'Alien piégé dans la glace",
    title_en: "The Frozen Alien",
    description: "Un extraterrestre congelé sous le pont de North Yankton, visible uniquement lors de la toute première mission.",
    description_en: "A frozen extraterrestrial under the North Yankton bridge, visible only during the very first mission.",
    category: "secret",
    zone: "north-yankton",
    alertType: "item",
    alertDescription: "EASTER EGG : Lors de la toute première mission à North Yankton, au lieu de suivre la route, descendez sous le pont pour trouver un extraterrestre congelé dans la rivière.",
    alertDescription_en: "EASTER EGG: During the very first mission in North Yankton, instead of following the road, go under the bridge to find an extraterrestrial frozen in the river.",
    completionTip: "Vous avez une fenêtre de quelques secondes après le début de la mission. Ignorez l'objectif, descendez immédiatement vers la rivière sous le pont de North Yankton.",
    completionTip_en: "You have a few seconds window after the mission starts. Ignore the objective, immediately head down to the river under the North Yankton bridge.",
  },
  {
    id: "egg-fantome",
    title: "Le Fantôme du Mont Gordo",
    title_en: "The Mount Gordo Ghost",
    description: "Le spectre de Jolene Cranley-Evans apparaît au sommet du Mont Gordo entre 23h00 et minuit.",
    description_en: "The ghost of Jolene Cranley-Evans appears atop Mount Gordo between 11pm and midnight.",
    category: "secret",
    zone: "blaine-county",
    alertType: "item",
    alertDescription: "EASTER EGG : Rendez-vous au sommet du Mont Gordo entre 23h00 et minuit pour apercevoir le fantôme de Jolene Cranley-Evans. Approchez-vous et elle disparaîtra en laissant un message de sang.",
    alertDescription_en: "EASTER EGG: Head to the top of Mount Gordo between 11pm and midnight to spot the ghost of Jolene Cranley-Evans. Approach her and she will vanish, leaving a bloody message.",
    completionTip: "Utilisez Trevor basé à Sandy Shores pour vous déplacer rapidement. Montez sur le rocher au sommet du Mont Gordo à l'heure indiquée. Le mot 'JOCK' est gravé dans le rocher de sang.",
    completionTip_en: "Use Trevor based in Sandy Shores for quick travel. Stand on the rock at the top of Mount Gordo at the indicated time. The word 'JOCK' is written in blood on the rock.",
  },
  {
    id: "egg-ovni",
    title: "L'OVNI du Mont Chiliad",
    title_en: "The Mount Chiliad UFO",
    description: "La soucoupe volante secrète n'apparaît qu'à 3h du matin sous un temps orageux avec 100% de complétion.",
    description_en: "The secret UFO only appears at 3am during stormy weather with 100% game completion.",
    category: "secret",
    zone: "blaine-county",
    alertType: "quest",
    alertDescription: "EASTER EGG ULTIME : Nécessite le 100% de complétion du jeu. Allez au sommet du Mont Chiliad à 3h du matin sous un temps orageux pour assister à l'apparition de la soucoupe volante.",
    alertDescription_en: "ULTIMATE EASTER EGG: Requires 100% game completion. Go to the top of Mount Chiliad at 3am during stormy weather to witness the appearance of the flying saucer.",
    completionTip: "Grimpez en téléphérique jusqu'au sommet. Attendez 3h du matin (avancez l'heure via le sommeil si besoin). La pluie doit être active. L'OVNI descend depuis les nuages — ne montez pas sur le toit de la cabine.",
    completionTip_en: "Take the cable car to the summit. Wait until 3am (advance time via sleep if needed). Rain must be active. The UFO descends from the clouds — don't stand on the cable car roof.",
  },
];
