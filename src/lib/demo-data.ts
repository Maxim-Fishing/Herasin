import type { Category, Product, Season, SiteSettings } from "./types";
import { feSubs, papeleriaSubs, resinaSubs, sublimacionSubs } from "./subcategories";
import { defaultPolicies } from "./policies";

const f = (n: number) => `/fotos/${String(n).padStart(3, "0")}.jpg`;

export const defaultSettings: SiteSettings = {
  whatsapp: "573223811056",
  instagramUrl: "https://www.instagram.com/heraresin.22col",
  instagramHandle: "@heraresin.22col",
  email: "",
  city: "Neiva, Huila · Envíos a todo el país",
  address: "Calle 43b n.º 10-18, Aldebarán de Berdez, Neiva (Huila)",
  heroTitle: "Hacemos único lo que más quieres",
  heroSubtitle:
    "Recordatorios, llaveros, termos, agendas, cuadros y mucho más, personalizados y hechos a mano en resina desde Neiva, Huila.",
  customers: "+5.000",
  aboutStory:
    "HERARESIN es un emprendimiento de Neiva, Huila, que nació del amor por la resina y por convertir recuerdos en detalles que se puedan tocar, usar y regalar. Con el favor de Dios, mucha dedicación, amor y esfuerzo hemos llegado a más de 5.000 clientes. Cada pieza se diseña, se prepara y se termina a mano, pensando en la persona que la va a recibir.",
  aboutSince: "",
  aboutWorkshop:
    "Trabajo en mi propio taller de resina en Neiva, con moldes, pigmentos y una mesa de trabajo donde cada pedido se atiende de forma individual. Allí también damos nuestros cursos presenciales de resina para quienes quieren emprender.",
  gallery: [12, 30, 23, 108, 42, 136, 17, 26, 96, 47, 27, 139].map(f),
  reels: ["DDvB-27vFg1", "DD8Cw8Tvetf", "Dd5LyrWMjlb", "DdBh3ahBwxU"],
  course: {
    enabled: true,
    title: "Curso presencial de resina epóxica",
    description:
      "Aprende resina desde cero en Neiva, con nosotros en el taller. Es un curso pensado para principiantes y para quienes quieren iniciar su propio negocio.",
    topics: [
      "Llaveros (técnica shaker y sencilla)",
      "Lapicero",
      "Forro de celular",
      "Aplicación sobre cuadros de madera",
      "Técnica mármol con resina",
      "Propiedades de la resina y pigmentos",
      "Encapsulado de fotos",
      "Encapsulado de stickers",
      "Obsequio: técnicas para personalizar tus proyectos",
    ],
    note: "Cupos limitados. Escríbenos por WhatsApp para conocer la próxima fecha y el valor.",
    image: f(77),
  },
  testimonials: [],
  faq: [
    {
      q: "¿Cuánto tarda un pedido?",
      a: "Trabajamos bajo pedido para cuidar la calidad de cada pieza. Los llaveros de resina, por ejemplo, necesitan 24 horas de curado. Reserva tu fecha con tiempo y te confirmamos el plazo por WhatsApp.",
    },
    {
      q: "¿Cómo hago mi pedido?",
      a: "Elige el producto, toca «Cotizar por WhatsApp» y cuéntanos cómo lo quieres personalizar (nombre, foto, colores, frase…). Te escribimos para confirmar los detalles.",
    },
    { q: "¿Hacen envíos?", a: "Sí, enviamos a todo el país. El costo depende de la ciudad y se informa al cotizar." },
    { q: "¿Qué formas de pago aceptan?", a: "Las acordamos por WhatsApp al confirmar tu pedido." },
    {
      q: "¿Puedo pedir algo que no está en la página?",
      a: "¡Claro! Escríbenos con tu idea y la hacemos realidad si es posible: recordatorios para eventos, regalos, detalles corporativos y más.",
    },
    {
      q: "¿Dan cursos de resina?",
      a: "Sí, damos cursos presenciales en Neiva, desde cero. Mira la sección de cursos o escríbenos para la próxima fecha.",
    },
  ],
  policies: defaultPolicies,
  popup: {
    enabled: true,
    seasonId: "s-dic",
    title: "¡Ya viene Diciembre!",
    text: "Detalles personalizados para regalar en Navidad. Reserva tu pedido con tiempo.",
    image: f(136),
    startsAt: "",
    endsAt: "",
  },
};

