"use client";

import { useState } from "react";
import { Faq } from "@/components/Sections";
import { Logo, NinaWhatsapp } from "@/components/Pic";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

/** Contacto compacto y delicado: una sola tarjeta con la muñeca. */
export default function Contacto() {
  const { settings } = useData();
  const [msg, setMsg] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola HERARESIN 💜${msg.trim() ? `\n${msg.trim()}` : ", quiero cotizar un producto personalizado."}`;
    window.open(whatsappLink(settings, text), "_blank", "noopener");
  };

  const chips = [
    { icon: "📸", label: settings.instagramHandle, href: settings.instagramUrl },
    ...(settings.email ? [{ icon: "✉️", label: settings.email, href: `mailto:${settings.email}` }] : []),
    { icon: "📍", label: settings.city, href: "" },
  ];

  return (
    <div className="bg-hearts-soft">
      <section className="mx-auto max-w-4xl px-4 pb-6 pt-10 md:pt-14">
        <div className="relative overflow-hidden rounded-[2.25rem] border-[3px] border-dotted border-cafe/30 bg-white/85 shadow-xl shadow-lila-200/60">
          {/* franja suave superior, como en tus artes */}
          <div className="h-3 bg-gradient-to-r from-lila-200 via-lila-300 to-lila-200" aria-hidden />

          <div className="grid items-center gap-2 p-6 md:grid-cols-[250px_1fr] md:gap-6 md:p-8">
            <div className="relative mx-auto flex w-full max-w-[210px] justify-center md:max-w-none">
              <span aria-hidden className="animate-twinkle absolute left-2 top-2 text-xl text-lila-400">✦</span>
              <span aria-hidden className="animate-twinkle absolute bottom-6 right-2 text-lg text-lila-300" style={{ animationDelay: "1.4s" }}>✦</span>
              <NinaWhatsapp className="animate-float relative h-56 w-auto drop-shadow-[0_10px_14px_rgba(201,97,194,0.25)] md:h-72" />
            </div>

            <div className="text-center md:text-left">
              <Logo className="mx-auto h-12 w-auto md:mx-0" />
              <p className="mt-2 font-script text-xl text-lila-500">Hablemos de tu idea</p>
              <h1 className="font-display text-2xl font-semibold text-lila-700 md:text-3xl">¡Escríbenos por WhatsApp!</h1>
              <p className="mt-1 text-sm text-lila-900/65">Respondemos lo más pronto posible 💜</p>

              <form onSubmit={send} className="mt-4 space-y-3">
                <textarea
                  className="input min-h-20 text-sm"
                  placeholder="¿Qué te gustaría personalizar? (opcional)"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <button type="submit" className="btn btn-wa w-full md:w-auto">
                  💬 Enviar por WhatsApp
                </button>
                <p className="text-xs text-lila-900/50">+{settings.whatsapp}</p>
              </form>
            </div>
          </div>

          <div className="dotted-line mx-6" aria-hidden />
          <ul className="flex flex-wrap items-center justify-center gap-2 p-5">
            {chips.map((c) => {
              const cls = "flex items-center gap-1.5 rounded-full border-2 border-lila-100 bg-lila-50 px-4 py-1.5 text-sm font-semibold text-lila-700";
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:border-lila-300 hover:bg-lila-100`}>
                      <span aria-hidden>{c.icon}</span>{c.label}
                    </a>
                  ) : (
                    <span className={cls}><span aria-hidden>{c.icon}</span>{c.label}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {settings.address && (
            <p className="px-6 pb-5 text-center text-xs text-lila-900/55">Taller: {settings.address}</p>
          )}
        </div>
      </section>

      <Faq />
    </div>
  );
}
