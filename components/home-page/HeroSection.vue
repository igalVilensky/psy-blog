<template>
  <section class="relative overflow-hidden">
    <div class="relative container mx-auto px-4 sm:px-0 max-w-6xl z-10">
      <div class="text-center">
        <h1
          v-if="!isLoggedIn"
          class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Ваш Путь к
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300"
          >
            Личностному Росту
          </span>
        </h1>
        <h1
          v-if="isLoggedIn"
          class="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Привет, {{ userName }}
        </h1>
        <p
          v-if="!isLoggedIn"
          class="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Научно обоснованная платформа для вашего персонального развития.
          <span class="font-semibold text-cyan-300"
            >Раскройте свой потенциал</span
          >
          с помощью профессиональных инструментов психологического роста.
        </p>
        <p
          v-if="isLoggedIn"
          class="text-lg text-slate-300 max-w-2xl mx-auto mb-10"
        >
          Продолжайте свой путь развития. Сегодня у вас новые возможности для
          роста.
        </p>
        <Dashboard
          v-if="isLoggedIn"
          :stats="stats"
          :actions="recentActions"
          :recommendations="recommendations"
          class="mb-10"
        />
        <div
          v-if="!isLoggedIn"
          class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div
            class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 flex items-start space-x-4"
          >
            <div
              class="bg-gradient-to-br from-sky-500 to-cyan-400 p-3 rounded-lg"
            >
              <i class="fas fa-clipboard-check text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-medium text-white mb-2">Пройдите тест</h3>
              <p class="text-slate-300 text-sm mb-4">
                Узнайте свои сильные стороны за 5 минут
              </p>
              <a
                href="/tests/archetype"
                class="text-sky-400 hover:text-sky-300 text-sm font-medium"
              >
                Начать <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
          <div
            class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 flex items-start space-x-4"
          >
            <div
              class="bg-gradient-to-br from-purple-500 to-fuchsia-400 p-3 rounded-lg"
            >
              <i class="fas fa-user-plus text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-medium text-white mb-2">
                Создайте аккаунт
              </h3>
              <p class="text-slate-300 text-sm mb-4">
                Сохраняйте результаты и получайте персональные рекомендации
              </p>
              <a
                href="/register"
                class="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Регистрация <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { computed } from "vue";
import Dashboard from "~/components/home-page/Dashboard.vue";

defineProps({
  stats: Object,
  recentActions: Array,
  recommendations: Array,
});

const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(() => authStore.user?.displayName || "Гость");
</script>

<style scoped>
.bg-pattern {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}
</style>
