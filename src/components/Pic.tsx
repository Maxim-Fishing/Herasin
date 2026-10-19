/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { asset } from "@/lib/assets";

export default function Pic({
  src,
  alt,
  emoji = "💜",
  className = "",
  eager = false,
  style,
}: {
  src?: string;
  alt: string;
  emoji?: string;
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
}) {
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

export function Nina({ className = "" }: { className?: string }) {
  return <img src={asset("/marca/nina.png")} alt="" aria-hidden className={className} />;
}
