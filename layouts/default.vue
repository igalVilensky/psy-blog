<template>
  <div class="flex flex-col min-h-screen">
    <!-- TopBar (Fixed) -->
    <TopBar />

    <!-- Page Content (Main Content) -->
    <main class="flex-grow mt-16">
      <!-- Adjust to add space below the fixed TopBar -->
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
