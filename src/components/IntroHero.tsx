"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/assets";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

/**
 * Portada con la intro animada de la muñeca.
 * El video deja libre su mitad derecha: ahí van el título y los botones.
 */
export default function IntroHero() {
  const { settings } = useData();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Respeta a quien pidió menos movimiento: deja solo la imagen de portada.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <section className="bg-hearts border-b-[3px] border-dotted border-cafe/30">
      <div className="relative mx-auto max-w-6xl md:px-4 md:py-6">
        <div className="relative overflow-hidden md:rounded-[2rem] md:border-[3px] md:border-dotted md:border-cafe/35">
          <video
            ref={ref}
            src={asset("/video/intro.mp4")}
            poster={asset("/video/intro-poster.jpg")}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="aspect-video w-full object-cover"
            aria-label="Intro animada de HERARESIN: la muñeca saluda con una botella de resina"
          />

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            className="absolute bottom-3 right-3 rounded-full md:bottom-auto md:top-3 bg-white/90 px-3 py-1.5 text-sm font-bold text-lila-700 shadow hover:bg-white"
          >
            {muted ? "🔇 Activar sonido" : "🔊 Sonido"}
          </button>

          {/* Texto sobre la mitad libre del video (solo en pantallas anchas) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] flex-col justify-center gap-3 pl-4 pr-[5%] pt-[9%] text-center md:flex">
            <p className="font-script text-lg text-lila-500 lg:text-2xl">Hecho a mano con amor</p>
            <h1 className="font-display text-3xl font-semibold leading-tight text-lila-800 lg:text-5xl">
              {settings.heroTitle}
            </h1>
            <div className="pointer-events-auto mt-2 flex flex-wrap justify-center gap-3">
              <Link href="/categorias" className="btn btn-primary">Ver productos</Link>
              <a
                href={whatsappLink(settings, "Hola HERARESIN 💜, quiero cotizar un producto personalizado.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                💬 Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* En celular el texto va debajo del video */}
        <div className="px-5 pb-10 pt-6 text-center md:hidden">
          <p className="font-script text-xl text-lila-500">Hecho a mano con amor</p>
          <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-lila-800">{settings.heroTitle}</h1>
          <p className="mt-3 text-lila-900/75">{settings.heroSubtitle}</p>
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/categorias" className="btn btn-primary">Ver productos</Link>
            <a
              href={whatsappLink(settings, "Hola HERARESIN 💜, quiero cotizar un producto personalizado.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              💬 Cotizar por WhatsApp
            </a>
          </div>
        </div>

        <p className="hidden px-4 pb-3 pt-2 text-center text-lila-900/70 md:block">{settings.heroSubtitle}</p>
      </div>
    </section>
  );
}
