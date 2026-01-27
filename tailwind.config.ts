import type { Config } from "tailwindcss"

// TODO: move to global.css ( migrate tailwind v4 )
// TODO: remove gamitool prefixing

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
