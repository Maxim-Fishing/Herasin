"use client";

import { useParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { BackLink, PageHero, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";

export default function TemporadaDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const { seasons, loading } = useData();
  const products = useActiveProducts();
  const season = seasons.find((s) => s.slug === slug);

  if (!season) {
    return (
      <Section>
        <p className="text-center text-lila-700">{loading ? "Cargando…" : "No encontramos esta temporada."}</p>
        <p className="mt-4 text-center"><BackLink href="/temporadas">Volver a temporadas</BackLink></p>
      </Section>
    );
  }

  return (
    <>
      <PageHero emoji={season.emoji} title={season.name} subtitle={season.description} />
      <Section>
        <div className="mb-6"><BackLink href="/temporadas">Todas las temporadas</BackLink></div>
        <ProductGrid products={products.filter((p) => p.seasonIds.includes(season.id))} hideSeason />
      </Section>
    </>
  );
}
