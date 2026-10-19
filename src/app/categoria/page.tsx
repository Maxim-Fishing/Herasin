"use client";

import Loading from "@/components/Loading";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import SubcategoryBoxes from "@/components/SubcategoryBoxes";
import { BackLink, PageHero, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";

function Detalle() {
  const params = useSearchParams();
  const slug = params.get("s");
  const subId = params.get("sub");
  const { categories, loading } = useData();
  const products = useActiveProducts();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <Section>
        {loading ? <Loading /> : <p className="text-center text-lila-700">No encontramos esta categoría.</p>}
        <p className="mt-4 text-center"><BackLink href="/categorias">Volver a categorías</BackLink></p>
      </Section>
    );
  }

  const inCategory = products.filter((p) => p.categoryId === category.id);
  const sub = (category.subcategories ?? []).find((s) => s.id === subId);
  const shown = sub ? inCategory.filter((p) => p.subcategoryId === sub.id) : inCategory;
  const hasSubs = (category.subcategories ?? []).length > 0;

  return (
    <>
      <PageHero emoji={category.emoji} title={category.name} subtitle={category.description} />
      <Section>
        <div className="mb-6"><BackLink href="/categorias">Todas las categorías</BackLink></div>

        {category.note && (
          <p className="mx-auto mb-8 max-w-2xl rounded-full border-2 border-lila-200 bg-lila-50 px-5 py-2.5 text-center text-sm font-semibold text-lila-700">
            ✦ {category.note}
          </p>
        )}

        {hasSubs && (
          <div className="mb-12">
            <h2 className="mb-5 text-center font-display text-2xl font-semibold text-lila-800">
              Elige una <span className="font-script text-lila-500">subcategoría</span>
            </h2>
            <SubcategoryBoxes category={category} products={inCategory} selectedId={sub?.id ?? null} />
          </div>
        )}

        <div id="productos" className="scroll-mt-28">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-lila-800">
              {sub ? sub.name : hasSubs ? "Todos los productos" : "Productos"}
              <span className="ml-2 text-base font-medium text-lila-900/50">({shown.length})</span>
            </h2>
            {sub && (
              <Link href={`/categoria?s=${category.slug}#productos`} className="btn btn-soft !py-1.5 text-sm">
                Ver toda la categoría
              </Link>
            )}
          </div>
          <ProductGrid key={sub?.id ?? "todos"} products={shown} hideCategory />
        </div>
      </Section>
    </>
  );
}

export default function CategoriaPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Detalle />
    </Suspense>
  );
}
