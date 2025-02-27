<template>
  <div class="flex flex-col min-h-screen">
    <!-- Animated Background -->
    <!-- <AnimatedBackground /> -->

    <!-- TopBar (Fixed) -->
    <div class="mb-16">
      <TopBar />
    </div>

    <!-- Page Content (Main Content) -->
    <main class="flex-1 relative z-10 bg-background">
      <div class="bg-background w-full h-full z-0"></div>
      <!-- Content -->
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import TopBar from "@/components/navigation/TopBar.vue";
import Footer from "@/components/ui/Footer.vue";
import AnimatedBackground from "@/components/ui/AnimatedBackground.vue";
</script>
