"use client";

import Link from "next/link";
import SeasonPopup from "@/components/SeasonPopup";
import IntroHero from "@/components/IntroHero";
import ProductCard from "@/components/ProductCard";
import Pic from "@/components/Pic";
import {
  CourseBlock,
  CtaWhatsapp,
  Faq,
  FaithBlock,
  GalleryBlock,
  InstagramBlock,
  ReelsBlock,
  Section,
  StatsBand,
  Testimonials,
  VideoBlock,
} from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";

export default function Home() {
  const { seasons, categories } = useData();
  const products = useActiveProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const kits = [...seasons].sort((a, b) => a.order - b.order).filter((s) => s.slug !== "fe");

  return (
    <>
      <SeasonPopup />

      <IntroHero />

      <StatsBand />

      {/* RESINA: foco principal */}
      <Section script="Nuestra especialidad" title="¿Qué es la resina?" subtitle="Aprende de qué se trata el material con el que creamos casi todo.">
        <div className="mx-auto grid max-w-4xl gap-5 text-lila-900/80 md:grid-cols-2 md:gap-8">
          <p className="text-lg leading-relaxed">
            La <strong className="text-lila-700">resina epóxica</strong> es un material líquido que, al mezclarse con
            su catalizador, endurece y queda transparente y brillante.
          </p>
          <p className="text-lg leading-relaxed">
            Con ella <strong className="text-lila-700">encapsulamos fotos, flores, brillos y colores</strong> dentro de
            llaveros, recordatorios, cuadros, agendas y más. Cada pieza se vierte en un molde, se cura por 24 horas
            y se pule a mano.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {[
            ["/resina/brillo.jpg", "Brillo cristalino"],
            ["/resina/duracion.jpg", "Larga duración"],
            ["/resina/fotos.jpg", "Tus fotos y recuerdos"],
            ["/resina/manos.jpg", "Hecho a mano"],
          ].map(([src, label]) => (
            <figure key={label} className="overflow-hidden rounded-[1.75rem] border-[3px] border-dotted border-cafe/30 bg-white p-1.5 text-center">
              <Pic src={src} alt={label} className="aspect-square w-full rounded-[1.25rem]" />
              <figcaption className="px-1 pb-2 pt-2 font-display text-sm font-semibold text-lila-800 sm:text-base">{label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="rounded-3xl bg-lila-100 px-5 py-3 text-sm text-lila-900/80">
            🎨 También trabajamos <strong>sublimación</strong> para tazas, botellas y forros, con diseños a todo color
            que no se despintan.
          </p>
          <Link href="/como-lo-hacemos" className="btn btn-primary">Ver el proceso paso a paso</Link>
        </div>
      </Section>

      <VideoBlock />

      {/* FE */}
      <FaithBlock />

      {/* TEMPORADAS COMO KITS */}
      {kits.length > 0 && (
        <Section script="Siempre en kit" title="Kits de temporada" subtitle="Cada temporada es un kit de detalles que combinan entre sí." tint>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {kits.slice(0, 8).map((s) => {
              const n = products.filter((p) => p.seasonIds.includes(s.id)).length;
              return (
                <Link
                  key={s.id}
                  href={`/temporada?s=${s.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border-[3px] border-dotted border-cafe/30 bg-white p-2 text-center transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
                >
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <Pic src={s.image} alt={s.name} emoji={s.emoji} className="aspect-square w-full transition duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-display font-semibold text-lila-800">{s.emoji} Kit {s.name}</p>
                  <p className="pb-2 text-xs font-medium text-lila-900/60">{n} piezas</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/temporadas" className="btn btn-ghost">Ver todos los kits</Link>
          </div>
        </Section>
      )}

      {/* PRODUCTOS DESTACADOS */}
      <Section script="Favoritos" title="Nuestros productos" subtitle="Cada uno se personaliza contigo. Elige el tuyo.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {(featured.length ? featured : products.slice(0, 8)).map((p) => (
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
                href={`/categoria?s=${c.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border-[3px] border-dotted border-cafe/30 bg-white p-2 text-center transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lila-200"
              >
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Pic src={c.image} alt={c.name} emoji={c.emoji} className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl font-semibold text-lila-800">{c.emoji} {c.name}</h3>
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
