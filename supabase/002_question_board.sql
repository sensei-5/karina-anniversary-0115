-- UPDATE #2. Run after 001_karina_questions.sql in your own project.
-- Submission content and nickname are public on the anniversary wall.
-- Private identity (user_id) stays behind the original owner-only RLS.
alter table public.karina_questions
  add column kind text not null default 'question' check (kind in ('question', 'blessing')),
  add column display_name text not null default '觀眾' check (char_length(display_name) between 1 and 30);

create or replace function public.karina_question_fill() returns trigger
language plpgsql set search_path = '' as $$
declare
  meta jsonb := coalesce(auth.jwt()->'user_metadata', '{}'::jsonb);
begin
  if coalesce(auth.jwt()->'app_metadata'->>'provider','') not in ('google','twitch') then
    raise exception '請用 Google 或 Twitch 登入';
  end if;
  new.user_id := auth.uid();
  new.display_name := left(coalesce(nullif(meta->>'nickname',''),nullif(meta->>'full_name',''),nullif(meta->>'name',''),nullif(meta->>'preferred_username',''),'觀眾'),30);
  new.message := btrim(new.message);
  if tg_op = 'UPDATE' then
    new.id := old.id;
    new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end $$;

grant insert (kind), update (kind) on public.karina_questions to authenticated;
-- Intentional owner-executed public projection: only the five display fields.
-- Do not use select * here or grant anonymous access to the underlying table.
create view public.karina_question_board as
select id, display_name, kind, message, created_at from public.karina_questions;
revoke all on public.karina_question_board from public, anon, authenticated;
grant select on public.karina_question_board to anon, authenticated;
