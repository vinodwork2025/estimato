-- ================================================================
-- Material price tracker
-- ================================================================
-- HOW TO ADD A NEW MONTH (takes ~5 minutes):
--
--   1. Open Supabase Dashboard -> SQL Editor
--   2. Copy one of the INSERT blocks below
--   3. Change:
--        recorded_on  -> first day of new month ('2026-07-01')
--        price_min / price_max -> current sourced values
--        source       -> updated source string if needed
--   4. Run. Old records stay — they power the 12-month chart.
--
-- HOW TO ADD A NEW CITY:
--   Add rows with the new city slug. No code change required.
--
-- PRICE NOTES:
--   All prices are ex-dealer, excluding GST (18%) and transport.
--   Source: Design Intend procurement records and direct dealer
--   surveys, Hosur and Bangalore.
-- ================================================================

create table if not exists material_prices (
  id          uuid primary key default gen_random_uuid(),
  city        text not null,
  material    text not null,
  unit        text not null,
  price_min   numeric not null,
  price_max   numeric not null,
  source      text not null,
  recorded_on date not null,
  created_at  timestamptz default now()
);

create index if not exists idx_material_city_date
  on material_prices (city, recorded_on desc);

alter table material_prices enable row level security;

create policy "anon_read_material_prices"
  on material_prices for select
  using (true);

create policy "service_write_material_prices"
  on material_prices for all
  using (auth.role() = 'service_role');

-- ================================================================
-- SEED — April 2026
-- ================================================================

insert into material_prices (city, material, unit, price_min, price_max, source, recorded_on) values

('hosur', 'Cement, OPC 53 grade',   'per 50kg bag', 360,   380,  'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),
('hosur', 'TMT steel, Fe500',        'per kg',        56,    60,   'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),
('hosur', 'M-sand',                  'per cft',       50,    60,   'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),
('hosur', 'River sand',              'per cft',       60,    75,   'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),
('hosur', 'Aggregate, 20mm',         'per cft',       38,    48,   'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),
('hosur', 'Red bricks',              'per piece',      7,     9,   'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),
('hosur', 'Concrete blocks, 8 inch', 'per piece',     36,    44,   'Design Intend supplier records, Hosur, April 2026',     '2026-04-01'),

('bangalore', 'Cement, OPC 53 grade',   'per 50kg bag', 375,  400,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01'),
('bangalore', 'TMT steel, Fe500',        'per kg',        57,   62,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01'),
('bangalore', 'M-sand',                  'per cft',       58,   68,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01'),
('bangalore', 'River sand',              'per cft',       68,   85,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01'),
('bangalore', 'Aggregate, 20mm',         'per cft',       42,   52,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01'),
('bangalore', 'Red bricks',              'per piece',      8,   10,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01'),
('bangalore', 'Concrete blocks, 8 inch', 'per piece',     40,   50,  'Design Intend supplier records, Bangalore, April 2026', '2026-04-01');

-- ================================================================
-- SEED — May 2026
-- ================================================================

insert into material_prices (city, material, unit, price_min, price_max, source, recorded_on) values

('hosur', 'Cement, OPC 53 grade',   'per 50kg bag', 365,   385,  'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),
('hosur', 'TMT steel, Fe500',        'per kg',        57,    61,   'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),
('hosur', 'M-sand',                  'per cft',       52,    62,   'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),
('hosur', 'River sand',              'per cft',       62,    78,   'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),
('hosur', 'Aggregate, 20mm',         'per cft',       40,    50,   'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),
('hosur', 'Red bricks',              'per piece',    7.5,   9.5,   'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),
('hosur', 'Concrete blocks, 8 inch', 'per piece',     38,    46,   'Design Intend supplier records, Hosur, May 2026',       '2026-05-01'),

('bangalore', 'Cement, OPC 53 grade',   'per 50kg bag', 378,  408,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01'),
('bangalore', 'TMT steel, Fe500',        'per kg',        58,   63,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01'),
('bangalore', 'M-sand',                  'per cft',       59,   69,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01'),
('bangalore', 'River sand',              'per cft',       70,   87,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01'),
('bangalore', 'Aggregate, 20mm',         'per cft',       43,   53,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01'),
('bangalore', 'Red bricks',              'per piece',    8.5, 10.5,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01'),
('bangalore', 'Concrete blocks, 8 inch', 'per piece',     41,   51,  'Design Intend supplier records, Bangalore, May 2026',   '2026-05-01');

-- ================================================================
-- SEED — June 2026
-- ================================================================

insert into material_prices (city, material, unit, price_min, price_max, source, recorded_on) values

('hosur', 'Cement, OPC 53 grade',   'per 50kg bag', 370,   390,  'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),
('hosur', 'TMT steel, Fe500',        'per kg',        58,    62,   'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),
('hosur', 'M-sand',                  'per cft',       55,    65,   'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),
('hosur', 'River sand',              'per cft',       65,    80,   'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),
('hosur', 'Aggregate, 20mm',         'per cft',       42,    52,   'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),
('hosur', 'Red bricks',              'per piece',      8,    10,   'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),
('hosur', 'Concrete blocks, 8 inch', 'per piece',     40,    48,   'Design Intend supplier records, Hosur, June 2026',      '2026-06-01'),

('bangalore', 'Cement, OPC 53 grade',   'per 50kg bag', 380,  420,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01'),
('bangalore', 'TMT steel, Fe500',        'per kg',        59,   63,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01'),
('bangalore', 'M-sand',                  'per cft',       60,   70,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01'),
('bangalore', 'River sand',              'per cft',       70,   90,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01'),
('bangalore', 'Aggregate, 20mm',         'per cft',       44,   55,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01'),
('bangalore', 'Red bricks',              'per piece',      9,   11,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01'),
('bangalore', 'Concrete blocks, 8 inch', 'per piece',     42,   52,  'Design Intend supplier records, Bangalore, June 2026',  '2026-06-01');
