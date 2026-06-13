/*
# Visitor analytics — daily_visits table + increment RPC

## Purpose
Stores one row per calendar day with a running visit count.
The frontend fires a lightweight edge function once per browser session;
the edge function calls increment_daily_visit() to atomically upsert the count.

## New Table
- `daily_visits`
  - `date`  DATE PRIMARY KEY — one row per calendar day (UTC)
  - `count` BIGINT NOT NULL DEFAULT 0 — cumulative session count for that day

## Security
- RLS enabled. No public policies are added — only the service-role key
  used by the edge function can write. anon users have read access so
  a future stats widget can query without a secret.

## New Function
- `increment_daily_visit(visit_date DATE)` — SECURITY DEFINER so the
  edge function can upsert even through RLS. Atomically inserts or
  increments the counter for the given date.
*/

CREATE TABLE IF NOT EXISTS daily_visits (
  date  DATE   PRIMARY KEY,
  count BIGINT NOT NULL DEFAULT 0
);

ALTER TABLE daily_visits ENABLE ROW LEVEL SECURITY;

-- Anon can read (future public stats widget)
DROP POLICY IF EXISTS "anon_read_daily_visits" ON daily_visits;
CREATE POLICY "anon_read_daily_visits" ON daily_visits FOR SELECT
  TO anon, authenticated USING (true);

-- No direct insert/update policies — writes go through the SECURITY DEFINER RPC only

CREATE OR REPLACE FUNCTION increment_daily_visit(visit_date DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO daily_visits (date, count)
  VALUES (visit_date, 1)
  ON CONFLICT (date) DO UPDATE
    SET count = daily_visits.count + 1;
END;
$$;
