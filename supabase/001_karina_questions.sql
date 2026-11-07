-- 獨立提問表；不讀寫 4lianyun wishes。於自己的 Supabase SQL Editor 執行。
create table public.karina_questions (
  id bigint generated always as identity primary key,
  user_id uuid not null unique references auth.users on delete cascade,
  message text not null check (char_length(btrim(message)) between 1 and 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.karina_questions enable row level security;
create function public.karina_question_fill() returns trigger
language plpgsql set search_path = '' as $$
begin
  if coalesce(auth.jwt()->'app_metadata'->>'provider','') not in ('google','twitch') then
    raise exception '請用 Google 或 Twitch 登入';
  end if;
  new.user_id := auth.uid();
  new.message := btrim(new.message);
  if tg_op = 'UPDATE' then
    new.id := old.id;
    new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end $$;
create trigger karina_question_fill before insert or update on public.karina_questions
for each row execute function public.karina_question_fill();
revoke all on public.karina_questions from anon, authenticated;
grant select on public.karina_questions to authenticated;
grant insert (message), update (message) on public.karina_questions to authenticated;
grant usage on sequence public.karina_questions_id_seq to authenticated;
create policy "read own question" on public.karina_questions for select to authenticated
using (user_id = (select auth.uid()));
create policy "insert own question" on public.karina_questions for insert to authenticated
with check (user_id = (select auth.uid()));
create policy "update own question" on public.karina_questions for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
