/*
# Harden increment_daily_visit security

## Changes
1. Fix mutable search_path: recreate the function with `SET search_path = ''`
   and fully-qualify all object references (`public.daily_visits`).
   This prevents search_path-injection attacks where a malicious schema could
   shadow `daily_visits` and hijack the SECURITY DEFINER context.

2. Revoke EXECUTE from anon + authenticated: the function must only be
   callable by the edge function, which connects as service_role (a superuser
   that bypasses EXECUTE restrictions). Direct REST calls via
   /rest/v1/rpc/increment_daily_visit are now blocked for anonymous and
   authenticated users.
*/

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

REVOKE EXECUTE ON FUNCTION public.increment_daily_visit(date) FROM anon, authenticated;
