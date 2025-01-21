<template>
  <div class="flex flex-col min-h-screen">
    <!-- Animated Background -->
    <AnimatedBackground />

    <!-- TopBar (Fixed) -->
    <TopBar />

    <!-- Page Content (Main Content) -->
    <main class="flex-grow mt-16 relative z-10">
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
