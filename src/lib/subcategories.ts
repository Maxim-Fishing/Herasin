import type { Subcategory } from "./types";
import { slugify } from "./utils";

/** Crea una subcategoría; `group` agrupa varias bajo un mismo título (ej. «Camisetas»). */
const sub = (name: string, group = ""): Subcategory => ({
  id: slugify(group ? `${group} ${name}` : name),
  name,
  group,
});

export const resinaSubs: Subcategory[] = [
  "Recordatorios 15 años",
  "Recordatorios baby shower",
  "Recordatorios boda",
  "Recordatorios de graduación",
  "Recordatorios cabo de año",
  "Recordatorios bautizo",
  "Primera comunión",
  "Recordatorios cumpleaños",
  "Recordatorios corporativos",
  "Llaveros temáticos",
  "Eternizados de nacimiento de bebé",
  "Encapsulado",
  "Exhibidor de uñas",
  "Portarretratos",
  "Agendas",
  "Termos",
  "Lapiceros",
  "Accesorios",
  "Cuadros",
  "Kids",
].map((n) => sub(n));

export const feSubs: Subcategory[] = [
  "Pad mouse",
  "Agendas",
  "Toalla de mano",
  "Termos",
  "Calendarios",
  "Lapiceros",
  "Portacelular",
  "Mug",
  "Combos",
  "Empaques",
].map((n) => sub(n));

export const sublimacionSubs: Subcategory[] = [
  sub("Piel de durazno", "Camisetas"),
  sub("Algodón", "Camisetas"),
  ...["Termos", "Mugs", "Vasos", "Gorras", "Morral", "Pad mouse"].map((n) => sub(n)),
];

export const papeleriaSubs: Subcategory[] = [
  ...["Agendas", "Libretas", "Calendarios", "Llaveros", "Planeadores"].map((n) => sub(n)),
  ...[
    "Stickers útiles escolares",
    "Calendarios",
    "Tablas de multiplicar",
    "Horario de clases",
    "Planeadores",
    "Forrado de cuadernos",
  ].map((n) => sub(n, "Línea escolar")),
];
