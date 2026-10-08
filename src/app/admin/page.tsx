"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { adminEmails, auth, firebaseEnabled } from "@/lib/firebase";
import { useData } from "@/lib/store";
import GroupsAdmin from "@/components/admin/GroupsAdmin";
import ProductsAdmin from "@/components/admin/ProductsAdmin";
import { PopupAdmin, SettingsAdmin } from "@/components/admin/SettingsAdmin";

const tabs = [
  { id: "products", label: "📦 Productos" },
  { id: "seasons", label: "🗓️ Temporadas" },
  { id: "categories", label: "🗂️ Categorías" },
  { id: "popup", label: "🔔 Aviso de temporada" },
  { id: "settings", label: "⚙️ Ajustes" },
] as const;

type Tab = (typeof tabs)[number]["id"];

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const google = async () => {
    try { await signInWithPopup(auth!, new GoogleAuthProvider()); }
    catch { setErr("No se pudo iniciar sesión con Google."); }
  };
  const mail = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth!, email, pass); }
    catch { setErr("Correo o contraseña incorrectos."); }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-[2rem] border border-lila-100 bg-white p-8 shadow-xl shadow-lila-100">
        <h1 className="text-center font-display text-3xl font-bold text-lila-800">Administración</h1>
        <p className="mt-1 text-center text-sm text-lila-900/60">Ingresa para gestionar tu tienda 💜</p>

        <button onClick={google} className="btn btn-ghost mt-6 w-full">🔑 Continuar con Google</button>
        <p className="my-4 text-center text-xs text-lila-900/40">— o con correo y contraseña —</p>
        <form onSubmit={mail} className="space-y-3">
          <input className="input" type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <button className="btn btn-primary w-full" type="submit">Entrar</button>
        </form>
        {err && <p className="mt-3 text-center text-sm text-red-600">{err}</p>}
      </div>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!auth);
  const [tab, setTab] = useState<Tab>("products");
  const { demo } = useData();

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => { setUser(u); setReady(true); });
  }, []);

  if (!firebaseEnabled) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-lila-800">Administración</h1>
        <p className="mt-4 rounded-2xl bg-lila-50 p-6 text-lila-800">
          Firebase aún no está configurado. Copia <code>.env.local.example</code> a <code>.env.local</code>,
          completa tus claves y reinicia. Mientras tanto el sitio muestra datos de ejemplo.
        </p>
      </div>
    );
  }

  if (!ready) return <p className="py-20 text-center text-lila-700">Cargando…</p>;
  if (!user) return <Login />;

  const email = (user.email ?? "").toLowerCase();
  if (!adminEmails.includes(email)) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="rounded-2xl bg-red-50 p-6 text-red-700">
          La cuenta {user.email} no tiene permiso de administración.
        </p>
        <button className="btn btn-ghost mt-4" onClick={() => signOut(auth!)}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-lila-800">Panel de administración</h1>
          <p className="text-sm text-lila-900/60">Sesión: {user.email}</p>
        </div>
        <button className="btn btn-ghost !py-2" onClick={() => signOut(auth!)}>Cerrar sesión</button>
      </div>

      {demo && <p className="mb-4 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800">Modo demo: los cambios no se guardan.</p>}

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t.id ? "bg-lila-600 text-white" : "bg-lila-100 text-lila-700 hover:bg-lila-200"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "products" && <ProductsAdmin />}
      {tab === "seasons" && <GroupsAdmin kind="seasons" />}
      {tab === "categories" && <GroupsAdmin kind="categories" />}
      {tab === "popup" && <PopupAdmin />}
      {tab === "settings" && <SettingsAdmin />}
    </div>
  );
}
