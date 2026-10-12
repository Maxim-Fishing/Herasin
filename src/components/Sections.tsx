"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Product } from "@/lib/types";
import { useActiveProducts, useData } from "@/lib/store";
import { reelCode, whatsappLink } from "@/lib/utils";
import { asset } from "@/lib/assets";
import Pic, { NinaWhatsapp } from "./Pic";

export function PageHero({
  title,
  subtitle,
  emoji,
  soft = false,
}: {
  title: string;
  subtitle?: string;
  emoji?: string;
  soft?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden border-b-[3px] border-dotted border-cafe/25 ${soft ? "bg-hearts-soft" : "bg-hearts"}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 text-center md:py-20">
        {emoji && <div className="animate-float mb-3 text-5xl">{emoji}</div>}
        <h1 className={`font-display text-4xl font-semibold md:text-5xl ${soft ? "text-lila-700" : "text-lila-800"}`}>{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-lila-900/70">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Section({
  title,
  subtitle,
  children,
  tint = false,
  script,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  tint?: boolean;
  /** Palabra corta en tipografía script, sobre el título. */
  script?: string;
}) {
  return (
    <section
      className={`border-t-[3px] border-dotted border-cafe/20 py-16 first:border-t-0 ${tint ? "bg-white/45" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        {title && (
          <div className="mb-10 text-center">
            {script && <p className="font-script text-2xl text-lila-500">{script}</p>}
            <h2 className="font-display text-3xl font-semibold text-lila-800 md:text-4xl">{title}</h2>
            {subtitle && <p className="mx-auto mt-3 max-w-2xl text-lila-900/70">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export type Step = { n: number; icon: string; title: string; text: string };

/** Proceso de la resina: foco principal de HERARESIN. */
export const resinSteps: Step[] = [
  { n: 1, icon: "✏️", title: "Diseñamos contigo", text: "Definimos nombre, foto, colores y temática, y diseñamos la tarjeta o la pieza a tu gusto." },
  { n: 2, icon: "🧪", title: "Mezcla y color", text: "Medimos la resina y el catalizador, y añadimos pigmentos, brillos, flores secas o tu foto." },
  { n: 3, icon: "💧", title: "Vertido en moldes", text: "Creamos cada pieza una por una, vertiendo en el molde y cuidando que no queden burbujas." },
  { n: 4, icon: "⏳", title: "Curado de 24 horas", text: "La resina reposa el tiempo necesario para endurecer y lograr ese brillo perfecto." },
  { n: 5, icon: "🎁", title: "Acabado y empaque", text: "Desmoldamos, pulimos, montamos los herrajes y preparamos tu pedido con acabados de lujo." },
];

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s) => (
        <li key={s.n} className="relative rounded-[1.75rem] border-[3px] border-dotted border-cafe/25 bg-white p-6">
          <span className="absolute -top-3 left-5 rounded-full bg-lila-500 px-3 py-0.5 text-xs font-bold text-white">
            Paso {s.n}
          </span>
          <div className="mb-2 mt-2 text-4xl">{s.icon}</div>
          <h3 className="font-display text-lg font-semibold text-lila-800">{s.title}</h3>
          <p className="mt-1 text-sm text-lila-900/70">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Video corto de resina, en formato historia con tu arte final. */
export function ResinVideo({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/40 bg-lila-200 shadow-xl shadow-lila-200 sm:max-w-[360px] md:max-w-[420px] ${className}`}>
      <video
        src={asset("/video/resina.mp4")}
        poster={asset("/video/resina-poster.jpg")}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="aspect-[9/16] w-full object-cover"
        aria-label="Video de piezas en resina hechas por HERARESIN"
      />
    </div>
  );
}

export function VideoBlock() {
  return (
    <Section script="Mira la magia" title="La resina en acción">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-14">
        <ResinVideo />
        <div className="text-center md:text-left">
          <p className="text-xl leading-relaxed text-lila-900/85">
            Cada pieza nace en el taller: se mezcla, se vierte, se cura y se pule a mano.
            Mira algunas de nuestras creaciones en resina.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["🧪", "Mezcla y color", "Pigmentos, brillos y flores a tu gusto."],
              ["💧", "Vertido a mano", "Pieza por pieza, sin producción en masa."],
              ["⏳", "Curado de 24 horas", "Para lograr ese brillo cristalino."],
              ["✨", "Pulido y empaque", "Acabados cuidados antes de entregar."],
            ].map(([icon, title, text]) => (
              <li key={title} className="rounded-[1.5rem] border-[3px] border-dotted border-cafe/25 bg-white p-4 text-left">
                <span className="text-2xl">{icon}</span>
                <p className="mt-1 font-display font-semibold text-lila-800">{title}</p>
                <p className="text-sm text-lila-900/70">{text}</p>
              </li>
            ))}
          </ul>

          <Link href="/como-lo-hacemos" className="btn btn-primary mt-7">Ver el proceso paso a paso</Link>
        </div>
      </div>
    </Section>
  );
}

