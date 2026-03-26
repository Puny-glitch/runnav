import { useProfileStore } from '../stores/profileStore';
import type { CalibrationProfile, CarriageMode, CalibrationRep } from '../types';

interface UseCalibrationReturn {
  profiles: CalibrationProfile[];
  selectedMode: CarriageMode;
  isCalibrating: boolean;
  selectMode: (mode: CarriageMode) => void;
  // TODO (Agent 3): implement full calibration flow
  startCalibration: () => void;
  recordRep: (rep: CalibrationRep) => void;
  finishCalibration: () => Promise<CalibrationProfile | null>;
}

export function useCalibration(): UseCalibrationReturn {
  const { profiles, selectedMode, isCalibrating, addProfile, selectMode } =
    useProfileStore();

  return {
    profiles,
    selectedMode,
    isCalibrating,
    selectMode,
    startCalibration: () => {
      // TODO (Agent 3): start calibration session via CalibrationEngine
    },
    recordRep: (_rep: CalibrationRep) => {
      // TODO (Agent 3): record rep via CalibrationEngine
    },
    finishCalibration: async () => {
      // TODO (Agent 3): finalize calibration, persist profile, return result
      return null;
    },
  };
}
