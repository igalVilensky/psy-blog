<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useHead, useRoute } from "#imports";
import { onMounted } from "vue";
import { useThemeStore } from "~/stores/theme";

const route = useRoute();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});

useHead({
  // Global title template
  titleTemplate: (title) =>
    title ? `${title} – MindQLab` : "MindQLab - Conscious Development Environment",

  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "MindQLab — your space for conscious development. Take cognitive tests, develop your thinking with games and courses, get personalized recommendations, and track your progress.",
    },
    { name: "language", content: "en" },
    // No geo.region — we target Russian speakers globally
    { property: "og:site_name", content: "MindQLab" },
    { property: "og:type", content: "website" },
  ],

  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    { rel: "manifest", href: "/manifest.webmanifest" },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
    { rel: "canonical", href: `https://www.mindqlab.com${route.path || "/"}` },
  ],

  htmlAttrs: {
    lang: "en",
  },
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        url: "https://www.mindqlab.com",
        logo: "https://www.mindqlab.com/mindqlab-logo.png",
        name: "MindQLab",
      }),
    },
  ],
});
</script>
