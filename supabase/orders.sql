-- Vanguard production data tables. Run once in the Supabase SQL editor.

create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'pending_payment',
  company text not null,
  contact text,
  email text not null,
  phone text,
  notes text,
  payment_method text not null,
  payment_reference text,
  payment_evidence_status text not null default 'none',
  payment_evidence_path text,
  payment_confirmed_at timestamptz,
  payment_confirmation_source text,
  fulfillment text not null,
  shipping jsonb,
  lines jsonb not null,
  total numeric not null,
  carrier text,
  tracking_number text,
  tracking_url text,
  shipped_at timestamptz
);

-- Existing installs receive the new payment/shipping columns idempotently.
alter table public.orders add column if not exists payment_reference text;
alter table public.orders add column if not exists payment_evidence_status text not null default 'none';
alter table public.orders add column if not exists payment_evidence_path text;
alter table public.orders add column if not exists payment_confirmed_at timestamptz;
alter table public.orders add column if not exists payment_confirmation_source text;
alter table public.orders add column if not exists carrier text;
alter table public.orders add column if not exists tracking_number text;
alter table public.orders add column if not exists tracking_url text;
alter table public.orders add column if not exists shipped_at timestamptz;
create unique index if not exists orders_payment_reference_idx on public.orders (payment_reference) where payment_reference is not null;
create index if not exists orders_status_created_at_idx on public.orders (status, created_at desc);
alter table public.orders enable row level security;

-- Private bucket for customer-supplied payment evidence. Service-role access only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'payment-evidence',
  'payment-evidence',
  false,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.inquiries (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'new',
  mode text not null default 'information_request',
  company text not null,
  contact_name text,
  email text not null,
  phone text,
  topic text,
  product text,
  message text,
  payload jsonb
);
alter table public.inquiries enable row level security;
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

create table if not exists public.specialty_requests (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'new',
  company text not null,
  contact_name text not null,
  email text not null,
  phone text,
  compound text not null,
  cas_identifier text,
  quantity_spec text,
  purity_requirement text,
  research_application text,
  target_timeline text,
  notes text
);
alter table public.specialty_requests enable row level security;
create index if not exists specialty_requests_created_at_idx on public.specialty_requests (created_at desc);
create index if not exists specialty_requests_status_idx on public.specialty_requests (status);

create table if not exists public.newsletter_subscribers (
  email text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'subscribed',
  source text not null default 'website'
);
alter table public.newsletter_subscribers enable row level security;

-- Article pipeline: AI may draft, but a human must approve before publication.
create table if not exists public.articles (
  id text primary key,
  slug text unique not null,
  compound_slug text not null,
  title text not null,
  summary text not null,
  body text not null,
  evidence_note text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewer_note text
);
alter table public.articles enable row level security;

-- All tables intentionally have no public RLS policies.
-- The Next.js server uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
