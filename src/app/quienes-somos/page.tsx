"use client";

import Pic from "@/components/Pic";
import { CtaWhatsapp, GalleryBlock, PageHero, Section } from "@/components/Sections";
import { useData } from "@/lib/store";

export default function QuienesSomos() {
  const { settings } = useData();
  return (
    <>
      <PageHero
        emoji="💜"
        title="Quiénes somos"
        subtitle="Una historia pequeña, hecha con muchas manos… bueno, con dos."
      />

      <Section title="Nuestra historia">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Pic src="/fotos/144.jpg" alt="Fundadora de HERARESIN en su taller" className="aspect-square w-full rounded-[2rem]" />
          <div className="space-y-4 text-lila-900/80">
            <p className="text-lg">{settings.aboutStory}</p>
            {settings.aboutSince && (
              <p>
                Creamos desde <strong className="text-lila-700">{settings.aboutSince}</strong>, siempre con la idea
                de que cada pieza cuente algo de quien la recibe.
              </p>
            )}
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
            <div key={t} className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="text-5xl">{icon}</div>
              <h3 className="mt-3 font-display text-xl font-bold text-lila-800">{t}</h3>
              <p className="mt-1 text-sm text-lila-900/70">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Mi taller">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4 text-lila-900/80 md:order-2">
            <p className="text-lg">{settings.aboutWorkshop}</p>
          </div>
          <Pic src="/fotos/077.jpg" alt="Curso de resina en el taller de HERARESIN" className="aspect-[4/3] w-full rounded-[2rem]" />
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
            <div key={t} className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-2 font-semibold text-lila-800">{t}</h3>
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
