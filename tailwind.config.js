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
        background: "#1A1F35",

        // Gradient colors
        gradient: {
          blue: {
            start: "#0EA5E9", // Start color for blue gradient
            end: "#22D3EE", // End color for blue gradient
          },
          orange: {
            start: "#F59E0B", // Start color for orange gradient
            end: "#F97316", // End color for orange gradient
          },
          purple: {
            start: "#E879F9", // Start color for purple gradient
            end: "#C084FC", // End color for purple gradient
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
