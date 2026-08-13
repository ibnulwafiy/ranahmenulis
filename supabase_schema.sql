-- =========================================================================
-- PENULIS+ WORKSPACE SUPABASE DDL SCHEMA
-- =========================================================================
-- This script contains all necessary tables, indexes, Row Level Security (RLS)
-- policies, and automatic triggers to connect your local app to Supabase.

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. PROFILES TABLE & NEW USER TRIGGER
-- =========================================================================
-- Stores basic profile data synced from Supabase Auth users.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  updated_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Trigger to automatically create a profile when a new user registers in Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger safely
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- =========================================================================
-- 2. FAVORITE INSPIRATIONS (penulis_plus_favorites)
-- =========================================================================
-- Stores user's favorite inspiration item IDs.
create table if not exists public.favorite_inspirations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  inspiration_id text not null,
  created_at timestamp with time zone default now(),
  unique (user_id, inspiration_id)
);

alter table public.favorite_inspirations enable row level security;

create policy "Users can manage own favorite inspirations" on public.favorite_inspirations
  for all using (auth.uid() = user_id);

create index if not exists idx_fav_insp_user on public.favorite_inspirations(user_id);


-- =========================================================================
-- 3. FAVORITE AI PROMPTS (penulis_plus_ai_favorites)
-- =========================================================================
-- Stores user's favorite AI writing prompt IDs.
create table if not exists public.favorite_prompts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  prompt_id text not null,
  created_at timestamp with time zone default now(),
  unique (user_id, prompt_id)
);

alter table public.favorite_prompts enable row level security;

create policy "Users can manage own favorite prompts" on public.favorite_prompts
  for all using (auth.uid() = user_id);

create index if not exists idx_fav_prompts_user on public.favorite_prompts(user_id);


-- =========================================================================
-- 4. BLUEPRINT PROGRESS (penulis_plus_blueprint)
-- =========================================================================
-- Stores completed days in the 10-Day Blueprint list.
create table if not exists public.blueprint_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  day_number integer not null,
  completed_at timestamp with time zone default now(),
  unique (user_id, day_number)
);

alter table public.blueprint_progress enable row level security;

create policy "Users can manage own blueprint progress" on public.blueprint_progress
  for all using (auth.uid() = user_id);

create index if not exists idx_blueprint_user on public.blueprint_progress(user_id);


-- =========================================================================
-- 5. WORKBOOK ENTRIES (penulis_plus_workbook)
-- =========================================================================
-- Stores answers for daily reflective workbook exercises.
create table if not exists public.workbook_entries (
  user_id uuid references auth.users on delete cascade not null,
  exercise_id text not null default 'wb-exercise-01',
  content text not null,
  updated_at timestamp with time zone default now(),
  primary key (user_id, exercise_id)
);

alter table public.workbook_entries enable row level security;

create policy "Users can manage own workbook entries" on public.workbook_entries
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 6. DRAFTS EDITOR (penulis_plus_draft_*)
-- =========================================================================
-- Stores draft title, content, target word count, and timestamps.
create table if not exists public.drafts (
  user_id uuid references auth.users on delete cascade primary key,
  title text default '',
  content text default '',
  target_word_count integer default 500,
  updated_at timestamp with time zone default now()
);

alter table public.drafts enable row level security;

create policy "Users can manage own drafts" on public.drafts
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 7. STORY BUILDERS (penulis_plus_story_builder)
-- =========================================================================
-- Stores story outlines (premis, konflik, etc.).
create table if not exists public.story_builders (
  user_id uuid references auth.users on delete cascade primary key,
  tema text default '',
  premis text default '',
  konflik text default '',
  tujuan text default '',
  hambatan text default '',
  perubahan text default '',
  pesan text default '',
  updated_at timestamp with time zone default now()
);

alter table public.story_builders enable row level security;

