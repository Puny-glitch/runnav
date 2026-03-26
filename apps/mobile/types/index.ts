// ============================================================
// RunNav — Shared TypeScript Types
// ============================================================

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export type CarriageMode = 'hand' | 'pocket' | 'armband';

export interface StrideCurve {
  cadencePoints: number[];
  strideLengthPoints: number[];
}

export interface CalibrationProfile {
  id: string;
  userId: string;
  carriageMode: CarriageMode;
  coefficients: StrideCurve;
  qualityScore: number;
  createdAt: string;
}

export interface Run {
  id: string;
  userId: string;
  startedAt: string;
  endedAt: string;
  predictedEtaSeconds: number;
  actualEtaSeconds: number;
  routeGeoJSON: GeoJSON.FeatureCollection;
  carriageMode: CarriageMode;
}

export interface RouteSegment {
  distanceMeters: number;
  elevationGainMeters: number;
  expectedSpeedMs: number;
  etaSeconds: number;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ETAResult {
  totalEtaSeconds: number;
  confidence: ConfidenceLevel;
  segments: RouteSegment[];
  marginSeconds: number;
}

export type SubscriptionTier = 'free' | 'pro';

export interface Subscription {
  userId: string;
  tier: SubscriptionTier;
  expiresAt: string;
}

export interface SensorReading {
  timestamp: number;
  x: number;
  y: number;
  z: number;
}

export type CalibrationRepType = 'sprint' | 'tempo' | 'long' | 'pocket';

export interface CalibrationRep {
  type: CalibrationRepType;
  distanceMeters: number;
  steps: number;
  durationSeconds: number;
  gpsAccuracy: number;
}

export interface Coords {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
}
