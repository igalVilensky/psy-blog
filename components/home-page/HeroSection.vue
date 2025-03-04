<template>
  <section
    class="relative flex items-center justify-center overflow-hidden pb-20"
  >
    <div class="absolute inset-0 bg-pattern opacity-5"></div>
    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl z-10">
      <div class="text-center">
        <h1
          v-if="!isLoggedIn"
          class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300 mb-8 leading-tight"
        >
          Ваш Путь к Личностному
          <span class="whitespace-nowrap relative text-white">
            Р<i
              class="fas fa-compass text-2xl md:text-4xl text-sky-400 animate-pulse absolute top-3 md:top-6"
            ></i
            ><span class="md:pl-10 pl-6">сту</span>
          </span>
        </h1>
        <h1
          v-if="isLoggedIn"
          class="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          Ваш прогресс, {{ userName }}!
        </h1>

        <p
          v-if="!isLoggedIn"
          class="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto"
        >
          Начните путешествие к лучшей версии себя с нашей платформой
          личностного роста,
          <span class="font-semibold text-cyan-300"
            >основанной на научных исследованиях</span
          >.
        </p>
        <div
          v-if="isLoggedIn"
          class="mb-10 animate-fadeIn opacity-0"
          style="animation-delay: 1.5s"
        >
          <p class="text-slate-400 max-w-xl mx-auto">
            Продолжайте расти. Вот что нового для вас сегодня.
          </p>
        </div>

        <Dashboard
          v-if="isLoggedIn"
          :stats="stats"
          :actions="recentActions"
          :recommendations="recommendations"
        />

        <div
          v-if="!isLoggedIn"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 animate-fadeIn opacity-0"
          style="animation-delay: 1.5s"
        >
          <div
            class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 text-left"
          >
            <div class="flex items-start mb-4">
              <div
                class="bg-gradient-to-br from-sky-500 to-cyan-400 p-3 rounded-lg mr-4"
              >
                <i class="fas fa-clipboard-check text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-medium text-white mb-2">
                  Пройдите тест
                </h3>
                <p class="text-slate-300 text-sm">
                  Узнайте свои сильные стороны за 5 минут
                </p>
              </div>
            </div>
            <button
              class="text-sky-400 text-sm font-medium flex items-center hover:text-sky-300 transition-colors"
            >
              Начать бесплатно <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          <div
            class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-left"
          >
            <div class="flex items-start mb-4">
              <div
                class="bg-gradient-to-br from-purple-500 to-fuchsia-400 p-3 rounded-lg mr-4"
              >
                <i class="fas fa-user-plus text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-medium text-white mb-2">
                  Создайте аккаунт
                </h3>
                <p class="text-slate-300 text-sm">
                  Сохраняйте результаты и получайте рекомендации
                </p>
              </div>
            </div>
            <button
              class="text-purple-400 text-sm font-medium flex items-center hover:text-purple-300 transition-colors"
            >
              Регистрация <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
          style="animation-delay: 2s"
        >
          <Button
            :to="isLoggedIn ? '/personal-cabinet' : '/courses/courses'"
            :text="isLoggedIn ? 'Продолжить обучение' : 'Начать обучение'"
            iconClass="fas fa-book-open"
            textColor="#FFFFFF"
            customClass="bg-gradient-to-r from-purple-500 to-cyan-500 border-[#0EA5E9]/20"
          />
          <Button
            :to="isLoggedIn ? '/profile' : '/login'"
            :text="isLoggedIn ? 'Перейти в профиль' : 'Создать профиль'"
            iconClass="fas fa-user"
            textColor="#0EA5E9"
            customClass="bg-transparent border-2 border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/10 transition-colors"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { computed } from "vue";
import Button from "~/components/base/Button.vue";
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
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn 2s ease-out forwards;
}
</style>
