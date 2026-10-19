/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { asset } from "@/lib/assets";

/**
 * fit="cover" (por defecto) recorta la foto para llenar el marco.
 * fit="fill" muestra la foto COMPLETA y rellena los lados con una copia difuminada de ella
 * (como en Instagram): si la foto no es 3:4, no se corta nada.
 */
export default function Pic({
  src,
  alt,
  emoji = "💜",
  className = "",
  eager = false,
  style,
  fit = "cover",
}: {
  src?: string;
  alt: string;
  emoji?: string;
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
  fit?: "cover" | "fill";
}) {
  if (src && fit === "fill") {
    const url = asset(src);
    const loading = eager ? "eager" : "lazy";
    // Si quien llama ya posiciona el marco (absolute/relative/fixed), no se le agrega otra posición.
    const pos = /\b(absolute|relative|fixed|sticky)\b/.test(className) ? "" : "relative";
    return (
      <span className={`block overflow-hidden ${pos} ${className}`} style={style}>
        <img src={url} alt="" aria-hidden loading={loading} className="absolute inset-0 h-full w-full scale-125 object-cover opacity-75 blur-lg" />
        <img src={url} alt={alt} loading={loading} className="absolute inset-0 h-full w-full object-contain" />
      </span>
    );
  }
  if (src) {
    return (
      <img
        src={asset(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={`object-cover ${className}`}
        style={style}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-gradient-to-br from-lila-100 via-lila-200 to-lila-300 text-5xl ${className}`}
    >
      {emoji}
    </div>
  );
}

/** Logo y niña de la marca (PNG con fondo transparente). */
export function Logo({ className = "" }: { className?: string }) {
  return <img src={asset("/marca/logo.png")} alt="HERARESIN" className={className} />;
}

/** La muñeca con el ícono de WhatsApp. */
export function NinaWhatsapp({ className = "" }: { className?: string }) {
  return <img src={asset("/marca/nina-whatsapp.png")} alt="" aria-hidden className={className} />;
}

/** Logo completo: círculo rosa con la muñeca y el nombre. */
export function LogoCompleto({ className = "" }: { className?: string }) {
  return <img src={asset("/marca/logo-completo.png")} alt="HERARESIN" className={className} />;
}

/** Logo redondo con la muñeca (versión liviana para el encabezado). */
export function LogoRedondo({ className = "" }: { className?: string }) {
  return <img src={asset("/marca/logo-redondo.png")} alt="HERARESIN" className={className} />;
}

export function Nina({ className = "" }: { className?: string }) {
  return <img src={asset("/marca/nina.png")} alt="" aria-hidden className={className} />;
}
