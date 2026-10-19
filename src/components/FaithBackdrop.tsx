/* eslint-disable @next/next/no-img-element */
import { asset } from "@/lib/assets";

/**
 * La muñeca con la Biblia, ya difuminada, de fondo de la sección de fe
 * (igual que el logo difuminado del resto del sitio). Va detrás del contenido.
 */
export default function FaithBackdrop() {
  return (
    <img
      src={asset("/marca/fe-fondo.webp")}
      alt=""
      aria-hidden
      draggable={false}
      className="pointer-events-none absolute -right-[12%] top-1/2 w-[min(90vw,680px)] max-w-none -translate-y-1/2 select-none opacity-20 md:-right-[4%] md:opacity-30"
    />
  );
}
