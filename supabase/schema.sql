create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  address text not null,
  property_type text not null,
  land_size numeric not null,
  building_age integer not null default 0,
  layout text,
  station_distance integer,
  created_at timestamptz not null default now()
);

create table if not exists public.estimates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  estimated_price numeric not null,
  min_price numeric not null,
  max_price numeric not null,
  unit_price numeric not null,
  ai_comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  estimate_id uuid references public.estimates(id) on delete set null,
  status text not null default 'new',
  message text,
  preferred_date timestamptz,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.properties enable row level security;
alter table public.estimates enable row level security;
alter table public.consultations enable row level security;
