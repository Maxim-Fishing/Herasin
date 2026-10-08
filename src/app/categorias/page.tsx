"use client";

import Link from "next/link";
import Pic from "@/components/Pic";
import { PageHero, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";

export default function Categorias() {
  const { categories } = useData();
  const products = useActiveProducts();
  return (
    <>
      <PageHero emoji="🗂️" title="Categorías" subtitle="Encuentra lo que buscas según la técnica." />
      <Section>
        {categories.length === 0 ? (
          <p className="text-center text-lila-700">Pronto habrá categorías 💜</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {[...categories].sort((a, b) => a.order - b.order).map((c) => {
              const count = products.filter((p) => p.categoryId === c.id).length;
              return (
                <Link
                  key={c.id}
                  href={`/categorias/${c.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-lila-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
                >
                  <Pic src={c.image} alt={c.name} emoji={c.emoji} className="aspect-[16/10] w-full text-6xl" />
                  <div className="p-6">
                    <h2 className="font-display text-2xl font-bold text-lila-800">{c.name}</h2>
                    <p className="mt-1 text-sm text-lila-900/70">{c.description}</p>
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
