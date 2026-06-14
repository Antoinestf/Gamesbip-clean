const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const GAME_STORAGE_KEYS = {
  gta5:     "gtabip_progress",
  eldenring: "eldenringbip_progress",
  hades2:   "hadesbip_progress",
  sts2:     "gamesbip_sts2_progress",
} as const;

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return code;
}

function apiHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON,
    Authorization: `Bearer ${SUPABASE_ANON}`,
    Prefer: "return=representation",
  };
}

function readGame(key: string): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completed: {}, checked: {} };
}

export async function saveToCloud(): Promise<string> {
  const share_code = generateCode();

  const body = {
    share_code,
    gta5:      readGame(GAME_STORAGE_KEYS.gta5),
    eldenring: readGame(GAME_STORAGE_KEYS.eldenring),
    hades2:    readGame(GAME_STORAGE_KEYS.hades2),
    sts2:      readGame(GAME_STORAGE_KEYS.sts2),
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/player_saves`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to save");
  }

  return share_code;
}

export async function loadFromCloud(code: string): Promise<void> {
  const upper = code.trim().toUpperCase();
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/player_saves?share_code=eq.${upper}&select=gta5,eldenring,hades2,sts2`,
    { headers: apiHeaders() },
  );

  if (!res.ok) throw new Error("Failed to reach server");

  const rows: { gta5: unknown; eldenring: unknown; hades2: unknown; sts2: unknown }[] =
    await res.json();

  if (!rows || rows.length === 0) throw new Error("Code not found");

  const save = rows[0];

  localStorage.setItem(GAME_STORAGE_KEYS.gta5,      JSON.stringify(save.gta5));
  localStorage.setItem(GAME_STORAGE_KEYS.eldenring,  JSON.stringify(save.eldenring));
  localStorage.setItem(GAME_STORAGE_KEYS.hades2,     JSON.stringify(save.hades2));
  localStorage.setItem(GAME_STORAGE_KEYS.sts2,       JSON.stringify(save.sts2));
}
