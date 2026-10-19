"use client";

import { useState } from "react";
import Pic from "../Pic";
import { Card, Field, ImagesField, TagsField } from "./fields";
import { deleteItem, importSeed, saveItem, useData } from "@/lib/store";
import { slugify } from "@/lib/utils";
import type { Product } from "@/lib/types";

const blank = (): Product => ({
  id: "",
  name: "",
  slug: "",
  description: "",
  images: [],
  options: [],
  categoryId: "",
  seasonIds: [],
  featured: false,
  active: true,
  price: 0,
});

export default function ProductsAdmin() {
  const { products, categories, seasons } = useData();
  const [edit, setEdit] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState("");
  const [uploading, setUploading] = useState(false);

  const save = async () => {
    if (!edit || !edit.name.trim()) return setMsg("El nombre es obligatorio.");
    if (uploading) return setMsg("Espera a que terminen de subir las fotos.");
    setSaving(true);
    setMsg("");
    setOk("");
    try {
      const slug = edit.slug || slugify(edit.name);
      const id = edit.id || slug + "-" + Date.now().toString(36);
      await saveItem("products", {
        ...edit,
        id,
        slug,
        images: edit.images.filter(Boolean),
        categoryId: edit.categoryId || categories[0]?.id || "",
      });
      setOk(`✅ «${edit.name.trim()}» guardado`);
      setEdit(null);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Product) => {
    if (!confirm(`¿Eliminar «${p.name}»? No se puede deshacer.`)) return;
    try {
      await deleteItem("products", p.id);
      setOk(`🗑️ «${p.name}» eliminado`);
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  if (edit) {
    const set = (patch: Partial<Product>) => setEdit({ ...edit, ...patch });
    return (
      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">{edit.id ? "Editar producto" : "Nuevo producto"}</h2>
        <div className="space-y-5">
          <Field label="Nombre">
            <input className="input" value={edit.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Descripción">
            <textarea className="input min-h-28" value={edit.description} onChange={(e) => set({ description: e.target.value })} />
          </Field>
          <ImagesField value={edit.images} onChange={(images) => set({ images })} onBusyChange={setUploading} />
          <TagsField label="Formas de personalizar" value={edit.options} onChange={(options) => set({ options })} hint="Cada una aparece como una etiqueta en la ficha del producto." />
          <Field label="Categoría">
            <select className="input" value={edit.categoryId} onChange={(e) => set({ categoryId: e.target.value, subcategoryId: undefined })}>
              <option value="">— Elegir —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          {(() => {
            const subs = categories.find((c) => c.id === edit.categoryId)?.subcategories ?? [];
            if (!subs.length) return null;
            return (
              <Field label="Subcategoría" hint="Es la «cajita» donde aparecerá dentro de la categoría.">
                <select className="input" value={edit.subcategoryId ?? ""} onChange={(e) => set({ subcategoryId: e.target.value || undefined })}>
                  <option value="">— Sin subcategoría —</option>
                  {subs.map((s) => (
                    <option key={s.id + s.group} value={s.id}>{s.group ? `${s.group} · ${s.name}` : s.name}</option>
                  ))}
                </select>
              </Field>
            );
          })()}
          <div>
            <span className="mb-1 block text-sm font-semibold text-lila-800">Temporadas</span>
            <div className="flex flex-wrap gap-2">
              {seasons.map((s) => {
                const on = edit.seasonIds.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => set({ seasonIds: on ? edit.seasonIds.filter((x) => x !== s.id) : [...edit.seasonIds, s.id] })}
                    className={`rounded-full border-2 px-4 py-1 text-sm font-medium ${on ? "border-lila-600 bg-lila-600 text-white" : "border-lila-200 text-lila-700"}`}
                  >
                    {s.emoji} {s.name}
                  </button>
                );
              })}
            </div>
          </div>
          <Field label="Precio (COP)" hint="Escribe solo números, sin puntos. Déjalo en 0 si prefieres que cotizen por WhatsApp.">
            <input type="number" min={0} step={500} className="input" value={edit.price} onChange={(e) => set({ price: Math.max(0, Number(e.target.value) || 0) })} />
          </Field>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2"><input type="checkbox" checked={edit.featured} onChange={(e) => set({ featured: e.target.checked })} /> Destacado en inicio</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={edit.active} onChange={(e) => set({ active: e.target.checked })} /> Visible en el sitio</label>
          </div>
        </div>
        {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" disabled={saving || uploading} onClick={save}>
            {saving ? "Guardando…" : uploading ? "Subiendo fotos…" : "Guardar"}
          </button>
          <button className="btn btn-ghost" onClick={() => { setEdit(null); setMsg(""); }}>Cancelar</button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-lila-800">Productos ({products.length})</h2>
        <button className="btn btn-primary" onClick={() => { setOk(""); setMsg(""); setEdit(blank()); }}>＋ Nuevo producto</button>
      </div>
      {ok && <p className="mb-3 rounded-2xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">{ok}</p>}
      {msg && products.length > 0 && <p className="mb-3 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-700">{msg}</p>}
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-lila-100 bg-white p-3">
            <Pic src={p.images[0]} alt={p.name} className="h-16 w-16 shrink-0 rounded-xl text-2xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-lila-800">{p.name} {!p.active && <span className="ml-2 rounded bg-lila-100 px-2 text-xs">oculto</span>}</p>
              <p className="truncate text-sm text-lila-900/60">{categories.find((c) => c.id === p.categoryId)?.name ?? "Sin categoría"}</p>
            </div>
            <button className="rounded-full px-3 py-1 text-lila-700 hover:bg-lila-100" onClick={() => setEdit(p)}>Editar</button>
            <button className="rounded-full px-3 py-1 text-red-600 hover:bg-red-50" onClick={() => remove(p)}>Eliminar</button>
          </div>
        ))}
        {products.length === 0 && (
          <div className="rounded-2xl bg-lila-50 p-8 text-center text-lila-700">
            <p>Aún no hay productos. ¡Crea el primero o carga el catálogo inicial!</p>
            <button
              className="btn btn-ghost mt-4"
              onClick={async () => {
                if (!confirm("Se cargarán los productos, temporadas y categorías iniciales. ¿Continuar?")) return;
                try { await importSeed(); } catch (e) { setMsg((e as Error).message); }
              }}
            >
              📥 Cargar catálogo inicial
            </button>
            {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
