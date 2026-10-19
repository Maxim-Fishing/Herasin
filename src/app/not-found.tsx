import Link from "next/link";
import { Nina } from "@/components/Pic";

export const metadata = { title: "Página no encontrada" };

/** 404 de la marca (GitHub Pages la sirve como 404.html). */
export default function NotFound() {
  return (
    <section className="bg-hearts-soft px-4 py-16 text-center md:py-24">
      <div className="mx-auto max-w-md rounded-[2rem] border-[3px] border-dotted border-cafe/35 bg-white/85 p-8 shadow-lg shadow-lila-200">
        <Nina className="animate-float mx-auto h-44 w-auto" />
        <p className="mt-2 font-script text-xl text-lila-500">¡Ups!</p>
        <h1 className="font-display text-4xl text-lila-800">No encontramos esa página</h1>
        <p className="mt-3 text-lila-900/70">Puede que el enlace esté mal escrito o que el producto ya no esté disponible.</p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/" className="btn btn-primary">Volver al inicio</Link>
          <Link href="/categorias" className="btn btn-ghost">Ver productos</Link>
        </div>
      </div>
    </section>
  );
}
