"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  defaultSettings,
  demoCategories,
  demoProducts,
  demoSeasons,
} from "./demo-data";
import type { Category, Product, Season, SiteSettings } from "./types";

type Data = {
  products: Product[];
  seasons: Season[];
  categories: Category[];
  settings: SiteSettings;
  loading: boolean;
  demo: boolean;
};

const initial: Data = {
  products: demoProducts,
  seasons: demoSeasons,
  categories: demoCategories,
  settings: defaultSettings,
  loading: !!db,
  demo: !db,
};

const Ctx = createContext<Data>(initial);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(initial);

  useEffect(() => {
    if (!db) return;
    const firestore = db;
    const patch = (p: Partial<Data>) => setData((d) => ({ ...d, ...p }));
    const live = <T,>(name: string, key: keyof Data) =>
      onSnapshot(collection(firestore, name), (snap) => {
        const items = snap.docs.map((d) => ({ ...d.data(), id: d.id }) as T);
        patch({ [key]: items, loading: false } as Partial<Data>);
      });
    // En producción arrancamos vacíos para no mostrar datos de ejemplo.
    patch({ products: [], seasons: [], categories: [] });
    const unsubs = [
      live<Product>("products", "products"),
      live<Season>("seasons", "seasons"),
      live<Category>("categories", "categories"),
      onSnapshot(doc(firestore, "settings", "site"), (snap) => {
        const s = snap.exists() ? (snap.data() as Partial<SiteSettings>) : {};
        patch({
          settings: {
            ...defaultSettings,
            ...s,
            popup: { ...defaultSettings.popup, ...(s.popup ?? {}) },
            course: { ...defaultSettings.course, ...(s.course ?? {}) },
          },
        });
      }),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
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
  if (!db) throw new Error("Firebase no está configurado todavía.");
  return db;
}

export async function saveItem<T extends { id: string }>(
  name: "products" | "seasons" | "categories",
  item: T,
) {
  const { id, ...rest } = item;
  await setDoc(doc(requireDb(), name, id), rest);
}

export async function deleteItem(
  name: "products" | "seasons" | "categories",
  id: string,
) {
  await deleteDoc(doc(requireDb(), name, id));
}

/** Carga el catálogo inicial (productos, temporadas, categorías y ajustes) en Firestore. */
export async function importSeed() {
  const firestore = requireDb();
  const batch = writeBatch(firestore);
  for (const s of demoSeasons) { const { id, ...r } = s; batch.set(doc(firestore, "seasons", id), r); }
  for (const c of demoCategories) { const { id, ...r } = c; batch.set(doc(firestore, "categories", id), r); }
  for (const p of demoProducts) { const { id, ...r } = p; batch.set(doc(firestore, "products", id), r); }
  batch.set(doc(firestore, "settings", "site"), defaultSettings);
  await batch.commit();
}

export async function saveSettings(settings: SiteSettings) {
  await setDoc(doc(requireDb(), "settings", "site"), settings);
}
