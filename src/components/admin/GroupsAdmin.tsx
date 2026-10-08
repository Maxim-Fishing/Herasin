"use client";

import { useState } from "react";
import { Card, Field, ImageField } from "./fields";
import Pic from "../Pic";
import { deleteItem, saveItem, useData } from "@/lib/store";
import { slugify } from "@/lib/utils";

type Item = { id: string; name: string; slug: string; description: string; image: string; emoji: string; order: number };

/** Editor compartido para Temporadas y Categorías. */
export default function GroupsAdmin({ kind }: { kind: "seasons" | "categories" }) {
  const data = useData();
  const items: Item[] = [...(kind === "seasons" ? data.seasons : data.categories)].sort((a, b) => a.order - b.order);
  const noun = kind === "seasons" ? "temporada" : "categoría";
  const [edit, setEdit] = useState<Item | null>(null);
  const [msg, setMsg] = useState("");

  const save = async () => {
    if (!edit || !edit.name.trim()) return setMsg("El nombre es obligatorio.");
    try {
      const slug = edit.slug || slugify(edit.name);
      await saveItem(kind, { ...edit, slug, id: edit.id || slug + "-" + Date.now().toString(36) });
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
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 rounded-2xl border border-lila-100 bg-white p-3">
            <Pic src={i.image} alt={i.name} emoji={i.emoji} className="h-16 w-16 shrink-0 rounded-xl text-2xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-lila-800">{i.name}</p>
              <p className="truncate text-sm text-lila-900/60">{i.description}</p>
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