export const demoSeasons: Season[] = [
  { id: "s-amor", name: "Amor y Amistad", slug: "amor-y-amistad", description: "Detalles para decir «te quiero» de forma única.", image: f(88), emoji: "💜", order: 1 },
  { id: "s-madre", name: "Día de la Madre", slug: "dia-de-la-madre", description: "Regalos con alma para mamá.", image: f(27), emoji: "🌸", order: 2 },
  { id: "s-dic", name: "Diciembre", slug: "diciembre", description: "Navidad personalizada: recordatorios y regalos.", image: f(121), emoji: "🎄", order: 3 },
  { id: "s-grados", name: "Grados", slug: "grados", description: "Recuerdos para celebrar un logro.", image: f(47), emoji: "🎓", order: 4 },
  { id: "s-15", name: "15 años", slug: "15-anos", description: "Recordatorios y detalles para tu fiesta de quince.", image: f(30), emoji: "👑", order: 5 },
  { id: "s-bodas", name: "Bodas y eventos", slug: "bodas-y-eventos", description: "Recordatorios elegantes para el día más especial.", image: f(12), emoji: "💍", order: 6 },
  { id: "s-bebe", name: "Bebés y baby shower", slug: "bebes-y-baby-shower", description: "Recuerdos de nacimiento y souvenirs tiernos.", image: f(26), emoji: "🍼", order: 7 },
  { id: "s-cabo", name: "Cabo de año", slug: "cabo-de-ano", description: "Un detalle para honrar a quien siempre llevamos en el corazón.", image: f(87), emoji: "🕊️", order: 8 },
  { id: "s-fe", name: "Fe", slug: "fe", description: "Detalles con mensajes de esperanza y fe.", image: f(3), emoji: "✝️", order: 9 },
];

export const demoCategories: Category[] = [
  { id: "c-res", name: "Resina", slug: "resina", description: "Piezas únicas en resina: recordatorios, llaveros, cuadros, agendas y más.", image: f(12), emoji: "💎", order: 1, subcategories: resinaSubs },
  { id: "c-fe", name: "Línea de fe", slug: "linea-de-fe", description: "Caminando con Jesús: detalles con mensajes de fe y esperanza.", image: f(3), emoji: "✝️", order: 2, subcategories: feSubs },
  { id: "c-sub", name: "Sublimación", slug: "sublimacion", description: "Diseños a todo color en camisetas, mugs, termos, gorras y más.", image: f(27), emoji: "🎨", order: 3, subcategories: sublimacionSubs, note: "Marcamos en: marcación en DTF textil · marcación en DTF UV." },
  { id: "c-pap", name: "Papelería creativa", slug: "papeleria-creativa", description: "Agendas, libretas, calendarios y planeadores con tu estilo, y línea escolar.", image: f(108), emoji: "📓", order: 4, subcategories: papeleriaSubs },
];

type P = {
  id: string;
  name: string;
  cat: string;
  seasons: string[];
  desc: string;
  options: string[];
  imgs: number[];
  featured?: boolean;
};

