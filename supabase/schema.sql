-- HERARESIN · Esquema de Supabase
-- Pega TODO este archivo en Supabase → SQL Editor → Run.

-- 1) Tablas (cada fila guarda el objeto completo en "data")
create table if not exists public.products   (id text primary key, data jsonb not null, updated_at timestamptz default now());
create table if not exists public.seasons    (id text primary key, data jsonb not null, updated_at timestamptz default now());
create table if not exists public.categories (id text primary key, data jsonb not null, updated_at timestamptz default now());
create table if not exists public.settings   (id text primary key, data jsonb not null, updated_at timestamptz default now());

-- 2) Usuarios con permiso de administración (por correo)
create table if not exists public.admins (email text primary key, created_at timestamptz default now());

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- 3) Seguridad (RLS): todos leen el catálogo; solo administradores escriben
alter table public.products   enable row level security;
alter table public.seasons    enable row level security;
alter table public.categories enable row level security;
alter table public.settings   enable row level security;
alter table public.admins     enable row level security;

do $$
declare t text;
begin
  foreach t in array array['products','seasons','categories','settings'] loop
    execute format('drop policy if exists "lectura publica" on public.%I', t);
    execute format('drop policy if exists "escritura admin" on public.%I', t);
    execute format('create policy "lectura publica" on public.%I for select using (true)', t);
    execute format('create policy "escritura admin" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "admin ve admins" on public.admins;
drop policy if exists "admin gestiona admins" on public.admins;
create policy "admin ve admins" on public.admins for select
  using (public.is_admin() or lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
create policy "admin gestiona admins" on public.admins for all
  using (public.is_admin()) with check (public.is_admin());

-- 4) Fotos (bucket público de lectura; subir solo administradores)
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

drop policy if exists "fotos lectura" on storage.objects;
drop policy if exists "fotos escritura admin" on storage.objects;
create policy "fotos lectura" on storage.objects for select using (bucket_id = 'fotos');
create policy "fotos escritura admin" on storage.objects for all
  using (bucket_id = 'fotos' and public.is_admin())
  with check (bucket_id = 'fotos' and public.is_admin());

-- 5) PRIMER ADMINISTRADOR: cambia el correo y ejecuta esta línea
-- insert into public.admins (email) values ('correo.de.la.administradora@gmail.com');
