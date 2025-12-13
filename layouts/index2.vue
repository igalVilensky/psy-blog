<template>
  <div class="flex flex-col min-h-screen bg-stone-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
    <!-- TopBar (Sticky) -->
    <TopBar />

    <!-- Page Content (Main Content) -->
    <main class="flex-1 relative z-10 w-full">
        <NuxtPage />
    </main>

    <!-- Footer2 -->
    <Footer2 />
  </div>
</template>

<script setup>
import TopBar from "@/components/navigation/TopBar.vue";
import Footer2 from "@/components/ui/Footer2.vue";
</script>

