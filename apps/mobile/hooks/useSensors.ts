import { useEffect, useRef, useState } from 'react';
import type { SensorReading } from '../types';

interface UseSensorsReturn {
  accelerometer: SensorReading | null;
  gyroscope: SensorReading | null;
  stepCount: number;
  isAvailable: boolean;
}

// TODO (Agent 3): implement with expo-sensors (Accelerometer, Gyroscope, Pedometer)
export function useSensors(): UseSensorsReturn {
  const [accelerometer, setAccelerometer] = useState<SensorReading | null>(null);
  const [gyroscope, setGyroscope] = useState<SensorReading | null>(null);
  const [stepCount, setStepCount] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  // Suppress unused variable warnings until implementation
  void setAccelerometer;
  void setGyroscope;
  void setStepCount;
  void setIsAvailable;

  return { accelerometer, gyroscope, stepCount, isAvailable };
}
