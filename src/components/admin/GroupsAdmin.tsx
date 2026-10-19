"use client";

import { useState } from "react";
import { Card, Field, ImageField } from "./fields";
import Pic from "../Pic";
import { deleteItem, saveItem, syncCategories, useData } from "@/lib/store";
import { slugify } from "@/lib/utils";
import type { Subcategory } from "@/lib/types";

type Item = {
  id: string; name: string; slug: string; description: string; image: string; emoji: string; order: number;
  subcategories?: Subcategory[]; note?: string;
};

/** Editor compartido para Temporadas y Categorías. */
export default function GroupsAdmin({ kind }: { kind: "seasons" | "categories" }) {
  const data = useData();
  const items: Item[] = [...(kind === "seasons" ? data.seasons : data.categories)].sort((a, b) => a.order - b.order);
  const noun = kind === "seasons" ? "temporada" : "categoría";
  const [edit, setEdit] = useState<Item | null>(null);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState("");

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

  const save = async () => {
    if (!edit || !edit.name.trim()) return setMsg("El nombre es obligatorio.");
    try {
      const slug = edit.slug || slugify(edit.name);
      const subs = (edit.subcategories ?? [])
        .filter((s) => s.name.trim())
        .map((s) => ({
          ...s,
          name: s.name.trim(),
          group: s.group.trim(),
          id: s.id || slugify(s.group.trim() ? `${s.group.trim()} ${s.name.trim()}` : s.name.trim()),
        }));
      await saveItem(kind, {
        ...edit,
        slug,
        ...(kind === "categories" ? { subcategories: subs } : {}),
        id: edit.id || slug + "-" + Date.now().toString(36),
      });
      setEdit(null);
      setMsg("");
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  const remove = async (i: Item) => {
    const used = data.products.filter((p) => (kind === "seasons" ? p.seasonIds.includes(i.id) : p.categoryId === i.id)).length;
    const warn = used ? `\n\nAtención: ${used} producto(s) la usan.` : "";
    if (confirm(`¿Eliminar «${i.name}»?${warn}`)) await deleteItem(kind, i.id);
  };

  if (edit) {
    const set = (p: Partial<Item>) => setEdit({ ...edit, ...p });
    return (
      <Card>
        <h2 className="mb-4 font-display text-2xl font-bold text-lila-800">{edit.id ? "Editar" : "Nueva"} {noun}</h2>
        <div className="space-y-4">
          <Field label="Nombre"><input className="input" value={edit.name} onChange={(e) => set({ name: e.target.value })} /></Field>
          <Field label="Descripción corta"><input className="input" value={edit.description} onChange={(e) => set({ description: e.target.value })} /></Field>
          <Field label="Emoji" hint="Se muestra cuando no hay imagen."><input className="input" value={edit.emoji} onChange={(e) => set({ emoji: e.target.value })} /></Field>
          <ImageField value={edit.image} onChange={(image) => set({ image })} />
          <Field label="Orden" hint="Número menor aparece primero."><input type="number" className="input" value={edit.order} onChange={(e) => set({ order: Number(e.target.value) })} /></Field>
          {kind === "categories" && (
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
          <button className="btn btn-primary" onClick={save}>Guardar</button>
          <button className="btn btn-ghost" onClick={() => { setEdit(null); setMsg(""); }}>Cancelar</button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold capitalize text-lila-800">{kind === "seasons" ? "Temporadas" : "Categorías"} ({items.length})</h2>
        <button className="btn btn-primary" onClick={() => setEdit({ id: "", name: "", slug: "", description: "", image: "", emoji: "💜", order: items.length + 1 })}>＋ Nueva {noun}</button>
      </div>
      {kind === "categories" && (
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
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 rounded-2xl border border-lila-100 bg-white p-3">
            <Pic src={i.image} alt={i.name} emoji={i.emoji} className="h-16 w-16 shrink-0 rounded-xl text-2xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-lila-800">{i.name}</p>
              <p className="truncate text-sm text-lila-900/60">{i.description}{(i.subcategories ?? []).length ? ` · ${(i.subcategories ?? []).length} subcategorías` : ""}</p>
            </div>
            <button className="rounded-full px-3 py-1 text-lila-700 hover:bg-lila-100" onClick={() => setEdit(i)}>Editar</button>
            <button className="rounded-full px-3 py-1 text-red-600 hover:bg-red-50" onClick={() => remove(i)}>Eliminar</button>
          </div>
        ))}
        {items.length === 0 && <p className="rounded-2xl bg-lila-50 p-8 text-center text-lila-700">Aún no hay {kind === "seasons" ? "temporadas" : "categorías"}.</p>}
      </div>
    </div>
  );
}
