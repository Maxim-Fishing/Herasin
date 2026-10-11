"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { BackLink, PageHero, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";

function Detalle() {
  const slug = useSearchParams().get("s");
  const { categories, loading } = useData();
  const products = useActiveProducts();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <Section>
        <p className="text-center text-lila-700">{loading ? "Cargando…" : "No encontramos esta categoría."}</p>
        <p className="mt-4 text-center"><BackLink href="/categorias">Volver a categorías</BackLink></p>
      </Section>
    );
  }

  return (
    <>
      <PageHero emoji={category.emoji} title={category.name} subtitle={category.description} />
      <Section>
        <div className="mb-6"><BackLink href="/categorias">Todas las categorías</BackLink></div>
        <ProductGrid products={products.filter((p) => p.categoryId === category.id)} hideCategory />
      </Section>
    </>
  );
}

export default function CategoriaPage() {
  return (
    <Suspense fallback={<p className="py-20 text-center text-lila-700">Cargando…</p>}>
      <Detalle />
    </Suspense>
  );
}
