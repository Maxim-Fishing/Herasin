"use client";

import {
  CourseBlock,
  CtaWhatsapp,
  PageHero,
  ReelsBlock,
  resinSteps,
  Section,
  Steps,
  sublimationSteps,
} from "@/components/Sections";

export default function ComoLoHacemos() {
  return (
    <>
      <PageHero
        emoji="🤲"
        title="¿Cómo lo hacemos?"
        subtitle="Todo se hace a mano, paso a paso. Así nacen tus piezas."
      />

      <Section title="💎 Resina" subtitle="Nuestra especialidad: piezas únicas, ninguna queda igual a otra.">
        <Steps steps={resinSteps} />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-lila-900/60">
          Cada llavero de resina pasa por un curado de 24 horas para lograr ese brillo perfecto.
        </p>
      </Section>

      <Section title="🎨 Sublimación" subtitle="Tu diseño pasa a ser parte del producto." tint>
        <Steps steps={sublimationSteps} />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-lila-900/60">
          La sublimación funciona mejor sobre materiales claros y con recubrimiento especial para poliéster.
        </p>
      </Section>

      <ReelsBlock title="Míralo en video" subtitle="Así se ve el proceso en nuestro taller." />

      <Section title="🤲 Hecho a mano, de principio a fin">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-lila-900/80">
          <p>
            No trabajamos con producción en masa. Cada pedido pasa por nuestras manos: diseño, mezcla, vertido,
            curado, pulido y empaque. Por eso puede haber pequeñas diferencias entre una pieza y otra: es lo que las
            hace únicas.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Pides por WhatsApp"],
            ["2", "Definimos juntos el diseño"],
            ["3", "Producimos y te lo enviamos"],
          ].map(([n, t]) => (
            <div key={n} className="rounded-3xl bg-lila-50 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-lila-600 font-bold text-white">{n}</div>
              <p className="mt-3 font-semibold text-lila-800">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      <CourseBlock />
      <CtaWhatsapp text="¿Lista para tu pedido personalizado?" />
    </>
  );
}
