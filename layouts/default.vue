<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen">

    <!-- TopBar (Sticky) -->
    <TopBar />

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
</script>
