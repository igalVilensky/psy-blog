<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useHead, useRoute } from "#imports";

const route = useRoute();

useHead({
  // Global title template
  titleTemplate: (title) =>
    title ? `${title} – MindQLab` : "MindQLab – Лаборатория осознанного роста",

  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "MindQLab — твоя лаборатория осознанного роста. Проходи когнитивные тесты, развивай мышление с помощью игр и курсов, получай персональные рекомендации и отслеживай прогресс.",
    },
    { name: "language", content: "ru" },
    // No geo.region — we target Russian speakers globally
    { property: "og:site_name", content: "MindQLab" },
    { property: "og:type", content: "website" },
  ],

  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "canonical", href: `https://www.mindqlab.com${route.path || "/"}` },
  ],

  htmlAttrs: {
    lang: "ru",
  },
});
</script>