const raw: P[] = [
  // ----- RESINA -----
  {
    id: "recordatorio-15-anos", name: "Recordatorio para 15 años", cat: "c-res", seasons: ["s-15"], featured: true,
    desc: "Llavero de resina con tarjeta personalizada para tu fiesta de quince. Diseñamos la tarjeta, creamos cada llavero pieza por pieza y lo entregamos con sobre de acabado elegante. Un recuerdo que tus invitados conservarán.",
    options: ["Nombre de la quinceañera", "Foto", "Fecha del evento", "Colores y temática", "Mensaje en la tarjeta"],
    imgs: [30, 34, 60, 66, 56],
  },
  {
    id: "recordatorio-mariposa", name: "Recordatorio con mariposa y tarjeta", cat: "c-res", seasons: ["s-15", "s-bodas"],
    desc: "Recordatorio elegante en resina con detalles de mariposa dorada y tarjeta de agradecimiento personalizada. Ideal para quince años y eventos especiales.",
    options: ["Nombre", "Fecha", "Colores", "Mensaje de agradecimiento"],
    imgs: [11, 15, 14],
  },
  {
    id: "recordatorio-boda", name: "Recordatorio de boda en resina", cat: "c-res", seasons: ["s-bodas"], featured: true,
    desc: "Recordatorios para matrimonio con diseño a tu gusto: figuras en resina con detalles dorados o de cristal, tarjeta personalizada y presentación cuidada.",
    options: ["Nombres de los novios", "Fecha", "Foto o ilustración", "Colores", "Frase o versículo"],
    imgs: [12, 8, 28, 57],
  },
  {
    id: "recordatorio-baby-shower", name: "Recordatorio baby shower y bautizo", cat: "c-res", seasons: ["s-bebe"],
    desc: "Souvenirs hechos a mano en resina para baby shower, bautizos y primeras comuniones, con tarjeta y empaque. Se diseñan según la temática de tu evento.",
    options: ["Nombre", "Temática", "Colores", "Fecha", "Mensaje"],
    imgs: [26, 22, 32],
  },
  {
    id: "recuerdo-nacimiento", name: "Cuadro recuerdo de nacimiento", cat: "c-res", seasons: ["s-bebe", "s-madre"], featured: true,
    desc: "Eternizamos ese momento especial de mamá y bebé: fotos, datos del nacimiento y detalles en resina dentro de un cuadro para guardar siempre.",
    options: ["Foto del bebé", "Nombre y datos del nacimiento", "Colores", "Tamaño del cuadro"],
    imgs: [42, 24, 69, 101, 102, 13, 59, 85, 93],
  },
  {
    id: "llavero-cabo-de-ano", name: "Llavero con foto — cabo de año", cat: "c-res", seasons: ["s-cabo"],
    desc: "Un detalle para honrar la memoria de un ser querido: llavero de resina con su fotografía y una tarjeta con mensaje. Hecho con mucho amor y cuidado. Haz tu pedido con anticipación.",
    options: ["Fotografía", "Nombre y fechas", "Mensaje o versículo", "Cantidad"],
    imgs: [87],
  },
  {
    id: "llavero-grado", name: "Recordatorio de grado", cat: "c-res", seasons: ["s-grados"],
    desc: "Llaveros y detalles en resina con tarjeta para celebrar un grado. Incluyen el nombre del graduado y el diseño que prefieras.",
    options: ["Nombre del graduado", "Profesión o ilustración", "Colores", "Fecha"],
    imgs: [47, 45, 74, 119],
  },
  {
    id: "llavero-nombre", name: "Llavero personalizado con nombre", cat: "c-res", seasons: ["s-amor", "s-dic"],
    desc: "Llaveros en resina con tu nombre, inicial o diseño favorito, con brillos, mariposas o personajes. Cada uno es único.",
    options: ["Nombre o inicial", "Colores", "Brillos", "Personaje o diseño"],
    imgs: [127, 43, 83, 76],
  },
  {
    id: "llavero-didactico", name: "Llavero didáctico tablas de multiplicar", cat: "c-res", seasons: [],
    desc: "Llavero con las tablas de multiplicar, personalizado con el nombre del niño y su personaje favorito. Práctico, resistente y ideal para el colegio.",
    options: ["Nombre del niño", "Personaje", "Colores"],
    imgs: [25],
  },
  {
    id: "placa-mascota", name: "Placa y accesorios para mascotas", cat: "c-res", seasons: [],
    desc: "Placas personalizadas en resina para perros y gatos, con su nombre y diseño. También accesorios de tendencia para que tu mascota luzca más cool.",
    options: ["Nombre de la mascota", "Forma de la placa", "Colores", "Teléfono de contacto"],
    imgs: [44, 142, 140],
  },
  {
    id: "imanes-resina", name: "Imanes en resina", cat: "c-res", seasons: ["s-15", "s-bodas", "s-bebe"],
    desc: "Imanes con estilo original, ideales como recordatorios de una fecha muy especial. Se diseñan con tu tema y colores.",
    options: ["Diseño o ilustración", "Nombre", "Colores", "Cantidad"],
    imgs: [122, 116, 123, 129],
  },
  {
    id: "portacarnet", name: "Portacarnet personalizado", cat: "c-res", seasons: [],
    desc: "Portacarnet retráctil con acabado en resina y brillos, con tu nombre y el diseño que más te guste.",
    options: ["Nombre", "Diseño (moño, personaje…)", "Colores"],
    imgs: [91, 98],
  },
  {
    id: "portavasos-resina", name: "Portavasos en resina", cat: "c-res", seasons: ["s-dic"],
    desc: "Set de portavasos hechos a mano en resina con detalles dorados y efectos únicos. Perfectos para estrenar en tu mesa o regalar en Navidad.",
    options: ["Colores", "Detalles dorados o plateados", "Diseño del centro"],
    imgs: [136, 137],
  },
  {
    id: "ajedrez-resina", name: "Tablero de ajedrez en resina", cat: "c-res", seasons: [],
    desc: "Tablero de ajedrez artesanal en resina con acabado en negro, blanco y dorado. Una pieza decorativa y funcional.",
    options: ["Colores", "Tamaño"],
    imgs: [139],
  },
  {
    id: "placa-reconocimiento", name: "Placa de reconocimiento en resina", cat: "c-res", seasons: ["s-grados"],
    desc: "Placa transparente en resina con base de madera, con nombre y texto en dorado. Un reconocimiento elegante para la oficina.",
    options: ["Nombre", "Texto del reconocimiento", "Color del texto"],
    imgs: [117],
  },
  {
    id: "lampara-led", name: "Cuadro y lámpara con luz LED", cat: "c-res", seasons: ["s-amor"],
    desc: "Fotos y diseños personalizados con luz LED para decorar y regalar. Una forma bonita de iluminar los mejores recuerdos.",
    options: ["Fotos", "Frase", "Forma (corazón, rectángulo…)", "Color de la luz"],
    imgs: [90, 125],
  },
  {
    id: "recordatorio-navideno", name: "Recordatorio navideño", cat: "c-res", seasons: ["s-dic"],
    desc: "Llavero de resina con tarjeta navideña personalizada, ideal para detalles de empresa, familia o amigos.",
    options: ["Nombres", "Mensaje navideño", "Logo o ilustración", "Cantidad"],
    imgs: [121],
  },
  {
    id: "souvenir-mujer", name: "Souvenir para el Día de la Mujer", cat: "c-res", seasons: ["s-madre"],
    desc: "Souvenir con tarjeta de homenaje y detalles de mariposas en resina para celebrar y honrar a las mujeres.",
    options: ["Mensaje", "Colores", "Logo de la empresa", "Cantidad"],
    imgs: [31],
  },
  {
    id: "caja-regalo-stitch", name: "Caja de regalo Stitch", cat: "c-res", seasons: ["s-amor", "s-dic"],
    desc: "Caja sorpresa con vaso con pitillo, lapicero, goma antiestrés y scrunchies, todo con la temática de tu personaje favorito.",
    options: ["Personaje", "Nombre", "Productos de la caja"],
    imgs: [84],
  },
  {
    id: "letrero-resina", name: "Letrero y logo en resina", cat: "c-res", seasons: [],
    desc: "Letreros y logos en resina para tu negocio o emprendimiento, con efectos y acabados a tu estilo.",
    options: ["Logo o nombre", "Colores", "Tamaño"],
    imgs: [9],
  },
  {
    id: "termo-stanley", name: "Termo tipo Stanley con brillos", cat: "c-res", seasons: ["s-amor", "s-madre", "s-dic"], featured: true,
    desc: "Termo de 40 oz en acero inoxidable, personalizado con tu nombre y diseño en brillos y resina. Conserva frío o calor por mucho tiempo, con tapa ergonómica. Ideal para regalar.",
    options: ["Nombre", "Colores del degradé", "Figuras (mariposas, personajes…)", "Brillos"],
    imgs: [23, 17, 16, 19],
  },
  {
    id: "vaso-termico-brillos", name: "Vaso térmico con brillos", cat: "c-res", seasons: ["s-amor", "s-madre"],
    desc: "Vaso térmico personalizado, lleno de brillo y detalles en resina. Conserva tus bebidas frías o calientes y es perfecto para el trabajo, el estudio o para regalar.",
    options: ["Nombre", "Personaje o diseño", "Colores", "Brillos"],
    imgs: [10, 0],
  },
  {
    id: "vaso-copa", name: "Vaso térmico tipo copa", cat: "c-res", seasons: ["s-amor"],
    desc: "Vaso térmico sin tallo con nombre en letras doradas o negras y brillos de color. Un detalle diferente y con mucho estilo.",
    options: ["Nombre", "Color del brillo", "Color de las letras"],
    imgs: [39, 55],
  },
  {
    id: "termo-regalo", name: "Set de regalo con termo", cat: "c-res", seasons: ["s-amor", "s-madre"],
    desc: "Termo personalizado con inicial y nombre dentro de una caja de regalo, listo para sorprender a esa persona favorita.",
    options: ["Inicial", "Nombre", "Flores y colores", "Contenido de la caja"],
    imgs: [40],
  },
  // ----- SUBLIMACIÓN -----
  {
    id: "taza-personalizada", name: "Taza personalizada", cat: "c-sub", seasons: ["s-madre", "s-amor"], featured: true,
    desc: "Tazas con tus fotos, frases o ilustraciones a todo color, estampadas con sublimación. Ideales para mamá, para parejas o para recuerdos de bebé.",
    options: ["Foto", "Ilustración o personaje", "Frase", "Nombre", "Color del asa"],
    imgs: [27, 88, 52, 80, 155, 3],
  },
  {
    id: "botella-personalizada", name: "Botella personalizada", cat: "c-sub", seasons: [],
    desc: "Botellas deportivas de aluminio con tu diseño, nombre y personaje favorito. Perfectas para el colegio, el gimnasio o para regalar.",
    options: ["Nombre", "Personaje o ilustración", "Frase", "Colores"],
    imgs: [58, 54, 62, 61, 147],
  },
  {
    id: "botella-infantil", name: "Botella infantil con pitillo", cat: "c-sub", seasons: [],
    desc: "Botella para niños con tapa y pitillo, personalizada con su nombre y su personaje favorito. Ideal para el regreso al colegio.",
    options: ["Nombre", "Personaje", "Color"],
    imgs: [100],
  },
  {
    id: "forro-tablet", name: "Forro de tablet", cat: "c-sub", seasons: ["s-dic"],
    desc: "Personalizamos el forro de tu tablet para que lo luzcas a tu estilo, con el diseño o personaje que prefieras.",
    options: ["Modelo de tablet", "Diseño o personaje", "Nombre", "Colores"],
    imgs: [5],
  },
  // ----- PAPELERÍA CREATIVA -----
  {
    id: "libreta-flores", name: "Libreta con flores eternizadas", cat: "c-pap", seasons: ["s-madre", "s-amor"], featured: true,
    desc: "Libreta con flores naturales eternizadas en la portada. Puedes escoger el color y personalizarla a tu gusto; cada hoja puede llevar tu nombre o mensaje, y se le pueden cambiar las hojas cuando se terminen.",
    options: ["Nombre", "Color de la portada", "Tipo de flores", "Mensaje en las hojas"],
    imgs: [108, 107],
  },
  {
    id: "agenda-resina", name: "Agenda personalizada en resina", cat: "c-pap", seasons: ["s-dic", "s-grados"], featured: true,
    desc: "Agendas con portada de resina y hojas internas personalizadas, para un producto único. Elige colores, nombre, detalles dorados y el estilo que más te represente.",
    options: ["Portada", "Nombre", "Colores", "Hojas internas", "Detalles dorados"],
    imgs: [96, 128, 94, 135],
  },
  {
    id: "calendario-escritorio", name: "Calendario de escritorio", cat: "c-pap", seasons: ["s-dic"],
    desc: "Calendarios de escritorio con tus personajes favoritos para organizarte con estilo y ternura.",
    options: ["Personaje o diseño", "Nombre", "Año"],
    imgs: [35, 36, 41],
  },
  {
    id: "lapicero-resina", name: "Lapicero en resina", cat: "c-pap", seasons: ["s-amor", "s-grados"],
    desc: "Lapiceros hechos a mano en resina con nombre, flores secas, brillos o foto. Un detalle útil y bonito para regalar.",
    options: ["Nombre", "Colores", "Flores o brillos", "Foto"],
    imgs: [4, 82, 133],
  },
  {
    id: "frasco-promesas", name: "Frasco de promesas bíblicas", cat: "c-fe", seasons: ["s-fe", "s-madre"],
    desc: "Frasco con más de 100 promesas bíblicas organizadas por emociones (cuando estés feliz, triste, ansiosa, bendecida…). Un detalle para encontrar paz, esperanza y fortaleza.",
    options: ["Colores del frasco", "Nombre", "Lazo y decoración"],
    imgs: [20, 38],
  },
  {
    id: "caminando-con-jesus", name: "Línea «Caminando con Jesús»", cat: "c-fe", seasons: ["s-fe"],
    desc: "Una línea con propósito: puedes escoger entre distintas frases y reflexiones de Jesús, para ti o para alguien especial que lo necesite. Se aplica en botellas, tazas y papelería con la misma temática.",
    options: ["Frase o reflexión", "Producto (taza, botella, libreta…)", "Nombre"],
    imgs: [3, 1],
  },
  {
    id: "cuadro-fotos", name: "Cuadro de fotos personalizado", cat: "c-pap", seasons: ["s-amor", "s-madre"],
    desc: "Collages y fotos en cuadro con frases y fechas especiales: una historia de amor, una familia o un aniversario.",
    options: ["Fotos", "Frase", "Fecha", "Tamaño del cuadro"],
    imgs: [86, 72],
  },
];

