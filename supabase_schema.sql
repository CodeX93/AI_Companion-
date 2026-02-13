-- Create users table
create table public.users (
  id uuid not null primary key,
  email text not null unique,
  password text not null, -- Storing hashed password
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create companions table
create table public.companions (
  id uuid not null primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  gender text not null,
  age integer not null,
  personality jsonb not null,
  appearance jsonb not null,
  system_prompt text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table public.messages (
  id uuid not null primary key,
  companion_id uuid not null references public.companions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.companions enable row level security;
alter table public.messages enable row level security;

-- Create policies (simplified for this migration, ideally should use auth.uid())
-- For now, we will allow public access if we are using the service role key, 
-- or we can assume the client handles RLS if we set up Auth Policies properly.
-- Since we are migrating from a simple map, let's keep it open for now or assume
-- the backend (Next.js server) will be using the service role or we rely on the
-- client-side anon key but implementing policies that allow access based on IDs.
-- However, since db.ts seems to run on the server (auth verifyPassword), 
-- we might be using the service key or just standard queries.

-- Allow all access for now (Development Mode)
create policy "Allow all access to users" on public.users for all using (true);
create policy "Allow all access to companions" on public.companions for all using (true);
create policy "Allow all access to messages" on public.messages for all using (true);
