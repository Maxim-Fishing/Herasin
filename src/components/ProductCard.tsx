"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Pic, { Nina } from "./Pic";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/**
 * Tarjeta de producto en formato vertical (3:4). Si el producto tiene varias fotos,
 * al pasar el mouse se van mostrando una tras otra.
 */
export default function ProductCard({ product }: { product: Product }) {
  const imgs = product.images;
  const many = imgs.length > 1;
  const [i, setI] = useState(0);
  const [armed, setArmed] = useState(false); // las fotos extra se cargan recién al pasar el mouse
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setI(0);
  };
  const start = () => {
    if (!many || timer.current) return;
    setArmed(true);
    setI(1);
    timer.current = setInterval(() => setI((x) => (x + 1) % imgs.length), 1100);
  };
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  return (
    <Link
      href={`/producto?s=${product.slug}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && start()}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
      className="group block overflow-hidden rounded-[1.75rem] border-[3px] border-dotted border-cafe/30 bg-white p-2 transition hover:-translate-y-1 hover:border-lila-500 hover:shadow-xl hover:shadow-lila-200"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-lila-200">
        {imgs.length === 0 && <Pic alt={product.name} className="absolute inset-0 h-full w-full" />}
        {imgs.map((src, k) =>
          k === 0 || armed ? (
            <Pic
              key={src + k}
              src={src}
              fit="fill"
              alt={k === 0 ? product.name : ""}
              eager={k > 0}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
        <Nina className="pointer-events-none absolute bottom-1.5 left-1.5 h-14 w-auto drop-shadow-[0_2px_4px_rgba(94,59,79,0.35)]" />
        {many && (
          <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 flex gap-1 rounded-full bg-white/80 px-1.5 py-1">
            {imgs.map((_, k) => (
              <span key={k} className={`h-1.5 w-1.5 rounded-full ${k === i ? "bg-lila-600" : "bg-lila-300"}`} />
            ))}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-heading text-base font-semibold text-lila-900">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-lila-900/70">{product.description}</p>
        <p className="mt-3 text-sm font-bold text-lila-600">
          {product.price > 0 ? formatPrice(product.price) : "Cotiza por WhatsApp"} →
        </p>
      </div>
    </Link>
  );
}
