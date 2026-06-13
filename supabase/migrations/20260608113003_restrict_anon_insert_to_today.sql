/*
# Fix RLS "always true" warning on daily_visits INSERT policy

## Problem
The anon_insert_daily_visits policy used WITH CHECK (true), which the
Supabase security advisor flags as "RLS Policy Always True" because it
imposes no real restriction.

## Fix
Replace WITH CHECK (true) with WITH CHECK (date = CURRENT_DATE).
This is semantically correct: anonymous users should only ever insert a
row for today's date. Backdating or future-dating a direct insert is blocked.

## Impact on the visit tracker
None. The track-visit edge function calls increment_daily_visit() using
the service_role key, which bypasses RLS entirely. The anon INSERT policy
is a safety net for direct REST API calls — restricting it to the current
date is the right constraint regardless.
*/

DROP POLICY IF EXISTS "anon_insert_daily_visits" ON public.daily_visits;

CREATE POLICY "anon_insert_daily_visits" ON public.daily_visits
  FOR INSERT TO anon
  WITH CHECK (date = CURRENT_DATE);
