<template>
  <div class="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex">
    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white z-40 px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-stone-900 dark:bg-white flex items-center justify-center">
          <i class="fas fa-square text-white dark:text-stone-900 text-xs"></i>
        </div>
        <span class="font-bold text-stone-900 dark:text-white text-sm">Загрузка</span>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0">
      <!-- Desktop Header -->
      <header
        class="hidden lg:flex h-16 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white items-center justify-between px-6 sticky top-0 z-30">
        <div>
          <h2 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wide">
            Загрузка пространства
          </h2>
        </div>
        <div class="flex items-center gap-4">
          <div class="font-mono text-xs text-stone-500 dark:text-stone-400">
            {{ currentTime }}
          </div>
        </div>
      </header>

      <!-- Loading Content -->
      <div class="flex-1 flex items-center justify-center">
        <div class="max-w-sm w-full px-6 text-center">
          <!-- Loading Square -->
          <div class="mb-10 relative mx-auto w-24 h-24">
            <div class="absolute inset-0 border-[3px] border-stone-200 dark:border-stone-700"></div>
            <div
              class="absolute inset-0 border-[3px] border-t-stone-900 dark:border-t-white animate-spin duration-[1.5s]">
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="fas fa-square text-stone-900 dark:text-white text-sm animate-pulse"></i>
            </div>
          </div>

          <div class="space-y-4">
            <h1 class="text-2xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
              {{ authStore.user ? 'Почти готово' : 'Загрузка' }}
            </h1>
            <p class="text-sm text-stone-600 dark:text-stone-400 font-semibold uppercase tracking-wide">
              {{ authStore.user ? 'Перенаправление в ваше пространство...' : 'Настраиваем среду...' }}
            </p>
          </div>

          <!-- Progress Bar -->
          <div class="mt-12 max-w-[200px] mx-auto overflow-hidden">
            <div class="relative h-[2px] bg-stone-200 dark:bg-stone-800">
              <div class="absolute inset-y-0 left-0 w-1/3 bg-stone-900 dark:bg-white animate-loading-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
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

  await authStore.initAuth();

  if (!authStore.user) {
    router.push("/login");
    return;
  }

  // Simulate a brief loading period
  setTimeout(() => {
    if (authStore.user.displayName) {
      const formattedUsername = authStore.user.displayName.replace(/\s/g, "-");
      router.push(`/profile/${formattedUsername}`);
    } else {
      router.push("/login");
    }
  }, 1500);
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