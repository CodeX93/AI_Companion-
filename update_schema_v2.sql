-- Add subscription fields to users table
alter table public.users 
add column if not exists subscription_tier text check (subscription_tier in ('free', 'premium')) default 'free';

alter table public.users 
add column if not exists daily_usage_start timestamp with time zone;

alter table public.users 
add column if not exists last_active_date date;
