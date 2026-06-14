export interface AppState {
  completed: Record<string, boolean>;
  checked:   Record<string, boolean>;
}

export function encodeState(state: AppState): string {
  try {
    const json    = JSON.stringify(state);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    return `GTABIP-${encoded}`;
  } catch {
    return "";
  }
}

export function decodeState(code: string): AppState | null {
  try {
    const base64 = code.replace(/^GTABIP-/, "").trim();
    const json   = decodeURIComponent(escape(atob(base64)));
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed.completed === "object" && typeof parsed.checked === "object") {
      return parsed as AppState;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveToStorage(state: AppState, storageKey: string): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // localStorage unavailable (SSR / private mode)
  }
}

export function loadFromStorage(storageKey: string): AppState {
  try {
    let raw = localStorage.getItem(storageKey);
    // Migrate old GTA V keys to new key name
    if (!raw && storageKey === "gtabip_progress") {
      raw = localStorage.getItem("gtabip-gta5-state")
         ?? localStorage.getItem("gtabip-v2-state");
      if (raw) {
        localStorage.setItem(storageKey, raw);
        localStorage.removeItem("gtabip-gta5-state");
        localStorage.removeItem("gtabip-v2-state");
      }
    }
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.completed === "object" && typeof parsed.checked === "object") {
        return parsed as AppState;
      }
    }
  } catch {
    // ignore
  }
  return { completed: {}, checked: {} };
}
