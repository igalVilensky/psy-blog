/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue", // Include app.vue
    "./pages/**/*.{vue,js,ts}", // Include all page files
    "./components/**/*.{vue,js,ts}", // Include all components
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 5s linear infinite",
        // "ping-slow": "ping 0.5s linear infinite",
      },
    }, // Extend default Tailwind theme if needed
  },
  plugins: [], // Add Tailwind plugins here if required
};
