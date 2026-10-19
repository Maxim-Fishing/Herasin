import { Nina } from "./Pic";

/** Estado de carga: la muñeca flotando. */
export default function Loading({ text = "Cargando…" }: { text?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-2 py-16 text-center">
      <Nina className="animate-float h-24 w-auto" />
      <p className="font-script text-lg text-lila-500">{text}</p>
    </div>
  );
}
