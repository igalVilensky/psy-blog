<template>
  <section class="py-12">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-2xl font-bold text-white mb-6">
        Notifications ({{ notifications.length }})
      </h2>
      <div v-if="isLoggedIn && notifications.length > 0" class="space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300"
        >
          <p>{{ notification.message }}</p>
          <a
            v-if="notification.routePath"
            :href="notification.routePath"
            class="text-blue-600 hover:underline"
          >
            {{ notification.ctaText || "Go" }}
          </a>
        </div>
      </div>
      <div
        v-else-if="isLoggedIn && notifications.length === 0"
        class="text-gray-600"
      >
        No new notifications.
      </div>
      <div v-else class="text-center">
        <p class="mb-4">Stay on top of your growth with daily notifications!</p>
        <a href="/signup" class="btn btn-primary">Sign Up to Get Started</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const notifications = ref([]);
const { $emitter } = useNuxtApp();

// Listen for notifications from the inAppReminder plugin
onMounted(() => {
  $emitter.on("showNotification", (data) => {
    const notification = {
      id: Date.now(), // Simple unique ID for now
      ...data,
      ctaText: data.ctaText || "Go",
    };
    // Avoid duplicates by checking message
    if (!notifications.value.some((n) => n.message === notification.message)) {
      notifications.value.push(notification);
    }
  });
});

onUnmounted(() => {
  $emitter.off("showNotification");
});
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-semibold;
}
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
</style>
