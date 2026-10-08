import type { SiteSettings } from "./types";

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

export function productMessage(name: string, url: string) {
  return `Hola HERARESIN 💜, me interesa «${name}» y quiero personalizarlo.\n${url}`;
}

/** Sube una imagen a Cloudinary (plan gratuito) y devuelve su URL. */
export async function uploadImage(file: File): Promise<string> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) {
    throw new Error("Falta configurar Cloudinary. Mientras tanto, pega la URL de la imagen.");
  }
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", preset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    body,
  });
  if (!res.ok) throw new Error("No se pudo subir la imagen.");
  const data = await res.json();
  return data.secure_url as string;
}
