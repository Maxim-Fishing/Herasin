"use client";

/* eslint-disable @next/next/no-img-element */
import { usePathname } from "next/navigation";
import { asset } from "@/lib/assets";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

/**
 * La muñeca de la marca, fija en la esquina en todas las páginas.
 * Su seña (el ícono de WhatsApp en la mano) ya lleva el mensaje: al tocarla abre el chat.
 */
export default function FloatingWhatsapp() {
  const path = usePathname();
  const { settings } = useData();

  if (path.startsWith("/admin")) return null;

  return (
    <a
      href={whatsappLink(settings, "Hola HERARESIN 💜, quiero cotizar un producto personalizado.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-2 right-2 z-40 flex items-end md:bottom-3 md:right-4"
    >
      <span className="pointer-events-none mb-8 mr-0.5 hidden rounded-full border-2 border-lila-300 bg-white px-3 py-1 text-sm font-bold text-lila-700 opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        ¡Escríbeme!
      </span>
      <img
        src={asset("/marca/nina-wpp-flotante.png")}
        alt=""
        aria-hidden
        className="animate-bob h-24 w-auto drop-shadow-[0_6px_10px_rgba(94,59,79,0.3)] transition-transform group-hover:scale-110 md:h-28"
      />
    </a>
  );
}
