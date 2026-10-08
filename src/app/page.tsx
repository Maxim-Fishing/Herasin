"use client";

import Link from "next/link";
import SeasonPopup from "@/components/SeasonPopup";
import ProductCard from "@/components/ProductCard";
import Pic from "@/components/Pic";
import {
  CourseBlock,
  CtaWhatsapp,
  Faq,
  GalleryBlock,
  InstagramBlock,
  ReelsBlock,
  Section,
  StatsBand,
  Testimonials,
} from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

const collage = [
  { src: "/fotos/012.jpg", cls: "translate-y-6 -rotate-2", alt: "Recordatorio de boda en resina" },
  { src: "/fotos/030.jpg", cls: "-translate-y-2 rotate-2", alt: "Llavero de resina para 15 años" },
  { src: "/fotos/023.jpg", cls: "translate-y-2 rotate-1", alt: "Termo personalizado con brillos" },
  { src: "/fotos/108.jpg", cls: "-translate-y-6 -rotate-1", alt: "Libreta con flores eternizadas" },
];

export default function Home() {
  const { settings, seasons, categories } = useData();
  const products = useActiveProducts();
  const featured = products.slice(0, 8);

  return (
    <>
      <SeasonPopup />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lila-200 via-lila-100 to-white">
        <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lila-300/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-lila-400/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="text-center md:text-left">
            <p className="animate-fade-up mb-4 inline-block rounded-full bg-white/80 px-4 py-1 text-sm font-semibold text-lila-700">
              ✨ 100% personalizado · hecho a mano en Neiva
            </p>
            <h1 className="animate-fade-up font-display text-5xl font-bold leading-[1.05] text-lila-800 md:text-6xl lg:text-7xl" style={{ animationDelay: "0.1s" }}>
              {settings.heroTitle}
            </h1>
            <p className="animate-fade-up mt-6 text-lg text-lila-900/75" style={{ animationDelay: "0.2s" }}>
              {settings.heroSubtitle}
            </p>
            <div className="animate-fade-up mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start" style={{ animationDelay: "0.3s" }}>
              <Link href="/categorias" className="btn btn-primary">Ver productos</Link>
              <a
                href={whatsappLink(settings, "Hola HERARESIN 💜, quiero cotizar un producto personalizado.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                💬 Cotizar por WhatsApp
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              {collage.map((c) => (
                <Pic
                  key={c.src}
                  src={c.src}
                  alt={c.alt}
                  eager
                  className={`aspect-[4/5] w-full rounded-[1.75rem] border-4 border-white shadow-xl shadow-lila-300/50 ${c.cls}`}
                />
              ))}
            </div>
            <div className="animate-float absolute -bottom-4 -left-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-lila-700 shadow-lg md:-left-8">
              💜 {settings.customers} clientes
            </div>
            <div className="animate-float absolute -right-1 top-1/2 rounded-2xl bg-lila-600 px-4 py-2 text-sm font-semibold text-white shadow-lg md:-right-6" style={{ animationDelay: "2s" }}>
              ✨ Hecho a mano
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* DOS TÉCNICAS */}
      <Section
        title="Así creamos tus detalles"
        subtitle="Resina como base de todo lo que hacemos, y sublimación para diseños a todo color."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-lila-50 p-8">
            <div className="text-4xl">💎</div>
            <h3 className="mt-2 font-display text-2xl font-bold text-lila-800">¿Qué es la resina?</h3>
            <p className="mt-3 text-lila-900/80">
              La resina epóxica es un material líquido que, al mezclarse con su catalizador, endurece y queda
              transparente y brillante. Con ella <strong className="text-lila-700">encapsulamos fotos, flores, brillos y
              colores</strong> dentro de llaveros, recordatorios, cuadros, agendas y más. Cada pieza se vierte en molde,
              se cura por 24 horas y se pule a mano.
            </p>
          </div>
          <div className="rounded-[2rem] bg-lila-50 p-8">
            <div className="text-4xl">🎨</div>
            <h3 className="mt-2 font-display text-2xl font-bold text-lila-800">¿Qué es la sublimación?</h3>
            <p className="mt-3 text-lila-900/80">
              Es un proceso en el que una tinta especial, con calor y presión, pasa de sólido a gas y se{" "}
              <strong className="text-lila-700">integra en el material</strong> en lugar de quedarse encima como una
              calcomanía. Por eso el diseño no se pela y mantiene sus colores en tazas, botellas, forros y más.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/como-lo-hacemos" className="btn btn-primary">Ver el proceso paso a paso</Link>
        </div>
      </Section>

      {/* TEMPORADAS */}
      {seasons.length > 0 && (
        <Section title="Temporadas" subtitle="Detalles pensados para cada ocasión especial." tint>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[...seasons].sort((a, b) => a.order - b.order).slice(0, 10).map((s) => (
              <Link
                key={s.id}
                href={`/temporadas/${s.slug}`}
                className="group overflow-hidden rounded-3xl bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
              >
                <Pic src={s.image} alt={s.name} emoji={s.emoji} className="aspect-square w-full transition duration-500 group-hover:scale-105" />
                <p className="p-3 text-sm font-semibold text-lila-800">{s.emoji} {s.name}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/temporadas" className="btn btn-ghost">Ver todas las temporadas</Link>
          </div>
        </Section>
      )}

      {/* PRODUCTOS DESTACADOS */}
      <Section title="Nuestros productos" subtitle="Cada uno se personaliza contigo. Elige el tuyo.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/categorias" className="btn btn-ghost">Ver todas las categorías</Link>
        </div>
      </Section>

      {/* CATEGORÍAS */}
      {categories.length > 0 && (
        <Section title="Explora por categoría" tint>
          <div className="grid gap-5 md:grid-cols-3">
            {[...categories].sort((a, b) => a.order - b.order).map((c) => (
              <Link
                key={c.id}
                href={`/categorias/${c.slug}`}
                className="group overflow-hidden rounded-3xl bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
              >
                <Pic src={c.image} alt={c.name} emoji={c.emoji} className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-lila-800">{c.emoji} {c.name}</h3>
                  <p className="mt-1 text-sm text-lila-900/70">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <GalleryBlock />
      <ReelsBlock />
      <CourseBlock />
      <Testimonials />
      <InstagramBlock />
      <Faq />
      <CtaWhatsapp />
    </>
  );
}
