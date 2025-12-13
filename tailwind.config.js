/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        // --- Existing Colors (Preserved) ---
        background: "#161C2E",
        gradient: {
          blue: { start: "#3A1CFF", end: "#00E6FF" },
          orange: { start: "#FF3D00", end: "#FF9E00" },
          purple: { start: "#B44CFF", end: "#FF4DFF" },
          mint: { start: "#00FF88", end: "#70FF94" },
        },

        // --- New Masterpiece Design System ---
        brand: {
          primary: "#F59E0B",   // Amber 500
          secondary: "#0EA5E9", // Sky 500
          accent: "#6366F1",    // Indigo 500
          dark: "#1C1917",      // Stone 900
        },
        surface: {
          50: "#FAFAF9",  // Stone 50
          100: "#F5F5F4", // Stone 100
          200: "#E7E5E4", // Stone 200
        },
        // Mapping for your typography plugin
        mindqlab: {
          text: "#44403C",
          indigo: "#4F46E5",
          teal: "#14B8A6",
          "dark-text": "#E7E5E4",
          "dark-bg": "#1C1917",
          "bg-soft": "#F8F8F8"
        }
      },
      backgroundImage: {
        "gradient-blue-purple": "linear-gradient(to right, #0EA5E9, #E879F9)",
        // New glass effect
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        // --- Existing Animations ---
        "spin-slow": "spin 5s linear infinite",
        "slow-drift": "slowDrift 15s ease-in-out infinite",
        "slow-pulse": "slowPulse 12s ease-in-out infinite",
        "slow-float": "slowFloat 15s ease-in-out infinite",

        // --- New Animations ---
        "blob": "blob 7s infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        "float-delayed": "float 6s ease-in-out 3s infinite",
      },
      keyframes: {
        // --- Existing Keyframes ---
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

        // --- New Keyframes ---
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      typography: ({ theme }) => ({
        // Keep your existing typography config exactly as is
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
              color: theme("colors.mindqlab-text"),
            },
            a: {
              color: theme("colors.mindqlab-teal"),
              "&:hover": {
                color: theme("colors.mindqlab-indigo"),
              },
            },
            strong: { color: theme("colors.mindqlab-text") },
          },
        },
        invert: {
          css: {
            color: theme("colors.slate.300"),
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.slate.100") },
            h3: { color: theme("colors.slate.200") },
            p: { color: theme("colors.slate.300") },
            a: {
              color: theme("colors.sky.400"),
              "&:hover": { color: theme("colors.sky.300") },
            },
            strong: { color: theme("colors.white") },
            blockquote: {
              color: theme("colors.slate.300"),
              borderLeftColor: theme("colors.sky.900"),
            },
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
    require("@tailwindcss/typography"),
  ],
};