// ============================================================
// RunNav — App Config (reads from environment variables)
// ============================================================
// All EXPO_PUBLIC_ vars are safe to expose to the client bundle.
// Never add SUPABASE_SERVICE_ROLE_KEY or other server-only secrets here.

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const Config = {
  supabase: {
    url: requireEnv('EXPO_PUBLIC_SUPABASE_URL'),
    anonKey: requireEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY'),
  },
  stadiaMaps: {
    apiKey: requireEnv('EXPO_PUBLIC_STADIA_MAPS_KEY'),
  },
  posthog: {
    apiKey: requireEnv('EXPO_PUBLIC_POSTHOG_KEY'),
  },
  sentry: {
    dsn: requireEnv('EXPO_PUBLIC_SENTRY_DSN'),
  },
} as const;

export default Config;
