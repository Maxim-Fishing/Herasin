"use client";

import Link from "next/link";
import Pic from "./Pic";
import type { Category, Product, Subcategory } from "@/lib/types";

/** Agrupa conservando el orden de aparición: primero las sueltas, luego cada grupo. */
function groupSubs(subs: Subcategory[]) {
  const loose = subs.filter((s) => !s.group);
  const groups: { title: string; items: Subcategory[] }[] = [];
  for (const s of subs) {
    if (!s.group) continue;
    const g = groups.find((x) => x.title === s.group);
    if (g) g.items.push(s);
    else groups.push({ title: s.group, items: [s] });
  }
  return { loose, groups };
}

function Box({
  category,
  sub,
  products,
  selected,
}: {
  category: Category;
  sub: Subcategory;
  products: Product[];
  selected: boolean;
}) {
  const mine = products.filter((p) => p.subcategoryId === sub.id);
  const cover = mine.find((p) => p.images[0])?.images[0];
  return (
    <Link
      href={`/categoria?s=${category.slug}&sub=${sub.id}#productos`}
      aria-current={selected ? "true" : undefined}
      className={`group block overflow-hidden rounded-[1.5rem] border-[3px] border-dotted bg-white p-1.5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-lila-200 ${
        selected ? "border-lila-600 shadow-lg shadow-lila-200" : "border-cafe/30"
      }`}
    >
      <div className="relative overflow-hidden rounded-[1.1rem] bg-lila-100">
        {cover ? (
          <Pic src={cover} alt={sub.name} className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="bg-hearts-soft flex aspect-[4/3] w-full flex-col items-center justify-center gap-1">
            <span aria-hidden className="text-3xl opacity-80">{category.emoji}</span>
            <span aria-hidden className="animate-twinkle text-sm text-lila-400">✦ ✦</span>
          </div>
        )}
        <span
          className={`absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-xs font-bold shadow ${
            mine.length ? "bg-white/95 text-lila-700" : "bg-lila-100/95 text-lila-500"
          }`}
        >
          {mine.length ? mine.length : "Pronto"}
        </span>
      </div>
      <p className="px-2 pb-2 pt-2.5 text-center font-display text-sm font-semibold leading-snug text-lila-800 sm:text-base">
        {sub.name}
      </p>
    </Link>
  );
}

/** «Cajitas» de subcategorías de una categoría. */
export default function SubcategoryBoxes({
  category,
  products,
  selectedId,
}: {
  category: Category;
  products: Product[];
  selectedId: string | null;
}) {
  const subs = category.subcategories ?? [];
  if (!subs.length) return null;
  const { loose, groups } = groupSubs(subs);

  const grid = (items: Subcategory[]) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
      {items.map((s) => (
        <Box key={s.id + s.group} category={category} sub={s} products={products} selected={selectedId === s.id} />
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {loose.length > 0 && grid(loose)}
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-lila-700">
            <span aria-hidden className="text-lila-400">✦</span>
            {g.title}
          </h3>
          {grid(g.items)}
        </div>
      ))}
    </div>
  );
}
