export default defineNuxtConfig({
  // Global CSS
  css: [
    "@/assets/css/global.css",
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-12-14",

  site: {
    url: "https://www.mindqlab.com",
  },

  router: {
    options: {
      strict: false, // allows both /about and /about/
    },
  },

  modules: [
    "@nuxtjs/sanity",
    "@pinia/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  robots: {
    // @ts-ignore
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.mindqlab.com/sitemap.xml",
    host: "https://www.mindqlab.com",
  },

  sitemap: {
    // @ts-ignore
    cacheTtl: 3600, // cache sitemap for 1 hour
    autoLastmod: true,
    sources: ["/api/sitemap"],
    exclude: [
      "/profile/**",
      "/login",
      "/register",
      "/verify-email",
      "/auth/**",
      "/personal-cabinet/**",
      "/onboarding/**",
      "/admin/**",
    ],
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
    },
    // @ts-ignore
    gzip: true,
  },

  plugins: [
    "~/plugins/firebase.js",
    "~/plugins/initAuth.js",
  ],

  sanity: {
    projectId: "wlg2lkvy",
    dataset: "production",
  },

  image: {
    provider: "ipx",
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.mindqlab.com",
      paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID,
    },
  },
});
