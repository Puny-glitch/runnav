import { create } from 'zustand';
import type { RouteSegment, ETAResult, Coords } from '../types';

interface NavigationState {
  activeRoute: RouteSegment[] | null;
  currentEta: ETAResult | null;
  currentPosition: Coords | null;
  isNavigating: boolean;
}

interface NavigationActions {
  startNavigation: (route: RouteSegment[]) => void;
  stopNavigation: () => void;
  updatePosition: (position: Coords) => void;
}

export const useNavigationStore = create<NavigationState & NavigationActions>()(
  (set) => ({
    activeRoute: null,
    currentEta: null,
    currentPosition: null,
    isNavigating: false,

    startNavigation: (route) =>
      set({ activeRoute: route, isNavigating: true }),

    stopNavigation: () =>
      set({ activeRoute: null, currentEta: null, isNavigating: false }),

    updatePosition: (position) => set({ currentPosition: position }),
  }),
);
