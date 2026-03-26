import type { SensorReading, CalibrationProfile } from '../types';

// TODO (Agent 3): implement full Kalman-filter-based speed estimator

/**
 * SpeedEstimator — fuses accelerometer + pedometer data with a calibrated
 * stride curve to estimate real-time running speed in m/s.
 */
export class SpeedEstimator {
  private profile: CalibrationProfile | null = null;
  private lastReadings: SensorReading[] = [];

  setCalibrationProfile(profile: CalibrationProfile): void {
    this.profile = profile;
  }

  /** Push a new accelerometer reading into the estimator buffer */
  pushReading(reading: SensorReading): void {
    this.lastReadings.push(reading);
    // Keep a rolling 2-second window at 100 Hz → 200 samples max
    if (this.lastReadings.length > 200) this.lastReadings.shift();
  }

  /** Returns estimated speed in m/s, or null if insufficient data */
  getSpeedMs(stepCount: number, elapsedSeconds: number): number | null {
    if (!this.profile) return null;
    if (elapsedSeconds === 0) return null;

    // TODO (Agent 3): interpolate stride length from cadence via profile.coefficients
    const cadence = stepCount / elapsedSeconds; // steps/s
    void cadence; // used by TODO above

    return null;
  }
}
