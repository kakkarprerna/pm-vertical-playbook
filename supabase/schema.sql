-- PM Vertical Playbook: schema
-- Run this in the Supabase SQL editor (or via the CLI) before seed.sql

create extension if not exists "uuid-ossp";

create table if not exists verticals (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  accent text not null default 'graphite'
);

create table if not exists lifecycle_stages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  "order" int not null,
  description text not null default ''
);

create table if not exists resource_items (
  id uuid primary key default uuid_generate_v4(),
  vertical_id uuid references verticals(id) on delete cascade, -- null = cross-cutting
  stage_id uuid references lifecycle_stages(id) on delete cascade, -- null = all stages
  title text not null,
  type text not null check (type in ('course','certification','article','framework','tool','community')),
  url text not null default '',
  source text not null default '',
  added_date date not null default current_date,
  notes text
);

create table if not exists checklist_items (
  id uuid primary key default uuid_generate_v4(),
  vertical_id uuid not null references verticals(id) on delete cascade,
  stage_id uuid not null references lifecycle_stages(id) on delete cascade,
  title text not null,
  description text,
  is_starter_item boolean not null default true,
  status text not null default 'not_started' check (status in ('not_started','learning','applied','shipped')),
  evidence_id uuid
);

create table if not exists evidence_entries (
  id uuid primary key default uuid_generate_v4(),
  checklist_item_id uuid not null references checklist_items(id) on delete cascade,
  type text not null check (type in ('link','note','repo','writeup')),
  content text not null,
  date_logged date not null default current_date
);

alter table checklist_items
  add constraint checklist_items_evidence_id_fkey
  foreign key (evidence_id) references evidence_entries(id) on delete set null;

create table if not exists toolkit_entries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  best_for text not null default '',
  stage_ids uuid[] not null default '{}',
  url text not null default ''
);

create table if not exists portfolio_case_studies (
  id uuid primary key default uuid_generate_v4(),
  vertical_id uuid not null references verticals(id) on delete cascade,
  title text not null,
  summary text,
  checklist_item_ids uuid[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_date date
);

-- Single-user app: row level security is left off for V1. If you host this
-- publicly, add auth and RLS policies before putting real data behind it.
