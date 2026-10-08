"use client";

import Link from "next/link";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

export default function Footer() {
  const { settings } = useData();
  return (
    <footer className="mt-20 bg-lila-900 text-lila-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-bold text-white">
            HERA<span className="text-lila-400">RESIN</span>
          </p>
          <p className="mt-3 text-sm text-lila-200">
            Detalles personalizados hechos a mano en resina, con sublimación y papelería creativa. Neiva, Huila.
          </p>
        </div>

        <div>
          <p className="mb-3 font-semibold text-white">Explora</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quienes-somos" className="hover:text-white">Quiénes somos</Link></li>
            <li><Link href="/como-lo-hacemos" className="hover:text-white">¿Cómo lo hacemos?</Link></li>
            <li><Link href="/temporadas" className="hover:text-white">Temporadas</Link></li>
            <li><Link href="/categorias" className="hover:text-white">Categorías</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold text-white">Contacto</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={whatsappLink(settings, "Hola HERARESIN 💜")} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp: +{settings.whatsapp}
              </a>
            </li>
            <li>
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram: {settings.instagramHandle}
              </a>
            </li>
            {settings.email && <li>{settings.email}</li>}
            <li>{settings.city}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-lila-800 px-4 py-5 text-center text-xs text-lila-300">
        © {new Date().getFullYear()} HERARESIN. Todos los derechos reservados.{" "}
        <Link href="/admin" className="ml-2 underline-offset-2 hover:underline">
          Administración
        </Link>
      </div>
    </footer>
  );
}
