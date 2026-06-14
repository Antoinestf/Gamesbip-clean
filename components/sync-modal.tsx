"use client";

import { useState } from "react";
import { X, Copy, Download, Upload, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { encodeState, decodeState, type AppState } from "@/lib/storage";
import { useLanguage } from "@/lib/language-context";

interface SyncModalProps {
  open:     boolean;
  onClose:  () => void;
  state:    AppState;
  onImport: (state: AppState) => void;
}

export function SyncModal({ open, onClose, state, onImport }: SyncModalProps) {
  const { t } = useLanguage();
  const [importCode, setImportCode]       = useState("");
  const [copied, setCopied]               = useState(false);
  const [importError, setImportError]     = useState("");
  const [importSuccess, setImportSuccess] = useState(false);

  if (!open) return null;

  const exportCode = encodeState(state);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

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
        <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-700/50 bg-black/70 backdrop-blur-lg p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-100">{t("syncTitle")}</h2>
            <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-100 transition-colors touch-manipulation">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Export */}
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

          {/* Import */}
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
