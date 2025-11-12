export default defineNuxtConfig({
  // Global CSS
  css: [
    "@/assets/css/global.css",
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  // PostCSS for Tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Nuxt 3 compatibility date
  compatibilityDate: "2024-12-14",

  // Modules
  modules: ["@nuxtjs/sanity", "@pinia/nuxt", "@nuxt/image", "@vueuse/nuxt"],

  // Nitro prerendering
  nitro: {
    prerender: {
      routes: [
        "/",
        "/about",
        "/contact",
        "/faq",
        "/login",
        "/register",
        "/happy-birthday",
        "/lab",
        "/legal/privacy",
      ],
    },
  },

  // Plugins
  plugins: [
    "~/plugins/firebase.js",
    "~/plugins/initAuth.js",
    "~/plugins/inAppReminder.js",
  ],

  // Sanity configuration
  sanity: {
    projectId: "wlg2lkvy",
    dataset: "production",
  },

  // Nuxt image module config
  image: {
    provider: "ipx",
  },

  // Runtime config
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://mindqlab.com",
    },
  },
});
