<template>
  <div class="flex flex-col min-h-screen">
    <!-- TopBar (Fixed) -->
    <TopBar class="fixed top-0 left-0 right-0 z-50" />

    <!-- Page Content (Main Content) -->
    <main class="mt-16">
      <!-- Adjust to add space below the fixed TopBar -->
      <NuxtPage class="flex-grow" />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import TopBar from "@/components/navigation/TopBar.vue";
import Footer from "@/components/ui/Footer.vue";
</script>
