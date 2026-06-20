import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  WHITE: '#FFFFFF',

  GRAY_50: '#f9fafb',
  GRAY_100: '#f4f4f5',
  GRAY_200: '#e4e4e7',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  GRAY_500: '#6b7280',
  GRAY_600: '#4b5563',
  GRAY_700: '#3f3f46',
  GRAY_800: '#27272a',
  GRAY_900: '#18181b',
  GRAY_950: '#030712',

  GREEN_100: '#dcfce7',
  GREEN_200: '#bbf7d0',
  GREEN_300: '#86efac',
  GREEN_400: '#4ade80',
  GREEN_500: '#22c55e',
  GREEN_600: '#16a34a',
  GREEN_700: '#15803d',
  GREEN_800: '#065f46',
  GREEN_900: '#064e3b',

  RED_600: '#dc2626',
  RED_700: '#b91c1c',
  RED_800: '#991b1b',
  RED_900: '#7f1d1d',
} as const;

export type ThemeColor = keyof typeof Colors;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  xxxxl: 36,
  xxxxxl: 48,
  xxxxxxl: 60,
  xxxxxxxl: 72,
} as const;

export type FontSize = keyof typeof FontSize;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const ScreenGutter = Spacing.four;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
