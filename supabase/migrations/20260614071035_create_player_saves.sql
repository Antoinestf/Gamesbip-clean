-- player_saves: cloud sync for all 4 game trackers
-- Identified by a short 6-char share_code; no auth required (anonymous app)

CREATE TABLE IF NOT EXISTS player_saves (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  share_code  TEXT        NOT NULL UNIQUE,
  gta5        JSONB       NOT NULL DEFAULT '{"completed":{},"checked":{}}',
  eldenring   JSONB       NOT NULL DEFAULT '{"completed":{},"checked":{}}',
  hades2      JSONB       NOT NULL DEFAULT '{"completed":{},"checked":{}}',
  sts2        JSONB       NOT NULL DEFAULT '{"completed":{},"checked":{}}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE player_saves ENABLE ROW LEVEL SECURITY;

-- Anyone can read (share_code acts as the secret — filtered at query level)
CREATE POLICY "select_player_saves" ON player_saves FOR SELECT
  TO anon, authenticated USING (true);

-- Anyone can create a new save
CREATE POLICY "insert_player_saves" ON player_saves FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Anyone who knows the share_code can overwrite their save
CREATE POLICY "update_player_saves" ON player_saves FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Auto-update updated_at on every write
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER player_saves_updated_at
  BEFORE UPDATE ON player_saves
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
