"use client";

import { useState } from "react";
import { Card, Field, ImageField, ImagesField } from "./fields";
import Pic from "../Pic";
import { deleteItem, saveItem, syncCategories, useData } from "@/lib/store";
import { kitCover, kitImages, kitItems } from "@/lib/kits";
import { slugify } from "@/lib/utils";
import type { Product, Season, Subcategory } from "@/lib/types";

/** Temporadas (kits) y categorías comparten editor; cada una usa sus campos extra. */
type Item = Season & { subcategories?: Subcategory[]; note?: string };

/** Elige qué productos lleva el kit. */
function PiecesPicker({ products, value, onChange }: { products: Product[]; value: string[]; onChange: (v: string[]) => void }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const list = products.filter((p) => !term || p.name.toLowerCase().includes(term));
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-lila-800">Piezas del kit ({value.length})</span>
      <p className="mb-2 text-xs text-lila-900/55">
        Marca los productos que lleva el kit. Al cotizar, la clienta podrá quitar los que no quiera.
      </p>
      <input className="input" placeholder="🔍 Buscar producto…" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="mt-2 max-h-80 space-y-1.5 overflow-y-auto rounded-2xl border-2 border-lila-100 bg-lila-50/60 p-2">
        {list.map((p) => (
          <li key={p.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-3 py-2">
              <input type="checkbox" className="h-5 w-5 shrink-0 accent-[#c961c2]" checked={value.includes(p.id)} onChange={() => toggle(p.id)} />
              <Pic src={p.images[0]} alt="" className="aspect-[3/4] w-9 shrink-0 rounded-lg text-sm" />
              <span className="min-w-0 truncate text-sm font-semibold text-lila-800">
                {p.name}
                {!p.active && <span className="ml-2 rounded bg-lila-100 px-1.5 text-xs font-medium">oculto</span>}
              </span>
            </label>
          </li>
        ))}
        {list.length === 0 && <li className="p-3 text-center text-sm text-lila-700">No hay productos con ese nombre.</li>}
      </ul>
    </div>
  );
}

