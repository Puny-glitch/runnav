# RunNav — Agent Instructions (CLAUDE.md)

## Project Overview

**RunNav** is a React Native running navigation app that gives runners personalised, accurate ETAs based on their own pace profile. Unlike generic mapping apps that use average speeds, RunNav calibrates to each user's stride length across different phone-carrying modes (hand, pocket, armband) and terrain types, then uses that model to predict finish times with high confidence.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | Expo SDK 51, React Native, TypeScript (strict) |
| Routing | Expo Router v3 (file-based) |
| Backend | Supabase Edge Functions (Deno/TypeScript) |
| Database + Auth | Supabase (PostgreSQL + GoTrue) |
| Maps | MapLibre GL + Stadia Maps |
| State | Zustand + TanStack React Query |
| Payments | RevenueCat React Native SDK |
| Analytics | PostHog React Native |
| Crash reporting | Sentry Expo |
| Local storage | expo-secure-store (tokens), expo-sqlite (calibration cache) |
| Sensors | expo-sensors (Accelerometer, Gyroscope, Pedometer) |
| Testing | Jest + React Native Testing Library |
| Linting | ESLint + Prettier |

---

## Folder Structure

```
runnav/
├── apps/
│   └── mobile/
│       ├── app/              # Expo Router screens
│       │   ├── (auth)/       # Onboarding, login, signup
│       │   ├── (tabs)/       # Main tabs: map, calibration, history, settings
│       │   ├── navigation/   # Live navigation screen [routeId]
│       │   └── post-run/     # Post-run summary [runId]
│       ├── components/       # Reusable UI components
│       ├── stores/           # Zustand state stores
│       ├── services/         # Business logic classes
│       ├── hooks/            # Custom React hooks
│       ├── constants/        # Theme tokens, app config
│       ├── types/            # Shared TypeScript interfaces
│       └── utils/            # Pure utility functions
├── supabase/
│   ├── functions/            # Deno Edge Functions
│   └── migrations/           # SQL schema migrations
├── .env.example              # Env var template (no real values)
└── .gitignore
```

---

## Key Rules (All Agents Must Follow)

1. **TypeScript strict mode** — `noImplicitAny: true`, `strictNullChecks: true`. Zero `any` types.
2. **Minimum 48dp touch targets** — All interactive elements must have `minHeight: 48` (use `Theme.MinTouchTarget`).
3. **All Supabase tables have RLS** — Every new table must include `ALTER TABLE x ENABLE ROW LEVEL SECURITY` and explicit policies.
4. **Never commit secrets** — `.env.local` is in `.gitignore`. Use `.env.example` for templates only.
5. **`EXPO_PUBLIC_` prefix** — Only for keys safe to ship in the client bundle. Server-only secrets (service role key, webhook secrets) must never have this prefix.
6. **No hardcoded strings** — All config values come from `constants/config.ts` (reads env vars).
7. **Components use Theme tokens** — Import from `constants/theme.ts`, never hardcode hex colors or raw pixel sizes.
8. **Edge Functions use service role only when necessary** — Prefer anon key + RLS for user-facing calls; use service role only in webhook handlers that write privileged data.

---

## Agent Build Log

### Agent 1 — Scaffold (✅ complete)
Built the complete project scaffold:
- All directories and file stubs
- TypeScript types (`types/index.ts`)
- Design tokens (`constants/theme.ts`)
- App config (`constants/config.ts`)
- Zustand store shells (`stores/`)
- Service class shells (`services/`)
- Custom hook shells (`hooks/`)
- All screen stubs (`app/`)
- All component stubs (`components/`)
- Full database schema (`supabase/migrations/001_initial_schema.sql`)
- Edge Function stubs (`supabase/functions/`)
- Root config files (`.env.example`, `.gitignore`)

---

## What Still Needs Building (Agents 2–8)

### Agent 2 — Auth & Onboarding
- Wire `authStore` to `SupabaseClient.ts` (sign in, sign up, sign out, session persistence)
- Implement `OnboardingCarousel` with permission requests (location, motion)
- Implement `LoginScreen` and `SignupScreen` forms
- `useAuth` hook connected to real Supabase session

### Agent 3 — Calibration Engine
- Implement `SensorService` with expo-sensors subscriptions
- Implement `CalibrationEngine` stride-length regression (least squares)
- Implement `SpeedEstimator` with Kalman filter
- Wire `useSensors` and `useCalibration` hooks
- Build `CalibrationScreen` and `CalibrationStep` component

### Agent 4 — Subscriptions (RevenueCat)
- Integrate RevenueCat SDK into the app
- Wire `usePro` hook to subscription status
- Implement `SubscriptionGate` component with paywall
- Implement `verify-subscription` Edge Function (INITIAL_PURCHASE, RENEWAL, CANCELLATION events)

### Agent 5 — Navigation & Maps
- Integrate MapLibre GL with Stadia Maps tiles
- Build `RoutePreview` map component
- Implement live navigation screen with `LiveNavBar` + `ETACard` + `ConfidenceBadge`
- Implement `ETACalculator` logic (elevation model, fatigue adjustments)
- Wire `get-eta` Edge Function

### Agent 6 — Run History & Post-Run
- Persist run records to `runs` table via Supabase
- Build `HistoryScreen` with run list
- Build `PostRunSummary` component with ETA accuracy delta
- Wire `post-run/[runId].tsx`

### Agent 7 — Settings & GDPR
- Build `SettingsScreen` (account, subscription management, carriage mode default)
- Implement `export-data` Edge Function (full GDPR data export)
- Add optional account deletion flow

### Agent 8 — Polish & Testing
- Write Jest unit tests for `ETACalculator`, `CalibrationEngine`, `SpeedEstimator`, utils
- Write React Native Testing Library tests for critical components
- PostHog analytics events
- Sentry error boundary integration
- Accessibility audit (48dp targets, screen reader labels)

---

## Running the App

```bash
cd apps/mobile
npm install
npx expo start
```

## Type Check

```bash
cd apps/mobile
npx tsc --noEmit
```
