"use client";

import { useEffect } from "react";

const SESSION_KEY = "gamesbip_visited";

export function VisitTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/track-visit`;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) sessionStorage.setItem(SESSION_KEY, "1");
    }).catch(() => {
      // Silently ignore — tracking must never block the UI
    });
  }, []);

  return null;
}
