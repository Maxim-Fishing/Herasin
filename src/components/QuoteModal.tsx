"use client";

import { useData } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";
import { Logo, Nina } from "./Pic";

/** Confirmación antes de abrir WhatsApp: la niña de la marca con el logo y el mensaje. */
export default function QuoteModal({ message, onClose }: { message: string; onClose: () => void }) {
  const { settings } = useData();

  const send = () => {
    window.open(whatsappLink(settings, message), "_blank", "noopener");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-lila-900/45 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Enviar cotización por WhatsApp"
        onClick={(e) => e.stopPropagation()}
        className="animate-pop-in bg-hearts relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border-[3px] border-dotted border-cafe/40 p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-lila-700 hover:bg-lila-100"
        >
          ✕
        </button>

        <div className="flex items-end justify-center gap-3">
          <Nina className="h-32 w-auto" />
          <Logo className="h-20 w-auto" />
        </div>

        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-lila-800">¡Casi listo! 💜</h2>
        <p className="mt-1 text-center text-sm text-lila-900/70">
          Este es el mensaje que enviaremos por WhatsApp. Podrás ajustarlo antes de enviarlo.
        </p>

        <pre className="mt-4 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-white p-4 text-left font-sans text-sm text-lila-900/85">
          {message}
        </pre>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button onClick={send} className="btn btn-wa">💬 Enviar por WhatsApp</button>
          <button onClick={onClose} className="btn btn-ghost">Seguir editando</button>
        </div>
      </div>
    </div>
  );
}
