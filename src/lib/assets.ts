/** Prefijo de ruta (GitHub Pages sirve el sitio en /<repositorio>). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Convierte "/fotos/001.jpg" en la ruta correcta; deja intactas las URLs absolutas. */
export function asset(src: string) {
  return src.startsWith("/") && !src.startsWith("//") ? `${BASE_PATH}${src}` : src;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maxim-fishing.github.io/Herasin";
