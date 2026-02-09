/**
 * Color Theme Configuration
 * Synced from Figma design system
 */

export const colors = {
  // Primary & Secondary
  primary: "#5a7bff",
  secondary: "#003580",
  accent: "#5a7bff",

  // Brand Colors
  purple: "#a855f7",
  orange: "#ff964f",
  green: "#7BB67F",
  red: "#f96767",
  black: "#13133C",

  // Status Colors
  destructive: "#f96767",
  success: "#22c55e",
  warning: "#ff964f",
  info: "#a855f7",

  // UI Colors
  background: "#ffffff",
  foreground: "#003580",
  gray: "#7A86A1",
  white: "#ffffff",

  // Component Colors
  card: "#ffffff",
  cardForeground: "#003580",
  cardBorder: "#ebebeb",
  popover: "#ffffff",
  popoverForeground: "#003580",
  sidebar: "#f6faff",

  // Muted Colors
  muted: "#f2f2f2",
  mutedForeground: "#7a86a1",

  // Light Colors
  lightBlue: "#d3eaff",
  lightGreen: "#dbffe8",
  lightPink: "#fff4f2",
  lightPurple: "#F3EEFF",
  mdlightPurple: "#CECEFE",
  lightGray: "#f2f2f2",
  lightYellow: "#f8f3dd",

  // Border & Input
  border: "#e5e7eb",
  input: "#f9fafb",
  ring: "#5a7bff",

  // Chart Colors
  chart1: "#5a7bff",
  chart2: "#003580",
  chart3: "#a855f7",
  chart4: "#ff964f",
  chart5: "#22c55e",
} as const;

export type ColorKey = keyof typeof colors;

/**
 * Get CSS variable name for a color
 * @example getCSSVar('primary') => 'var(--primary)'
 */
export const getCSSVar = (key: ColorKey) => `var(--${key})`;

/**
 * Shadow/Elevation System
 * Used for cards, modals, and depth
 */
export const shadows = {
  card: "2.26px 12.8px 54px 0 rgba(105, 95, 151, 0.08)",
  sm: "0 1px 3px 0 var(--tw-shadow-color, #0000001a), 0 1px 2px -1px var(--tw-shadow-color, #0000001a)",
  md: "0 4px 6px -1px rgba(0, 53, 128, 0.1), 0 2px 4px -1px rgba(0, 53, 128, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 53, 128, 0.1), 0 4px 6px -2px rgba(0, 53, 128, 0.05)",
} as const;

export type ShadowKey = keyof typeof shadows;

/**
 * Get shadow CSS value
 * @example getShadow('card') => '2.26px 12.8px 54px 0 rgba(...)'
 */
export const getShadow = (key: ShadowKey) => shadows[key];

/**
 * Color aliases for semantic usage
 */
export const semanticColors = {
  text: colors.foreground,
  textMuted: colors.mutedForeground,
  background: colors.background,
  success: colors.success,
  warning: colors.warning,
  error: colors.destructive,
  info: colors.info,
} as const;
