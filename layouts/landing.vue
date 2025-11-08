<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-1 mt-16">
      <slot />
    </main>
    <LandingFooter />
  </div>
</template>

<script setup>
import LandingFooter from "@/components/ui/LandingFooter.vue";
</script>
