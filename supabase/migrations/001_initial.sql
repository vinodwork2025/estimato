-- Partners table (multi-tenant foundation)
create table partners (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  founder_name text,
  founder_bio text,
  founder_photo_url text,
  logo_url text,
  website_url text,
  whatsapp_number text not null,
  email text not null,
  exclusive_cities text[] not null default '{}',
  status text not null default 'active',
  per_lead_price numeric not null default 3000,
  is_founding boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_partners_cities on partners using gin(exclusive_cities);
create index idx_partners_status on partners(status);

-- Leads table
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  country_code text default '+91',
  email text,
  city text not null,
  area text,
  planning_timeline text not null,
  consent_to_partner_share boolean default true,
  assigned_partner_id uuid references partners(id),
  partner_notified_at timestamptz,
  partner_status text default 'pending',
  calculation_input jsonb not null,
  calculation_result jsonb not null,
  pdf_url text,
  source_page text,
  utm_source text,
  utm_campaign text,
  utm_medium text,
  status text default 'new'
);

create index idx_leads_created_at on leads(created_at desc);
create index idx_leads_partner on leads(assigned_partner_id);
create index idx_leads_city on leads(city);
create index idx_leads_timeline on leads(planning_timeline);

-- Calculations table (analytics, anonymous)
create table calculations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  session_id text,
  input jsonb not null,
  result_total_mid numeric,
  city text,
  home_type text,
  quality_tier text,
  converted_to_lead boolean default false,
  lead_id uuid references leads(id)
);

create index idx_calculations_created_at on calculations(created_at desc);
create index idx_calculations_city on calculations(city);

-- Rates table (admin editable)
create table rates (
  id uuid primary key default gen_random_uuid(),
  rate_type text not null,
  rate_key text not null,
  rate_value numeric not null,
  effective_from date not null,
  notes text,
  updated_at timestamptz default now(),
  unique(rate_type, rate_key, effective_from)
);

-- Errors table
create table errors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  error_type text,
  message text,
  context jsonb,
  resolved boolean default false
);

-- RLS Policies
alter table partners enable row level security;
alter table leads enable row level security;
alter table calculations enable row level security;
alter table rates enable row level security;
alter table errors enable row level security;

-- Anon can read rates only
create policy "anon_read_rates" on rates for select using (true);

-- Service role full access (set via server client with service key)
create policy "service_all_partners" on partners for all using (auth.role() = 'service_role');
create policy "service_all_leads" on leads for all using (auth.role() = 'service_role');
create policy "service_all_calculations" on calculations for all using (auth.role() = 'service_role');
create policy "service_all_errors" on errors for all using (auth.role() = 'service_role');

-- Seed Design Intend partner
insert into partners (
  slug, name, tagline, founder_name, founder_bio,
  founder_photo_url, logo_url, website_url,
  whatsapp_number, email, exclusive_cities,
  status, per_lead_price, is_founding
) values (
  'design-intend',
  'Design Intend',
  'Premium architecture and turnkey construction studio',
  'Ar. Chittrarasan',
  'Architect with experience at Gensler on Chase Bank, Starbucks, and GMFI projects. Leading Design Intend''s architecture and turnkey construction practice across Hosur and Bengaluru.',
  '/images/partners/chittrarasan.jpg',
  '/images/partners/design-intend-logo.svg',
  'https://designintend.com',
  '+91XXXXXXXXXX',
  'hello@designintend.com',
  ARRAY['hosur', 'sarjapura', 'attibele', 'bagalur', 'krishnagiri'],
  'active',
  3000,
  true
);
