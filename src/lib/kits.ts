import type { Product, Season } from "./types";

/**
 * Piezas de un kit. Si el kit tiene `itemIds` (lo arma la administradora) se usan esas,
 * en ese orden; si no (kits antiguos) salen de los productos que tenían esa temporada.
 */
export function kitItems(season: Season, products: Product[]): Product[] {
  if (season.itemIds) {
    const byId = new Map(products.map((p) => [p.id, p]));
    return season.itemIds.flatMap((id) => byId.get(id) ?? []);
  }
  return products.filter((p) => p.seasonIds.includes(season.id));
}

/** Fotos del kit (la primera es la principal). */
export function kitImages(season: Season): string[] {
  if (season.images?.length) return season.images;
  return season.image ? [season.image] : [];
}

export const kitCover = (season: Season) => kitImages(season)[0] ?? "";

/** Kits que incluyen un producto. */
export function kitsOf(product: Product, seasons: Season[], products: Product[]): Season[] {
  return seasons.filter((s) => kitItems(s, products).some((p) => p.id === product.id));
}
