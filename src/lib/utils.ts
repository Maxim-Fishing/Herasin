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

/** Una forma de personalizar elegida por la clienta, con el dato que escribió. */
export type ChosenOption = { label: string; value: string };

/** Las opciones de fecha usan un campo de fecha; esto la deja como dd/mm/aaaa. */
export function isDateOption(label: string) {
  return /fecha/i.test(label);
}

function prettyValue(label: string, value: string) {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return isDateOption(label) && m ? `${m[3]}/${m[2]}/${m[1]}` : value.trim();
}

/** Mensaje de cotización con descripción, personalización elegida y enlace. */
export function quoteMessage(opts: {
  product: Product;
  category?: string;
  options: ChosenOption[];
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
  if (options.length) {
    lines.push(
      "",
      "Quiero personalizarlo con:",
      ...options.map((o) => {
        const v = prettyValue(o.label, o.value);
        return v ? `• ${o.label}: ${v}` : `• ${o.label}: (lo defino por chat)`;
      }),
    );
  }
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

/**
 * Reduce la foto antes de subirla (lado mayor 1600 px, JPEG 85 %).
 * Las fotos del celular pesan 3-8 MB; así quedan en ~300 KB y suben en segundos.
 */
export async function compressImage(file: File, maxSide = 1600): Promise<Blob> {
  try {
    if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") return file;
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
    bmp.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file; // formato que el navegador no puede leer: se sube tal cual
  }
}

/** Sube una foto al bucket «fotos» de Supabase Storage y devuelve su URL pública. */
export async function uploadImage(original: File): Promise<string> {
  if (!supabase) throw new Error("Falta conectar Supabase. Mientras tanto, pega la URL de la imagen.");
  const file = await compressImage(original);
  const compressed = file !== original;
  const ext = compressed ? "jpg" : (original.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: compressed ? "image/jpeg" : original.type || undefined,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
