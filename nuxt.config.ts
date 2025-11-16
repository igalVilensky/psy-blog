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
    siteUrl: "https://www.mindqlab.com",
    cacheTtl: 3600, // cache sitemap for 1 hour
    autoLastmod: true,
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
    },
    // @ts-ignore
    gzip: true,
    routes: async () => {
      // Import Sanity client
      const { createClient } = await import("@sanity/client");

      // Create Sanity client
      const client = createClient({
        projectId: "wlg2lkvy",
        dataset: "production",
        apiVersion: "2024-01-01",
        useCdn: true,
      });

      try {
        // Fetch all published blog posts from Sanity
        const posts = await client.fetch(`
          *[_type == "post" && defined(slug.current)] {
            "slug": slug.current,
            _updatedAt,
            publishedAt
          }
        `);

        // Map posts to sitemap URLs
        const blogRoutes = posts.map((post: any) => ({
          url: `/blog/${post.slug}`,
          lastmod: post._updatedAt || post.publishedAt,
          changefreq: "weekly",
          priority: 0.7,
        }));

        // Add static routes
        const staticRoutes = [
          { url: "/", changefreq: "daily", priority: 1.0 },
          { url: "/blog", changefreq: "daily", priority: 0.9 },
          { url: "/contact", changefreq: "monthly", priority: 0.6 },
          { url: "/faq", changefreq: "monthly", priority: 0.6 },
          { url: "/about", changefreq: "monthly", priority: 0.7 },
          { url: "/courses", changefreq: "weekly", priority: 0.8 },
          { url: "/tests", changefreq: "monthly", priority: 0.8 },
          { url: "/awareness-tools", changefreq: "monthly", priority: 0.8 },
          { url: "/lab", changefreq: "weekly", priority: 0.8 },
          { url: "/lab/games", changefreq: "weekly", priority: 0.7 },
        ];

        return [...staticRoutes, ...blogRoutes];
      } catch (error) {
        console.error("Error fetching blog posts for sitemap:", error);
        // Return static routes only if Sanity fetch fails
        return [
          { url: "/", changefreq: "daily", priority: 1.0 },
          { url: "/blog", changefreq: "daily", priority: 0.9 },
          { url: "/contact", changefreq: "monthly", priority: 0.6 },
          { url: "/faq", changefreq: "monthly", priority: 0.6 },
        ];
      }
    },
  },

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
  },
});
