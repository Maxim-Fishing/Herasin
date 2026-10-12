"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Pic, { Nina } from "@/components/Pic";
import ProductCard from "@/components/ProductCard";
import CardGrid from "@/components/CardGrid";
import QuoteModal from "@/components/QuoteModal";
import { BackLink, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";
import { PRODUCT_NOTICES, formatPrice, isDateOption, quoteMessage } from "@/lib/utils";

function Ficha() {
  const slug = useSearchParams().get("s");
  const { categories, seasons, loading } = useData();
  const products = useActiveProducts();
  const product = products.find((p) => p.slug === slug);
  const [img, setImg] = useState(0);
  // forma de personalizar elegida → dato que escribe la clienta
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (product) document.title = `${product.name} · HERARESIN`;
  }, [product]);

  if (!product) {
    return (
      <Section>
        <p className="text-center text-lila-700">{loading ? "Cargando…" : "No encontramos este producto."}</p>
        <p className="mt-4 text-center"><BackLink href="/categorias">Ver categorías</BackLink></p>
      </Section>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const productSeasons = seasons.filter((s) => product.seasonIds.includes(s.id));
  const related = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const toggle = (o: string) =>
    setChosen((c) => {
      if (o in c) return Object.fromEntries(Object.entries(c).filter(([k]) => k !== o));
      return { ...c, [o]: "" };
    });

  const quote = () =>
    setMessage(
      quoteMessage({
        product,
        category: category?.name,
        // se respeta el orden en que el producto define sus opciones
        options: product.options
          .filter((o) => o in chosen)
          .map((o) => ({ label: o, value: chosen[o] })),
        notes,
        url: window.location.href,
      }),
    );

  return (
    <>
      <Section>
        <div className="mb-6">
          <BackLink href={category ? `/categoria?s=${category.slug}` : "/categorias"}>
            {category ? category.name : "Categorías"}
          </BackLink>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* FOTO */}
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/35 bg-lila-200 p-2">
              <Pic src={product.images[img]} alt={product.name} className="aspect-square w-full rounded-[1.5rem] text-8xl" />
              <Nina className="pointer-events-none absolute bottom-3 left-3 h-24 w-auto drop-shadow-[0_3px_6px_rgba(94,59,79,0.35)] sm:h-28" />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setImg(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-[3px] ${i === img ? "border-lila-600" : "border-transparent"}`}
                  >
                    <Pic src={src} alt="" className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DATOS */}
          <div>
            <h1 className="font-display text-3xl font-semibold text-lila-800 md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold text-lila-600">
              {product.price > 0 ? formatPrice(product.price) : "Precio: cotízalo por WhatsApp"}
            </p>
            <p className="mt-4 whitespace-pre-line text-lila-900/80">{product.description}</p>

            <h2 className="mt-7 font-display text-lg font-semibold text-lila-800">✨ Personalízalo</h2>
            <p className="text-sm text-lila-900/60">Toca lo que quieres personalizar y escribe el dato; irá en tu mensaje.</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.options.map((o) => {
                const on = o in chosen;
                return (
                  <li key={o}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(o)}
                      className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition ${
                        on ? "border-lila-600 bg-lila-600 text-white" : "border-lila-300 bg-lila-50 text-lila-700 hover:bg-lila-100"
                      }`}
                    >
                      {on ? "✓ " : ""}{o}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Un campo por cada forma de personalizar elegida */}
            {Object.keys(chosen).length > 0 && (
              <div className="mt-4 space-y-3 rounded-[1.5rem] border-2 border-lila-200 bg-lila-50 p-4">
                {product.options.filter((o) => o in chosen).map((o) => (
                  <label key={o} className="block">
                    <span className="mb-1 block text-sm font-bold text-lila-800">{o}</span>
                    {o.toLowerCase().includes("foto") ? (
                      <input
                        className="input"
                        placeholder="Te la pedimos por WhatsApp; aquí puedes dejar una nota"
                        value={chosen[o]}
                        onChange={(e) => setChosen((c) => ({ ...c, [o]: e.target.value }))}
                      />
                    ) : (
                      <input
                        className="input"
                        type={isDateOption(o) ? "date" : "text"}
                        placeholder={`Escribe aquí: ${o.toLowerCase()}`}
                        value={chosen[o]}
                        onChange={(e) => setChosen((c) => ({ ...c, [o]: e.target.value }))}
                      />
                    )}
                  </label>
                ))}
              </div>
            )}

            <textarea
              className="input mt-3 min-h-20"
              placeholder="¿Algo más que debamos saber? Colores, frase, cantidad…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {productSeasons.length > 0 && (
              <p className="mt-5 text-sm text-lila-900/60">
                Kit:{" "}
                {productSeasons.map((s, i) => (
                  <span key={s.id}>
                    {i > 0 && ", "}
                    <Link href={`/temporada?s=${s.slug}`} className="font-bold text-lila-600 hover:underline">{s.name}</Link>
                  </span>
                ))}
              </p>
            )}

            <button onClick={quote} className="btn btn-wa mt-6 w-full sm:w-auto">
              💬 Cotizar por WhatsApp
            </button>

            {/* Avisos fijos */}
            <div className="mt-6 rounded-[1.5rem] border-[3px] border-dotted border-cafe/30 bg-lila-50 p-4">
              <p className="font-display font-semibold text-lila-800">Importante</p>
              <ul className="mt-2 space-y-1.5 text-sm text-lila-900/80">
                {PRODUCT_NOTICES.map((n) => (
                  <li key={n} className="flex gap-2"><span className="text-lila-500">✦</span>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section title="También te puede gustar" tint>
          <CardGrid>
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </CardGrid>
        </Section>
      )}

      {message && <QuoteModal message={message} onClose={() => setMessage(null)} />}
    </>
  );
}

export default function ProductoPage() {
  return (
    <Suspense fallback={<p className="py-20 text-center text-lila-700">Cargando…</p>}>
      <Ficha />
    </Suspense>
  );
}
