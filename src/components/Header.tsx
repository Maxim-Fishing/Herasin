"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/como-lo-hacemos", label: "¿Cómo lo hacemos?" },
  { href: "/temporadas", label: "Temporadas" },
  { href: "/categorias", label: "Categorías" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const active = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-lila-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-wide text-lila-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-full" />
          <span>HERA<span className="text-lila-400">RESIN</span></span>
        </Link>

        <nav className="hidden gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active(l.href)
                  ? "bg-lila-600 text-white"
                  : "text-lila-900 hover:bg-lila-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Abrir menú"
          className="rounded-full p-2 text-2xl text-lila-700 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-lila-100 bg-white px-4 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 font-medium ${
                active(l.href) ? "bg-lila-100 text-lila-700" : "text-lila-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
