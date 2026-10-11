import type { Product, SiteSettings } from "./types";
import { STORAGE_BUCKET, supabase } from "./supabase";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function whatsappLink(settings: SiteSettings, message: string) {
  const number = settings.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Precio en pesos colombianos; 0 = por definir. */
export function formatPrice(price: number) {
  return price > 0 ? `$${price.toLocaleString("es-CO")}` : "";
}

/** Acepta el código de un reel o su enlace completo y devuelve el código. */
export function reelCode(input: string) {
  const m = input.match(/\/(?:reel|reels|p)\/([\w-]+)/);
  return m ? m[1] : input.trim();
}

/** Avisos que siempre acompañan a un producto. */
export const PRODUCT_NOTICES = [
  "Todo producto se elabora con anticipación: reserva tu fecha con tiempo.",
  "Todo es sobre pedido: cada pieza se hace especialmente para ti.",
  "No asumimos costos de envío.",
];

/** Mensaje de cotización con descripción, personalización elegida y enlace. */
export function quoteMessage(opts: {
  product: Product;
  category?: string;
  options: string[];
  notes: string;
  url: string;
}) {
  const { product, category, options, notes, url } = opts;
  const lines = [
    "Hola HERARESIN 💜, quiero cotizar este producto:",
    "",
    `*${product.name}*${category ? ` (${category})` : ""}`,
    product.description,
    "",
    product.price > 0 ? `Precio: ${formatPrice(product.price)}` : "Precio: por cotizar",
  ];
  if (options.length) lines.push("", "Quiero personalizarlo con:", ...options.map((o) => `• ${o}`));
  if (notes.trim()) lines.push("", `Detalles: ${notes.trim()}`);
  lines.push("", `Ver producto: ${url}`);
  return lines.join("\n");
}

/** Mensaje para cotizar el kit completo de una temporada. */
export function kitMessage(seasonName: string, products: Product[], url: string) {
  return [
    `Hola HERARESIN 💜, quiero cotizar el *KIT ${seasonName}*.`,
    "",
    "Incluye:",
    ...products.map((p) => `• ${p.name} — ${p.description.split(". ")[0].replace(/\.$/, "")}`),
    "",
    `Ver kit: ${url}`,
  ].join("\n");
}

/** Sube una foto al bucket «fotos» de Supabase Storage y devuelve su URL pública. */
export async function uploadImage(file: File): Promise<string> {
  if (!supabase) throw new Error("Falta conectar Supabase. Mientras tanto, pega la URL de la imagen.");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
