-- ============================================================
-- RunNav — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- ============================================================
-- All tables have Row Level Security (RLS) enabled.
-- Policies follow least-privilege: users access only their own data.
-- Service role bypasses RLS for server-side operations.
-- ============================================================

-- ----------------------------------------------------------------
-- 1. profiles
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  display_name TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: users read own row"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles: users update own row"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles: users insert own row"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ----------------------------------------------------------------
-- 2. calibration_profiles
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS calibration_profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  carriage_mode TEXT NOT NULL CHECK (carriage_mode IN ('hand', 'pocket', 'armband')),
  coefficients  JSONB NOT NULL,        -- StrideCurve: {cadencePoints, strideLengthPoints}
  quality_score NUMERIC CHECK (quality_score BETWEEN 0 AND 1),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE calibration_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "calibration_profiles: users read own rows"
  ON calibration_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "calibration_profiles: users insert own rows"
  ON calibration_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "calibration_profiles: users update own rows"
  ON calibration_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "calibration_profiles: users delete own rows"
  ON calibration_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- ----------------------------------------------------------------
-- 3. runs
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS runs (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  started_at             TIMESTAMPTZ,
  ended_at               TIMESTAMPTZ,
  predicted_eta_seconds  INTEGER,
  actual_eta_seconds     INTEGER,
  route_geojson          JSONB,
  carriage_mode          TEXT CHECK (carriage_mode IN ('hand', 'pocket', 'armband')),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "runs: users read own rows"
  ON runs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "runs: users insert own rows"
  ON runs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "runs: users update own rows"
  ON runs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "runs: users delete own rows"
  ON runs FOR DELETE
  USING (auth.uid() = user_id);

-- ----------------------------------------------------------------
-- 4. subscriptions
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriptions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier           TEXT NOT NULL CHECK (tier IN ('free', 'pro')) DEFAULT 'free',
  expires_at     TIMESTAMPTZ,
  revenuecat_id  TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only read their own subscription; writes are service-role only
CREATE POLICY "subscriptions: users read own row"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- No INSERT/UPDATE/DELETE policies for authenticated role →
-- only the service role (via Edge Functions) can write subscription records.

-- ----------------------------------------------------------------
-- 5. audit_log
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID,                        -- nullable for system events
  action     TEXT NOT NULL,
  metadata   JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_log: authenticated users can insert"
  ON audit_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "audit_log: users read own rows"
  ON audit_log FOR SELECT
  USING (auth.uid() = user_id);

-- ----------------------------------------------------------------
-- Indexes for common query patterns
-- ----------------------------------------------------------------
CREATE INDEX IF NOT EXISTS calibration_profiles_user_id_idx ON calibration_profiles (user_id);
CREATE INDEX IF NOT EXISTS runs_user_id_idx ON runs (user_id);
CREATE INDEX IF NOT EXISTS runs_started_at_idx ON runs (started_at DESC);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS audit_log_user_id_idx ON audit_log (user_id);