/** Subcategoría de cada producto de ejemplo (en Supabase la asigna la administradora). */
const SUB_OF: Record<string, string> = {
  "recordatorio-15-anos": "recordatorios-15-anos",
  "recordatorio-mariposa": "recordatorios-15-anos",
  "recordatorio-boda": "recordatorios-boda",
  "recordatorio-baby-shower": "recordatorios-baby-shower",
  "recuerdo-nacimiento": "eternizados-de-nacimiento-de-bebe",
  "llavero-cabo-de-ano": "recordatorios-cabo-de-ano",
  "llavero-grado": "recordatorios-de-graduacion",
  "llavero-nombre": "llaveros-tematicos",
  "llavero-didactico": "kids",
  "placa-mascota": "accesorios",
  "imanes-resina": "accesorios",
  portacarnet: "accesorios",
  "portavasos-resina": "accesorios",
  "ajedrez-resina": "accesorios",
  "placa-reconocimiento": "recordatorios-corporativos",
  "lampara-led": "cuadros",
  "recordatorio-navideno": "recordatorios-corporativos",
  "souvenir-mujer": "recordatorios-corporativos",
  "caja-regalo-stitch": "kids",
  "letrero-resina": "recordatorios-corporativos",
  "termo-stanley": "termos",
  "vaso-termico-brillos": "termos",
  "vaso-copa": "termos",
  "termo-regalo": "termos",
  "taza-personalizada": "mugs",
  "botella-personalizada": "termos",
  "botella-infantil": "vasos",
  "libreta-flores": "libretas",
  "agenda-resina": "agendas",
  "calendario-escritorio": "calendarios",
  "frasco-promesas": "combos",
  "caminando-con-jesus": "combos",
};

export const demoProducts: Product[] = raw.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.id,
  description: p.desc,
  images: p.imgs.map(f),
  options: p.options,
  categoryId: p.cat,
  subcategoryId: SUB_OF[p.id],
  seasonIds: p.seasons,
  featured: Boolean(p.featured),
  active: true,
  price: 0,
}));
