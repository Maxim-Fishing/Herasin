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
      <PageHero emoji="🗓️" title="Temporadas" subtitle="Colecciones especiales para cada fecha del año." />
      <Section>
        {seasons.length === 0 ? (
          <p className="text-center text-lila-700">Pronto habrá nuevas temporadas 💜</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...seasons].sort((a, b) => a.order - b.order).map((s) => {
              const count = products.filter((p) => p.seasonIds.includes(s.id)).length;
              return (
                <Link
                  key={s.id}
                  href={`/temporadas/${s.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-lila-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
                >
                  <Pic src={s.image} alt={s.name} emoji={s.emoji} className="aspect-[16/10] w-full text-6xl" />
                  <div className="p-6">
                    <h2 className="font-display text-2xl font-bold text-lila-800">{s.name}</h2>
                    <p className="mt-1 text-sm text-lila-900/70">{s.description}</p>
                    <p className="mt-3 text-sm font-semibold text-lila-600">{count} productos →</p>
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
