"use client";

import {
  CourseBlock,
  CtaWhatsapp,
  PageHero,
  ResinVideo,
  ReelsBlock,
  resinSteps,
  Section,
  Steps,
} from "@/components/Sections";

export default function ComoLoHacemos() {
  return (
    <>
      <PageHero
        emoji="💎"
        title="¿Cómo lo hacemos?"
        subtitle="Todo se hace a mano, con resina, paso a paso. Así nacen tus piezas."
      />

      <Section script="Del molde a tus manos" title="El proceso con resina" subtitle="Cinco pasos cuidados, de la idea al empaque.">
        <Steps steps={resinSteps} />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-lila-900/60">
          Cada llavero de resina pasa por un curado de 24 horas para lograr ese brillo perfecto.
        </p>
      </Section>

      <Section title="Míralo en video" tint>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <ResinVideo />
          <div className="space-y-4 text-center text-lila-900/80 md:text-left">
            <p className="text-lg">
              Estas son algunas de las piezas que salen de nuestro taller: recordatorios, libretas, portavasos,
              llaveros y más, todas en resina.
            </p>
            <p>
              No trabajamos con producción en masa: cada pedido pasa por nuestras manos, y por eso cada pieza
              tiene pequeñas diferencias que la hacen única.
            </p>
          </div>
        </div>
      </Section>

      <Section title="🤲 Hecho a mano, de principio a fin">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Pides por WhatsApp"],
            ["2", "Definimos juntos el diseño"],
            ["3", "Producimos y te lo enviamos"],
          ].map(([n, t]) => (
            <div key={n} className="rounded-[1.75rem] border-[3px] border-dotted border-cafe/25 bg-lila-50 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-lila-500 font-bold text-white">{n}</div>
              <p className="mt-3 font-display font-semibold text-lila-800">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      <ReelsBlock title="Más videos del taller" />
      <CourseBlock />
      <CtaWhatsapp text="¿Lista para tu pedido personalizado?" />
    </>
  );
}
