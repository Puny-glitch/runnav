import type { SensorReading } from '../types';

// TODO (Agent 3): implement full sensor subscription and buffering logic

export interface SensorServiceConfig {
  updateIntervalMs: number;
}

/**
 * SensorService — manages subscriptions to expo-sensors (Accelerometer,
 * Gyroscope, Pedometer) and exposes a simple callback-based API.
 */
export class SensorService {
  private config: SensorServiceConfig;
  private onAccelerometer: ((reading: SensorReading) => void) | null = null;
  private onGyroscope: ((reading: SensorReading) => void) | null = null;
  private onStep: ((count: number) => void) | null = null;

  constructor(config: SensorServiceConfig = { updateIntervalMs: 100 }) {
    this.config = config;
  }

  subscribe(callbacks: {
    onAccelerometer?: (reading: SensorReading) => void;
    onGyroscope?: (reading: SensorReading) => void;
    onStep?: (count: number) => void;
  }): void {
    this.onAccelerometer = callbacks.onAccelerometer ?? null;
    this.onGyroscope = callbacks.onGyroscope ?? null;
    this.onStep = callbacks.onStep ?? null;
    // TODO (Agent 3): attach expo-sensors listeners here
  }

  unsubscribe(): void {
    this.onAccelerometer = null;
    this.onGyroscope = null;
    this.onStep = null;
    // TODO (Agent 3): remove expo-sensors listeners here
  }
}
