import { create } from 'zustand';
import type { User } from '../types';

// Supabase session type (we re-export a minimal shape to avoid depending on the
// full @supabase/supabase-js type here — import the real one in SupabaseClient.ts)
export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  user: null,
  session: null,
  isLoading: false,

  signIn: async (_email, _password) => {
    // TODO (Agent 2): implement with SupabaseClient
    set({ isLoading: true });
    try {
      // await supabase.auth.signInWithPassword(...)
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    // TODO (Agent 2): implement with SupabaseClient
    set({ user: null, session: null });
  },

  signUp: async (_email, _password, _displayName) => {
    // TODO (Agent 2): implement with SupabaseClient
    set({ isLoading: true });
    try {
      // await supabase.auth.signUp(...)
    } finally {
      set({ isLoading: false });
    }
  },
}));
