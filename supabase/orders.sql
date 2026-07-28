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
  fulfillment text not null,
  shipping jsonb,
  lines jsonb not null,
  total numeric not null
);
alter table public.orders enable row level security;

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
  contact_name text,
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
