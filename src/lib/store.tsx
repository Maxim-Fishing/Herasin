"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "./supabase";
import {
  defaultSettings,
  demoCategories,
  demoProducts,
  demoSeasons,
} from "./demo-data";
import type { Category, Product, Season, SiteSettings } from "./types";

type Table = "products" | "seasons" | "categories";

const RELOAD_EVENT = "heraresin-reload";
const notifyWrite = () => window.dispatchEvent(new Event(RELOAD_EVENT));

type Data = {
  products: Product[];
  seasons: Season[];
  categories: Category[];
  settings: SiteSettings;
  loading: boolean;
  demo: boolean;
  reload: () => Promise<void>;
};

const initial: Data = {
  products: demoProducts,
  seasons: demoSeasons,
  categories: demoCategories,
  settings: defaultSettings,
  loading: !!supabase,
  demo: !supabase,
  reload: async () => {},
};

const Ctx = createContext<Data>(initial);

function mergeSettings(s: Partial<SiteSettings> | undefined): SiteSettings {
  const v = s ?? {};
  return {
    ...defaultSettings,
    ...v,
    popup: { ...defaultSettings.popup, ...(v.popup ?? {}) },
    course: { ...defaultSettings.course, ...(v.course ?? {}) },
  };
}

/** Categorías guardadas antes de existir las subcategorías: se completan con las de ejemplo. */
function withDefaultSubs(c: Category): Category {
  if (c.subcategories !== undefined) return c;
  const def = demoCategories.find((d) => d.slug === c.slug);
  return def ? { ...c, subcategories: def.subcategories, note: c.note ?? def.note } : { ...c, subcategories: [] };
}

type Row<T> = { id: string; data: Omit<T, "id"> };
const unpack = <T,>(rows: Row<T>[] | null): T[] =>
  (rows ?? []).map((r) => ({ ...r.data, id: r.id }) as T);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Omit<Data, "reload">>(initial);

  const reload = useCallback(async () => {
    if (!supabase) return;
    const [p, s, c, st] = await Promise.all([
      supabase.from("products").select("id,data"),
      supabase.from("seasons").select("id,data"),
      supabase.from("categories").select("id,data"),
      supabase.from("settings").select("id,data").eq("id", "site").maybeSingle(),
    ]);
    setData({
      products: unpack<Product>(p.data as Row<Product>[] | null),
      seasons: unpack<Season>(s.data as Row<Season>[] | null),
      categories: unpack<Category>(c.data as Row<Category>[] | null).map(withDefaultSubs),
      settings: mergeSettings(st.data?.data as Partial<SiteSettings> | undefined),
      loading: false,
      demo: false,
    });
  }, []);

  useEffect(() => {
    // Carga inicial desde Supabase y recarga cuando el panel guarda algo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
    const onWrite = () => void reload();
    window.addEventListener(RELOAD_EVENT, onWrite);
    return () => window.removeEventListener(RELOAD_EVENT, onWrite);
  }, [reload]);

  const value = useMemo(() => ({ ...data, reload }), [data, reload]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useData = () => useContext(Ctx);

/** Productos activos, ordenados con destacados primero. */
export function useActiveProducts() {
  const { products } = useData();
  return useMemo(
    () =>
      products
        .filter((p) => p.active)
        .sort((a, b) => Number(b.featured) - Number(a.featured)),
    [products],
  );
}

/* ---------- Escritura (solo panel de administración) ---------- */

function requireDb() {
  if (!supabase) throw new Error("Supabase no está configurado todavía.");
  return supabase;
}

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export async function saveItem<T extends { id: string }>(table: Table, item: T) {
  const { id, ...data } = item;
  fail((await requireDb().from(table).upsert({ id, data, updated_at: new Date().toISOString() })).error);
  notifyWrite();
}

export async function deleteItem(table: Table, id: string) {
  fail((await requireDb().from(table).delete().eq("id", id)).error);
  notifyWrite();
}

export async function saveSettings(settings: SiteSettings) {
  fail((await requireDb().from("settings").upsert({ id: "site", data: settings })).error);
  notifyWrite();
}

/** Carga el catálogo inicial (productos, temporadas, categorías y ajustes). */
export async function importSeed() {
  const db = requireDb();
  const pack = <T extends { id: string }>(items: T[]) =>
    items.map(({ id, ...data }) => ({ id, data }));
  fail((await db.from("seasons").upsert(pack(demoSeasons))).error);
  fail((await db.from("categories").upsert(pack(demoCategories))).error);
  fail((await db.from("products").upsert(pack(demoProducts))).error);
  fail((await db.from("settings").upsert({ id: "site", data: defaultSettings })).error);
  notifyWrite();
}

/**
 * Suma las subcategorías y la categoría «Línea de fe» sin tocar productos, precios ni textos.
 * Devuelve cuántas categorías se crearon o actualizaron.
 */
export async function syncCategories(): Promise<number> {
  const db = requireDb();
  const { data, error } = await db.from("categories").select("id,data");
  fail(error);
  const existing = unpack<Category>(data as Row<Category>[] | null);
  const rows: { id: string; data: Omit<Category, "id"> }[] = [];
  for (const def of demoCategories) {
    const found = existing.find((c) => c.slug === def.slug);
    const { id, ...rest } = def;
    if (!found) rows.push({ id, data: rest });
    else if (found.subcategories === undefined) {
      const { id: foundId, ...cur } = found;
      rows.push({ id: foundId, data: { ...cur, subcategories: def.subcategories, note: cur.note ?? def.note } });
    }
  }
  if (rows.length) fail((await db.from("categories").upsert(rows)).error);
  notifyWrite();
  return rows.length;
}

/* ---------- Administradores ---------- */

export async function listAdmins(): Promise<string[]> {
  const { data, error } = await requireDb().from("admins").select("email").order("email");
  fail(error);
  return (data ?? []).map((r) => r.email as string);
}

export async function addAdmin(email: string) {
  fail((await requireDb().from("admins").upsert({ email: email.trim().toLowerCase() })).error);
}

export async function removeAdmin(email: string) {
  fail((await requireDb().from("admins").delete().eq("email", email)).error);
}
