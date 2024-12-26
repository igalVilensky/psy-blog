export default defineNuxtConfig({
  // Tell Nuxt to include Tailwind CSS
  css: [
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {}, // Include Tailwind as a PostCSS plugin
      autoprefixer: {}, // Include Autoprefixer for CSS
    },
  },

  compatibilityDate: "2024-12-14",
  modules: ["@nuxtjs/sanity", "@pinia/nuxt"],
  plugins: ["../plugins/firebase.js", "../plugins/initAuth.js"],
  sanity: {
    projectId: "wlg2lkvy",
    dataset: "production",
  },
});
