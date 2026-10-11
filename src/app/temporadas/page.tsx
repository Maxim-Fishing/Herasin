"use client";

import Link from "next/link";
import Pic from "@/components/Pic";
import { PageHero, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";

export default function Temporadas() {
  const { seasons } = useData();
  const products = useActiveProducts();
  return (
    <>
      <PageHero
        emoji="🎁"
        title="Kits de temporada"
        subtitle="Cada temporada es un kit: detalles que combinan entre sí, listos para regalar."
      />
      <Section>
        {seasons.length === 0 ? (
          <p className="text-center text-lila-700">Pronto habrá nuevos kits 💜</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...seasons].sort((a, b) => a.order - b.order).map((s) => {
              const items = products.filter((p) => p.seasonIds.includes(s.id));
              return (
                <Link
                  key={s.id}
                  href={`/temporada?s=${s.slug}`}
                  className="group overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/30 bg-white p-2.5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
                >
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <Pic src={s.image} alt={s.name} emoji={s.emoji} className="aspect-[16/10] w-full text-6xl transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="font-script text-lg text-lila-500">Kit</p>
                    <h2 className="font-display text-2xl font-semibold text-lila-800">{s.emoji} {s.name}</h2>
                    <p className="mt-1 text-sm text-lila-900/70">{s.description}</p>
                    <p className="mt-3 text-sm font-bold text-lila-600">{items.length} piezas en el kit →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
