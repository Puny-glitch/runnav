import { create } from 'zustand';
import type { CalibrationProfile, CarriageMode } from '../types';

interface ProfileState {
  profiles: CalibrationProfile[];
  selectedMode: CarriageMode;
  isCalibrating: boolean;
}

interface ProfileActions {
  addProfile: (profile: CalibrationProfile) => void;
  selectMode: (mode: CarriageMode) => void;
}

export const useProfileStore = create<ProfileState & ProfileActions>()((set) => ({
  profiles: [],
  selectedMode: 'hand',
  isCalibrating: false,

  addProfile: (profile) =>
    set((state) => ({ profiles: [...state.profiles, profile] })),

  selectMode: (mode) => set({ selectedMode: mode }),
}));
