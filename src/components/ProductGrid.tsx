"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import CardGrid from "./CardGrid";
import { Nina } from "./Pic";
import { useData } from "@/lib/store";
import type { Product } from "@/lib/types";
import { kitItems } from "@/lib/kits";

/** Cuadrícula con buscador y filtros por categoría y temporada. */
export default function ProductGrid({
  products,
  hideCategory = false,
  hideSeason = false,
}: {
  products: Product[];
  hideCategory?: boolean;
  hideSeason?: boolean;
}) {
  const { categories, seasons, products: all } = useData();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [season, setSeason] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const kit = seasons.find((s) => s.id === season);
    const inKit = new Set(kit ? kitItems(kit, all).map((p) => p.id) : []);
    return products.filter(
      (p) =>
        (!term || `${p.name} ${p.description} ${p.options.join(" ")}`.toLowerCase().includes(term)) &&
        (!cat || p.categoryId === cat) &&
        (!season || inKit.has(p.id)),
    );
  }, [products, q, cat, season, seasons, all]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          className="input sm:flex-1"
          placeholder="🔍 Buscar producto…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {!hideCategory && (
          <select className="input sm:w-52" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
        {!hideSeason && (
          <select className="input sm:w-52" value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="">Todas las temporadas</option>
            {seasons.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border-[3px] border-dotted border-cafe/25 bg-lila-50/80 p-10 text-center">
          <Nina className="animate-float h-24 w-auto" />
          <p className="font-script text-lg text-lila-600">Aún no hay productos aquí</p>
          <p className="text-sm text-lila-900/65">¡Pronto agregaremos más! 💜</p>
        </div>
      ) : (
        <CardGrid>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </CardGrid>
      )}
    </div>
  );
}
