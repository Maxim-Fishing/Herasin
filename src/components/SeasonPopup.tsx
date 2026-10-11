"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useActiveProducts, useData } from "@/lib/store";
import Pic, { Nina } from "./Pic";

const KEY = "heraresin-popup-closed";
const EVENT = "heraresin-popup-closed";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

function wasClosed() {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
}

function close() {
  try { sessionStorage.setItem(KEY, "1"); } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Aviso de temporada (kit): lo activa y configura la administradora. */
export default function SeasonPopup() {
  const { settings, seasons } = useData();
  const products = useActiveProducts();
  const p = settings.popup;

  // En el servidor se asume "cerrado" para evitar parpadeos de hidratación.
  const open = useSyncExternalStore(
    subscribe,
    () => {
      const today = new Date().toISOString().slice(0, 10);
      const inRange = (!p.startsAt || today >= p.startsAt) && (!p.endsAt || today <= p.endsAt);
      return p.enabled && inRange && !wasClosed();
    },
    () => false,
  );

  if (!open) return null;
  const season = seasons.find((s) => s.id === p.seasonId);
  const items = products.filter((x) => x.seasonIds.includes(p.seasonId)).slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-lila-900/45 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        className="animate-pop-in relative w-full max-w-lg overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/40 bg-lila-50 shadow-2xl"
      >
        <button
          onClick={close}
          aria-label="Cerrar aviso"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl font-bold text-lila-700 shadow hover:bg-lila-100"
        >
          ✕
        </button>

        <Pic src={p.image} alt={p.title} emoji={season?.emoji ?? "💜"} className="h-44 w-full text-7xl" />

        <div className="bg-hearts relative p-6 text-center">
          <p className="font-script text-xl text-lila-500">Kit de temporada</p>
          <h2 className="font-display text-3xl font-semibold text-lila-800">{p.title}</h2>
          <p className="mt-2 text-lila-900/80">{p.text}</p>

          {items.length > 0 && (
            <div className="mt-5 grid grid-cols-3 gap-2">
              {items.map((x) => (
                <Pic key={x.id} src={x.images[0]} alt={x.name} className="aspect-square w-full rounded-2xl border-2 border-white text-3xl" />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href={season ? `/temporada?s=${season.slug}` : "/temporadas"}
              onClick={close}
              className="btn btn-primary"
            >
              Ver el kit
            </Link>
            <button onClick={close} className="btn btn-ghost">Seguir navegando</button>
          </div>
          <Nina className="pointer-events-none absolute -bottom-1 -left-3 hidden h-24 w-auto sm:block" />
        </div>
      </div>
    </div>
  );
}
