import type { Policy } from "./types";

/** Políticas de HERARESIN. Cada línea de `text` se muestra como un punto. */
export const defaultPolicies: Policy[] = [
  {
    icon: "📝",
    title: "Forma de pedido",
    text: [
      "Cada pedido debe llevar:",
      "Foto de referencia",
      "Nombre",
      "Dirección",
      "Cantidad que solicita",
      "Todo pedido se programa con anticipación: mínimo 10 días para pedidos por unidad y un mes para pedidos de más de 30 unidades.",
    ].join("\n"),
  },
  {
    icon: "🎨",
    title: "Productos personalizados",
    text: [
      "La mayoría de nuestros productos son personalizados.",
      "Temáticas: el cliente puede sugerir la temática, el color, la decoración y el nombre o los mensajes de la personalización, según la categoría.",
      "Siempre que se toma un pedido se requiere un abono del 50 % del costo total.",
      "Las solicitudes se desarrollan bajo los estándares de diseño de Hera Resin.",
    ].join("\n"),
  },
  {
    icon: "🛡️",
    title: "Garantías",
    text: [
      "Durante la producción y antes de despachar cada pedido, enviamos foto y video como evidencia del estado de los productos.",
      "Se aceptan sugerencias y cambios en el diseño solo mientras el pedido esté en la etapa inicial de fabricación. Una vez aprobado, ya no se aceptan cambios ni reclamaciones.",
      "Cada producto en resina es hecho a mano, por lo que no es idéntico a otro elaborado antes.",
    ].join("\n"),
  },
  {
    icon: "📦",
    title: "Envíos",
    text: [
      "Realizamos envíos locales y nacionales.",
      "Todo costo de envío es asumido por el cliente.",
      "En caso de pérdida o avería en el transporte nacional, lo asume el seguro de la transportadora.",
    ].join("\n"),
  },
];