export default function GroupsAdmin({ kind }: { kind: "seasons" | "categories" }) {
  const data = useData();
  const isKit = kind === "seasons";
  const items: Item[] = [...(isKit ? data.seasons : data.categories)].sort((a, b) => a.order - b.order);
  const noun = isKit ? "kit de temporada" : "categoría";
  const [edit, setEdit] = useState<Item | null>(null);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState("");
  const [uploading, setUploading] = useState(false);

  const sync = async () => {
    setMsg("");
    setOk("");
    try {
      const n = await syncCategories();
      setOk(n ? `✅ Listo: se actualizaron ${n} categoría(s). Tus productos y precios no se tocaron.` : "✅ Todo está al día: no había nada nuevo que agregar.");
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  /** Al abrir un kit, sus piezas y fotos quedan listas para editar (también en kits antiguos). */
  const open = (i: Item) => {
    setMsg("");
    setOk("");
    setEdit(
      isKit
        ? { ...i, images: kitImages(i), itemIds: i.itemIds ?? kitItems(i, data.products).map((p) => p.id), price: i.price ?? 0 }
        : i,
    );
  };

  const save = async () => {
    if (!edit || !edit.name.trim()) return setMsg("El nombre es obligatorio.");
    if (uploading) return setMsg("Espera a que terminen de subir las fotos.");
    try {
      const slug = edit.slug || slugify(edit.name);
      const id = edit.id || slug + "-" + Date.now().toString(36);
      if (isKit) {
        const images = (edit.images ?? []).filter(Boolean);
        await saveItem("seasons", {
          ...edit,
          id,
          slug,
          images,
          image: images[0] ?? "",
          price: Math.max(0, edit.price ?? 0),
          itemIds: edit.itemIds ?? [],
        });
      } else {
        const subs = (edit.subcategories ?? [])
          .filter((s) => s.name.trim())
          .map((s) => ({
            ...s,
            name: s.name.trim(),
            group: s.group.trim(),
            id: s.id || slugify(s.group.trim() ? `${s.group.trim()} ${s.name.trim()}` : s.name.trim()),
          }));
        await saveItem("categories", { ...edit, id, slug, subcategories: subs });
      }
      setEdit(null);
      setMsg("");
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  const remove = async (i: Item) => {
    const used = isKit ? 0 : data.products.filter((p) => p.categoryId === i.id).length;
    const warn = used ? `\n\nAtención: ${used} producto(s) la usan.` : "";
    if (confirm(`¿Eliminar «${i.name}»?${warn}`)) await deleteItem(kind, i.id);
  };

  if (edit) {
    const set = (p: Partial<Item>) => setEdit({ ...edit, ...p });
    return (
      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">{edit.id ? "Editar" : "Nuevo"} {noun}</h2>
        <div className="space-y-5">
          <Field label="Nombre" hint={isKit ? "Se mostrará como «Kit …». Ej: Amor y Amistad." : undefined}>
            <input className="input" value={edit.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label={isKit ? "Descripción del kit" : "Descripción corta"}>
            {isKit ? (
              <textarea className="input min-h-28" value={edit.description} onChange={(e) => set({ description: e.target.value })} />
            ) : (
              <input className="input" value={edit.description} onChange={(e) => set({ description: e.target.value })} />
            )}
          </Field>
          <Field label="Emoji" hint="Se muestra cuando no hay imagen."><input className="input" value={edit.emoji} onChange={(e) => set({ emoji: e.target.value })} /></Field>

          {isKit ? (
            <>
              <ImagesField value={edit.images ?? []} onChange={(images) => set({ images })} onBusyChange={setUploading} />
              <Field label="Valor del kit (COP)" hint="Solo números, sin puntos. Déjalo en 0 si prefieres que cotizen por WhatsApp.">
                <input type="number" min={0} step={500} className="input" value={edit.price ?? 0} onChange={(e) => set({ price: Math.max(0, Number(e.target.value) || 0) })} />
              </Field>
              <PiecesPicker products={data.products} value={edit.itemIds ?? []} onChange={(itemIds) => set({ itemIds })} />
            </>
          ) : (
            <ImageField value={edit.image} onChange={(image) => set({ image })} />
          )}

          <Field label="Orden" hint="Número menor aparece primero."><input type="number" className="input" value={edit.order} onChange={(e) => set({ order: Number(e.target.value) })} /></Field>

          {!isKit && (
            <>
              <Field label="Nota de la categoría (opcional)" hint="Ej: «Marcamos en: DTF textil · DTF UV». Se muestra arriba de las subcategorías.">
                <input className="input" value={edit.note ?? ""} onChange={(e) => set({ note: e.target.value })} />
              </Field>
              <div>
                <span className="mb-1 block text-sm font-semibold text-lila-800">Subcategorías («cajitas»)</span>
                <p className="mb-2 text-xs text-lila-900/55">«Grupo» es opcional: sirve para juntar varias bajo un título, como «Camisetas» o «Línea escolar».</p>
                <div className="space-y-2">
                  {(edit.subcategories ?? []).map((s, i) => {
                    const all = edit.subcategories ?? [];
                    const upd = (patch: Partial<Subcategory>) =>
                      set({ subcategories: all.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
                    const move = (to: number) => {
                      const a = [...all];
                      [a[to], a[i]] = [a[i], a[to]];
                      set({ subcategories: a });
                    };
                    return (
                      <div key={i} className="flex flex-col gap-2 rounded-2xl bg-lila-50 p-2 sm:flex-row sm:items-center">
                        <input className="input" placeholder="Nombre" value={s.name} onChange={(e) => upd({ name: e.target.value })} />
                        <input className="input sm:max-w-44" placeholder="Grupo (opcional)" value={s.group} onChange={(e) => upd({ group: e.target.value })} />
                        <div className="flex gap-1">
                          <button type="button" aria-label="Subir" disabled={i === 0} className="rounded-full px-2 py-1 text-lila-700 hover:bg-lila-100 disabled:opacity-30" onClick={() => move(i - 1)}>↑</button>
                          <button type="button" aria-label="Bajar" disabled={i === all.length - 1} className="rounded-full px-2 py-1 text-lila-700 hover:bg-lila-100 disabled:opacity-30" onClick={() => move(i + 1)}>↓</button>
                          <button type="button" aria-label="Quitar" className="rounded-full px-2 py-1 text-red-600 hover:bg-red-50" onClick={() => set({ subcategories: all.filter((_, j) => j !== i) })}>✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button type="button" className="btn btn-ghost mt-2 !py-2 text-sm" onClick={() => set({ subcategories: [...(edit.subcategories ?? []), { id: "", name: "", group: "" }] })}>
                  ＋ Agregar subcategoría
                </button>
              </div>
            </>
          )}
        </div>
        {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" disabled={uploading} onClick={save}>{uploading ? "Subiendo fotos…" : "Guardar"}</button>
          <button className="btn btn-ghost" onClick={() => { setEdit(null); setMsg(""); }}>Cancelar</button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-lila-800">{isKit ? "Kits de temporada" : "Categorías"} ({items.length})</h2>
        <button
          className="btn btn-primary"
          onClick={() => open({ id: "", name: "", slug: "", description: "", image: "", emoji: "💜", order: items.length + 1, images: [], itemIds: [], price: 0 })}
        >
          ＋ Nuevo {noun}
        </button>
      </div>
      {!isKit && (
        <div className="mb-4 rounded-2xl bg-lila-50 p-4">
          <p className="text-sm text-lila-900/75">
            ¿Faltan las subcategorías nuevas o la categoría «Línea de fe»? Este botón las agrega <strong>sin tocar tus productos, precios ni fotos</strong>.
          </p>
          <button className="btn btn-soft mt-2 !py-2 text-sm" onClick={sync}>📥 Agregar subcategorías y categorías nuevas</button>
          {ok && <p className="mt-2 text-sm font-semibold text-green-700">{ok}</p>}
          {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
        </div>
      )}
      <div className="space-y-3">
        {items.map((i) => {
          const detail = isKit
            ? `${kitItems(i, data.products).length} piezas${i.price ? ` · $${i.price.toLocaleString("es-CO")}` : ""}`
            : (i.subcategories ?? []).length
              ? `${(i.subcategories ?? []).length} subcategorías`
              : i.description;
          return (
            <div key={i.id} className="flex items-center gap-4 rounded-2xl border border-lila-100 bg-white p-3">
              <Pic src={isKit ? kitCover(i) : i.image} alt={i.name} emoji={i.emoji} className="aspect-[3/4] w-12 shrink-0 rounded-xl text-2xl" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-lila-800">{isKit ? `Kit ${i.name}` : i.name}</p>
                <p className="truncate text-sm text-lila-900/60">{detail}</p>
              </div>
              <button className="rounded-full px-3 py-1 text-lila-700 hover:bg-lila-100" onClick={() => open(i)}>Editar</button>
              <button className="rounded-full px-3 py-1 text-red-600 hover:bg-red-50" onClick={() => remove(i)}>Eliminar</button>
            </div>
          );
        })}
        {items.length === 0 && <p className="rounded-2xl bg-lila-50 p-8 text-center text-lila-700">Aún no hay {isKit ? "kits" : "categorías"}.</p>}
      </div>
    </div>
  );
}
