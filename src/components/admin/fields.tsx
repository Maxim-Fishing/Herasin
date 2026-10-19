"use client";

import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import Pic from "../Pic";
import { uploadImage } from "@/lib/utils";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-lila-800">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-lila-900/50">{hint}</span>}
    </label>
  );
}

/** Una imagen: elegir archivo (se sube sola) o pegar URL. */
export function ImageField({ value, onChange, label = "Imagen" }: { value: string; onChange: (v: string) => void; label?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(file));
    } catch (er) {
      setErr((er as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {label && <span className="mb-1 block text-sm font-semibold text-lila-800">{label}</span>}
      <div className="flex items-center gap-3">
        <Pic src={value} alt="" className="h-16 w-16 shrink-0 rounded-xl text-2xl" />
        <div className="flex-1 space-y-1">
          <label className={`btn btn-soft inline-flex cursor-pointer !py-2 text-sm focus-within:ring-2 focus-within:ring-lila-500 ${busy ? "pointer-events-none opacity-60" : ""}`}>
            📷 {busy ? "Subiendo…" : value ? "Cambiar imagen" : "Elegir imagen"}
            <input type="file" accept="image/*" disabled={busy} onChange={pick} className="sr-only" />
          </label>
          <input className="input" placeholder="…o pega la URL de la imagen" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
      {busy && <p className="mt-1 text-xs text-lila-600">Subiendo…</p>}
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}

/**
 * Varias fotos: se eligen de una vez (o todas juntas) y se suben solas,
 * ya reducidas. La primera es la principal.
 */
export function ImagesField({
  value,
  onChange,
  onBusyChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const [pending, setPending] = useState(0);
  const [err, setErr] = useState("");
  const [url, setUrl] = useState("");
  const latest = useRef(value);
  useEffect(() => {
    latest.current = value;
  }, [value]);

  const setBusy = (n: number) => {
    setPending(n);
    onBusyChange?.(n > 0);
  };

  const pick = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setErr("");
    setBusy(files.length);
    let done = 0;
    const results = await Promise.allSettled(
      files.map((file) =>
        uploadImage(file).finally(() => {
          done += 1;
          setPending(files.length - done);
        }),
      ),
    );
    const urls = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
    const failed = results.find((r): r is PromiseRejectedResult => r.status === "rejected");
    if (urls.length) {
      const next = [...latest.current, ...urls];
      latest.current = next;
      onChange(next);
    }
    if (failed) setErr((failed.reason as Error).message);
    setBusy(0);
  };

  const addUrl = () => {
    const v = url.trim();
    if (!v) return;
    onChange([...value, v]);
    setUrl("");
  };

  const makeMain = (i: number) => onChange([value[i], ...value.filter((_, j) => j !== i)]);

  return (
    <div className="space-y-3">
      <span className="block text-sm font-semibold text-lila-800">Fotos (la primera es la principal)</span>

      <label
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-3xl border-[3px] border-dashed border-lila-300 bg-lila-50 px-4 py-6 text-center transition hover:bg-lila-100 ${
          pending > 0 ? "pointer-events-none opacity-70" : ""
        }`}
      >
        <span className="text-3xl">📷</span>
        <span className="font-bold text-lila-700">
          {pending > 0 ? `Subiendo… faltan ${pending}` : "Toca para elegir fotos"}
        </span>
        <span className="text-xs text-lila-900/60">
          Mejor verticales (3:4), como salen del celular. Puedes elegir varias a la vez; se suben solas y se reducen.
        </span>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={pick} disabled={pending > 0} />
      </label>
      {err && <p className="text-sm text-red-600">{err}</p>}

      {value.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((src, i) => (
            <li key={src + i} className="relative">
              <Pic src={src} alt={`Foto ${i + 1}`} className="aspect-[3/4] w-full rounded-2xl border-2 border-lila-200" />
              {i === 0 ? (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-lila-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  Principal
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => makeMain(i)}
                  className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-lila-700 shadow"
                >
                  ⭐ Hacer principal
                </button>
              )}
              <button
                type="button"
                aria-label="Quitar foto"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-red-600 shadow"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          className="input"
          placeholder="…o pega la URL de una imagen y toca Agregar"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
        />
        <button type="button" className="btn btn-soft !py-2" onClick={addUrl}>Agregar</button>
      </div>
    </div>
  );
}

/** Lista de textos (formas de personalizar). */
export function TagsField({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft("");
  };
  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-lila-800">{label}</span>
      <div className="mb-2 flex flex-wrap gap-2">
        {value.map((t) => (
          <span key={t} className="flex items-center gap-1 rounded-full bg-lila-100 px-3 py-1 text-sm text-lila-700">
            {t}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Quitar ${t}`}>✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="Ej: Nombre, Foto, Frase… y Enter"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
        />
        <button type="button" className="btn btn-primary !py-2" onClick={add}>Agregar</button>
      </div>
      {hint && <span className="mt-1 block text-xs text-lila-900/50">{hint}</span>}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-3xl border border-lila-100 bg-white p-6 shadow-sm">{children}</div>;
}
