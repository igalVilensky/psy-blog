import { createClient } from "@sanity/client";

export default defineNuxtConfig({
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
  modules: [
    "@nuxtjs/sanity",
    "@pinia/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
    [
      "@nuxtjs/sitemap",
      {
        hostname: process.env.NUXT_PUBLIC_SITE_URL || "https://mindqlab.com",
        gzip: true,
        routes: async () => {
          const routes: string[] = [
            "/",
            "/about",
            "/contact",
            "/faq",
            "/login",
            "/register",
            "/home",
            "/profile",
            "/verify-email",
            "/tree-of-self",
            "/tree-of-self-info",
            "/landing",
            "/landingtest",
            "/guide-test",
            "/happy-birthday",
            "/personal-cabinet",
            "lab/community",
            "/lab",
            "/test",
            "/legal",
          ];

          // Awareness-tools nested pages
          const awarenessTools = [
            "big-5-model",
            "daily-growth-spark",
            "deep-conversation-with-cards",
            "emotional-compass",
            "inspiration-wall",
            "life-purpose-archetype",
            "wheel-of-life",
          ];
          awarenessTools.forEach((page) =>
            routes.push(`/awareness-tools/${page}`)
          );
          routes.push("/awareness-tools"); // folder root

          // Courses nested pages
          const coursesPages = [
            "courses",
            "free-resources",
            "podcasts",
            "healing-childhood-traumas",
          ];
          coursesPages.forEach((page) => routes.push(`/courses/${page}`));
          routes.push("/courses"); // folder root

          // Fetch dynamic blog routes from Sanity
          try {
            const client = createClient({
              projectId: "wlg2lkvy",
              dataset: "production",
              useCdn: false, // or true
              apiVersion: "2024-11-08",
            });
            const posts = await client.fetch(
              `*[_type == "post"]{ "slug": slug.current, "updatedAt": _updatedAt }`
            );
            posts.forEach((post: { slug: string }) => {
              routes.push(`/blog/${post.slug}`);
            });
          } catch (err) {
            console.warn("Failed to fetch blog posts for sitemap:", err);
          }

          return routes;
        },
      },
    ],
  ],
  plugins: [
    "~/plugins/firebase.js",
    "~/plugins/initAuth.js",
    "~/plugins/inAppReminder.js",
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://mindqlab.com",
    },
    css: ["~/assets/css/main.css"],
  },
});
