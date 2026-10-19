/* eslint-disable @next/next/no-img-element */
import { asset } from "@/lib/assets";

/**
 * Logo de la marca como fondo: ya viene difuminado (en el archivo) y se queda fijo
 * mientras se hace scroll. Va detrás de todo el contenido (z-index negativo).
 */
export default function BrandBackdrop() {
  return (
    <img
      src={asset("/marca/logo-fondo.webp")}
      alt=""
      aria-hidden
      draggable={false}
      className="pointer-events-none fixed left-1/2 top-[54%] -z-10 w-[min(96vw,900px)] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.22]"
    />
  );
}
