<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Уведомление -->
    <!-- <Notification
      v-if="notification"
      :message="notification.message"
      :type="'reminder'"
      :route-path="notification.routePath"
      :cta-text="notification.ctaText"
      @close="notification = null"
    /> -->

    <!-- TopBar (Fixed) -->
    <div class="bg-slate-950">
      <TopBar />
    </div>

    <!-- Page Content (Main Content) -->
    <main class="flex-1 relative z-10 bg-background pt-[3.8rem]">
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
import Notification from "@/components/base/Notification.vue";
import { ref } from "vue";

const notification = ref(null);
const nuxtApp = useNuxtApp();

// Подключаемся к эмиттеру из плагина
onMounted(() => {
  nuxtApp.$emitter.on("showNotification", (data) => {
    notification.value = data; // Обновляем уведомление
  });
});

// Убираем слушатель при размонтировании (опционально)
onUnmounted(() => {
  nuxtApp.$emitter.off("showNotification");
  notification.value = null;
});
</script>
