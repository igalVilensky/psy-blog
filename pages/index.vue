<template>
  <div class="">
    <!-- Loading State -->
    <Loading v-if="isLoading" />

    <main class="min-h-screen bg-gray-900">
      <!-- Hero Section - Modified for dark theme -->
      <HeroSection />

      <!-- Psychological Tools Section - NEW -->
      <!-- <PsychologicalTools /> -->

      <!-- Features Section -->
      <!-- <FeaturesSection /> -->

      <!-- Popular Topics Section - NEW -->
      <PopularTopicsSection />

      <!-- Courses Section -->
      <!-- <CoursesSection /> -->

      <!-- Free Materials Section - NEW -->
      <!-- <FreeMaterialsSection /> -->

      <!-- Blog Section -->
      <!-- <BlogSection /> -->

      <!-- Testimonials Section -->
      <!-- <TestimonialsSection /> -->

      <!-- CTA Section -->
      <CTASection />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Loading from "~/components/base/Loading.vue";
import HeroSection from "~/components/home-page/HeroSection.vue";
import PsychologicalTools from "~/components/home-page/PsychologicalTools.vue";
import FeaturesSection from "~/components/home-page/FeaturesSection.vue";
import PopularTopicsSection from "~/components/home-page/PopularTopicsSection.vue";
import CoursesSection from "~/components/home-page/CoursesSection.vue";
import FreeMaterialsSection from "~/components/home-page/FreeMaterialsSection.vue";
import BlogSection from "~/components/home-page/BlogSection.vue";
import TestimonialsSection from "~/components/home-page/TestimonialsSection.vue";
import CTASection from "~/components/home-page/CTASection.vue";

// Loading state
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>
