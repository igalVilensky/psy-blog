<template>
  <div class="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-sans selection:bg-brand-primary/30 transition-colors duration-300">
    <!-- TopBar (Sticky) -->
    <TopBar2 />

    <!-- Page Content (Main Content) -->
    <main class="flex-1 relative z-10 w-full">
        <NuxtPage />
    </main>

    <!-- Footer2 -->
    <Footer2 />
  </div>
</template>

<script setup>
import TopBar2 from "@/components/navigation/TopBar2.vue";
import Footer2 from "@/components/ui/Footer2.vue";
import { useThemeStore } from "~/stores/theme";
import { onMounted } from "vue";

const themeStore = useThemeStore();

// Initialize theme on mount
onMounted(() => {
  themeStore.initTheme();
});
</script>