<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-white flex items-center justify-center">
    <!-- Main Content -->
    <div class="max-w-sm w-full px-6 text-center">
      <!-- Loading Animation -->
      <div class="mb-10 relative mx-auto w-24 h-24">
        <div class="absolute inset-0 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800"></div>
        <div
          class="absolute inset-0 rounded-2xl border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin">
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center animate-pulse">
            <i class="fas fa-brain text-white text-lg"></i>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">
          Загрузка
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Настраиваем среду...
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="mt-12 max-w-[200px] mx-auto overflow-hidden rounded-full">
        <div class="relative h-1 bg-zinc-200 dark:bg-zinc-800">
          <div
            class="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-loading-progress">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "empty",
  seo: {
    noindex: true,
    nofollow: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;

onMounted(async () => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  // Initialize auth if not already initialized
  if (authStore.loading) {
    await authStore.initAuth();
  }

  if (!authStore.user) {
    router.push("/login");
    return;
  }

  // Redirect immediately when user is found
  if (authStore.user.displayName) {
    const formattedUsername = authStore.user.displayName.replace(/\s/g, "-");
    router.push(`/profile/${formattedUsername}`);
  } else {
    router.push("/login");
  }
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<style scoped>
@keyframes loading-progress {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(300%);
  }
}

.animate-loading-progress {
  animation: loading-progress 2s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
</style>