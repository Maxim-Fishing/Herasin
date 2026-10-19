"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import Gallery from "@/components/Gallery";
import Notices from "@/components/Notices";
import Pic, { Nina } from "@/components/Pic";
import ProductCard from "@/components/ProductCard";
import CardGrid from "@/components/CardGrid";
import QuoteModal from "@/components/QuoteModal";
import { BackLink, Section } from "@/components/Sections";
import { useActiveProducts, useData } from "@/lib/store";
import { kitImages, kitItems } from "@/lib/kits";
import { formatPrice, kitQuoteMessage } from "@/lib/utils";

/** Un kit funciona como un producto: fotos, valor y, de «personalización», las piezas que lleva. */
function Kit() {
  const slug = useSearchParams().get("s");
  const { seasons, loading } = useData();
  const products = useActiveProducts();
  const season = seasons.find((s) => s.slug === slug);
  const [off, setOff] = useState<string[]>([]); // piezas que la clienta decide no llevar
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (season) document.title = `Kit ${season.name} · HERARESIN`;
  }, [season]);

  if (!season) {
    return (
      <Section>
        {loading ? <Loading /> : <p className="text-center text-lila-700">No encontramos este kit.</p>}
        <p className="mt-4 text-center"><BackLink href="/temporadas">Ver todos los kits</BackLink></p>
      </Section>
    );
  }

  const items = kitItems(season, products);
  const picked = items.filter((p) => !off.includes(p.id));
  const price = season.price ?? 0;
  const toggle = (id: string) => setOff((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const quote = () =>
    setMessage(kitQuoteMessage({ season, items: picked, notes, url: window.location.href }));

  return (
    <>
      <Section>
        <div className="mb-6"><BackLink href="/temporadas">Todos los kits</BackLink></div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* FOTOS (verticales, con zoom) */}
          <Gallery
            images={kitImages(season)}
            alt={`Kit ${season.name}`}
            emoji={season.emoji}
            overlay={<Nina className="pointer-events-none absolute bottom-3 left-3 h-24 w-auto drop-shadow-[0_3px_6px_rgba(94,59,79,0.35)] sm:h-28" />}
          />

          {/* DATOS */}
          <div>
            <p className="font-script text-xl text-lila-500">Kit de temporada</p>
            <h1 className="font-display text-3xl text-lila-800 md:text-4xl">{season.emoji} Kit {season.name}</h1>
            <p className="mt-2 text-2xl font-bold text-lila-600">
              {price > 0 ? formatPrice(price) : "Precio: cotízalo por WhatsApp"}
            </p>
            {season.description && <p className="mt-4 whitespace-pre-line text-lila-900/80">{season.description}</p>}

            <h2 className="mt-7 font-heading text-lg font-semibold text-lila-800">✨ Arma tu kit</h2>
            <p className="text-sm text-lila-900/60">
              Estas son las piezas del kit. Quita las que no quieras llevar; irá en tu mensaje.
            </p>
            {items.length === 0 ? (
              <p className="mt-3 rounded-2xl bg-lila-50 p-4 text-sm text-lila-700">Este kit aún no tiene piezas. ¡Pronto! 💜</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {items.map((p) => {
                  const on = !off.includes(p.id);
                  return (
                    <li
                      key={p.id}
                      className={`flex items-center gap-2 rounded-[1.25rem] border-2 p-2 transition ${
                        on ? "border-lila-400 bg-white" : "border-lila-100 bg-lila-50/60 opacity-70"
                      }`}
                    >
                      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                        <input type="checkbox" className="h-5 w-5 shrink-0 accent-[#c961c2]" checked={on} onChange={() => toggle(p.id)} />
                        <Pic src={p.images[0]} alt="" className="aspect-[3/4] w-12 shrink-0 rounded-xl text-xl" />
                        <span className="min-w-0">
                          <span className="block truncate font-heading font-semibold text-lila-800">{p.name}</span>
                          {p.price > 0 && <span className="text-xs font-semibold text-lila-600">{formatPrice(p.price)}</span>}
                        </span>
                      </label>
                      <Link href={`/producto?s=${p.slug}`} className="shrink-0 rounded-full px-3 py-1 text-xs font-bold text-lila-600 hover:bg-lila-100">
                        Ver
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <textarea
              className="input mt-3 min-h-20"
              placeholder="¿Algo más que debamos saber? Colores, nombre, frase, cantidad…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button onClick={quote} className="btn btn-wa mt-6 w-full sm:w-auto">
              💬 Cotizar el kit por WhatsApp
            </button>

            <Notices />
          </div>
        </div>
      </Section>

      {items.length > 0 && (
        <Section script="Pieza por pieza" title="Conoce lo que lleva el kit" tint>
          <CardGrid>
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </CardGrid>
        </Section>
      )}

      {message && <QuoteModal message={message} onClose={() => setMessage(null)} />}
    </>
  );
}

export default function TemporadaPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Kit />
    </Suspense>
  );
}
