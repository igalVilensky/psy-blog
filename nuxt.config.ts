export default defineNuxtConfig({
  css: [
    "@/assets/css/global.css",
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
  modules: ["@nuxtjs/sanity", "@pinia/nuxt", "@nuxt/image"],
  plugins: [
    "~/plugins/firebase.js", // Firebase initialization
    "~/plugins/initAuth.js", // Auth initialization (must come after firebase.js)
  ],
  sanity: {
    projectId: "wlg2lkvy",
    dataset: "production",
  },
  image: {
    provider: "ipx",
  },
});
