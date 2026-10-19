"use client";

import Loading from "@/components/Loading";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CardGrid from "@/components/CardGrid";
import Pic from "@/components/Pic";
import { BackLink, PageHero, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";
import { formatPrice, kitMessage, whatsappLink } from "@/lib/utils";

function Kit() {
  const slug = useSearchParams().get("s");
  const { seasons, settings, loading } = useData();
  const products = useActiveProducts();
  const season = seasons.find((s) => s.slug === slug);

  if (!season) {
    return (
      <Section>
        {loading ? <Loading /> : <p className="text-center text-lila-700">No encontramos este kit.</p>}
        <p className="mt-4 text-center"><BackLink href="/temporadas">Ver todos los kits</BackLink></p>
      </Section>
    );
  }

  const items = products.filter((p) => p.seasonIds.includes(season.id));
  const total = items.reduce((sum, p) => sum + p.price, 0);
  const url = typeof window === "undefined" ? "" : window.location.href;

  return (
    <>
      <PageHero emoji={season.emoji} title={`Kit ${season.name}`} subtitle={season.description} />
      <Section>
        <div className="mb-6"><BackLink href="/temporadas">Todos los kits</BackLink></div>

        <div className="bg-hearts mb-10 grid items-center gap-6 rounded-[2rem] border-[3px] border-dotted border-cafe/30 p-6 md:grid-cols-[220px_1fr] md:p-8">
          <Pic src={season.image} alt={season.name} emoji={season.emoji} className="aspect-square w-full rounded-3xl border-4 border-white" />
          <div>
            <p className="font-script text-xl text-lila-500">¿Qué incluye el kit?</p>
            <h2 className="font-display text-2xl font-semibold text-lila-800">
              {items.length} {items.length === 1 ? "pieza" : "piezas"} que combinan entre sí
            </h2>
            <ul className="mt-3 grid gap-1 text-sm text-lila-900/80 sm:grid-cols-2">
              {items.map((p) => (
                <li key={p.id} className="flex gap-2"><span className="text-lila-500">✦</span>{p.name}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm font-semibold text-lila-700">
              {total > 0 ? `Valor del kit: ${formatPrice(total)}` : "Cotiza el kit completo o las piezas que quieras."}
            </p>
            <button
              disabled={!items.length}
              onClick={() => window.open(whatsappLink(settings, kitMessage(season.name, items, url)), "_blank", "noopener")}
              className="btn btn-wa mt-4"
            >
              💬 Cotizar el kit completo
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="rounded-3xl bg-lila-50 p-10 text-center text-lila-700">Este kit aún no tiene piezas. ¡Pronto! 💜</p>
        ) : (
          <CardGrid>
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </CardGrid>
        )}
      </Section>
    </>
  );
}

export default function TemporadaPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Kit />
    </Suspense>
  );
}
