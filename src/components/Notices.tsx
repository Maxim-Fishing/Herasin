import Link from "next/link";
import { PRODUCT_NOTICES } from "@/lib/utils";

/** Avisos que acompañan a todo producto y a todo kit. */
export default function Notices() {
  return (
    <div className="mt-6 rounded-[1.5rem] border-[3px] border-dotted border-cafe/30 bg-lila-50 p-4">
      <p className="font-heading font-semibold text-lila-800">Importante</p>
      <ul className="mt-2 space-y-1.5 text-sm text-lila-900/80">
        {PRODUCT_NOTICES.map((n) => (
          <li key={n} className="flex gap-2"><span className="text-lila-500">✦</span>{n}</li>
        ))}
      </ul>
      <Link href="/politicas" className="mt-3 inline-block text-sm font-bold text-lila-600 hover:underline">
        Ver todas las políticas →
      </Link>
    </div>
  );
}
