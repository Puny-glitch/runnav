// ============================================================
// RunNav — Design Tokens
// ============================================================

export const Colors = {
  brandPrimary: '#00D4AA',
  brandSecondary: '#FF6B35',
  surfaceDark: '#0D0D0D',
  surfaceCard: '#1A1A1A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  confidenceHigh: '#00D4AA',
  confidenceMid: '#FFB800',
  confidenceLow: '#FF4444',
  error: '#FF4444',
  success: '#00D4AA',
} as const;

export type ColorKey = keyof typeof Colors;

export const Typography = {
  fontDisplay: 'SpaceMono',  // Monospace keeps numbers stable in large ETAs
  fontHeading: 'Sora',
  fontBody: 'Inter',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type SpacingKey = keyof typeof Spacing;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export type BorderRadiusKey = keyof typeof BorderRadius;

/** Minimum interactive touch target size (dp) */
export const MinTouchTarget = 48;

const Theme = {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  MinTouchTarget,
} as const;

export type Theme = typeof Theme;

export default Theme;
