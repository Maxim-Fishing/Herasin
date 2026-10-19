"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { useData } from "@/lib/store";
import GroupsAdmin from "@/components/admin/GroupsAdmin";
import ProductsAdmin from "@/components/admin/ProductsAdmin";
import UsersAdmin from "@/components/admin/UsersAdmin";
import { PopupAdmin, SettingsAdmin } from "@/components/admin/SettingsAdmin";
import { Logo } from "@/components/Pic";

const tabs = [
  { id: "products", label: "📦 Productos" },
  { id: "seasons", label: "🎁 Kits de temporada" },
  { id: "categories", label: "🗂️ Categorías" },
  { id: "popup", label: "🔔 Aviso de temporada" },
  { id: "settings", label: "⚙️ Ajustes" },
  { id: "users", label: "👥 Usuarios" },
] as const;

type Tab = (typeof tabs)[number]["id"];

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const google = async () => {
    const { error } = await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
    if (error) setErr("No se pudo iniciar sesión con Google.");
  };
  const mail = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pass });
    if (error) setErr("Correo o contraseña incorrectos.");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="bg-hearts rounded-[2rem] border-[3px] border-dotted border-cafe/40 p-8">
        <div className="flex justify-center"><Logo className="h-20 w-auto" /></div>
        <h1 className="mt-2 text-center font-heading text-2xl font-semibold text-lila-800">Administración</h1>
        <p className="mt-1 text-center text-sm text-lila-900/60">Ingresa para gestionar tu tienda 💜</p>

        <button onClick={google} className="btn btn-ghost mt-6 w-full">🔑 Continuar con Google</button>
        <p className="my-4 text-center text-xs text-lila-900/50">— o con correo y contraseña —</p>
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
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabase);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("products");
  const { demo, reload } = useData();

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  // ¿El correo de la sesión está en la tabla "admins"?
  useEffect(() => {
    const email = session?.user.email?.toLowerCase();
    if (!supabase || !email) return;
    let cancelled = false;
    supabase
      .from("admins")
      .select("email")
      .eq("email", email)
      .maybeSingle()
      .then(({ data }) => { if (!cancelled) setIsAdmin(Boolean(data)); });
    return () => { cancelled = true; };
  }, [session]);

  if (!supabaseEnabled) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold text-lila-800">Administración</h1>
        <p className="mt-4 rounded-3xl bg-lila-100 p-6 text-lila-800">
          Supabase aún no está conectado. Agrega <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (ver <code>README.md</code>). Mientras tanto el sitio muestra el
          catálogo de ejemplo.
        </p>
      </div>
    );
  }

  if (!ready) return <Loading />;
  if (!session) return <Login />;

  if (isAdmin === null) return <p className="py-20 text-center text-lila-700">Verificando permisos…</p>;
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="rounded-3xl bg-red-50 p-6 text-red-700">
          La cuenta {session.user.email} no tiene permiso de administración.
        </p>
        <button className="btn btn-ghost mt-4" onClick={() => supabase!.auth.signOut()}>Cerrar sesión</button>
      </div>
    );
  }

  const logout = () => {
    setIsAdmin(null);
    supabase!.auth.signOut();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-lila-800">Panel de administración</h1>
          <p className="text-sm text-lila-900/60">Sesión: {session.user.email}</p>
        </div>
        <button className="btn btn-ghost !py-2" onClick={logout}>Cerrar sesión</button>
      </div>

      {demo && <p className="mb-4 rounded-2xl bg-yellow-50 p-3 text-sm text-yellow-800">Modo demo: los cambios no se guardan.</p>}

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); void reload(); }}
            className={`rounded-full px-4 py-2 text-sm font-bold ${tab === t.id ? "bg-lila-600 text-white" : "bg-lila-100 text-lila-700 hover:bg-lila-200"}`}
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
      {tab === "users" && <UsersAdmin currentEmail={session.user.email ?? ""} />}
    </div>
  );
}
