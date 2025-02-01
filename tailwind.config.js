/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue", // Include app.vue
    "./pages/**/*.{vue,js,ts}", // Include all page files
    "./components/**/*.{vue,js,ts}", // Include all components
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            },
            h2: {
              fontSize: "1.875rem",
              fontWeight: "semibold",
              marginBottom: "1.25rem",
            },
            p: {
              fontSize: "1rem",
              marginBottom: "1rem",
            },
          },
        },
      },
      colors: {
        // Base background color
        background: "#161C2E", // Slightly adjusted darker blue-grey

        // Gradient colors
        gradient: {
          blue: {
            start: "#3A1CFF", // Deep electric blue
            end: "#00E6FF", // Bright cyan
          },
          orange: {
            start: "#FF3D00", // Vivid orange-red
            end: "#FF9E00", // Bright orange
          },
          purple: {
            start: "#B44CFF", // Rich purple
            end: "#FF4DFF", // Bright magenta
          },
          // New gradient option
          mint: {
            start: "#00FF88", // Bright mint
            end: "#70FF94", // Light green
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
    },
  },
  plugins: [],
};
