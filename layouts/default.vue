<template>
  <div class="flex flex-col min-h-screen">
    <!-- TopBar -->
    <TopBar />

    <!-- Page Content (Main Content) -->
    <main>
      <NuxtPage class="flex-grow" />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import TopBar from "@/components/ui/TopBar.vue";
import Footer from "@/components/ui/Footer.vue";
</script>
