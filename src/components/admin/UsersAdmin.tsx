"use client";

import { useEffect, useState } from "react";
import { Card, Field } from "./fields";
import { addAdmin, listAdmins, removeAdmin } from "@/lib/store";

/** Correos con permiso para entrar al panel. */
export default function UsersAdmin({ currentEmail }: { currentEmail: string }) {
  const [admins, setAdmins] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const refresh = async () => {
    try { setAdmins(await listAdmins()); } catch (e) { setMsg((e as Error).message); }
  };

  useEffect(() => {
    let cancelled = false;
    listAdmins().then((a) => { if (!cancelled) setAdmins(a); }).catch((e: Error) => { if (!cancelled) setMsg(e.message); });
    return () => { cancelled = true; };
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setMsg("Escribe un correo válido.");
    try {
      await addAdmin(email);
      setEmail("");
      setMsg("✅ Usuario agregado. Podrá ingresar con ese correo (Google o contraseña).");
      await refresh();
    } catch (err) { setMsg((err as Error).message); }
  };

  const remove = async (a: string) => {
    if (a.toLowerCase() === currentEmail.toLowerCase()) return setMsg("No puedes quitarte a ti misma.");
    if (!confirm(`¿Quitar el acceso de ${a}?`)) return;
    try { await removeAdmin(a); await refresh(); } catch (err) { setMsg((err as Error).message); }
  };

  return (
    <Card>
      <h2 className="mb-1 font-heading text-2xl font-semibold text-lila-800">Usuarios con acceso</h2>
      <p className="mb-5 text-sm text-lila-900/60">
        Solo estos correos pueden crear y editar productos, kits y categorías. Cada persona debe crear su cuenta en
        Supabase (Google o correo) y luego agregarla aquí.
      </p>

      <ul className="space-y-2">
        {admins.map((a) => (
          <li key={a} className="flex items-center justify-between rounded-2xl bg-lila-50 px-4 py-2">
            <span className="text-sm font-semibold text-lila-900">{a}</span>
            <button className="text-sm text-red-600 hover:underline" onClick={() => remove(a)}>Quitar</button>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field label="Agregar correo">
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@gmail.com" />
          </Field>
        </div>
        <button className="btn btn-primary" type="submit">Agregar</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </Card>
  );
}
