<template>
  <div class="flex flex-col min-h-screen">
    <LandingTopBar />
    <main class="flex-1 mt-16">
      <slot />
    </main>
    <LandingFooter />
  </div>
</template>

<script setup>
import LandingTopBar from "@/components/navigation/LandingTopBar.vue";
import LandingFooter from "@/components/ui/LandingFooter.vue";
</script>