create policy "Users can manage own story builders" on public.story_builders
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 8. CHARACTER BUILDERS (penulis_plus_character_builder)
-- =========================================================================
-- Stores character profiles.
create table if not exists public.character_builders (
  user_id uuid references auth.users on delete cascade primary key,
  nama text default '',
  usia text default '',
  kepribadian text default '',
  kelebihan text default '',
  kekurangan text default '',
  keinginan text default '',
  ketakutan text default '',
  latar text default '',
  konflik text default '',
  perubahan text default '',
  updated_at timestamp with time zone default now()
);

alter table public.character_builders enable row level security;

create policy "Users can manage own character builders" on public.character_builders
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 9. PLOT BUILDERS (penulis_plus_plot_builder)
-- =========================================================================
-- Stores plot structure (inciting incident, climax, etc.).
create table if not exists public.plot_builders (
  user_id uuid references auth.users on delete cascade primary key,
  opening text default '',
  inciting text default '',
  rising text default '',
  climax text default '',
  resolution text default '',
  updated_at timestamp with time zone default now()
);

alter table public.plot_builders enable row level security;

create policy "Users can manage own plot builders" on public.plot_builders
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 10. SCENE BUILDERS (penulis_plus_scene_builder)
-- =========================================================================
-- Stores scene structures.
create table if not exists public.scene_builders (
  user_id uuid references auth.users on delete cascade primary key,
  tujuan text default '',
  lokasi text default '',
  waktu text default '',
  tokoh text default '',
  konflik text default '',
  emosi text default '',
  peristiwa text default '',
  dampak text default '',
  updated_at timestamp with time zone default now()
);

alter table public.scene_builders enable row level security;

create policy "Users can manage own scene builders" on public.scene_builders
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 11. EMOTION MAPPERS (penulis_plus_emotion_mapper)
-- =========================================================================
-- Stores emotional arcs/shifts for scenes.
create table if not exists public.emotion_mappers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  scene text default '',
  start_emotion text default '',
  trigger text default '',
  shift text default '',
  end_emotion text default '',
  intensity integer default 5 check (intensity >= 1 and intensity <= 10),
  order_index integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.emotion_mappers enable row level security;

create policy "Users can manage own emotion mappers" on public.emotion_mappers
  for all using (auth.uid() = user_id);

create index if not exists idx_emotion_user on public.emotion_mappers(user_id);


-- =========================================================================
-- 12. SYNOPSIS BUILDERS (penulis_plus_synopsis_builder)
-- =========================================================================
-- Stores synopsis details.
create table if not exists public.synopsis_builders (
  user_id uuid references auth.users on delete cascade primary key,
  judul text default '',
  tokoh text default '',
  premis text default '',
  konflik text default '',
  perjalanan text default '',
  ending text default '',
  updated_at timestamp with time zone default now()
);

alter table public.synopsis_builders enable row level security;

create policy "Users can manage own synopsis builders" on public.synopsis_builders
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 13. WRITING CHECKLISTS (penulis_plus_writing_checklist)
-- =========================================================================
-- Stores checkboxes of the writing processes.
create table if not exists public.writing_checklists (
  user_id uuid references auth.users on delete cascade not null,
  item_id text not null,
  label text not null,
  checked boolean default false,
  updated_at timestamp with time zone default now(),
  primary key (user_id, item_id)
);

alter table public.writing_checklists enable row level security;

create policy "Users can manage own writing checklists" on public.writing_checklists
  for all using (auth.uid() = user_id);


-- =========================================================================
-- 14. WRITING SESSIONS (penulis_plus_writing_session)
-- =========================================================================
-- Stores raw session text from active writing sessions.
create table if not exists public.writing_sessions (
  user_id uuid references auth.users on delete cascade primary key,
  session_text text default '',
  updated_at timestamp with time zone default now()
);

alter table public.writing_sessions enable row level security;

create policy "Users can manage own writing sessions" on public.writing_sessions
  for all using (auth.uid() = user_id);