type FaithSlide = { key: string; product: Product; image: string };

/** Frases que acompañan cada tarjeta (texto propio de la línea). */
const faithPhrases = [
  "Tu palabra es una lámpara a mis pies y una luz en mi camino.",
  "Una palabra de aliento para cada momento de tu vida.",
  "Él estaba ahí cuando pediste fuerzas para no desistir.",
  "Para ti, o para alguien especial que lo necesita.",
];

/**
 * Banda horizontal de la línea de fe: tarjetas grandes con la foto en arco
 * (como una ventana de capilla). Avanza sola, se desliza con el dedo y
 * también se maneja con flechas y puntos.
 */
function FaithCarousel({ slides, slug }: { slides: FaithSlide[]; slug?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el || !n) return;
      const child = el.children[((i % n) + n) % n] as HTMLElement | undefined;
      if (!child) return;
      el.scrollTo({
        left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
        behavior: "smooth",
      });
    },
    [n],
  );

  // Avance automático cada 5 s (se detiene al tocar/pasar el cursor).
  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(activeRef.current + 1), 5000);
    return () => clearInterval(t);
  }, [paused, n, go]);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const ch = c as HTMLElement;
      const d = Math.abs(ch.offsetLeft + ch.clientWidth / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    if (best !== activeRef.current) {
      activeRef.current = best;
      setActive(best);
    }
  };

  return (
    <section
      className="bg-hearts relative overflow-hidden border-t-[3px] border-dotted border-cafe/20 py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* resplandor suave detrás de las tarjetas */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="font-script text-2xl text-lila-600">Con fe y esperanza</p>
          <h2 className="font-display text-3xl font-semibold text-lila-800 md:text-4xl">✝️ Caminando con Jesús</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lila-900/75">
            Una línea con propósito: frases y reflexiones para ti o para alguien especial que lo necesite.
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={track}
          onScroll={onScroll}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Línea de fe Caminando con Jesús"
          className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[7vw] pb-4 md:px-[max(1rem,calc(50%-340px))]"
        >
          {slides.map((s, i) => (
            <article
              key={s.key}
              aria-label={`${i + 1} de ${n}: ${s.product.name}`}
              className="w-[86vw] max-w-[680px] shrink-0 snap-center"
            >
              <div className="grid h-full overflow-hidden rounded-[2.25rem] border-[3px] border-dotted border-cafe/40 bg-white/95 shadow-xl shadow-lila-200/70 sm:grid-cols-[0.85fr_1.15fr]">
                {/* ventana en arco */}
                <div className="relative flex items-end justify-center bg-gradient-to-b from-lila-200 via-lila-100 to-white px-6 pb-5 pt-8">
                  <span aria-hidden className="absolute left-4 top-3 text-xl text-lila-400">✦</span>
                  <span aria-hidden className="absolute right-5 top-8 text-sm text-lila-300">✦</span>
                  <div className="relative w-full max-w-[250px] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] border-[5px] border-white bg-lila-200 shadow-lg">
                    <Pic src={s.image} alt={s.product.name} emoji="✝️" className="aspect-[3/4] w-full" />
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 text-left">
                  <p className="font-script text-lg text-lila-500">Caminando con Jesús</p>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-lila-800">{s.product.name}</h3>
                  <blockquote className="mt-3 border-l-[3px] border-dotted border-lila-400 pl-3 font-script text-lg leading-snug text-lila-700">
                    “{faithPhrases[i % faithPhrases.length]}”
                  </blockquote>
                  <p className="mt-3 line-clamp-3 text-sm text-lila-900/70">{s.product.description}</p>
                  <Link href={`/producto?s=${s.product.slug}`} className="btn btn-primary mt-5 self-start">
                    Ver y cotizar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(active - 1)}
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-lila-300 bg-white/95 text-2xl text-lila-700 shadow-lg transition hover:bg-lila-100 md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => go(active + 1)}
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-lila-300 bg-white/95 text-2xl text-lila-700 shadow-lg transition hover:bg-lila-100 md:flex"
            >
              ›
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Elegir tarjeta">
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Ir a la tarjeta ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-8 bg-lila-600" : "w-2.5 bg-lila-300 hover:bg-lila-400"}`}
            />
          ))}
        </div>
      )}

      {slug && (
        <p className="relative mt-8 text-center">
          <Link href={`/temporada?s=${slug}`} className="btn btn-ghost">Ver toda la línea de fe</Link>
        </p>
      )}
    </section>
  );
}

