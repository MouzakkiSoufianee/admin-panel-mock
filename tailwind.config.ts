import type { Config } from "tailwindcss"

// TODO: move to global.css ( migrate tailwind v4 )
// TODO: remove gamitool prefixing

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#5a7bff",
      secondary: "#003580",
      accent: "#5a7bff",
      purple: "#a855f7",
      orange: "#ff964f",
      green: "#7BB67F",
      red: "#f96767",
      black: "#13133C",
      destructive: "#f96767",
      success: "#22c55e",
      warning: "#ff964f",
      info: "#a855f7",
      background: "#ffffff",
      foreground: "#003580",
      gray: "#7A86A1",
      white: "#ffffff",
      card: "#ffffff",
      "card-foreground": "#003580",
      "card-border": "#ebebeb",
      popover: "#ffffff",
      "popover-foreground": "#003580",
      sidebar: "#f6faff",
      muted: "#f2f2f2",
      "muted-foreground": "#7a86a1",
      "light-blue": "#d3eaff",
      "light-green": "#dbffe8",
      "light-pink": "#fff4f2",
      "light-purple": "#F3EEFF",
      "mdlight-purple": "#CECEFE",
      "light-gray": "#f2f2f2",
      "light-yellow": "#f8f3dd",
      border: "#e5e7eb",
      input: "#f9fafb",
      ring: "#5a7bff",
      "chart-1": "#5a7bff",
      "chart-2": "#003580",
      "chart-3": "#a855f7",
      "chart-4": "#ff964f",
      "chart-5": "#22c55e",
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {
      fontSize: {
        'h1': ['18px', { lineHeight: '28px' }],
        'h2': ['16px', { lineHeight: '24px' }],
        'h3': ['15px', { lineHeight: '22px' }],
        'h4': ['12px', { lineHeight: '18px' }],
        'h5': ['12px', { lineHeight: '18px' }],
      },
      fontWeight: {
        'h1-weight': '700',
        'h2-weight': '700',
        'h3-weight': '400',
        'h4-weight': '500',
        'h5-weight': '400',
      },
      // boxShadow: {
      //     "gamitool": "0 4px 6px -1px rgba(0, 53, 128, 0.1), 0 2px 4px -1px rgba(0, 53, 128, 0.06)",
      //     "gamitool-lg": "0 10px 15px -3px rgba(0, 53, 128, 0.1), 0 4px 6px -2px rgba(0, 53, 128, 0.05)",
      // },
      animation: {
        "gamitool-pulse": "gamitool-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gamitool-bounce": "gamitool-bounce 1s infinite",
      },
      keyframes: {
        "gamitool-pulse": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
        "gamitool-bounce": {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
