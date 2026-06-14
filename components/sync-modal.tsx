"use client";

import { useState } from "react";
import { X, Copy, Download, Upload, CheckCircle2, Cloud, CloudUpload, CloudDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import { encodeState, decodeState, type AppState } from "@/lib/storage";
import { saveToCloud, loadFromCloud } from "@/lib/cloud-save";
import { useLanguage } from "@/lib/language-context";

interface SyncModalProps {
  open:     boolean;
  onClose:  () => void;
  state:    AppState;
  onImport: (state: AppState) => void;
}

type ActiveTab = "manual" | "cloud";

export function SyncModal({ open, onClose, state, onImport }: SyncModalProps) {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab]         = useState<ActiveTab>("cloud");
  const [importCode, setImportCode]       = useState("");
  const [copied, setCopied]               = useState(false);
  const [importError, setImportError]     = useState("");
  const [importSuccess, setImportSuccess] = useState(false);

  // Cloud save state
  const [cloudSaving, setCloudSaving]     = useState(false);
  const [cloudCode, setCloudCode]         = useState<string | null>(null);
  const [cloudCopied, setCloudCopied]     = useState(false);
  const [cloudLoadCode, setCloudLoadCode] = useState("");
  const [cloudLoading, setCloudLoading]   = useState(false);
  const [cloudError, setCloudError]       = useState("");
  const [cloudSuccess, setCloudSuccess]   = useState(false);

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
    if (!parsed) { setImportError(t("importError")); return; }
    onImport(parsed);
    setImportSuccess(true);
    setTimeout(() => { setImportSuccess(false); onClose(); }, 1500);
  }

  async function handleCloudSave() {
    setCloudSaving(true);
    setCloudCode(null);
    setCloudError("");
    try {
      const code = await saveToCloud();
      setCloudCode(code);
    } catch (e) {
      setCloudError(lang === "fr" ? "Erreur lors de la sauvegarde. Réessayez." : "Save failed. Please try again.");
    } finally {
      setCloudSaving(false);
    }
  }

  async function handleCloudCopy() {
    if (!cloudCode) return;
    try {
      await navigator.clipboard.writeText(cloudCode);
      setCloudCopied(true);
      setTimeout(() => setCloudCopied(false), 2000);
    } catch {}
  }

  async function handleCloudLoad() {
    if (!cloudLoadCode.trim()) return;
    setCloudLoading(true);
    setCloudError("");
    setCloudSuccess(false);
    try {
      await loadFromCloud(cloudLoadCode.trim());
      setCloudSuccess(true);
      setTimeout(() => { window.location.reload(); }, 1200);
    } catch (e) {
      const msg = (e as Error).message;
      setCloudError(
        msg === "Code not found"
          ? (lang === "fr" ? "Code introuvable. Vérifiez et réessayez." : "Code not found. Check and try again.")
          : (lang === "fr" ? "Erreur réseau. Réessayez." : "Network error. Please try again.")
      );
    } finally {
      setCloudLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 pointer-events-none flex justify-center">
        <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-md shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-slate-100">{t("syncTitle")}</h2>
            <button type="button" onClick={onClose}
              className="rounded-md p-1 text-slate-400 hover:text-slate-100 transition-colors touch-manipulation">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-slate-700/50 px-5">
            {([
              { id: "cloud" as ActiveTab,  labelFr: "Sauvegarde Cloud",  labelEn: "Cloud Save",   icon: <Cloud className="h-3.5 w-3.5" /> },
              { id: "manual" as ActiveTab, labelFr: "Export / Import",   labelEn: "Export / Import", icon: <Copy className="h-3.5 w-3.5" /> },
            ]).map((tab) => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold transition-colors touch-manipulation",
                  activeTab === tab.id ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                )}>
                {tab.icon}
                {lang === "fr" ? tab.labelFr : tab.labelEn}
                {activeTab === tab.id && (
                  <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-cyan-400" />
                )}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-4">

            {/* ── CLOUD TAB ─────────────────────────────────────────────── */}
            {activeTab === "cloud" && (
              <>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === "fr"
                    ? "Sauvegardez la progression de tous vos jeux dans le cloud. Récupérez-la avec un code à 6 caractères sur n'importe quel appareil."
                    : "Save all your game progress to the cloud. Restore it with a 6-character code on any device."}
                </p>

                {/* Save section */}
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                    <CloudUpload className="h-3.5 w-3.5 text-cyan-400" />
                    {lang === "fr" ? "Sauvegarder" : "Save progress"}
                  </p>

                  {cloudCode ? (
                    <div className="space-y-2">
                      <p className="text-[11px] text-slate-400">
                        {lang === "fr" ? "Votre code de sauvegarde :" : "Your save code:"}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-lg border border-cyan-500/30 bg-slate-900 px-3 py-2.5 text-center font-mono text-xl font-black tracking-[0.35em] text-cyan-400">
                          {cloudCode}
                        </div>
                        <button type="button" onClick={handleCloudCopy}
                          className={cn(
                            "shrink-0 flex items-center gap-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all touch-manipulation",
                            cloudCopied
                              ? "border-cyan-500/50 bg-cyan-900/50 text-cyan-400"
                              : "border-slate-600 text-slate-400 hover:text-white hover:border-slate-500"
                          )}>
                          {cloudCopied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {lang === "fr"
                          ? "Gardez ce code précieusement. Il expire après 30 jours d'inactivité."
                          : "Keep this code safe. It expires after 30 days of inactivity."}
                      </p>
                    </div>
                  ) : (
                    <button type="button" onClick={handleCloudSave} disabled={cloudSaving}
                      className="w-full rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:pointer-events-none text-white text-sm font-semibold py-2.5 transition-colors touch-manipulation">
                      {cloudSaving
                        ? (lang === "fr" ? "Sauvegarde en cours…" : "Saving…")
                        : (lang === "fr" ? "Sauvegarder tous mes jeux" : "Save all my games")}
                    </button>
                  )}
                </div>

                <div className="border-t border-slate-700/50" />

                {/* Load section */}
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                    <CloudDownload className="h-3.5 w-3.5 text-cyan-400" />
                    {lang === "fr" ? "Restaurer" : "Restore progress"}
                  </p>
                  <input
                    value={cloudLoadCode}
                    onChange={(e) => { setCloudLoadCode(e.target.value.toUpperCase()); setCloudError(""); }}
                    placeholder={lang === "fr" ? "Entrez votre code (ex: AB2X9K)" : "Enter your code (e.g. AB2X9K)"}
                    maxLength={6}
                    className="w-full rounded-lg border border-slate-700/50 bg-slate-900 px-3 py-2.5 font-mono text-sm text-center uppercase tracking-widest text-slate-100 placeholder:text-slate-600 placeholder:text-[11px] placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:border-cyan-500/50"
                  />
                  {cloudError && <p className="text-xs text-red-400">{cloudError}</p>}
                  {cloudSuccess && (
                    <p className="text-xs text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {lang === "fr" ? "Sauvegarde restaurée ! Rechargement…" : "Save restored! Reloading…"}
                    </p>
                  )}
                  <button type="button" onClick={handleCloudLoad}
                    disabled={cloudLoadCode.trim().length !== 6 || cloudLoading}
                    className="w-full rounded-lg border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none text-sm font-semibold py-2.5 transition-colors touch-manipulation">
                    {cloudLoading
                      ? (lang === "fr" ? "Restauration…" : "Restoring…")
                      : (lang === "fr" ? "Restaurer ma progression" : "Restore my progress")}
                  </button>
                </div>
              </>
            )}

            {/* ── MANUAL TAB ────────────────────────────────────────────── */}
            {activeTab === "manual" && (
              <>
                {/* Export */}
                <div>
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

                <div className="border-t border-slate-700/50" />

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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
