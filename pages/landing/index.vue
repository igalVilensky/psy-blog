<template>
  <div>
    <archetypesHeroSection />
    <!-- <FeaturesSection /> -->
    <TestimonialsSection />
    <CTASection />
  </div>
</template>

<script setup>
import archetypesHeroSection from "@/components/landing/archetypesHeroSection.vue";
import FeaturesSection from "@/components/landing/FeaturesSection.vue";
definePageMeta({
  layout: "landing", // Use the new landing layout
});
</script>
