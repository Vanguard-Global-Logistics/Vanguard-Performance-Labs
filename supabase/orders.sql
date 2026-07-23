-- Vanguard orders table. Run once in Supabase SQL editor.
create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'pending_payment',
  company text not null,
  contact text,
  email text not null,
  phone text,
  notes text,
  payment_method text not null,     -- 'wire' | 'phone'
  fulfillment text not null,        -- 'ship' | 'willcall'
  shipping jsonb,
  lines jsonb not null,
  total numeric not null
);
alter table public.orders enable row level security;
-- Service-role key bypasses RLS; no public policies on purpose (server-only access).

-- Article pipeline (AI drafts, human-approved before publication)
create table if not exists public.articles (
  id text primary key,
  slug text unique not null,
  compound_slug text not null,
  title text not null,
  summary text not null,
  body text not null,
  evidence_note text not null,
  status text not null default 'draft',   -- draft | approved | rejected
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewer_note text
);
alter table public.articles enable row level security;
-- Server-only access via service role; no public policies by design.
