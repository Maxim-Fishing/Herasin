"use client";

import { useState, type ReactNode } from "react";
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

/** Una imagen: subir archivo (Cloudinary) o pegar URL. */
export function ImageField({ value, onChange, label = "Imagen" }: { value: string; onChange: (v: string) => void; label?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (file?: File | null) => {
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-lila-800">{label}</span>
      <div className="flex items-center gap-3">
        <Pic src={value} alt="" className="h-16 w-16 shrink-0 rounded-xl text-2xl" />
        <div className="flex-1 space-y-1">
          <input type="file" accept="image/*" disabled={busy} onChange={(e) => pick(e.target.files?.[0])} className="text-sm" />
          <input className="input" placeholder="…o pega la URL de la imagen" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
      {busy && <p className="mt-1 text-xs text-lila-600">Subiendo…</p>}
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}

/** Varias imágenes. */
export function ImagesField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-3">
      <span className="block text-sm font-semibold text-lila-800">Fotos (la primera es la principal)</span>
      {value.map((src, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            <ImageField label="" value={src} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} />
          </div>
          <button type="button" className="rounded-full px-3 py-1 text-red-600 hover:bg-red-50" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Quitar foto">✕</button>
        </div>
      ))}
      <button type="button" className="btn btn-ghost !py-2 text-sm" onClick={() => onChange([...value, ""])}>＋ Agregar foto</button>
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
