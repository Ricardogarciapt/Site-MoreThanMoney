-- Tabela para armazenar mensagens dos canais Telegram
create table if not exists public.telegram_messages (
  id uuid default gen_random_uuid() primary key,
  message_id bigint not null,
  channel_id text not null,
  channel_key text not null default 'unknown',
  channel_name text,
  text text not null,
  author text,
  timestamp bigint not null,
  created_at timestamptz default now(),
  unique(message_id, channel_id)
);

-- Index para queries por canal
create index if not exists idx_telegram_messages_channel_key
  on public.telegram_messages(channel_key, timestamp desc);

-- Row Level Security
alter table public.telegram_messages enable row level security;

-- Leitura pública (mensagens do canal são públicas para membros autenticados)
create policy "Members can read telegram messages"
  on public.telegram_messages for select
  using (auth.role() = 'authenticated');

-- Apenas service role pode inserir (via webhook server-side)
create policy "Service role can insert telegram messages"
  on public.telegram_messages for insert
  with check (auth.role() = 'service_role');

-- Upsert para service role
create policy "Service role can upsert telegram messages"
  on public.telegram_messages for update
  using (auth.role() = 'service_role');
