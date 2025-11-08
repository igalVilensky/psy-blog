/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode with class strategy
  content: [
    "./app.vue",
    "./pages/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./utils/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      // Define custom font families
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        // MindQlab Core Colors
        "mindqlab-indigo": "#5C6BC0",
        "mindqlab-teal": "#4DB6AC",
        "mindqlab-gold": "#FFD54F",

        // MindQlab Text & Backgrounds (for Light Mode)
        "mindqlab-text": "#212121",
        "mindqlab-bg-soft": "#F8F8F8",
        "mindqlab-neutral-light": "#E0E0E0",

        // MindQlab Dark Mode Specific Colors
        "mindqlab-dark-bg": "#1A1A1A",
        "mindqlab-dark-surface": "#2C2C2C",
        "mindqlab-dark-text": "#E0E0E0", // Use this for dark mode text

        // Existing background color
        background: "#161C2E",

        // Existing Gradient colors
        gradient: {
          blue: { start: "#3A1CFF", end: "#00E6FF" },
          orange: { start: "#FF3D00", end: "#FF9E00" },
          purple: { start: "#B44CFF", end: "#FF4DFF" },
          mint: { start: "#00FF88", end: "#70FF94" },
        },
      },
      backgroundImage: {
        "gradient-blue-purple": "linear-gradient(to right, #0EA5E9, #E879F9)",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "slow-drift": "slowDrift 15s ease-in-out infinite",
        "slow-pulse": "slowPulse 12s ease-in-out infinite",
        "slow-float": "slowFloat 15s ease-in-out infinite",
      },
      keyframes: {
        slowDrift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-200px, 300px)" },
        },
        slowPulse: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.5" },
        },
        slowFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-200px)" },
        },
      },
      // --- CORRECTED TYPOGRAPHY PLUGIN CONFIGURATION ---
      typography: ({ theme }) => ({
        // Styles for default (light mode) prose
        DEFAULT: {
          css: {
            color: theme("colors.mindqlab-text"),
            h1: {
              fontFamily: theme("fontFamily.montserrat"),
              color: theme("colors.mindqlab-indigo"),
              fontWeight: "800",
            },
            h2: {
              fontFamily: theme("fontFamily.montserrat"),
              color: theme("colors.mindqlab-text"),
              fontWeight: "700",
            },
            h3: {
              fontFamily: theme("fontFamily.montserrat"),
              color: theme("colors.mindqlab-text"),
              fontWeight: "600",
            },
            p: {
              fontFamily: theme("fontFamily.open-sans"),
              color: theme("colors.mindqlab-text"), // Dark text for light bg
            },
            a: {
              color: theme("colors.mindqlab-teal"),
              "&:hover": {
                color: theme("colors.mindqlab-indigo"),
              },
            },
            strong: { color: theme("colors.mindqlab-text") },
            // Add other light mode styles as needed
          },
        },
        // Styles that apply when the `.prose-invert` class is used
        invert: {
          css: {
            color: theme("colors.slate.300"), // Default text color for dark mode
            h1: {
              color: theme("colors.white"),
            },
            h2: {
              color: theme("colors.slate.100"),
            },
            h3: {
              color: theme("colors.slate.200"),
            },
            p: {
              color: theme("colors.slate.300"), // Explicitly set paragraph color
            },
            a: {
              color: theme("colors.sky.400"), // A bright, accessible link color
              "&:hover": {
                color: theme("colors.sky.300"),
              },
            },
            strong: { color: theme("colors.white") },
            blockquote: {
              color: theme("colors.slate.300"),
              borderLeftColor: theme("colors.sky.900"),
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              color: theme("colors.slate.200"),
              backgroundColor: theme("colors.slate.800"),
              borderRadius: theme("borderRadius.md"),
              padding: theme("spacing[1.5]") + " " + theme("spacing[2]"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Ensure typography plugin is enabled
  ],
};
