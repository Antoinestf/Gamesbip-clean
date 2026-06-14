"use client";

import { useRef, useState } from "react";
import { X, Copy, Download, Upload, CheckCircle2, HardDrive, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { encodeState, decodeState, saveToStorage, loadFromStorage, type AppState } from "@/lib/storage";
import { GAME_REGISTRY } from "@/lib/game-registry";
import { useLanguage } from "@/lib/language-context";

interface SyncModalProps {
  open:     boolean;
  onClose:  () => void;
  state:    AppState;
  onImport: (state: AppState) => void;
}

/** Shape of the full backup file */
interface BackupData {
  version: number;
  date:    string;
  games:   Record<string, AppState>;
}

export function SyncModal({ open, onClose, state, onImport }: SyncModalProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [importCode, setImportCode]           = useState("");
  const [copied, setCopied]                   = useState(false);
  const [importError, setImportError]         = useState("");
  const [importSuccess, setImportSuccess]     = useState(false);
  const [fileError, setFileError]             = useState("");
  const [fileSuccess, setFileSuccess]         = useState(false);

  if (!open) return null;

  const exportCode = encodeState(state);

  /* ─── Export: download full backup as JSON ─── */
  function handleExportFile() {
    const backup: BackupData = {
      version: 1,
      date: new Date().toISOString(),
      games: {},
    };

    for (const game of GAME_REGISTRY) {
      const saved = loadFromStorage(game.storageKey);
      if (Object.keys(saved.completed).length > 0 || Object.keys(saved.checked).length > 0) {
        backup.games[game.storageKey] = saved;
      }
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "games-bip-save.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ─── Import: upload JSON backup file ─── */
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    setFileSuccess(false);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = ev.target?.result as string;
        const data = JSON.parse(raw) as BackupData;

        if (!data || typeof data.games !== "object" || !data.version) {
          setFileError(t("importFileError"));
          return;
        }

        // Write each game's data back to localStorage
        for (const [storageKey, gameState] of Object.entries(data.games)) {
          if (
            gameState &&
            typeof gameState.completed === "object" &&
            typeof gameState.checked === "object"
          ) {
            saveToStorage(gameState, storageKey);
          }
        }

        // Refresh the current view's state (GTA V tree passes its state)
        const currentGameKey = GAME_REGISTRY.find(g => g.storageKey === "gtabip_progress")?.storageKey;
        if (currentGameKey && data.games[currentGameKey]) {
          onImport(data.games[currentGameKey]);
        } else {
          // Fallback: reload current state from storage
          const reloaded = loadFromStorage("gtabip_progress");
          onImport(reloaded);
        }

        setFileSuccess(true);
        setTimeout(() => { setFileSuccess(false); onClose(); window.location.reload(); }, 1500);
      } catch {
        setFileError(t("importFileError"));
      }
    };
    reader.readAsText(file);

    // Reset so same file can be selected again
    e.target.value = "";
  }

  /* ─── Export: copy code ─── */
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  /* ─── Import: paste code ─── */
  function handleImport() {
    setImportError("");
    setImportSuccess(false);
    const parsed = decodeState(importCode.trim());
    if (!parsed) {
      setImportError(t("importError"));
      return;
    }
    onImport(parsed);
    setImportSuccess(true);
    setTimeout(() => { setImportSuccess(false); onClose(); }, 1500);
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 pointer-events-none flex justify-center">
        <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-700/50 bg-black/70 backdrop-blur-lg p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-100">{t("syncTitle")}</h2>
            <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-100 transition-colors touch-manipulation">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-5">{t("syncDescription")}</p>

          {/* ═══ FILE EXPORT ═══ */}
          <div className="mb-4">
            <p className="text-xs mb-2 flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-100">{t("exportFileBtn")}</span>
            </p>
            <button
              type="button"
              onClick={handleExportFile}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-700/50 bg-cyan-600 hover:bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors touch-manipulation"
            >
              <Download className="h-4 w-4" />
              {t("exportFileBtn")}
            </button>
            <p className="mt-1.5 text-[10px] text-slate-500">{t("exportFileHint")}</p>
          </div>

          {/* ═══ FILE IMPORT ═══ */}
          <div className="mb-5">
            <p className="text-xs mb-2 flex items-center gap-1.5">
              <FileUp className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-100">{t("importFileBtn")}</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-600 hover:border-cyan-500/50 bg-slate-800/30 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-slate-100 transition-colors touch-manipulation"
            >
              <Upload className="h-4 w-4" />
              {t("importFileBtn")}
            </button>
            {fileError && <p className="mt-1.5 text-xs text-red-400">{fileError}</p>}
            {fileSuccess && (
              <p className="mt-1.5 text-xs text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {t("importFileSuccess")}
              </p>
            )}
            <p className="mt-1.5 text-[10px] text-slate-500">{t("importFileHint")}</p>
          </div>

          {/* ═══ SEPARATOR ═══ */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-slate-700/50" />
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{t("orSeparator")}</span>
            <div className="flex-1 border-t border-slate-700/50" />
          </div>

          {/* ═══ CODE EXPORT ═══ */}
          <div className="mb-4">
            <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" />
              <span className="font-semibold text-slate-100">{t("exportLabel")}</span>
            </p>
            <div className="flex gap-2">
              <input readOnly value={exportCode}
                className="flex-1 min-w-0 rounded-md border border-slate-700/50 bg-slate-800/50 px-2 py-1.5 font-mono text-[10px] text-slate-300" />
              <button type="button" onClick={handleCopy}
                className={cn(
                  "shrink-0 flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-all touch-manipulation",
                  copied
                    ? "border-cyan-500/50 bg-cyan-900/50 text-cyan-400"
                    : "border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-slate-100"
                )}>
                {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("copiedBtn") : t("copyBtn")}
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-500">{t("exportHint")}</p>
          </div>

          <div className="border-t border-slate-700/50 my-4" />

          {/* ═══ CODE IMPORT ═══ */}
          <div>
            <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              <span className="font-semibold text-slate-100">{t("importLabel")}</span>
            </p>
            <textarea value={importCode} onChange={(e) => setImportCode(e.target.value)}
              placeholder={t("importPlaceholder")}
              className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-2.5 py-2 font-mono text-[10px] text-slate-300 placeholder:text-slate-600 resize-none h-16 focus:outline-none focus:border-cyan-500/50" />
            {importError   && <p className="mt-1 text-xs text-red-400">{importError}</p>}
            {importSuccess && (
              <p className="mt-1 text-xs text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {t("importSuccess")}
              </p>
            )}
            <button type="button" onClick={handleImport} disabled={!importCode.trim()}
              className="mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none touch-manipulation bg-cyan-600 hover:bg-cyan-500 text-white">
              {t("importBtn")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
