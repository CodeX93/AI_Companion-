-- Add read_at column to messages for unread badges
alter table public.messages 
add column if not exists read_at timestamp with time zone;

-- Add last_message_at column to companions for sorting/badges
alter table public.companions 
add column if not exists last_message_at timestamp with time zone;

-- Create scheduled_messages table for proactive messaging
create table if not exists public.scheduled_messages (
  id uuid not null primary key,
  companion_id uuid not null references public.companions(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  scheduled_at timestamp with time zone not null,
  prompt_context text not null,
  status text not null check (status in ('pending', 'processed', 'failed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for scheduled_messages
alter table public.scheduled_messages enable row level security;
create policy "Allow all access to scheduled_messages" on public.scheduled_messages for all using (true);
