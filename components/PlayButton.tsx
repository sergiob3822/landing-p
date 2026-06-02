"use client";

import { useState, useCallback } from "react";
import { trackPixel, readCookie } from "./MetaPixel";

function makeEventId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

type Props = {
  className?: string;
  label?: string;
};

export default function PlayButton({ className = "", label = "Empezar a Jugar" }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const eventId = makeEventId();
    const sourceUrl = typeof window !== "undefined" ? window.location.href : undefined;

    trackPixel("Lead", { content_name: "Empezar a Jugar" }, eventId);

    try {
      const res = await fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          sourceUrl,
          fbp: readCookie("_fbp"),
          fbc: readCookie("_fbc"),
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error(data?.error || "Sin número disponible");
    } catch {
      alert(
        "En este momento no podemos conectarte. Por favor, intentá de nuevo en unos segundos."
      );
      setLoading(false);
    }
  }, [loading]);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-gold-soft via-gold to-gold-deep px-10 py-5 text-lg font-extrabold uppercase tracking-wide text-felt-dark shadow-glow transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,215,0,0.9)] active:scale-95 disabled:cursor-wait disabled:opacity-80 sm:text-2xl ${className}`}
    >
      <span className="absolute inset-0 -z-10 rounded-2xl bg-gold blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
      {loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-felt-dark border-t-transparent" />
          Conectando…
        </>
      ) : (
        <>
          <span className="text-2xl sm:text-3xl">🎰</span>
          {label}
          <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
        </>
      )}
    </button>
  );
}
