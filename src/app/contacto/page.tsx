"use client";

import { useState } from "react";
import { Faq, PageHero, Section } from "@/components/Sections";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

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
    <>
      <PageHero emoji="💬" title="Contacto" subtitle="Cuéntanos tu idea. Respondemos por WhatsApp lo más pronto posible." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const body = (
              <>
                <div className="text-4xl">{c.icon}</div>
                <h3 className="mt-2 font-semibold text-lila-800">{c.t}</h3>
                <p className="mt-1 break-words text-sm text-lila-900/70">{c.d}</p>
              </>
            );
            const cls = "rounded-3xl border border-lila-100 bg-white p-6 text-center shadow-sm";
            return c.href ? (
              <a key={c.t} href={c.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200`}>
                {body}
              </a>
            ) : (
              <div key={c.t} className={cls}>{body}</div>
            );
          })}
        </div>

        <form onSubmit={send} className="mx-auto mt-12 max-w-xl space-y-4 rounded-[2rem] bg-lila-50 p-8">
          <h2 className="font-display text-2xl font-bold text-lila-800">Escríbenos</h2>
          <input className="input" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className="input min-h-32" placeholder="¿Qué te gustaría personalizar?" value={msg} onChange={(e) => setMsg(e.target.value)} required />
          <button className="btn btn-wa w-full" type="submit">Enviar por WhatsApp</button>
        </form>
      </Section>
      <Faq />
    </>
  );
}
