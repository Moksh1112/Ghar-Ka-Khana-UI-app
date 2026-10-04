import { Platform } from 'react-native';

const primaryOrange = '#F97316';
const darkOrange = '#EA580C';
const black = '#111111';
const white = '#FFFFFF';
const backgroundLight = '#F7F7F5'; // Very light greyish-white
const softNeutral = '#E6E6E2'; // BORDER / NEUTRAL
const mutedText = '#6B6B6B'; // SECONDARY TEXT
const errorRed = '#EF4444';
const successGreen = '#10B981';

// We will use one consistent Light theme as requested. (Minimal, trustworthy, warm)
export const Colors = {
  light: {
    primary: primaryOrange,
    primaryDark: darkOrange,
    text: black,
    textMuted: mutedText,
    background: backgroundLight,
    surface: white,
    border: softNeutral,
    error: errorRed,
    success: successGreen,
    tint: primaryOrange,
    icon: mutedText,
    tabIconDefault: mutedText,
    tabIconSelected: primaryOrange,
  },
  dark: {
    primary: primaryOrange,
    primaryDark: darkOrange,
    text: '#FFFFFF',
    textMuted: '#B8B8B8',
    background: '#111111',
    surface: '#1A1A1A',
    border: '#303030',
    error: errorRed,
    success: successGreen,
    tint: primaryOrange,
    icon: '#B8B8B8',
    tabIconDefault: '#B8B8B8',
    tabIconSelected: primaryOrange,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  round: 9999,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
};
