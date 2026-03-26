import type { RouteSegment, ETAResult, ConfidenceLevel, CalibrationProfile } from '../types';

// TODO (Agent 5): implement full ETA calculation with elevation model

/**
 * ETACalculator — takes a route (array of segments) plus a calibration
 * profile and returns an ETAResult with per-segment breakdowns.
 */
export class ETACalculator {
  private profile: CalibrationProfile | null = null;

  setCalibrationProfile(profile: CalibrationProfile): void {
    this.profile = profile;
  }

  /** Compute confidence level based on profile quality and GPS accuracy */
  private computeConfidence(qualityScore: number): ConfidenceLevel {
    if (qualityScore >= 0.8) return 'high';
    if (qualityScore >= 0.5) return 'medium';
    return 'low';
  }

  calculate(segments: RouteSegment[]): ETAResult {
    // TODO (Agent 5): apply elevation adjustment, fatigue model, and historical data
    const totalEtaSeconds = segments.reduce((sum, s) => sum + s.etaSeconds, 0);
    const qualityScore = this.profile?.qualityScore ?? 0;

    return {
      totalEtaSeconds,
      confidence: this.computeConfidence(qualityScore),
      segments,
      marginSeconds: Math.round(totalEtaSeconds * 0.05), // 5% margin placeholder
    };
  }
}
