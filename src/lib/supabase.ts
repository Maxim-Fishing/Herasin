import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Sin variables de Supabase el sitio funciona en modo demo (datos de ejemplo). */
export const supabaseEnabled = Boolean(url && key);

export const supabase = supabaseEnabled ? createClient(url!, key!) : null;

export const STORAGE_BUCKET = "fotos";
