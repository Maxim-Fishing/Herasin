export type Season = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  emoji: string;
  order: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  emoji: string;
  order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  /** Formas de personalizar: "Nombre", "Foto", "Frase", "Color"... */
  options: string[];
  categoryId: string;
  seasonIds: string[];
  featured: boolean;
  active: boolean;
  /** Precio en COP. 0 = por definir (se muestra «cotiza por WhatsApp»). */
  price: number;
};

export type Course = {
  enabled: boolean;
  title: string;
  description: string;
  topics: string[];
  note: string;
  image: string;
};

export type Testimonial = { name: string; text: string };
export type Faq = { q: string; a: string };

export type SeasonPopup = {
  enabled: boolean;
  seasonId: string;
  title: string;
  text: string;
  image: string;
  startsAt: string;
  endsAt: string;
};

export type SiteSettings = {
  whatsapp: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  city: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutStory: string;
  aboutSince: string;
  aboutWorkshop: string;
  gallery: string[];
  /** Códigos o enlaces de reels de Instagram para incrustar. */
  reels: string[];
  customers: string;
  address: string;
  course: Course;
  testimonials: Testimonial[];
  faq: Faq[];
  popup: SeasonPopup;
};
