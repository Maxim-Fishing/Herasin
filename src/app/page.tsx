"use client";

import Link from "next/link";
import SeasonPopup from "@/components/SeasonPopup";
import ProductCard from "@/components/ProductCard";
import Pic, { Nina } from "@/components/Pic";
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
import { whatsappLink } from "@/lib/utils";

const collage = [
  { src: "/fotos/012.jpg", cls: "translate-y-4 -rotate-2", alt: "Recordatorio de boda en resina" },
  { src: "/fotos/030.jpg", cls: "-translate-y-2 rotate-2", alt: "Llavero de resina para 15 años" },
  { src: "/fotos/136.jpg", cls: "translate-y-2 rotate-1", alt: "Portavasos en resina" },
  { src: "/fotos/108.jpg", cls: "-translate-y-4 -rotate-1", alt: "Libreta con flores eternizadas" },
];

export default function Home() {
  const { settings, seasons, categories } = useData();
  const products = useActiveProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const kits = [...seasons].sort((a, b) => a.order - b.order).filter((s) => s.slug !== "fe");

  return (
    <>
      <SeasonPopup />

      {/* HERO */}
      <section className="bg-hearts relative overflow-hidden border-b-[3px] border-dotted border-cafe/30">
        {["left-[6%] top-[14%]", "right-[8%] top-[10%]", "left-[46%] bottom-[8%]"].map((c, i) => (
          <span
            key={c}
            aria-hidden
            className={`animate-twinkle pointer-events-none absolute text-2xl text-lila-400 ${c}`}
            style={{ animationDelay: `${i * 1.1}s` }}
          >
            ✦
          </span>
        ))}

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="text-center md:text-left">
            <p className="animate-fade-up font-script text-2xl text-lila-500">Hecho a mano con amor</p>
            <h1 className="animate-fade-up mt-1 font-display text-4xl font-semibold leading-tight text-lila-800 md:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
              {settings.heroTitle}
            </h1>
            <p className="animate-fade-up mt-5 text-lg text-lila-900/75" style={{ animationDelay: "0.2s" }}>
              {settings.heroSubtitle}
            </p>
            <div className="animate-fade-up mt-7 flex flex-col justify-center gap-3 sm:flex-row md:justify-start" style={{ animationDelay: "0.3s" }}>
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
            <div className="mt-8 flex justify-center md:justify-start">
              <Nina className="animate-float h-40 w-auto md:h-48" />
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
                  className={`aspect-[4/5] w-full rounded-[1.75rem] border-[5px] border-white shadow-xl shadow-lila-300/60 ${c.cls}`}
                />
              ))}
            </div>
            <div className="animate-float absolute -bottom-4 -left-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-lila-700 shadow-lg md:-left-8">
              💜 {settings.customers} clientes
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* RESINA: foco principal */}
      <Section script="Nuestra especialidad" title="¿Qué es la resina?" subtitle="Aprende de qué se trata el material con el que creamos casi todo.">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4 text-lila-900/80">
            <p>
              La <strong className="text-lila-700">resina epóxica</strong> es un material líquido que, al mezclarse con
              su catalizador, endurece y queda transparente y brillante.
            </p>
            <p>
              Con ella <strong className="text-lila-700">encapsulamos fotos, flores, brillos y colores</strong> dentro de
              llaveros, recordatorios, cuadros, agendas y más. Cada pieza se vierte en un molde, se cura por 24 horas
              y se pule a mano.
            </p>
            <p className="rounded-3xl bg-lila-100 p-4 text-sm">
              🎨 También trabajamos <strong>sublimación</strong> para tazas, botellas y forros, con diseños a todo color
              que no se despintan.
            </p>
            <Link href="/como-lo-hacemos" className="btn btn-primary">Ver el proceso paso a paso</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["💎", "Brillo cristalino"],
              ["🛡️", "Larga duración"],
              ["🖼️", "Tus fotos y recuerdos"],
              ["🤲", "Hecho a mano"],
            ].map(([icon, label]) => (
              <div key={label} className="rounded-[1.75rem] border-[3px] border-dotted border-cafe/25 bg-lila-50 p-6 text-center">
                <div className="text-4xl">{icon}</div>
                <p className="mt-2 font-display font-semibold text-lila-800">{label}</p>
              </div>
            ))}
          </div>
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
