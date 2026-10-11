"use client";

import { useState } from "react";
import { Faq, PageHero, Section } from "@/components/Sections";
import { Logo, Nina } from "@/components/Pic";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

/** Página de contacto con colores más tenues. */
export default function Contacto() {
  const { settings } = useData();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola HERARESIN 💜, soy ${name || "un cliente"}.\n${msg}`;
    window.open(whatsappLink(settings, text), "_blank", "noopener");
  };

  const cards = [
    { icon: "💬", t: "WhatsApp", d: `+${settings.whatsapp}`, href: whatsappLink(settings, "Hola HERARESIN 💜") },
    { icon: "📸", t: "Instagram", d: settings.instagramHandle, href: settings.instagramUrl },
    ...(settings.email ? [{ icon: "✉️", t: "Correo", d: settings.email, href: `mailto:${settings.email}` }] : []),
    { icon: "📍", t: "Taller", d: [settings.address, settings.city].filter(Boolean).join(" · "), href: "" },
  ];

  return (
    <div className="bg-lila-50/60">
      <PageHero soft emoji="💬" title="Contacto" subtitle="Cuéntanos tu idea. Respondemos por WhatsApp lo más pronto posible." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const body = (
              <>
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-2 font-display font-semibold text-lila-700">{c.t}</h3>
                <p className="mt-1 break-words text-sm text-lila-900/60">{c.d}</p>
              </>
            );
            const cls = "rounded-[1.75rem] border-2 border-lila-100 bg-white/80 p-6 text-center";
            return c.href ? (
              <a key={c.t} href={c.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:-translate-y-0.5 hover:border-lila-300`}>
                {body}
              </a>
            ) : (
              <div key={c.t} className={cls}>{body}</div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl items-center gap-6 rounded-[2rem] border-2 border-lila-100 bg-white/80 p-6 md:grid-cols-[160px_1fr] md:p-8">
          <div className="hidden flex-col items-center gap-2 md:flex">
            <Nina className="h-36 w-auto" />
            <Logo className="h-14 w-auto" />
          </div>
          <form onSubmit={send} className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-lila-700">Escríbenos</h2>
            <input className="input" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea className="input min-h-32" placeholder="¿Qué te gustaría personalizar?" value={msg} onChange={(e) => setMsg(e.target.value)} required />
            <button className="btn btn-soft w-full" type="submit">💬 Enviar por WhatsApp</button>
          </form>
        </div>
      </Section>
      <Faq />
    </div>
  );
}
