"use client";

import { CtaWhatsapp, PageHero, Section } from "@/components/Sections";
import { useData } from "@/lib/store";

/** Las líneas que terminan en «:» son subtítulos; las demás, puntos de la lista. */
function Lines({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  return (
    <ul className="mt-3 space-y-2.5 text-lila-900/80">
      {lines.map((l, i) =>
        l.endsWith(":") ? (
          <li key={i} className="pt-1 font-bold text-lila-700">{l}</li>
        ) : (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden className="mt-0.5 text-lila-400">✦</span>
            <span>{l}</span>
          </li>
        ),
      )}
    </ul>
  );
}

const resumen = [
  ["🗓️", "10 días", "mínimo por unidad"],
  ["💜", "Abono 50 %", "para tomar el pedido"],
  ["📸", "Foto y video", "antes de despachar"],
  ["📦", "Envío", "a cargo del cliente"],
];

export default function Politicas() {
  const { settings } = useData();
  return (
    <div className="bg-hearts-soft">
      <PageHero
        soft
        emoji="📜"
        title="Nuestras políticas"
        subtitle="Para que tu pedido salga perfecto, esto es lo que necesitas saber antes de pedir."
      />

      <Section>
        <ul className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
          {resumen.map(([icon, big, small]) => (
            <li key={big} className="rounded-[1.5rem] border-2 border-lila-100 bg-white/85 p-4 text-center">
              <div className="text-2xl">{icon}</div>
              <p className="mt-1 font-heading text-lg font-semibold text-lila-700">{big}</p>
              <p className="text-xs font-medium text-lila-900/60">{small}</p>
            </li>
          ))}
        </ul>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {settings.policies.map((p) => (
            <article
              key={p.title}
              className="rounded-[2rem] border-[3px] border-dotted border-cafe/30 bg-white/90 p-6 shadow-sm shadow-lila-100 md:p-7"
            >
              <header className="flex items-center gap-3">
                <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-lila-100 text-2xl">{p.icon}</span>
                <h2 className="font-display text-2xl font-semibold text-lila-800">{p.title}</h2>
              </header>
              <Lines text={p.text} />
            </article>
          ))}
        </div>
      </Section>

      <CtaWhatsapp text="¿Tienes dudas sobre tu pedido?" />
    </div>
  );
}
