"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Pic from "./Pic";
import { asset } from "@/lib/assets";

type Pt = { x: number; y: number };

const pct = (e: { clientX: number; clientY: number }, el: HTMLElement): Pt => {
  const r = el.getBoundingClientRect();
  return {
    x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
    y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
  };
};

/** Foto a pantalla completa: clic o toque para acercar, arrastrar para mover. */
function Lightbox({
  images,
  index,
  onIndex,
  onClose,
  alt,
}: {
  images: string[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  alt: string;
}) {
  const [z, setZ] = useState<Pt | null>(null);
  const n = images.length;
  const go = (d: number) => {
    setZ(null);
    onIndex((index + d + n) % n);
  };
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  });

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goRef.current(1);
      if (e.key === "ArrowLeft") goRef.current(-1);
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const arrow = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-lila-700 shadow hover:bg-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${alt}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-lila-900/85 p-3 backdrop-blur-sm"
      onClick={onClose}
    >
      <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-lila-700 shadow hover:bg-white">✕</button>
      {n > 1 && (
        <>
          <button aria-label="Foto anterior" className={`${arrow} left-3`} onClick={(e) => { e.stopPropagation(); go(-1); }}>‹</button>
          <button aria-label="Foto siguiente" className={`${arrow} right-3`} onClick={(e) => { e.stopPropagation(); go(1); }}>›</button>
        </>
      )}

      <div
        className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-2xl"
        style={{ touchAction: z ? "none" : "auto", cursor: z ? "zoom-out" : "zoom-in" }}
        onClick={(e) => {
          e.stopPropagation();
          setZ((cur) => (cur ? null : pct(e, e.currentTarget)));
        }}
        onPointerMove={(e) => {
          if (z) setZ(pct(e, e.currentTarget));
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(images[index])}
          alt={alt}
          draggable={false}
          className="max-h-[88vh] max-w-[92vw] select-none object-contain transition-transform duration-200 ease-out"
          style={z ? { transform: "scale(2.6)", transformOrigin: `${z.x}% ${z.y}%` } : undefined}
        />
      </div>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-lila-700">
        {index + 1} / {n} · {z ? "toca para alejar" : "toca para acercar"}
      </p>
    </div>
  );
}

/**
 * Galería vertical (3:4, como salen las fotos del celular):
 * lupa al pasar el mouse, foto a pantalla completa al tocar y miniaturas.
 */
export default function Gallery({
  images,
  alt,
  emoji = "💜",
  overlay,
}: {
  images: string[];
  alt: string;
  emoji?: string;
  overlay?: ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<Pt | null>(null);
  const n = images.length;
  const cur = Math.min(idx, Math.max(n - 1, 0));

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/35 bg-lila-200 p-2">
        <div
          role={n ? "button" : undefined}
          tabIndex={n ? 0 : undefined}
          aria-label={n ? "Ampliar foto" : undefined}
          className={`relative aspect-[3/4] overflow-hidden rounded-[1.5rem] ${n ? "cursor-zoom-in" : ""}`}
          onClick={() => n && setOpen(true)}
          onKeyDown={(e) => {
            if (n && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          onPointerMove={(e) => {
            if (e.pointerType === "mouse") setZoom(pct(e, e.currentTarget));
          }}
          onPointerLeave={() => setZoom(null)}
        >
          <Pic
            src={images[cur]}
            alt={alt}
            emoji={emoji}
            fit="fill"
            eager
            className="h-full w-full text-8xl transition-transform duration-200 ease-out"
            style={zoom ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          />
          {n > 0 && (
            <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-lila-700 shadow">
              🔍 Ampliar
            </span>
          )}
        </div>
        {overlay}
      </div>

      {n > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIdx(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === cur ? "true" : undefined}
              className={`aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-2xl border-[3px] sm:w-20 ${i === cur ? "border-lila-600" : "border-transparent"}`}
            >
              <Pic src={src} alt="" className="h-full w-full" />
            </button>
          ))}
        </div>
      )}

      {open && n > 0 && <Lightbox images={images} index={cur} onIndex={setIdx} onClose={() => setOpen(false)} alt={alt} />}
    </div>
  );
}
