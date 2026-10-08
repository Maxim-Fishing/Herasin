"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useData } from "@/lib/store";
import { reelCode, whatsappLink } from "@/lib/utils";
import Pic from "./Pic";

export function PageHero({ title, subtitle, emoji }: { title: string; subtitle?: string; emoji?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lila-100 via-lila-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
        {emoji && <div className="animate-float mb-3 text-5xl">{emoji}</div>}
        <h1 className="font-display text-4xl font-bold text-lila-800 md:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-lila-900/70">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Section({ title, subtitle, children, tint = false }: { title?: string; subtitle?: string; children: ReactNode; tint?: boolean }) {
  return (
    <section className={tint ? "bg-lila-50 py-16" : "py-16"}>
      <div className="mx-auto max-w-6xl px-4">
        {title && (
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-lila-800 md:text-4xl">{title}</h2>
            {subtitle && <p className="mx-auto mt-3 max-w-2xl text-lila-900/70">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export type Step = { n: number; icon: string; title: string; text: string };

export const sublimationSteps: Step[] = [
  { n: 1, icon: "✏️", title: "Diseño", text: "Creamos el diseño contigo: nombre, foto, frase y colores, y te mostramos una vista previa." },
  { n: 2, icon: "🖨️", title: "Impresión especial", text: "Imprimimos tu diseño con tintas de sublimación sobre papel transfer, en espejo." },
  { n: 3, icon: "🔥", title: "Calor y presión", text: "Con la prensa a ~200 °C, la tinta pasa a gas y se funde con el material del producto." },
  { n: 4, icon: "✨", title: "Resultado duradero", text: "El color queda dentro del material, no encima: no se pela, no se desgasta y no se despinta." },
];

export const resinSteps: Step[] = [
  { n: 1, icon: "✏️", title: "Diseñamos contigo", text: "Definimos nombre, foto, colores y temática, y diseñamos la tarjeta o la pieza a tu gusto." },
  { n: 2, icon: "🧪", title: "Mezcla y color", text: "Medimos la resina y el catalizador, y añadimos pigmentos, brillos, flores secas o tu foto." },
  { n: 3, icon: "💧", title: "Vertido en moldes", text: "Creamos cada pieza una por una, vertiendo en el molde y cuidando que no queden burbujas." },
  { n: 4, icon: "⏳", title: "Curado de 24 horas", text: "La resina reposa el tiempo necesario para endurecer y lograr ese brillo perfecto." },
  { n: 5, icon: "🎁", title: "Acabado y empaque", text: "Desmoldamos, pulimos, montamos los herrajes y preparamos tu pedido con acabados de lujo." },
];

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className={`grid gap-5 sm:grid-cols-2 ${steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {steps.map((s) => (
        <li key={s.n} className="relative rounded-3xl border border-lila-100 bg-white p-6 shadow-sm">
          <span className="absolute -top-3 left-5 rounded-full bg-lila-600 px-3 py-0.5 text-xs font-bold text-white">
            Paso {s.n}
          </span>
          <div className="mb-2 mt-2 text-4xl">{s.icon}</div>
          <h3 className="font-semibold text-lila-800">{s.title}</h3>
          <p className="mt-1 text-sm text-lila-900/70">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Testimonials() {
  const { settings } = useData();
  if (!settings.testimonials.length) return null;
  return (
    <Section title="Lo que dicen nuestros clientes" tint>
      <div className="grid gap-5 md:grid-cols-3">
        {settings.testimonials.map((t, i) => (
          <figure key={i} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-lila-400">★★★★★</div>
            <blockquote className="mt-2 text-lila-900/80">“{t.text}”</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-lila-700">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  const { settings } = useData();
  return (
    <Section title="Preguntas frecuentes">
      <div className="mx-auto max-w-3xl space-y-3">
        {settings.faq.map((f, i) => (
          <details key={i} className="group rounded-2xl border border-lila-100 bg-white p-5 open:bg-lila-50">
            <summary className="cursor-pointer list-none font-semibold text-lila-800 marker:hidden">
              <span className="mr-2 text-lila-500 group-open:hidden">＋</span>
              <span className="mr-2 hidden text-lila-500 group-open:inline">－</span>
              {f.q}
            </summary>
            <p className="mt-3 text-lila-900/75">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function InstagramBlock() {
  const { settings } = useData();
  return (
    <Section title="Síguenos en Instagram" subtitle="Mira nuestros trabajos recientes, procesos y novedades.">
      <div className="mx-auto max-w-xl rounded-[2rem] bg-gradient-to-br from-lila-500 to-lila-700 p-8 text-center text-white shadow-xl">
        <div className="text-5xl">📸</div>
        <p className="mt-3 font-display text-2xl font-bold">{settings.instagramHandle}</p>
        <p className="mt-1 text-lila-100">Pedidos reales, detrás de cámaras y novedades de cada temporada.</p>
        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn mt-5 bg-white text-lila-700 hover:bg-lila-50">
          Ir a Instagram →
        </a>
      </div>
    </Section>
  );
}

export function CtaWhatsapp({ text = "¿Tienes una idea en mente?" }: { text?: string }) {
  const { settings } = useData();
  return (
    <section className="px-4">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-lila-100 p-10 text-center">
        <h2 className="font-display text-3xl font-bold text-lila-800">{text}</h2>
        <p className="mt-2 text-lila-900/70">Cuéntanos y la hacemos realidad, hecha a mano y a tu medida.</p>
        <a
          href={whatsappLink(settings, "Hola HERARESIN 💜, quiero cotizar un producto personalizado.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa mt-5"
        >
          💬 Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}

/** Mosaico de fotos de trabajos reales (editable desde el panel). */
export function GalleryBlock() {
  const { settings } = useData();
  if (!settings.gallery.length) return null;
  return (
    <Section title="Nuestro trabajo" subtitle="Piezas reales hechas a mano en nuestro taller.">
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {settings.gallery.map((src, i) => (
          <Pic key={src + i} src={src} alt="Trabajo de HERARESIN" className="w-full rounded-2xl" />
        ))}
      </div>
    </Section>
  );
}

/** Reels de Instagram incrustados. */
export function ReelsBlock({ title = "Mira cómo lo hacemos", subtitle = "Videos del taller, directo desde nuestro Instagram." }: { title?: string; subtitle?: string }) {
  const { settings } = useData();
  const codes = settings.reels.map(reelCode).filter(Boolean);
  if (!codes.length) return null;
  return (
    <Section title={title} subtitle={subtitle} tint>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {codes.map((c) => (
          <div key={c} className="overflow-hidden rounded-3xl border border-lila-100 bg-white shadow-sm">
            <iframe
              src={`https://www.instagram.com/reel/${c}/embed`}
              title="Reel de HERARESIN"
              loading="lazy"
              allowFullScreen
              className="h-[520px] w-full"
            />
          </div>
        ))}
      </div>
      <p className="mt-6 text-center">
        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-lila-600 hover:underline">
          Ver más en Instagram →
        </a>
      </p>
    </Section>
  );
}

/** Cursos presenciales de resina. */
export function CourseBlock() {
  const { settings } = useData();
  const c = settings.course;
  if (!c.enabled) return null;
  return (
    <Section>
      <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-lila-100 to-white p-6 md:grid-cols-2 md:p-10">
        <Pic src={c.image} alt={c.title} emoji="🎓" className="aspect-[4/3] w-full rounded-3xl" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lila-500">Cursos</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-lila-800">{c.title}</h2>
          <p className="mt-3 text-lila-900/75">{c.description}</p>
          {c.topics.length > 0 && (
            <ul className="mt-4 grid gap-1.5 text-sm text-lila-900/80 sm:grid-cols-2">
              {c.topics.map((t) => (
                <li key={t} className="flex gap-2"><span className="text-lila-500">✦</span>{t}</li>
              ))}
            </ul>
          )}
          {c.note && <p className="mt-4 text-sm font-medium text-lila-700">{c.note}</p>}
          <a
            href={whatsappLink(settings, "Hola HERARESIN 💜, quiero información del curso de resina.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa mt-5"
          >
            💬 Pedir información del curso
          </a>
        </div>
      </div>
    </Section>
  );
}

/** Banda con la cifra de clientes. */
export function StatsBand() {
  const { settings } = useData();
  if (!settings.customers) return null;
  return (
    <section className="bg-lila-700 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-center sm:grid-cols-3">
        {[
          [settings.customers, "clientes felices"],
          ["100%", "personalizado"],
          ["A mano", "pieza por pieza"],
        ].map(([n, l]) => (
          <div key={l}>
            <p className="font-display text-3xl font-bold">{n}</p>
            <p className="text-sm text-lila-100">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-sm font-semibold text-lila-600 hover:underline">
      ← {children}
    </Link>
  );
}
