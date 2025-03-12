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
  modules: ["@nuxtjs/sanity", "@pinia/nuxt", "@nuxt/image", "@vueuse/nuxt"],
  plugins: [
    "~/plugins/firebase.js", // Firebase initialization
    "~/plugins/initAuth.js", // Auth initialization (must come after firebase.js)
    "~/plugins/inAppReminder.js", // In-app reminder
  ],
  sanity: {
    projectId: "wlg2lkvy",
    dataset: "production",
  },
  image: {
    provider: "ipx",
  },
  // Add runtimeConfig for environment variables
  runtimeConfig: {
    public: {
      useDirectus: process.env.USE_DIRECTUS === "true",
      directusAdminToken: process.env.DIRECTUS_ADMIN_TOKEN,
      directusCustomerRoleId: process.env.DIRECTUS_CUSTOMER_ROLE_ID,
    },
  },
});
