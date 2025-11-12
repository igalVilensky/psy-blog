<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="max-w-5xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <div
          class="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4"
        >
          🚀 SEO Implementation Guide
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Nuxt 3 SEO Optimization
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Complete SEO setup and implementation plan for
          <strong class="text-blue-400">mindqlab.com</strong> using Nuxt 3,
          Tailwind, and best practices.
        </p>
      </div>

      <!-- Sections -->
      <div class="space-y-8 mb-16">
        <!-- Section 1 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2"
          >
            <span
              class="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >1</span
            >
            Google Search Console & Basic Setup
          </h2>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-3">
              <span class="text-blue-400 mt-1">•</span>
              <span
                >Verify your domain in Google Search Console via DNS TXT
                record.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-400 mt-1">•</span>
              <span
                >Install
                <code
                  class="bg-gray-900 text-blue-400 px-2 py-1 rounded text-sm"
                  >@nuxtjs/robots</code
                >
                and
                <code
                  class="bg-gray-900 text-blue-400 px-2 py-1 rounded text-sm"
                  >@nuxtjs/sitemap</code
                >.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-400 mt-1">•</span>
              <span
                >Submit your sitemap once available at
                <code
                  class="bg-gray-900 text-blue-400 px-2 py-1 rounded text-sm"
                  >/sitemap.xml</code
                >.</span
              >
            </li>
          </ul>
        </section>

        <!-- Section 2 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-purple-400 flex items-center gap-2"
          >
            <span
              class="bg-purple-500/20 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >2</span
            >
            Global and Page-Level SEO Meta
          </h2>
          <p class="mb-3 text-gray-300">
            Define global metadata in
            <code class="bg-gray-900 text-purple-400 px-2 py-1 rounded text-sm"
              >app.vue</code
            >
            using
            <code class="bg-gray-900 text-purple-400 px-2 py-1 rounded text-sm"
              >useHead</code
            >.
          </p>
          <p class="text-gray-400">
            Add per-page meta, canonical URLs, and Open Graph/Twitter tags.
          </p>
        </section>

        <!-- Section 3 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2"
          >
            <span
              class="bg-green-500/20 text-green-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >3</span
            >
            Language & International SEO
          </h2>
          <p class="text-gray-300">
            Set
            <code class="bg-gray-900 text-green-400 px-2 py-1 rounded text-sm"
              >lang="ru"</code
            >
            globally, prepare folder-based structure for English, and use
            <code class="bg-gray-900 text-green-400 px-2 py-1 rounded text-sm"
              >hreflang</code
            >
            links to connect localized versions.
          </p>
        </section>

        <!-- Section 4 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2"
          >
            <span
              class="bg-yellow-500/20 text-yellow-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >4</span
            >
            URL Structure & Routing
          </h2>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-3">
              <span class="text-yellow-400 mt-1">•</span>
              <span
                >Use clean URLs like
                <code
                  class="bg-gray-900 text-yellow-400 px-2 py-1 rounded text-sm"
                  >/about</code
                >,
                <code
                  class="bg-gray-900 text-yellow-400 px-2 py-1 rounded text-sm"
                  >/blog/post-slug</code
                >.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-yellow-400 mt-1">•</span>
              <span
                >Redirect duplicates (<code
                  class="bg-gray-900 text-yellow-400 px-2 py-1 rounded text-sm"
                  >/about/</code
                >
                →
                <code
                  class="bg-gray-900 text-yellow-400 px-2 py-1 rounded text-sm"
                  >/about</code
                >).</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-yellow-400 mt-1">•</span>
              <span>Use descriptive slugs for readability and SEO.</span>
            </li>
          </ul>
        </section>

        <!-- Section 5 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-pink-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-pink-400 flex items-center gap-2"
          >
            <span
              class="bg-pink-500/20 text-pink-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >5</span
            >
            Technical SEO & Structured Data
          </h2>
          <p class="mb-3 text-gray-300">
            Implement canonical tags, structured data (JSON-LD), and use Nuxt
            Image for responsive optimized images.
          </p>
          <p class="text-gray-400">
            Add
            <code class="bg-gray-900 text-pink-400 px-2 py-1 rounded text-sm"
              >Article</code
            >
            schema for blog posts and
            <code class="bg-gray-900 text-pink-400 px-2 py-1 rounded text-sm"
              >WebSite</code
            >
            schema on homepage.
          </p>
        </section>

        <!-- Section 6 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"
          >
            <span
              class="bg-cyan-500/20 text-cyan-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >6</span
            >
            Rendering Strategy
          </h2>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-3">
              <span class="text-cyan-400 mt-1">•</span>
              <span
                ><strong class="text-cyan-300">SSR</strong> for public pages
                (default)</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-cyan-400 mt-1">•</span>
              <span
                ><strong class="text-cyan-300">SSG</strong> for static content
                using
                <code
                  class="bg-gray-900 text-cyan-400 px-2 py-1 rounded text-sm"
                  >nitro.prerender</code
                ></span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-cyan-400 mt-1">•</span>
              <span
                ><strong class="text-cyan-300">CSR</strong> (client-side) for
                private or dashboard pages</span
              >
            </li>
          </ul>
        </section>

        <!-- Section 7 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-orange-400 flex items-center gap-2"
          >
            <span
              class="bg-orange-500/20 text-orange-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >7</span
            >
            Performance & UX SEO
          </h2>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-3">
              <span class="text-orange-400 mt-1">•</span>
              <span
                >Optimize images and use
                <code
                  class="bg-gray-900 text-orange-400 px-2 py-1 rounded text-sm"
                  >&lt;NuxtImg&gt;</code
                >.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-400 mt-1">•</span>
              <span
                >Ensure all images have
                <code
                  class="bg-gray-900 text-orange-400 px-2 py-1 rounded text-sm"
                  >alt</code
                >
                text.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-400 mt-1">•</span>
              <span
                >Monitor Core Web Vitals via Lighthouse and Search
                Console.</span
              >
            </li>
          </ul>
        </section>

        <!-- Section 8 -->
        <section
          class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-colors"
        >
          <h2
            class="text-2xl font-bold mb-4 text-indigo-400 flex items-center gap-2"
          >
            <span
              class="bg-indigo-500/20 text-indigo-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              >8</span
            >
            Monitoring & Maintenance
          </h2>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-3">
              <span class="text-indigo-400 mt-1">•</span>
              <span>Check GSC coverage and enhancement reports weekly.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-indigo-400 mt-1">•</span>
              <span>Audit structured data with Google Rich Results Test.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-indigo-400 mt-1">•</span>
              <span>Regenerate sitemap after adding new content.</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Checklist -->
      <section
        class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700"
      >
        <h2
          class="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          ✅ Implementation Checklist
        </h2>

        <div class="space-y-8">
          <!-- High Priority -->
          <div class="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
            <h3
              class="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2"
            >
              <span
                class="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                >!</span
              >
              High Priority (Week 1)
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(item, i) in checklistHigh"
                :key="i"
                class="flex items-center gap-3 group"
              >
                <input
                  type="checkbox"
                  :id="`high-${i}`"
                  class="w-5 h-5 rounded border-2 border-blue-500 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  :for="`high-${i}`"
                  class="text-gray-300 cursor-pointer group-hover:text-blue-400 transition-colors"
                >
                  {{ item }}
                </label>
              </li>
            </ul>
          </div>

          <!-- Medium Priority -->
          <div
            class="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/30"
          >
            <h3
              class="text-xl font-bold mb-4 text-yellow-400 flex items-center gap-2"
            >
              <span
                class="bg-yellow-500 text-gray-900 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                >~</span
              >
              Medium Priority (Week 2)
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(item, i) in checklistMedium"
                :key="i"
                class="flex items-center gap-3 group"
              >
                <input
                  type="checkbox"
                  :id="`medium-${i}`"
                  class="w-5 h-5 rounded border-2 border-yellow-500 bg-gray-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  :for="`medium-${i}`"
                  class="text-gray-300 cursor-pointer group-hover:text-yellow-400 transition-colors"
                >
                  {{ item }}
                </label>
              </li>
            </ul>
          </div>

          <!-- Advanced -->
          <div class="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
            <h3
              class="text-xl font-bold mb-4 text-green-400 flex items-center gap-2"
            >
              <span
                class="bg-green-500 text-gray-900 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                >+</span
              >
              Advanced (Weeks 3–4)
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(item, i) in checklistAdvanced"
                :key="i"
                class="flex items-center gap-3 group"
              >
                <input
                  type="checkbox"
                  :id="`advanced-${i}`"
                  class="w-5 h-5 rounded border-2 border-green-500 bg-gray-700 text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  :for="`advanced-${i}`"
                  class="text-gray-300 cursor-pointer group-hover:text-green-400 transition-colors"
                >
                  {{ item }}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer
        class="mt-16 text-center text-gray-500 text-sm border-t border-gray-800 pt-8"
      >
        © {{ new Date().getFullYear() }} MindQLab – SEO Optimization Guide
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const checklistHigh = [
  "Verify Google Search Console",
  "Configure robots.txt and sitemap",
  "Add global meta in app.vue",
  "Add canonical URLs",
  "Russian language meta and HTML lang",
  "Structured data on homepage",
];

const checklistMedium = [
  "Dynamic meta for blog posts and services",
  "Open Graph + Twitter cards",
  "Configure Nuxt Image for all media",
  "Implement hreflang for future EN version",
  "SEO-friendly 404 page",
];

const checklistAdvanced = [
  "Breadcrumb structured data",
  "Pagination canonicalization",
  "Analytics integration (GA4 or Firebase)",
  "Performance optimization (LCP / CLS / FID)",
  "Regular SEO audits and link checks",
];
</script>
