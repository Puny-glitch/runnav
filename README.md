# RunNav

Personalised running navigation with accurate ETAs based on your own pace profile.

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd runnav/apps/mobile
npm install
```

### 2. Configure environment

```bash
cp ../../.env.example ../../.env.local
# Edit .env.local — fill in all required values (see .env.example for keys)
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration: `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Copy your **Project URL** and **anon key** into `.env.local`
4. Enable email auth in Authentication → Providers

### 4. Set up Stadia Maps

1. Create an account at [stadiamaps.com](https://stadiamaps.com)
2. Create an API key and add it to `.env.local` as `EXPO_PUBLIC_STADIA_MAPS_KEY`

### 5. Start the app

```bash
cd apps/mobile
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press `i`/`a` for simulators.

## Scripts

```bash
npm run typecheck   # TypeScript type check
npm run lint        # ESLint
npm run format      # Prettier
npm test            # Jest tests
```

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for the full architecture guide intended for AI agents.

## Security Notes

- Never commit `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY` is used only in Edge Functions — never in the mobile app
- All database tables use Row Level Security — users can only access their own data
