"use client";

import { useState } from "react";
import { Card, Field, ImageField, ImagesField, TagsField } from "./fields";
import { saveSettings, useData } from "@/lib/store";
import type { SiteSettings } from "@/lib/types";

function useDraft() {
  const { settings } = useData();
  // Mientras no se edite, se muestran los datos en vivo de Firestore.
  const [local, setLocal] = useState<SiteSettings | null>(null);
  const [msg, setMsg] = useState("");
  const draft = local ?? settings;

  const set = (p: Partial<SiteSettings>) => setLocal((d) => ({ ...(d ?? settings), ...p }));
  const save = async () => {
    try {
      await saveSettings(draft);
      setLocal(null);
      setMsg("✅ Guardado");
    } catch (e) {
      setMsg("❌ " + (e as Error).message);
    }
  };
  return { draft, set, save, msg };
}

/** Aviso de temporada en la página de inicio. */
export function PopupAdmin() {
  const { seasons } = useData();
  const { draft, set, save, msg } = useDraft();
  const p = draft.popup;
  const setP = (patch: Partial<typeof p>) => set({ popup: { ...p, ...patch } });

  return (
    <Card>
      <h2 className="mb-1 font-heading text-2xl font-bold text-lila-800">Aviso de temporada</h2>
      <p className="mb-5 text-sm text-lila-900/60">Ventana que ven los visitantes al entrar al inicio. Pueden cerrarla con la ✕.</p>
      <div className="space-y-4">
        <label className="flex items-center gap-3 rounded-2xl bg-lila-50 p-4 font-semibold text-lila-800">
          <input type="checkbox" className="h-5 w-5" checked={p.enabled} onChange={(e) => setP({ enabled: e.target.checked })} />
          Mostrar aviso de temporada en el inicio
        </label>
        <Field label="Temporada">
          <select className="input" value={p.seasonId} onChange={(e) => setP({ seasonId: e.target.value })}>
            <option value="">— Elegir —</option>
            {seasons.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="Título"><input className="input" value={p.title} onChange={(e) => setP({ title: e.target.value })} /></Field>
        <Field label="Texto"><textarea className="input min-h-20" value={p.text} onChange={(e) => setP({ text: e.target.value })} /></Field>
        <ImageField label="Imagen del aviso (opcional)" value={p.image} onChange={(image) => setP({ image })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mostrar desde (opcional)"><input type="date" className="input" value={p.startsAt} onChange={(e) => setP({ startsAt: e.target.value })} /></Field>
          <Field label="Mostrar hasta (opcional)"><input type="date" className="input" value={p.endsAt} onChange={(e) => setP({ endsAt: e.target.value })} /></Field>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button className="btn btn-primary" onClick={save}>Guardar aviso</button>
        <span className="text-sm">{msg}</span>
      </div>
    </Card>
  );
}

/** Contacto y textos generales. */
export function SettingsAdmin() {
  const { draft, set, save, msg } = useDraft();
  const setCourse = (p: Partial<SiteSettings["course"]>) => set({ course: { ...draft.course, ...p } });
  const text = (k: keyof SiteSettings, label: string, area = false, hint?: string) => (
    <Field label={label} hint={hint}>
      {area ? (
        <textarea className="input min-h-24" value={(draft[k] as string | undefined) ?? ""} onChange={(e) => set({ [k]: e.target.value } as Partial<SiteSettings>)} />
      ) : (
        <input className="input" value={(draft[k] as string | undefined) ?? ""} onChange={(e) => set({ [k]: e.target.value } as Partial<SiteSettings>)} />
      )}
    </Field>
  );

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Contacto</h2>
        <div className="space-y-4">
          {text("whatsapp", "WhatsApp (con indicativo, solo números)", false, "Ej: 573001234567")}
          {text("instagramUrl", "Enlace de Instagram")}
          {text("instagramHandle", "Usuario de Instagram")}
          {text("email", "Correo")}
          {text("city", "Ciudad / cobertura")}
          {text("address", "Dirección del taller")}
          {text("mapQuery", "Dirección para el mapa (opcional)", false, "Si el pin del mapa no cae justo, escribe aquí la dirección como la entiende Google Maps, por ejemplo: Calle 43B #10-18, Neiva, Huila, Colombia.")}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Textos del sitio</h2>
        <div className="space-y-4">
          {text("heroTitle", "Título principal del inicio")}
          {text("heroSubtitle", "Subtítulo del inicio", true)}
          {text("customers", "Cifra de clientes", false, "Ej: +5.000. Déjalo vacío para ocultar la banda de cifras.")}
          {text("aboutSince", "Año en que empezó el emprendimiento", false, "Opcional: si lo dejas vacío no se muestra.")}
          {text("aboutStory", "Historia (Quiénes somos)", true)}
          {text("aboutWorkshop", "Sobre el taller", true)}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Galería «Nuestro trabajo»</h2>
        <ImagesField value={draft.gallery} onChange={(gallery) => set({ gallery })} />
      </Card>

      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Reels de Instagram</h2>
        <TagsField
          label="Reels a mostrar"
          value={draft.reels}
          onChange={(reels) => set({ reels })}
          hint="Pega el enlace del reel (instagram.com/reel/…) y presiona Enter."
        />
      </Card>

      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Cursos</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-2xl bg-lila-50 p-4 font-semibold text-lila-800">
            <input type="checkbox" className="h-5 w-5" checked={draft.course.enabled} onChange={(e) => setCourse({ enabled: e.target.checked })} />
            Mostrar la sección de cursos
          </label>
          <Field label="Título"><input className="input" value={draft.course.title} onChange={(e) => setCourse({ title: e.target.value })} /></Field>
          <Field label="Descripción"><textarea className="input min-h-20" value={draft.course.description} onChange={(e) => setCourse({ description: e.target.value })} /></Field>
          <TagsField label="Qué se aprende" value={draft.course.topics} onChange={(topics) => setCourse({ topics })} />
          <Field label="Nota (fechas, cupos, valor…)"><input className="input" value={draft.course.note} onChange={(e) => setCourse({ note: e.target.value })} /></Field>
          <ImageField label="Imagen del curso" value={draft.course.image} onChange={(image) => setCourse({ image })} />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Testimonios</h2>
        <div className="space-y-3">
          {draft.testimonials.map((t, i) => (
            <div key={i} className="space-y-2 rounded-2xl bg-lila-50 p-3">
              <input className="input" placeholder="Nombre" value={t.name} onChange={(e) => set({ testimonials: draft.testimonials.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} />
              <textarea className="input" placeholder="Opinión" value={t.text} onChange={(e) => set({ testimonials: draft.testimonials.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })} />
              <button className="text-sm text-red-600" onClick={() => set({ testimonials: draft.testimonials.filter((_, j) => j !== i) })}>Quitar</button>
            </div>
          ))}
          <button className="btn btn-ghost !py-2 text-sm" onClick={() => set({ testimonials: [...draft.testimonials, { name: "", text: "" }] })}>＋ Agregar testimonio</button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-1 font-heading text-2xl font-bold text-lila-800">Políticas</h2>
        <p className="mb-4 text-sm text-lila-900/60">Cada línea del texto se muestra como un punto. Una línea que termina en «:» se muestra como subtítulo.</p>
        <div className="space-y-3">
          {draft.policies.map((p, i) => (
            <div key={i} className="space-y-2 rounded-2xl bg-lila-50 p-3">
              <div className="flex gap-2">
                <input className="input !w-16 text-center" aria-label="Emoji" value={p.icon} onChange={(e) => set({ policies: draft.policies.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)) })} />
                <input className="input" placeholder="Título" value={p.title} onChange={(e) => set({ policies: draft.policies.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })} />
              </div>
              <textarea className="input min-h-32" placeholder="Un punto por línea" value={p.text} onChange={(e) => set({ policies: draft.policies.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })} />
              <button className="text-sm text-red-600" onClick={() => set({ policies: draft.policies.filter((_, j) => j !== i) })}>Quitar</button>
            </div>
          ))}
          <button className="btn btn-ghost !py-2 text-sm" onClick={() => set({ policies: [...draft.policies, { icon: "📌", title: "", text: "" }] })}>＋ Agregar política</button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-heading text-2xl font-bold text-lila-800">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {draft.faq.map((f, i) => (
            <div key={i} className="space-y-2 rounded-2xl bg-lila-50 p-3">
              <input className="input" placeholder="Pregunta" value={f.q} onChange={(e) => set({ faq: draft.faq.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)) })} />
              <textarea className="input" placeholder="Respuesta" value={f.a} onChange={(e) => set({ faq: draft.faq.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)) })} />
              <button className="text-sm text-red-600" onClick={() => set({ faq: draft.faq.filter((_, j) => j !== i) })}>Quitar</button>
            </div>
          ))}
          <button className="btn btn-ghost !py-2 text-sm" onClick={() => set({ faq: [...draft.faq, { q: "", a: "" }] })}>＋ Agregar pregunta</button>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <button className="btn btn-primary" onClick={save}>Guardar cambios</button>
        <span className="text-sm">{msg}</span>
      </div>
    </div>
  );
}
