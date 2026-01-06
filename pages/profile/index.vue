<template>
  <div
    class="relative min-h-screen transition-colors duration-500 flex flex-col bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg">
    <TopBar />
    <div class="flex-1 flex items-center justify-center py-20">
      <div class="max-w-md w-full px-6 text-center animate-fade-in text-center px-6">
        <div class="mb-12 relative inline-block">
          <!-- Minimalist Loading Spinner -->
          <div class="w-24 h-24 rounded-full border-[3px] border-stone-100 dark:border-stone-800/50 relative">
            <div
              class="absolute inset-0 rounded-full border-[3px] border-t-mindqlab-calm-accent animate-spin duration-[1.5s]">
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="fas fa-circle-notch text-mindqlab-calm-accent/20 animate-pulse"></i>
          </div>
        </div>

        <h1 class="text-3xl font-light text-stone-900 dark:text-white mb-4 tracking-tight uppercase">
          {{ authStore.user ? "Почти готово" : "Загрузка" }}
        </h1>
        <p class="text-stone-500 dark:text-stone-400 font-light italic leading-relaxed">
          {{
            authStore.user
              ? `Перенаправление в ваше пространство...`
              : "Пожалуйста, подождите, мы настраиваем среду..."
          }}
        </p>

        <div class="mt-12 max-w-[200px] mx-auto overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800/30 h-[1px]">
          <div class="bg-mindqlab-calm-accent/40 h-full w-1/3 animate-loading-progress rounded-full"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import TopBar from "~/components/navigation/TopBar.vue";
import Footer from "~/components/ui/Footer.vue";

definePageMeta({
  layout: "empty",
  seo: {
    noindex: true,
    nofollow: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initAuth();

  if (!authStore.user) {
    router.push("/login");
    return;
  }

  if (authStore.user.displayName) {
    const formattedUsername = authStore.user.displayName.replace(/\s/g, "-");
    router.push(`/profile/${formattedUsername}`);
  } else {
    // Handle users without displayName
    router.push("/login");
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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
