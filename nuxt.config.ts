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
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    css: ["~/assets/css/main.css"],
  },
});
