<template>
  <div class="bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
    <Hero2 />
    <Benefits2 />
    <FeatureJourney2 />
    <ProgressVis2 />
    <Community2 />
  </div>
</template>

<script setup>
import Hero2 from "@/components/home-page/Hero2.vue";
import Benefits2 from "@/components/home-page/Benefits2.vue";
import FeatureJourney2 from "@/components/home-page/FeatureJourney2.vue";
import ProgressVis2 from "@/components/home-page/ProgressVis2.vue";
import Community2 from "@/components/home-page/Community2.vue";
import { useSeoMeta } from "#app";

definePageMeta({
  layout: "index2",
});

const title = "MindQLab – Твоя лаборатория осознанного роста";
const description = "Исследуй себя, проходи тесты, развивай мышление и личность с MindQLab – психологической лабораторией нового поколения.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>