/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode with class strategy
  content: [
    "./app.vue",
    "./pages/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}", // Important: include layouts if you have them
    "./plugins/**/*.{js,ts}", // Important: include plugins
    "./nuxt.config.{js,ts}", // Important: include nuxt.config
    "./utils/**/*.{js,ts}", // Include utility files
  ],
  theme: {
    extend: {
      // Define custom font families
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        // You can also add a default sans font if you prefer
        // sans: ['Open Sans', 'ui-sans-serif', 'system-ui', ...],
      },
      colors: {
        // MindQlab Core Colors
        "mindqlab-indigo": "#5C6BC0",
        "mindqlab-teal": "#4DB6AC",
        "mindqlab-gold": "#FFD54F",

        // MindQlab Text & Backgrounds
        "mindqlab-text": "#212121",
        "mindqlab-bg-soft": "#F8F8F8",
        "mindqlab-neutral-light": "#E0E0E0",

        // MindQlab Dark Mode Specific Colors
        "mindqlab-dark-bg": "#1A1A1A",
        "mindqlab-dark-surface": "#2C2C2C", // Used for cards/elements on dark background
        "mindqlab-dark-text": "#E0E0E0",

        // Existing background color
        background: "#161C2E",

        // Existing Gradient colors
        gradient: {
          blue: {
            start: "#3A1CFF",
            end: "#00E6FF",
          },
          orange: {
            start: "#FF3D00",
            end: "#FF9E00",
          },
          purple: {
            start: "#B44CFF",
            end: "#FF4DFF",
          },
          mint: {
            start: "#00FF88",
            end: "#70FF94",
          },
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
      // Typography plugin configuration
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // General text color for prose content, respecting dark mode
            color: theme("colors.mindqlab-text"),
            '[data-mode="dark"] &': {
              color: theme("colors.mindqlab-dark-text"),
            },
            h1: {
              fontFamily: theme("fontFamily.montserrat"),
              color: theme("colors.mindqlab-indigo"), // H1 specifically branded
              '[data-mode="dark"] &': {
                color: theme("colors.mindqlab-teal"),
              },
              fontSize: theme("fontSize.4xl"), // Use Tailwind's default sizes
              "@screen lg": {
                fontSize: theme("fontSize.5xl"),
              },
              fontWeight: theme("fontWeight.extrabold"),
              marginBottom: theme("spacing.6"), // Use Tailwind's spacing scale
            },
            h2: {
              fontFamily: theme("fontFamily.montserrat"),
              color: theme("colors.mindqlab-text"),
              '[data-mode="dark"] &': {
                color: theme("colors.mindqlab-dark-text"),
              },
              fontSize: theme("fontSize.3xl"),
              "@screen lg": {
                fontSize: theme("fontSize.4xl"),
              },
              fontWeight: theme("fontWeight.bold"),
              marginBottom: theme("spacing.5"),
            },
            h3: {
              // Added H3 for consistency
              fontFamily: theme("fontFamily.montserrat"),
              color: theme("colors.mindqlab-text"),
              '[data-mode="dark"] &': {
                color: theme("colors.mindqlab-dark-text"),
              },
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.semibold"),
              marginBottom: theme("spacing.4"),
            },
            p: {
              fontFamily: theme("fontFamily.open-sans"),
              color: theme("colors.mindqlab-text"),
              '[data-mode="dark"] &': {
                color: theme("colors.mindqlab-dark-text"),
              },
              fontSize: theme("fontSize.base"),
              lineHeight: theme("lineHeight.relaxed"),
              marginBottom: theme("spacing.4"),
            },
            a: {
              color: theme("colors.mindqlab-teal"),
              "&:hover": {
                color: theme("colors.mindqlab-indigo"),
              },
            },
            // Add more prose element styling as needed
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Ensure typography plugin is enabled
  ],
};