/** Bucket de fe: línea «Caminando con Jesús». */
export function FaithBlock() {
  const products = useActiveProducts();
  const { seasons } = useData();
  const faith = seasons.find((s) => s.slug === "fe");
  const slides: FaithSlide[] = products
    .filter((p) => faith && p.seasonIds.includes(faith.id))
    .flatMap((p) =>
      (p.images.length ? p.images.slice(0, 3) : [""]).map((image, i) => ({
        key: `${p.id}-${i}`,
        product: p,
        image,
      })),
    )
    .slice(0, 8);
  if (!slides.length) return null;
  return <FaithCarousel slides={slides} slug={faith?.slug} />;
}

export function Testimonials() {
  const { settings } = useData();
  if (!settings.testimonials.length) return null;
  return (
    <Section title="Lo que dicen nuestros clientes" tint>
      <div className="grid gap-5 md:grid-cols-3">
        {settings.testimonials.map((t, i) => (
          <figure key={i} className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <div className="text-lila-400">★★★★★</div>
            <blockquote className="mt-2 text-lila-900/80">“{t.text}”</blockquote>
            <figcaption className="mt-3 text-sm font-bold text-lila-700">— {t.name}</figcaption>
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
          <details key={i} className="group rounded-3xl border-2 border-lila-200 bg-white p-5 open:bg-lila-50">
            <summary className="cursor-pointer list-none font-display font-semibold text-lila-800 marker:hidden">
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
      <div className="mx-auto max-w-xl rounded-[2rem] border-[3px] border-dotted border-cafe/30 bg-lila-100 p-8 text-center">
        <div className="text-5xl">📸</div>
        <p className="mt-3 font-display text-2xl font-semibold text-lila-800">{settings.instagramHandle}</p>
        <p className="mt-1 text-lila-900/70">Pedidos reales, detrás de cámaras y novedades de cada temporada.</p>
        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
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
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/30 bg-hearts p-10 text-center">
        <NinaWhatsapp className="absolute -bottom-2 left-3 hidden h-44 w-auto md:block" />
        <h2 className="font-display text-3xl font-semibold text-lila-800">{text}</h2>
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
          <Pic key={src + i} src={src} alt="Trabajo de HERARESIN" className="w-full rounded-3xl" />
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
          <div key={c} className="overflow-hidden rounded-[1.75rem] border-2 border-lila-200 bg-white">
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
        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-lila-600 hover:underline">
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
      <div className="bg-hearts grid items-center gap-10 overflow-hidden rounded-[2rem] border-[3px] border-dotted border-cafe/30 p-6 md:grid-cols-2 md:p-10">
        <Pic src={c.image} alt={c.title} emoji="🎓" className="aspect-[4/3] w-full rounded-3xl" />
        <div>
          <p className="font-script text-xl text-lila-500">Aprende con nosotros</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-lila-800">{c.title}</h2>
          <p className="mt-3 text-lila-900/75">{c.description}</p>
          {c.topics.length > 0 && (
            <ul className="mt-4 grid gap-1.5 text-sm text-lila-900/80 sm:grid-cols-2">
              {c.topics.map((t) => (
                <li key={t} className="flex gap-2"><span className="text-lila-500">✦</span>{t}</li>
              ))}
            </ul>
          )}
          {c.note && <p className="mt-4 text-sm font-semibold text-lila-700">{c.note}</p>}
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

/** Banda suave con la cifra de clientes. */
export function StatsBand() {
  const { settings } = useData();
  if (!settings.customers) return null;
  return (
    <section className="border-y-[3px] border-dotted border-cafe/30 bg-lila-100">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 text-center sm:grid-cols-3">
        {[
          [settings.customers, "clientes felices"],
          ["100%", "personalizado"],
          ["A mano", "pieza por pieza"],
        ].map(([n, l]) => (
          <div key={l}>
            <p className="font-display text-3xl font-semibold text-lila-700">{n}</p>
            <p className="text-sm font-medium text-lila-900/70">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-sm font-bold text-lila-600 hover:underline">
      ← {children}
    </Link>
  );
}
