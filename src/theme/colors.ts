export const colors = {
  // Primary — 朱色 (Vermillion, traditional Japanese seal color)
  primary: '#D94F4F',
  primaryLight: '#E87676',
  primaryDark: '#B33A3A',

  // Secondary — 深緑 (Deep green, bamboo forest)
  secondary: '#2D4A3E',
  secondaryLight: '#3D6454',
  secondaryDark: '#1E332B',

  // Accent — 金色 (Gold, achievement/reward)
  accent: '#F5C542',
  accentLight: '#F7D36E',
  accentDark: '#D4A82E',

  // Background — 和紙 (Washi paper, warm ivory)
  background: '#FDF6EC',
  backgroundDark: '#1A1A2E',
  surface: '#FFFFFF',
  surfaceDark: '#2A2A3E',

  // Text
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  textOnDark: '#F3F4F6',

  // Status
  success: '#34D399',
  warning: '#FBBF24',
  error: '#EF4444',
  info: '#60A5FA',

  // SRS States
  srsNew: '#9CA3AF',
  srsLearning: '#FBBF24',
  srsReview: '#34D399',
  srsMastered: '#F5C542',

  // Stroke colors
  strokeGuide: '#D1D5DB',
  strokeCorrect: '#34D399',
  strokeWarning: '#FBBF24',
  strokeError: '#EF4444',

  // Canvas
  canvasBackground: '#F0F7EE',
  canvasGrid: '#C8DBC4',
  canvasGridCenter: '#A3C49E',
  inkColor: '#1A1A2E',

  // Borders
  border: '#E5E7EB',
  borderDark: '#374151',
} as const;

export type ColorKey = keyof typeof colors;
