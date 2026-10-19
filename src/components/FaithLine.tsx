"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Pic, { Nina } from "./Pic";
import { asset } from "@/lib/assets";
import { useData } from "@/lib/store";
import type { Category, Product } from "@/lib/types";

/** Video de bienvenida de la línea de fe, dentro de una ventana en arco (como una capilla). */
function FaithVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Respeta a quien pidió menos movimiento: queda solo la imagen de portada.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
    else v.play().catch(() => {});
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <div className="relative mx-auto w-64 md:w-80">
      <span aria-hidden className="animate-twinkle absolute -left-2 top-6 z-10 text-xl text-lila-400">✦</span>
      <span aria-hidden className="animate-twinkle absolute -right-1 top-20 z-10 text-lg text-lila-300" style={{ animationDelay: "1.2s" }}>✦</span>
      <div className="relative aspect-[3/4] overflow-hidden rounded-b-[2rem] rounded-t-[999px] border-[3px] border-dotted border-cafe/40 bg-[#ffe1fc] shadow-xl shadow-lila-200/70">
        <video
          ref={ref}
          src={asset("/video/fe.mp4")}
          poster={asset("/video/fe-poster.jpg")}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          aria-label="La muñeca de HERARESIN saluda con una Biblia"
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-lila-700 shadow hover:bg-white"
        >
          {muted ? "🔇 Activar sonido" : "🔊 Sonido"}
        </button>
      </div>
    </div>
  );
}

/** Título llamativo de la línea de fe, con el video y, si se sube, la muñeca con la cruz. */
export function FaithIntro({ href }: { href: string }) {
  const { settings } = useData();
  // Imagen de la muñeca con la cruz: se sube en el panel (Ajustes → Línea de fe).
  const cross = settings.faithImage?.trim();
  return (
    <div
      className={`relative mx-auto grid max-w-6xl items-center gap-8 px-4 md:gap-10 ${
        cross ? "md:grid-cols-[auto_1fr_auto]" : "md:grid-cols-[auto_1fr]"
      }`}
    >
      <FaithVideo />
      <div className="text-center md:text-left">
        <p className="font-script text-2xl text-lila-600">La línea de fe</p>
        <h2 className="mt-1 font-display text-5xl leading-[1.05] text-lila-800 md:text-7xl">
          <span className="text-lila-600">Caminando</span>{" "}
          <span className="whitespace-nowrap">
            con Jesús <span aria-hidden className="text-lila-500">✝</span>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-lila-900/75 md:mx-0">
          Detalles con propósito: frases, promesas y reflexiones para ti o para alguien especial que las necesite.
          Hechos a mano y personalizados con mucho amor.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          <Link href={href} className="btn btn-primary">✝️ Ver la línea de fe</Link>
        </div>
      </div>
      {cross && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(cross)}
          alt="La muñeca de HERARESIN con una cruz"
          className="animate-float mx-auto h-72 w-auto object-contain drop-shadow-[0_8px_10px_rgba(94,59,79,0.25)] md:h-[26rem]"
        />
      )}
    </div>
  );
}

/** Subcategorías de la línea de fe en una cinta que se mueve sola (se detiene al pasar el mouse). */
export function FaithMarquee({ category, products }: { category: Category; products: Product[] }) {
  const subs = category.subcategories ?? [];
  if (!subs.length) return null;

  const items = subs.map((sub) => {
    const mine = products.filter((p) => p.categoryId === category.id && p.subcategoryId === sub.id);
    return { sub, cover: mine.find((p) => p.images[0])?.images[0], count: mine.length };
  });

  const card = (it: (typeof items)[number], copy: number) => (
    <Link
      key={`${copy}-${it.sub.id}`}
      href={`/categoria?s=${category.slug}&sub=${it.sub.id}#productos`}
      aria-hidden={copy ? true : undefined}
      tabIndex={copy ? -1 : undefined}
      className="group block w-40 shrink-0 rounded-[1.5rem] border-[3px] border-dotted border-cafe/35 bg-white p-1.5 shadow-md shadow-lila-200/60 transition hover:-translate-y-1 hover:border-lila-500 sm:w-44"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] bg-lila-100">
        {it.cover ? (
          <Pic src={it.cover} alt={it.sub.name} fit="fill" className="h-full w-full transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="bg-hearts-soft flex h-full flex-col items-center justify-center gap-1">
            <Nina className="h-20 w-auto opacity-90" />
            <span aria-hidden className="text-xl text-lila-400">✝</span>
          </div>
        )}
        {it.count > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-lila-700 shadow">{it.count}</span>
        )}
      </div>
      <p className="px-1 pb-1.5 pt-2 text-center font-heading text-sm font-semibold leading-snug text-lila-800">{it.sub.name}</p>
    </Link>
  );

  const fade = "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)";
  return (
    <div
      className="faith-marquee relative mt-12 overflow-hidden py-2"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      aria-label="Subcategorías de la línea de fe"
    >
      <div className="faith-marquee__track flex w-max gap-4 px-2" style={{ animationDuration: `${Math.max(28, items.length * 5)}s` }}>
        {items.map((it) => card(it, 0))}
        {items.map((it) => card(it, 1))}
      </div>
    </div>
  );
}
