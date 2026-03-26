import { useAuthStore } from '../stores/authStore';
import type { User } from '../types';
import type { Session } from '../stores/authStore';

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const { user, session, isLoading, signIn, signOut, signUp } = useAuthStore();

  return {
    user,
    session,
    isLoading,
    isAuthenticated: user !== null && session !== null,
    signIn,
    signOut,
    signUp,
  };
}
