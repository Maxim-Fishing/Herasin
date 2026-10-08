import Link from "next/link";
import Pic from "./Pic";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-lila-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
    >
      <Pic
        src={product.images[0]}
        alt={product.name}
        className="aspect-square w-full transition duration-500 group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lila-900">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-lila-900/70">{product.description}</p>
        <div className="mt-3 flex items-center justify-between text-sm font-semibold text-lila-600">
          <span>{product.price > 0 ? formatPrice(product.price) : "Cotiza por WhatsApp"}</span>
          <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}
