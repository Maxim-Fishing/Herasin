"use client";

import Link from "next/link";
import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";
import { Logo, Nina } from "./Pic";

export default function Footer() {
  const { settings } = useData();
  return (
    <footer className="bg-hearts mt-20 border-t-[3px] border-dotted border-cafe/40 text-lila-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex items-end gap-4">
          <Nina className="h-36 w-auto shrink-0" />
          <div>
            <Logo className="h-16 w-auto" />
            <p className="mt-2 text-sm text-lila-900/80">
              Detalles personalizados hechos a mano en resina, con sublimación y papelería creativa. Neiva, Huila.
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 font-display text-lg font-semibold text-lila-800">Explora</p>
          <ul className="space-y-2 text-sm font-medium">
            <li><Link href="/quienes-somos" className="hover:text-lila-700">Quiénes somos</Link></li>
            <li><Link href="/como-lo-hacemos" className="hover:text-lila-700">¿Cómo lo hacemos?</Link></li>
            <li><Link href="/temporadas" className="hover:text-lila-700">Temporadas</Link></li>
            <li><Link href="/categorias" className="hover:text-lila-700">Categorías</Link></li>
            <li><Link href="/politicas" className="hover:text-lila-700">Políticas</Link></li>
            <li><Link href="/contacto" className="hover:text-lila-700">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-display text-lg font-semibold text-lila-800">Contacto</p>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <a href={whatsappLink(settings, "Hola HERARESIN 💜")} target="_blank" rel="noopener noreferrer" className="hover:text-lila-700">
                💬 WhatsApp: +{settings.whatsapp}
              </a>
            </li>
            <li>
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-lila-700">
                📸 Instagram: {settings.instagramHandle}
              </a>
            </li>
            {settings.email && <li>✉️ {settings.email}</li>}
            <li>📍 {settings.city}</li>
          </ul>
        </div>
      </div>

      <div className="border-t-[3px] border-dotted border-cafe/30 bg-lila-50/80 px-4 py-4 text-center text-xs text-lila-900/70">
        © {new Date().getFullYear()} HERARESIN. Todos los derechos reservados.{" "}
        <Link href="/admin" className="ml-2 underline-offset-2 hover:underline">
          Administración
        </Link>
      </div>
    </footer>
  );
}
