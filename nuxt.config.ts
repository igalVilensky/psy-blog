export default defineNuxtConfig({
  // Tell Nuxt to include Tailwind CSS
  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {}, // Include Tailwind as a PostCSS plugin
      autoprefixer: {}, // Include Autoprefixer for CSS
    },
  },

  compatibilityDate: "2024-12-14",
});