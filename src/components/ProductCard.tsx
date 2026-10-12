import Link from "next/link";
import Pic, { Nina } from "./Pic";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/** Tarjeta de producto: foto enmarcada con los colores de la marca. */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto?s=${product.slug}`}
      className="group overflow-hidden rounded-[1.75rem] border-[3px] border-dotted border-cafe/30 bg-white p-2 transition hover:-translate-y-1 hover:border-lila-500 hover:shadow-xl hover:shadow-lila-200"
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-lila-200">
        <Pic
          src={product.images[0]}
          alt={product.name}
          className="aspect-square w-full transition duration-500 group-hover:scale-105"
        />
        <Nina className="pointer-events-none absolute bottom-1.5 left-1.5 h-14 w-auto drop-shadow-[0_2px_4px_rgba(94,59,79,0.35)]" />
      </div>
      <div className="p-3">
        <h3 className="font-display text-base font-semibold text-lila-900">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-lila-900/70">{product.description}</p>
        <p className="mt-3 text-sm font-bold text-lila-600">
          {product.price > 0 ? formatPrice(product.price) : "Cotiza por WhatsApp"} →
        </p>
      </div>
    </Link>
  );
}
