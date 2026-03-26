import type { CalibrationRep, CalibrationProfile, CarriageMode, StrideCurve } from '../types';

// TODO (Agent 3): implement stride-length regression model

export interface CalibrationSession {
  mode: CarriageMode;
  reps: CalibrationRep[];
  startedAt: number;
}

/**
 * CalibrationEngine — collects calibration reps and fits a stride curve
 * (cadence → stride-length) using least-squares regression.
 */
export class CalibrationEngine {
  private session: CalibrationSession | null = null;

  startSession(mode: CarriageMode): void {
    this.session = { mode, reps: [], startedAt: Date.now() };
  }

  addRep(rep: CalibrationRep): void {
    if (!this.session) throw new Error('No active calibration session');
    this.session.reps.push(rep);
  }

  /** Returns quality score 0–1 based on rep coverage and GPS accuracy */
  getQualityScore(): number {
    // TODO (Agent 3): compute from rep spread and GPS accuracy values
    return 0;
  }

  /** Fits the stride curve and returns a CalibrationProfile shell */
  finalize(userId: string): Omit<CalibrationProfile, 'id' | 'createdAt'> {
    if (!this.session) throw new Error('No active calibration session');

    const coefficients: StrideCurve = {
      cadencePoints: [],     // TODO (Agent 3): extract from reps
      strideLengthPoints: [], // TODO (Agent 3): fit regression
    };

    return {
      userId,
      carriageMode: this.session.mode,
      coefficients,
      qualityScore: this.getQualityScore(),
    };
  }

  reset(): void {
    this.session = null;
  }
}
