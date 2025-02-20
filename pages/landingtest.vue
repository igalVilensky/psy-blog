<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <TestimonialsSection />
    <CTASection />
  </div>
</template>

<script setup>
import HeroSection from "@/components/landing/HeroSection.vue";
import FeaturesSection from "@/components/landing/FeaturesSection.vue";
definePageMeta({
  layout: "landing", // Use the new landing layout
});
</script>
