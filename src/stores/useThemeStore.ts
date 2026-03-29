import { create } from 'zustand';
import { Appearance } from 'react-native';
import { colors } from '../theme/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeColors = Record<string, string>;

const darkColors: ThemeColors = {
  ...colors,
  background: colors.backgroundDark,
  surface: colors.surfaceDark,
  text: colors.textOnDark,
  textSecondary: '#9CA3AF',
  textLight: '#6B7280',
  border: colors.borderDark,
  canvasBackground: '#1E2A1E',
  canvasGrid: '#2D4A3E',
  canvasGridCenter: '#3D6454',
};

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  theme: ThemeColors;
  setMode: (mode: ThemeMode) => void;
}

function resolveTheme(mode: ThemeMode) {
  if (mode === 'system') {
    return Appearance.getColorScheme() === 'dark';
  }
  return mode === 'dark';
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  isDark: false,
  theme: colors,

  setMode: (mode: ThemeMode) => {
    const isDark = resolveTheme(mode);
    set({
      mode,
      isDark,
      theme: isDark ? darkColors : colors,
    });
  },
}));
