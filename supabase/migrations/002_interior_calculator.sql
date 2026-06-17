-- Interior leads table
-- Mirrors the RLS pattern from 001_initial.sql: anon insert, service role reads.

create table interior_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  city text not null,
  message text,
  -- calculator context
  property_type text,
  bhk text,
  carpet_area int,
  current_state text,
  finish_level text,
  scope jsonb,
  estimate_min int,
  estimate_max int,
  status text default 'new'
);

create index idx_interior_leads_created_at on interior_leads(created_at desc);
create index idx_interior_leads_city on interior_leads(city);
create index idx_interior_leads_status on interior_leads(status);

alter table interior_leads enable row level security;

-- Anon key may insert (lead capture from the public calculator)
create policy "anon_insert_interior_leads"
  on interior_leads for insert
  with check (true);

-- Reads restricted to service role only
create policy "service_all_interior_leads"
  on interior_leads for all
  using (auth.role() = 'service_role');
