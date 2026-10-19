"use client";

import Pic from "@/components/Pic";
import { CtaWhatsapp, GalleryBlock, PageHero, Section } from "@/components/Sections";
import { useData } from "@/lib/store";

/** Foto que se ajusta a la altura del texto, para que nunca quede un hueco al lado. */
function SidePhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative min-h-[280px] overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/35 bg-lila-200 ${className}`}>
      <Pic src={src} alt={alt} className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-[1.5rem]" />
    </div>
  );
}

export default function QuienesSomos() {
  const { settings } = useData();
  const facts = [
    settings.customers ? [settings.customers, "clientes felices"] : null,
    ["Neiva, Huila", "nuestro taller"],
    ["A mano", "pieza por pieza"],
  ].filter(Boolean) as string[][];

  return (
    <>
      <PageHero
        emoji="💜"
        title="Quiénes somos"
        subtitle="Una historia pequeña, hecha con muchas manos… bueno, con dos."
      />

      <Section title="Nuestra historia">
        <div className="grid gap-8 md:grid-cols-[minmax(0,380px)_1fr] md:items-stretch">
          <SidePhoto src="/fotos/144.jpg" alt="Fundadora de HERARESIN en su taller" />
          <div className="flex flex-col justify-center gap-5 text-lila-900/80">
            <p className="text-lg leading-relaxed">{settings.aboutStory}</p>
            {settings.aboutSince && (
              <p>
                Creamos desde <strong className="text-lila-700">{settings.aboutSince}</strong>, siempre con la idea
                de que cada pieza cuente algo de quien la recibe.
              </p>
            )}
            <ul className="grid gap-3 sm:grid-cols-3">
              {facts.map(([n, l]) => (
                <li key={l} className="rounded-[1.5rem] border-[3px] border-dotted border-cafe/25 bg-lila-50 p-4 text-center">
                  <p className="font-display text-xl font-semibold text-lila-700">{n}</p>
                  <p className="text-sm text-lila-900/65">{l}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Lo que hacemos" tint>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["💎", "Resina", "Recordatorios, llaveros, cuadros, agendas y piezas únicas, una por una."],
            ["🎨", "Sublimación", "Diseños a todo color en tazas, botellas y forros."],
            ["📓", "Papelería creativa", "Agendas, libretas, calendarios y lapiceros con tu estilo."],
          ].map(([icon, t, d]) => (
            <div key={t} className="rounded-[1.75rem] border-[3px] border-dotted border-cafe/25 bg-white p-8 text-center">
              <div className="text-5xl">{icon}</div>
              <h3 className="mt-3 font-display text-xl font-semibold text-lila-800">{t}</h3>
              <p className="mt-1 text-sm text-lila-900/70">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Mi taller">
        <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,420px)] md:items-stretch">
          <div className="flex flex-col justify-center gap-5 text-lila-900/80">
            <p className="text-lg leading-relaxed">{settings.aboutWorkshop}</p>
            <ul className="space-y-2.5">
              {[
                "Moldes, pigmentos y una mesa de trabajo pensada para cada pedido.",
                "Curado de 24 horas en cada pieza para lograr el brillo perfecto.",
                "Cursos presenciales para quienes quieren aprender y emprender.",
              ].map((t) => (
                <li key={t} className="flex gap-3 rounded-[1.5rem] bg-lila-50 px-4 py-3">
                  <span className="text-lila-500">✦</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <SidePhoto src="/fotos/077.jpg" alt="Curso de resina en el taller de HERARESIN" />
        </div>
      </Section>

      <Section title="Lo que nos define" tint>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["🤲", "Hecho a mano", "Cada pedido se trabaja de forma individual."],
            ["🎯", "A tu medida", "Tú decides el diseño, los colores y los detalles."],
            ["💬", "Trato cercano", "Hablamos contigo por WhatsApp en todo el proceso."],
            ["✅", "Calidad", "Revisamos cada pieza antes de entregarla."],
          ].map(([icon, t, d]) => (
            <div key={t} className="rounded-[1.75rem] border-[3px] border-dotted border-cafe/25 bg-white p-6 text-center">
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-2 font-heading font-semibold text-lila-800">{t}</h3>
              <p className="mt-1 text-sm text-lila-900/70">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <GalleryBlock />
      <CtaWhatsapp text="Hagamos algo único juntos" />
    </>
  );
}
