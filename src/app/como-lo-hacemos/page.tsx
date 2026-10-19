"use client";

import Link from "next/link";
import Pic from "@/components/Pic";
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
        <div className="grid gap-8 md:grid-cols-[minmax(0,360px)_1fr] md:items-stretch md:gap-12">
          <ResinVideo />
          <div className="flex flex-col gap-5 text-center text-lila-900/80 md:text-left">
            <p className="text-lg leading-relaxed">
              Estas son algunas de las piezas que salen de nuestro taller, todas en resina. No trabajamos con
              producción en masa: cada pedido pasa por nuestras manos, y por eso cada pieza tiene pequeñas
              diferencias que la hacen única.
            </p>
            <ul className="grid flex-1 auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["/fotos/012.jpg", "Recordatorios"],
                ["/fotos/030.jpg", "Llaveros"],
                ["/fotos/108.jpg", "Libretas"],
                ["/fotos/136.jpg", "Portavasos"],
                ["/fotos/042.jpg", "Cuadros"],
                ["/fotos/096.jpg", "Agendas"],
              ].map(([src, label]) => (
                <li key={label}>
                  <Link
                    href="/categoria?s=resina"
                    className="group relative block h-full min-h-[150px] overflow-hidden rounded-[1.5rem] border-[3px] border-dotted border-cafe/30 bg-lila-200"
                  >
                    <Pic src={src} alt={label} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
                    <span className="absolute inset-x-2 bottom-2 rounded-full bg-white/90 px-3 py-1 text-center text-sm font-bold text-lila-800">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/categoria?s=resina" className="btn btn-primary self-center md:self-start">Ver todo en resina</Link>
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
              <p className="mt-3 font-heading font-semibold text-lila-800">{t}</p>
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
