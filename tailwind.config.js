/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue", // Include app.vue
    "./pages/**/*.{vue,js,ts}", // Include all page files
    "./components/**/*.{vue,js,ts}", // Include all components
  ],
  theme: {
    extend: {}, // Extend default Tailwind theme if needed
  },
  plugins: [], // Add Tailwind plugins here if required
};
