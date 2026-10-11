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
      categories: unpack<Category>(c.data as Row<Category>[] | null),
      settings: mergeSettings(st.data?.data as Partial<SiteSettings> | undefined),
      loading: false,
      demo: false,
    });
  }, []);

  useEffect(() => {
    // Carga inicial desde Supabase (un solo fetch; sin suscripciones en tiempo real).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
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
}

export async function deleteItem(table: Table, id: string) {
  fail((await requireDb().from(table).delete().eq("id", id)).error);
}

export async function saveSettings(settings: SiteSettings) {
  fail((await requireDb().from("settings").upsert({ id: "site", data: settings })).error);
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
