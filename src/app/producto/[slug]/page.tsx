"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Pic from "@/components/Pic";
import ProductCard from "@/components/ProductCard";
import { BackLink, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";
import { formatPrice, productMessage, whatsappLink } from "@/lib/utils";

export default function ProductoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const { settings, categories, seasons, loading } = useData();
  const products = useActiveProducts();
  const product = products.find((p) => p.slug === slug);
  const [img, setImg] = useState(0);

  useEffect(() => { if (product) document.title = `${product.name} · HERARESIN`; }, [product]);

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

  return (
    <>
      <Section>
        <div className="mb-6">
          <BackLink href={category ? `/categorias/${category.slug}` : "/categorias"}>
            {category ? category.name : "Categorías"}
          </BackLink>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Pic src={product.images[img]} alt={product.name} className="aspect-square w-full rounded-[2rem] text-8xl" />
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setImg(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 ${i === img ? "border-lila-600" : "border-transparent"}`}
                  >
                    <Pic src={src} alt="" className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-4xl font-bold text-lila-800">{product.name}</h1>
            <p className="mt-1 text-xl font-semibold text-lila-600">
              {product.price > 0 ? formatPrice(product.price) : "Precio: cotízalo por WhatsApp"}
            </p>
            <p className="mt-4 whitespace-pre-line text-lila-900/80">{product.description}</p>

            <h2 className="mt-8 font-semibold text-lila-800">✨ Formas de personalizar</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.options.map((o) => (
                <li key={o} className="rounded-full bg-lila-100 px-4 py-1.5 text-sm font-medium text-lila-700">{o}</li>
              ))}
            </ul>

            {productSeasons.length > 0 && (
              <p className="mt-6 text-sm text-lila-900/60">
                Temporada:{" "}
                {productSeasons.map((s, i) => (
                  <span key={s.id}>
                    {i > 0 && ", "}
                    <Link href={`/temporadas/${s.slug}`} className="font-semibold text-lila-600 hover:underline">{s.name}</Link>
                  </span>
                ))}
              </p>
            )}

            <button
              onClick={() =>
                window.open(
                  whatsappLink(settings, productMessage(product.name, window.location.href)),
                  "_blank",
                  "noopener",
                )
              }
              className="btn btn-wa mt-8 w-full sm:w-auto"
            >
              💬 Cotizar por WhatsApp
            </button>
            <p className="mt-2 text-xs text-lila-900/50">Te respondemos por chat con la vista previa de tu diseño.</p>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section title="También te puede gustar" tint>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </Section>
      )}
    </>
  );
}
