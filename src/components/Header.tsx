"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Pic";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/como-lo-hacemos", label: "¿Cómo lo hacemos?" },
  { href: "/temporadas", label: "Temporadas" },
  { href: "/categorias", label: "Categorías" },
  { href: "/politicas", label: "Políticas" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Arriba el logo se ve grande; al bajar se achica para no quitar espacio.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (href: string) => {
    const p = path.replace(/\/$/, "") || "/";
    if (href === "/") return p === "/";
    const singular: Record<string, string> = { "/temporadas": "/temporada", "/categorias": "/categoria" };
    return p.startsWith(href) || (singular[href] ? p.startsWith(singular[href]) : false);
  };

  return (
    <header className="sticky top-0 z-40 bg-lila-50/90 shadow-[0_8px_24px_-16px_rgba(168,71,159,0.5)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" aria-label="HERARESIN, inicio">
          <Logo className={`w-auto transition-[height] duration-300 ${scrolled ? "h-12" : "h-16 md:h-20"}`} />
        </Link>

        <nav className="hidden gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                active(l.href) ? "bg-lila-200 text-lila-800" : "text-lila-900 hover:bg-lila-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Abrir menú"
          className="rounded-full bg-lila-100 px-3 py-2 text-xl text-lila-700 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-[3px] border-dotted border-cafe/30 bg-lila-50 px-4 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3 font-bold ${
                active(l.href) ? "bg-lila-200 text-lila-800" : "text-lila-900"
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
