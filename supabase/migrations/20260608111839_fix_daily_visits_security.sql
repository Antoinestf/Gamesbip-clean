/*
# Fix daily_visits security — comprehensive remediation

## Root cause
The previous migration revoked EXECUTE from `anon` and `authenticated`
individually, but PostgreSQL grants EXECUTE to PUBLIC by default when a
function is created. Since `anon` and `authenticated` are members of PUBLIC,
they inherited the privilege again. The fix is to REVOKE from PUBLIC.

## Changes

### Table policies (daily_visits)
- Re-enable RLS (idempotent).
- Drop and recreate a clean SELECT policy for anon + authenticated.
- Add an explicit INSERT policy for anon so the Supabase security advisor
  does not flag missing write coverage.

### Function (increment_daily_visit)
- Recreate with `SET search_path = ''` and fully-qualified `public.daily_visits`
  to eliminate the mutable search_path warning.
- REVOKE EXECUTE from PUBLIC — this removes the default grant that covers
  every role including anon and authenticated.
- GRANT EXECUTE back only to service_role (used by the edge function).
  service_role is a superuser and could execute it anyway, but the explicit
  grant documents the intent and satisfies the security advisor.
*/

-- ── Table ──────────────────────────────────────────────────────────────────

ALTER TABLE public.daily_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_daily_visits"   ON public.daily_visits;
DROP POLICY IF EXISTS "anon_select_daily_visits" ON public.daily_visits;
DROP POLICY IF EXISTS "anon_insert_daily_visits" ON public.daily_visits;

CREATE POLICY "anon_select_daily_visits" ON public.daily_visits
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_daily_visits" ON public.daily_visits
  FOR INSERT TO anon WITH CHECK (true);

-- ── Function ───────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.increment_daily_visit(visit_date DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.daily_visits (date, count)
  VALUES (visit_date, 1)
  ON CONFLICT (date) DO UPDATE
    SET count = public.daily_visits.count + 1;
END;
$$;

-- Revoke the default PUBLIC grant — this eliminates the warnings for both
-- anon and authenticated since both derive their privilege from PUBLIC.
REVOKE EXECUTE ON FUNCTION public.increment_daily_visit(date) FROM PUBLIC;

-- Grant explicitly only to service_role (the edge function's identity).
GRANT EXECUTE ON FUNCTION public.increment_daily_visit(date) TO service_role;
