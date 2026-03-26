import { useAuthStore } from '../stores/authStore';

// TODO (Agent 4): wire to RevenueCat SDK + subscriptions table via Supabase
export function usePro(): { isPro: boolean; isLoading: boolean } {
  // Placeholder — subscription check will query the subscriptions table
  const { user } = useAuthStore();

  return {
    isPro: false,    // replace with real subscription query
    isLoading: user === null,
  };
}
